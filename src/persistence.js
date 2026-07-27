import React from 'react';
import { createEmptyState, defaultSettings } from './data.js';

const STORAGE_KEYS = {
  clients: 'hours:v1:clients',
  entries: 'hours:v1:entries',
  invoices: 'hours:v1:invoices',
  settings: 'hours:v1:settings',
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function legacyBillingProfile(settings) {
  const base = {
    id: 'billing-main',
    name: 'Main account',
    entityType: 'fop',
    legalName: '',
    email: '',
    registrationAddress: '',
    taxId: '',
    vatNumber: '',
    preparedBy: '',
    currency: settings.currency || defaultSettings.currency,
    beneficiaryName: '',
    iban: '',
    bankName: '',
    bankAddress: '',
    swiftBic: '',
    intermediaryBank: '',
    paymentInstructions: '',
    paymentPurpose: 'Payment for professional services under invoice #{number}',
    taxLabel: 'VAT not applicable',
    taxRate: 0,
  };
  return {
    ...base,
    legalName: settings.businessName || '',
    email: settings.email || '',
    taxId: settings.taxId || '',
    beneficiaryName: settings.businessName || '',
    paymentInstructions: settings.paymentDetails || '',
  };
}

function hydrateState(state) {
  const incomingSettings = state.settings || {};
  const hasBillingProfiles = Array.isArray(incomingSettings.billingProfiles);
  const hasLegacyBillingDetails = [
    incomingSettings.businessName,
    incomingSettings.email,
    incomingSettings.taxId,
    incomingSettings.paymentDetails,
  ].some(Boolean);
  const billingProfiles = hasBillingProfiles
    ? incomingSettings.billingProfiles
    : hasLegacyBillingDetails
      ? [legacyBillingProfile(incomingSettings)]
      : [];
  const requestedDefaultId = incomingSettings.defaultBillingProfileId;
  const defaultBillingProfileId = billingProfiles.some((profile) => profile.id === requestedDefaultId)
    ? requestedDefaultId
    : billingProfiles[0]?.id || '';

  return {
    ...state,
    settings: {
      ...clone(defaultSettings),
      ...incomingSettings,
      billingProfiles,
      defaultBillingProfileId,
    },
  };
}

function migrationState() {
  try {
    const migrated = {
      version: 1,
      clients: JSON.parse(localStorage.getItem(STORAGE_KEYS.clients) || 'null'),
      entries: JSON.parse(localStorage.getItem(STORAGE_KEYS.entries) || 'null'),
      invoices: JSON.parse(localStorage.getItem(STORAGE_KEYS.invoices) || 'null'),
      settings: JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || 'null'),
    };
    if (
      Array.isArray(migrated.clients)
      && Array.isArray(migrated.entries)
      && Array.isArray(migrated.invoices)
      && migrated.settings
    ) {
      return migrated;
    }
  } catch {
    // A malformed legacy value should not prevent a clean server initialization.
  }
  return createEmptyState();
}

function token() {
  return sessionStorage.getItem('hours:api-token') || '';
}

async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const accessToken = token();
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  return fetch(path, { ...options, headers });
}

async function responseJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export function useServerState() {
  const [data, setData] = React.useState(createEmptyState);
  const [connection, setConnection] = React.useState({
    status: 'loading',
    sync: 'loading',
    error: '',
    meta: null,
  });
  const revisionRef = React.useRef(0);
  const lastSavedRef = React.useRef('');
  const saveQueueRef = React.useRef(Promise.resolve());
  const loadGenerationRef = React.useRef(0);

  const load = React.useCallback(async (candidateToken) => {
    const generation = loadGenerationRef.current + 1;
    loadGenerationRef.current = generation;
    if (candidateToken != null) {
      if (candidateToken) sessionStorage.setItem('hours:api-token', candidateToken);
      else sessionStorage.removeItem('hours:api-token');
    }
    setConnection((current) => ({ ...current, status: 'loading', sync: 'loading', error: '' }));

    try {
      const stateResponse = await apiRequest('/api/state');
      if (generation !== loadGenerationRef.current) return;
      if (stateResponse.status === 401) {
        setConnection({ status: 'auth', sync: 'idle', error: '', meta: null });
        return;
      }

      let record;
      if (stateResponse.status === 404) {
        const initial = migrationState();
        const createResponse = await apiRequest('/api/state', {
          method: 'PUT',
          body: JSON.stringify({ state: initial, revision: 0 }),
        });
        if (!createResponse.ok) throw new Error('Hours could not initialize its SQLite database.');
        const created = await responseJson(createResponse);
        record = { state: initial, revision: created.revision, updatedAt: created.updatedAt };
      } else if (stateResponse.ok) {
        record = await responseJson(stateResponse);
      } else {
        const problem = await responseJson(stateResponse);
        throw new Error(problem.message || 'Hours could not load the SQLite database.');
      }

      const metaResponse = await apiRequest('/api/meta');
      const meta = metaResponse.ok ? await responseJson(metaResponse) : null;
      const hydratedState = hydrateState(record.state);
      revisionRef.current = record.revision;
      lastSavedRef.current = JSON.stringify(hydratedState);
      setData(hydratedState);
      setConnection({
        status: 'ready',
        sync: 'saved',
        error: '',
        meta: { ...meta, updatedAt: record.updatedAt },
      });
    } catch (error) {
      if (generation !== loadGenerationRef.current) return;
      setConnection({
        status: 'offline',
        sync: 'error',
        error: error.message || 'Hours could not reach its server.',
        meta: null,
      });
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  React.useEffect(() => {
    if (connection.status !== 'ready') return undefined;
    const serialized = JSON.stringify(data);
    if (serialized === lastSavedRef.current) return undefined;

    setConnection((current) => ({ ...current, sync: 'saving', error: '' }));
    const timer = window.setTimeout(() => {
      const snapshot = data;
      const snapshotJson = serialized;
      saveQueueRef.current = saveQueueRef.current.then(async () => {
        const response = await apiRequest('/api/state', {
          method: 'PUT',
          body: JSON.stringify({
            state: snapshot,
            revision: revisionRef.current,
          }),
        });

        if (response.status === 401) {
          setConnection((current) => ({ ...current, status: 'auth', sync: 'idle' }));
          return;
        }

        const result = await responseJson(response);
        if (response.status === 409 && result.current) {
          const hydratedState = hydrateState(result.current.state);
          revisionRef.current = result.current.revision;
          lastSavedRef.current = JSON.stringify(hydratedState);
          setData(hydratedState);
          setConnection((current) => ({
            ...current,
            sync: 'conflict',
            error: 'Another session saved newer data. Hours reloaded that version.',
          }));
          return;
        }

        if (!response.ok) {
          throw new Error(result.message || 'Hours could not save this change.');
        }

        revisionRef.current = result.revision;
        lastSavedRef.current = snapshotJson;
        setConnection((current) => ({
          ...current,
          sync: 'saved',
          error: '',
          meta: { ...current.meta, revision: result.revision, updatedAt: result.updatedAt },
        }));
      }).catch((error) => {
        setConnection((current) => ({
          ...current,
          sync: 'error',
          error: error.message || 'Hours could not save this change.',
        }));
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [connection.status, data]);

  const connect = React.useCallback((accessToken) => load(accessToken.trim()), [load]);
  const retry = React.useCallback(() => load(), [load]);
  const signOut = React.useCallback(() => load(''), [load]);

  return {
    data,
    setData,
    connection,
    connect,
    retry,
    signOut,
  };
}
