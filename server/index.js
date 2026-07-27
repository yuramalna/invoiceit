import { timingSafeEqual } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import Database from 'better-sqlite3';
import express from 'express';

const port = Number(process.env.PORT || 4174);
const dataDirectory = resolve(process.env.HOURS_DATA_DIR || '.data');
const databasePath = join(dataDirectory, 'hours.sqlite');
const apiToken = process.env.HOURS_API_TOKEN?.trim() || '';
const distDirectory = resolve('dist');

mkdirSync(dirname(databasePath), { recursive: true });

const database = new Database(databasePath);
database.pragma('journal_mode = WAL');
database.pragma('foreign_keys = ON');
database.pragma('busy_timeout = 5000');
database.exec(`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    version INTEGER PRIMARY KEY,
    applied_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS app_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    revision INTEGER NOT NULL,
    payload TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  INSERT OR IGNORE INTO schema_migrations (version, applied_at)
  VALUES (1, datetime('now'));
`);

const readState = database.prepare(
  'SELECT revision, payload, updated_at AS updatedAt FROM app_state WHERE id = 1',
);
const insertState = database.prepare(
  'INSERT INTO app_state (id, revision, payload, updated_at) VALUES (1, 1, ?, ?)',
);
const updateState = database.prepare(
  'UPDATE app_state SET revision = ?, payload = ?, updated_at = ? WHERE id = 1 AND revision = ?',
);

function safeTokenMatch(candidate) {
  const expectedBuffer = Buffer.from(apiToken);
  const candidateBuffer = Buffer.from(candidate || '');
  return expectedBuffer.length === candidateBuffer.length
    && timingSafeEqual(expectedBuffer, candidateBuffer);
}

function authenticate(request, response, next) {
  if (!apiToken) {
    next();
    return;
  }
  const authorization = request.get('authorization') || '';
  const candidate = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!safeTokenMatch(candidate)) {
    response.status(401).json({
      error: 'authentication_required',
      message: 'Enter the access token configured for this Hours instance.',
    });
    return;
  }
  next();
}

function parseRecord(record) {
  if (!record) return null;
  return {
    revision: record.revision,
    updatedAt: record.updatedAt,
    state: JSON.parse(record.payload),
  };
}

function validateState(state) {
  if (!state || typeof state !== 'object') return 'State must be an object.';
  for (const key of ['clients', 'entries', 'invoices', 'settings']) {
    if (key === 'settings' ? typeof state[key] !== 'object' : !Array.isArray(state[key])) {
      return `State field "${key}" has the wrong shape.`;
    }
  }
  return null;
}

const writeState = database.transaction((state, expectedRevision) => {
  const current = readState.get();
  const updatedAt = new Date().toISOString();
  const payload = JSON.stringify(state);

  if (!current) {
    if (expectedRevision !== 0) return { conflict: true, current: null };
    insertState.run(payload, updatedAt);
    return { revision: 1, updatedAt };
  }

  if (current.revision !== expectedRevision) {
    return { conflict: true, current: parseRecord(current) };
  }

  const nextRevision = current.revision + 1;
  const result = updateState.run(nextRevision, payload, updatedAt, current.revision);
  if (result.changes !== 1) {
    return { conflict: true, current: parseRecord(readState.get()) };
  }
  return { revision: nextRevision, updatedAt };
});

const appendEntry = database.transaction((entry) => {
  const current = parseRecord(readState.get());
  if (!current) return { missing: true };
  if (!entry?.id || !entry?.clientId || !entry?.projectId || !entry?.task) {
    return { invalid: true };
  }
  if (current.state.entries.some((item) => item.id === entry.id)) {
    return { duplicate: true, revision: current.revision };
  }
  const nextState = {
    ...current.state,
    entries: [entry, ...current.state.entries],
  };
  return writeState(nextState, current.revision);
});

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_request, response) => {
  response.type('text/plain').send('ok\n');
});

app.use('/api', authenticate);
app.use('/api', (_request, response, next) => {
  response.set('Cache-Control', 'no-store');
  next();
});

app.get('/api/meta', (_request, response) => {
  const state = readState.get();
  response.json({
    storage: 'sqlite',
    revision: state?.revision || 0,
    updatedAt: state?.updatedAt || null,
    authentication: apiToken ? 'token' : 'development-open',
  });
});

app.get('/api/state', (_request, response) => {
  const state = parseRecord(readState.get());
  if (!state) {
    response.status(404).json({ error: 'state_not_initialized' });
    return;
  }
  response.json(state);
});

app.put('/api/state', (request, response) => {
  const validationError = validateState(request.body?.state);
  if (validationError) {
    response.status(400).json({ error: 'invalid_state', message: validationError });
    return;
  }
  const expectedRevision = Number(request.body?.revision);
  if (!Number.isInteger(expectedRevision) || expectedRevision < 0) {
    response.status(400).json({
      error: 'invalid_revision',
      message: 'Revision must be a non-negative integer.',
    });
    return;
  }
  const result = writeState(request.body.state, expectedRevision);
  if (result.conflict) {
    response.status(409).json({
      error: 'revision_conflict',
      message: 'Hours changed in another session. Reload the latest data before saving.',
      current: result.current,
    });
    return;
  }
  response.json(result);
});

app.post('/api/entries', (request, response) => {
  const result = appendEntry(request.body);
  if (result.missing) {
    response.status(409).json({ error: 'state_not_initialized' });
    return;
  }
  if (result.invalid) {
    response.status(400).json({
      error: 'invalid_entry',
      message: 'An entry needs an id, client, project, and task.',
    });
    return;
  }
  if (result.duplicate) {
    response.status(200).json({ revision: result.revision, duplicate: true });
    return;
  }
  response.status(201).json(result);
});

app.get('/api/export', (_request, response) => {
  const state = parseRecord(readState.get());
  if (!state) {
    response.status(404).json({ error: 'state_not_initialized' });
    return;
  }
  const stamp = new Date().toISOString().slice(0, 10);
  response
    .attachment(`hours-backup-${stamp}.json`)
    .json(state);
});

if (existsSync(distDirectory)) {
  app.use(express.static(distDirectory, {
    immutable: true,
    maxAge: '7d',
    index: false,
  }));
  app.get('*path', (_request, response) => {
    response.sendFile(join(distDirectory, 'index.html'));
  });
}

const server = app.listen(port, '0.0.0.0', () => {
  const authMode = apiToken ? 'token protected' : 'open for local development';
  console.log(`Hours API listening on http://0.0.0.0:${port} · ${authMode}`);
  console.log(`SQLite: ${databasePath}`);
});

function shutdown() {
  server.close(() => {
    database.close();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
