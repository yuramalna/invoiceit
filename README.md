# Hours

A private work ledger for people with several part-time client engagements. Hours connects time tracking, project rates, unbilled work, and invoice preparation in one deliberately quiet interface.

## What works

- Start, stop, and resume a timer against a client project
- Add, edit, search, filter, export, and remove time entries
- Manage clients with multiple projects, rates, budgets, currencies, and payment terms
- Create invoice drafts from selected unbilled entries
- Mark invoices as sent or paid and print them to PDF
- Review weekly, monthly, and per-client reporting
- Persist all application changes in a revisioned SQLite database
- Protect API access with a bearer token
- Adapt the full workflow to desktop, tablet, and mobile layouts

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4173](http://localhost:4173). Local development runs without an access token and stores its database at `.data/hours.sqlite`.

Create a production build with:

```bash
npm run build
npm run preview
```

## Run with Docker

```bash
cp .env.example .env
# Replace the example token in .env, then:
docker compose up --build
```

Open [http://localhost:8080](http://localhost:8080) and enter the token from `.env`. The container includes a `/health` endpoint for service checks.

Docker writes SQLite data to the named `hours-data` volume mounted at `/data`. Rebuilding or replacing the container does not remove the ledger.

## API and persistence

The server stores one versioned application document in SQLite and uses optimistic revisions to avoid silently overwriting changes from another session. The web app automatically saves changes through the API.

- `GET /api/state` reads the current ledger
- `PUT /api/state` saves a revision
- `POST /api/entries` adds one time entry idempotently for the future macOS tracker
- `GET /api/export` downloads a complete JSON backup
- `GET /api/meta` reports storage and synchronization metadata

When `HOURS_API_TOKEN` is configured, all `/api/*` endpoints require `Authorization: Bearer <token>`. The health endpoint remains unauthenticated for container monitoring.

On the first server connection, Hours imports existing `hours:v1:*` browser data if present; otherwise it initializes an empty workspace.

## Design system

The canonical visual source is [Hours Design System](./Hours%20Design%20System). The production application imports its tokens and compiled components directly. Product and visual decisions are captured in [PRODUCT.md](./PRODUCT.md) and [DESIGN.md](./DESIGN.md).
