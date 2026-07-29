import React from 'react';
import { createEmptyState } from './data.js';
import ConnectionScreen from './ConnectionScreen.jsx';
import {
  ClientDialog,
  DeleteInvoiceDialog,
  EntryDialog,
  InvoiceDialog,
  ResetDialog,
} from './dialogs.jsx';
import { useServerState } from './persistence.js';
import {
  ClientsScreen,
  EntriesScreen,
  InvoicesScreen,
  ReportsScreen,
  SettingsScreen,
  TodayScreen,
} from './screens.jsx';
import {
  additionalItemsSubtotal,
  entryAmount,
  entrySeconds,
  formatDate,
  formatDecimalHours,
  formatMoney,
  getBillingProfile,
  getClient,
  uid,
} from './utils.js';

const {
  Button,
  Icon,
  IconButton,
  Select,
  SidebarNav,
  Toast,
  ToastStack,
  Tooltip,
} = window.HoursDesignSystem_76f0a9;

const NAV_GROUPS = [
  {
    items: [
      { value: 'today', icon: 'Clock', label: 'Today' },
      { value: 'entries', icon: 'List', label: 'Entries' },
      { value: 'reports', icon: 'ChartNoAxesColumn', label: 'Reports' },
    ],
  },
  {
    label: 'Billing',
    items: [
      { value: 'clients', icon: 'Users', label: 'Clients' },
      { value: 'invoices', icon: 'FileText', label: 'Invoices' },
    ],
  },
];

const MOBILE_NAV = [
  { value: 'today', icon: 'Clock', label: 'Today' },
  { value: 'entries', icon: 'List', label: 'Entries' },
  { value: 'reports', icon: 'ChartNoAxesColumn', label: 'Reports' },
  { value: 'clients', icon: 'Users', label: 'Clients' },
  { value: 'invoices', icon: 'FileText', label: 'Invoices' },
];

const VALID_VIEWS = new Set(['today', 'entries', 'reports', 'clients', 'invoices', 'settings']);

function initialView() {
  const queryView = new URLSearchParams(window.location.search).get('view');
  if (VALID_VIEWS.has(queryView)) return queryView;
  try {
    const savedView = window.localStorage.getItem('hours:view');
    if (VALID_VIEWS.has(savedView)) return savedView;
  } catch {
    // Navigation still works when browser storage is unavailable.
  }
  return 'today';
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function TopBar({ title, meta, actions, onOpenMenu }) {
  return (
    <header className="topbar">
      <div className="topbar__identity">
        <IconButton className="topbar__menu" icon="Menu" label="Open navigation" onClick={onOpenMenu} />
        <div>
          <h1>{title}</h1>
          {meta ? <span>{meta}</span> : null}
        </div>
      </div>
      {actions ? <div className="topbar__actions">{actions}</div> : null}
    </header>
  );
}

function MobileNav({ view, onView }) {
  return (
    <nav className="mobile-nav" aria-label="Primary">
      {MOBILE_NAV.map((item) => (
        <button
          key={item.value}
          className={view === item.value ? 'mobile-nav__item mobile-nav__item--active' : 'mobile-nav__item'}
          onClick={() => onView(item.value)}
          aria-current={view === item.value ? 'page' : undefined}
        >
          <Icon name={item.icon} size={18} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function NavigationDrawer({ open, view, onView, onClose }) {
  if (!open) return null;
  return (
    <div className="nav-drawer" onClick={onClose}>
      <div className="nav-drawer__panel" onClick={(event) => event.stopPropagation()}>
        <SidebarNav
          groups={NAV_GROUPS}
          value={view}
          onChange={(next) => {
            onView(next);
            onClose();
          }}
          footer={
            <button
              className="settings-link"
              onClick={() => {
                onView('settings');
                onClose();
              }}
            >
              <Icon name="Settings" size={15} />
              <span>Settings</span>
            </button>
          }
        />
      </div>
    </div>
  );
}

export default function App() {
  const {
    data,
    setData,
    connection,
    connect,
    retry,
    signOut,
  } = useServerState();
  const [view, setView] = React.useState(initialView);
  const clients = data.clients;
  const entries = data.entries;
  const invoices = data.invoices;
  const settings = data.settings;
  const setSlice = React.useCallback((key, update) => {
    setData((current) => ({
      ...current,
      [key]: typeof update === 'function' ? update(current[key]) : update,
    }));
  }, [setData]);
  const setClients = React.useCallback((update) => setSlice('clients', update), [setSlice]);
  const setEntries = React.useCallback((update) => setSlice('entries', update), [setSlice]);
  const setInvoices = React.useCallback((update) => setSlice('invoices', update), [setSlice]);
  const setSettings = React.useCallback((update) => setSlice('settings', update), [setSlice]);
  const [timerDraft, setTimerDraft] = React.useState(() => ({
    task: '',
    projectKey: '',
  }));
  const [dialog, setDialog] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toastTimer = React.useRef();

  const flash = React.useCallback((message, actionLabel, onAction) => {
    window.clearTimeout(toastTimer.current);
    setToast({ message, actionLabel, onAction });
    toastTimer.current = window.setTimeout(() => setToast(null), actionLabel ? 5000 : 2800);
  }, []);

  React.useEffect(() => () => window.clearTimeout(toastTimer.current), []);
  React.useEffect(() => {
    try {
      window.localStorage.setItem('hours:view', view);
    } catch {
      // The URL still preserves the current screen.
    }
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    window.history.replaceState({ ...window.history.state, view }, '', url);
  }, [view]);
  React.useEffect(() => {
    const handlePopState = () => {
      const nextView = new URLSearchParams(window.location.search).get('view');
      if (VALID_VIEWS.has(nextView)) setView(nextView);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  React.useEffect(() => {
    if (connection.error && connection.status === 'ready') flash(connection.error);
  }, [connection.error, connection.status, flash]);
  React.useEffect(() => {
    const projectKeys = clients.flatMap((client) =>
      client.projects.map((project) => `${client.id}:${project.id}`),
    );
    setTimerDraft((current) => {
      if (projectKeys.includes(current.projectKey)) return current;
      return { ...current, projectKey: projectKeys[0] || '' };
    });
  }, [clients]);

  const running = entries.find((entry) => entry.running);
  const unbilledCount = entries.filter((entry) => entry.billable && !entry.invoiced).length;
  const openInvoices = invoices.filter((invoice) => ['pending', 'overdue'].includes(invoice.status));

  const navGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      if (item.value === 'entries') return { ...item, badge: unbilledCount || undefined };
      if (item.value === 'clients') return { ...item, badge: clients.length || undefined };
      if (item.value === 'invoices') return { ...item, badge: openInvoices.length || undefined };
      return item;
    }),
  }));

  const stopTimer = React.useCallback((silent = false) => {
    const active = entries.find((entry) => entry.running);
    if (!active) return;
    const seconds = entrySeconds(active);
    setEntries((current) => current.map((entry) => entry.id === active.id
      ? { ...entry, running: false, end: new Date().toISOString(), seconds }
      : entry));
    if (!silent) {
      const client = getClient(clients, active.clientId);
      flash(`Entry saved · ${formatDecimalHours(seconds)}h to ${client?.name || 'client'}`);
    }
  }, [clients, entries, flash, setEntries]);

  const startTimer = () => {
    if (running) return;
    if (!timerDraft.task.trim()) {
      flash('Name the task before starting the timer');
      return;
    }
    const [clientId, projectId] = timerDraft.projectKey.split(':');
    if (!clientId || !projectId) {
      flash('Add a client and project before starting the timer');
      return;
    }
    const next = {
      id: uid('entry'),
      clientId,
      projectId,
      task: timerDraft.task.trim(),
      description: '',
      start: new Date().toISOString(),
      end: null,
      seconds: 0,
      billable: settings.defaultBillable,
      invoiced: false,
      running: true,
    };
    setEntries((current) => [next, ...current]);
    flash('Timer started');
  };

  const resumeEntry = (entry) => {
    if (running) stopTimer(true);
    const resumed = {
      ...entry,
      id: uid('entry'),
      start: new Date().toISOString(),
      end: null,
      seconds: 0,
      invoiced: false,
      running: true,
    };
    setEntries((current) => [resumed, ...current.map((item) => item.running
      ? { ...item, running: false, end: new Date().toISOString(), seconds: entrySeconds(item) }
      : item)]);
    setView('today');
    flash(`Timer resumed · ${entry.task}`);
  };

  const saveEntry = (entry, { duplicated = false } = {}) => {
    const exists = entries.some((item) => item.id === entry.id);
    setEntries((current) => exists
      ? current.map((item) => item.id === entry.id ? entry : item)
      : [entry, ...current]);
    setDialog(null);
    const client = getClient(clients, entry.clientId);
    flash(`${duplicated ? 'Entry duplicated' : 'Entry saved'} · ${formatDecimalHours(entry.seconds)}h to ${client?.name}`);
  };

  const deleteEntry = (entry) => {
    setEntries((current) => current.filter((item) => item.id !== entry.id));
    flash(
      `Entry removed · ${entry.task}`,
      'Undo',
      () => {
        setEntries((current) => [entry, ...current]);
        setToast(null);
      },
    );
  };

  const saveClient = (client) => {
    const exists = clients.some((item) => item.id === client.id);
    setClients((current) => exists
      ? current.map((item) => item.id === client.id ? client : item)
      : [...current, client]);
    setDialog(null);
    flash(`Client saved · ${client.name}`);
  };

  const createInvoice = ({
    clientId,
    entryIds,
    additionalItems,
    billingProfileId,
    issued,
    due,
    showEntryDates,
  }) => {
    const client = getClient(clients, clientId);
    const billingProfile = getBillingProfile(settings, billingProfileId);
    const pickedEntries = entries.filter((entry) => entryIds.includes(entry.id));
    const timeSubtotal = pickedEntries.reduce((sum, entry) => sum + entryAmount(entry, clients), 0);
    const subtotal = timeSubtotal + additionalItemsSubtotal(additionalItems);
    const number = Math.max(
      Number(settings.nextInvoiceNumber) || 1,
      Math.max(0, ...invoices.map((invoice) => Number(invoice.number) || 0)) + 1,
    );
    const invoice = {
      id: uid('invoice'),
      number,
      clientId,
      entryIds,
      additionalItems,
      issued,
      due,
      showEntryDates,
      periodStart: [...pickedEntries].sort((a, b) => new Date(a.start) - new Date(b.start))[0]?.start || issued,
      periodEnd: [...pickedEntries].sort((a, b) => new Date(b.start) - new Date(a.start))[0]?.start || issued,
      status: 'draft',
      hours: pickedEntries.reduce((sum, entry) => sum + entrySeconds(entry), 0) / 3600,
      subtotal,
      billingProfileId: billingProfile?.id,
      billingProfile: billingProfile ? cloneData(billingProfile) : null,
      taxRate: Number(billingProfile?.taxRate) || 0,
    };
    invoice.total = invoice.subtotal + ((invoice.subtotal * invoice.taxRate) / 100);
    setData((current) => ({
      ...current,
      invoices: [invoice, ...current.invoices],
      entries: current.entries.map((entry) =>
        entryIds.includes(entry.id) ? { ...entry, invoiced: true } : entry,
      ),
      settings: {
        ...current.settings,
        nextInvoiceNumber: number + 1,
      },
    }));
    setDialog(null);
    setView('invoices');
    flash(`Draft #${number} created · ${formatMoney(invoice.total, client?.currency)}`);
  };

  const updateInvoice = ({
    id,
    clientId,
    entryIds,
    additionalItems,
    billingProfileId,
    issued,
    due,
    showEntryDates,
  }) => {
    const existing = invoices.find((invoice) => invoice.id === id);
    if (!existing || existing.status !== 'draft') return;
    const client = getClient(clients, clientId);
    const billingProfile = getBillingProfile(settings, billingProfileId);
    const pickedEntries = entries.filter((entry) => entryIds.includes(entry.id));
    const timeSubtotal = pickedEntries.reduce((sum, entry) => sum + entryAmount(entry, clients), 0);
    const subtotal = timeSubtotal + additionalItemsSubtotal(additionalItems);
    const taxRate = Number(billingProfile?.taxRate) || 0;
    const updatedInvoice = {
      ...existing,
      clientId,
      entryIds,
      additionalItems,
      issued,
      due,
      showEntryDates,
      periodStart: [...pickedEntries].sort((a, b) => new Date(a.start) - new Date(b.start))[0]?.start || issued,
      periodEnd: [...pickedEntries].sort((a, b) => new Date(b.start) - new Date(a.start))[0]?.start || issued,
      hours: pickedEntries.reduce((sum, entry) => sum + entrySeconds(entry), 0) / 3600,
      subtotal,
      billingProfileId: billingProfile?.id,
      billingProfile: billingProfile ? cloneData(billingProfile) : null,
      taxRate,
      total: subtotal + ((subtotal * taxRate) / 100),
    };
    const nextEntryIds = new Set(entryIds);
    setData((current) => {
      const otherInvoicedEntryIds = new Set(
        current.invoices
          .filter((invoice) => invoice.id !== id)
          .flatMap((invoice) => invoice.entryIds || []),
      );
      return {
        ...current,
        invoices: current.invoices.map((invoice) => invoice.id === id ? updatedInvoice : invoice),
        entries: current.entries.map((entry) => ({
          ...entry,
          invoiced: nextEntryIds.has(entry.id) || otherInvoicedEntryIds.has(entry.id),
        })),
      };
    });
    setDialog(null);
    flash(`Draft #${existing.number} updated · ${formatMoney(updatedInvoice.total, client?.currency)}`);
  };

  const setInvoiceStatus = (invoiceId, status) => {
    setInvoices((current) => current.map((invoice) => invoice.id === invoiceId ? { ...invoice, status } : invoice));
    const invoice = invoices.find((item) => item.id === invoiceId);
    const label = {
      draft: 'draft',
      pending: 'sent',
      overdue: 'overdue',
      paid: 'paid',
    }[status] || status;
    flash(`Invoice #${invoice?.number || ''} marked as ${label}`);
  };

  const deleteInvoice = (invoice) => {
    setData((current) => {
      const remainingInvoices = current.invoices.filter((item) => item.id !== invoice.id);
      const remainingInvoicedEntryIds = new Set(
        remainingInvoices.flatMap((item) => item.entryIds || []),
      );
      return {
        ...current,
        invoices: remainingInvoices,
        entries: current.entries.map((entry) => ({
          ...entry,
          invoiced: remainingInvoicedEntryIds.has(entry.id),
        })),
        settings: {
          ...current.settings,
          nextInvoiceNumber: Math.max(
            Number(current.settings.nextInvoiceNumber) || 1,
            Number(invoice.number) + 1,
          ),
        },
      };
    });
    setDialog(null);
    flash(
      `Invoice #${invoice.number} deleted`,
      'Undo',
      () => {
        setData((current) => ({
          ...current,
          invoices: [invoice, ...current.invoices],
          entries: current.entries.map((entry) => ({
            ...entry,
            invoiced: invoice.entryIds?.includes(entry.id) || entry.invoiced,
          })),
        }));
        setToast(null);
      },
    );
  };

  const resetData = () => {
    setData(createEmptyState());
    setDialog(null);
    setView('today');
    flash('Workspace cleared');
  };

  const titleMeta = {
    today: [
      formatDate(new Date(), { weekday: 'long', day: '2-digit', month: 'long' }),
      running ? `${formatDecimalHours(entrySeconds(running))}h today · timer running` : 'Ready to track',
    ],
    entries: ['Entries', `${entries.length} entries · ${unbilledCount} unbilled`],
    reports: ['Reports', 'Work and billing history'],
    clients: ['Clients', `${clients.length} clients · ${clients.reduce((sum, client) => sum + client.projects.length, 0)} projects`],
    invoices: ['Invoices', `${invoices.length} issued · ${openInvoices.length} open`],
    settings: ['Settings', `SQLite instance · ${connection.sync}`],
  };
  const [title, meta] = titleMeta[view];

  const actions = view === 'today'
    ? (
      <>
        <Select size="sm" aria-label="Dashboard range" options={['This week', 'Today', 'Last 7 days']} />
        <Button size="sm" icon="Plus" onClick={() => setDialog({ type: 'entry', entry: null })}>Add entry</Button>
      </>
    )
    : null;

  if (connection.status !== 'ready') {
    return (
      <ConnectionScreen
        status={connection.status}
        error={connection.error}
        onConnect={connect}
        onRetry={retry}
      />
    );
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SidebarNav
        groups={navGroups}
        value={view}
        onChange={setView}
        footer={
          <>
            <div id="entry-calendar-sidebar" className="sidebar-calendar-slot" />
            <div className="sidebar-footer">
              <span className="sidebar-storage">sqlite · {connection.sync}</span>
              <Tooltip label="Settings">
                <IconButton icon="Settings" size="sm" label="Settings" onClick={() => setView('settings')} />
              </Tooltip>
            </div>
          </>
        }
      />
      <main className="app-main" id="main-content">
        <TopBar title={title} meta={meta} actions={actions} onOpenMenu={() => setDrawerOpen(true)} />
        <div className="page-content">
          {view === 'today' ? (
            <TodayScreen
              clients={clients}
              entries={entries}
              timerDraft={timerDraft}
              setTimerDraft={setTimerDraft}
              onStart={startTimer}
              onStop={() => stopTimer()}
              onEdit={(entry) => setDialog({ type: 'entry', entry })}
              onResume={resumeEntry}
              onDelete={deleteEntry}
            />
          ) : null}
          {view === 'entries' ? (
            <EntriesScreen
              clients={clients}
              entries={entries}
              onAdd={(initialDate) => setDialog({ type: 'entry', entry: null, initialDate })}
              onDuplicate={(entry) => setDialog({ type: 'entry', entry, duplicate: true })}
              onEdit={(entry) => setDialog({ type: 'entry', entry })}
              onDelete={deleteEntry}
              onInvoice={(selectedIds) => setDialog({ type: 'invoice', selectedIds })}
            />
          ) : null}
          {view === 'clients' ? (
            <ClientsScreen
              clients={clients}
              entries={entries}
              onAdd={() => setDialog({ type: 'client', client: null })}
              onEdit={(client) => setDialog({ type: 'client', client })}
            />
          ) : null}
          {view === 'invoices' ? (
            <InvoicesScreen
              clients={clients}
              entries={entries}
              invoices={invoices}
              settings={settings}
              onCreate={(selectedIds = []) => setDialog({ type: 'invoice', selectedIds })}
              onStatus={setInvoiceStatus}
              onEdit={(invoice) => setDialog({ type: 'invoice', invoice })}
              onDelete={(invoice) => setDialog({ type: 'delete-invoice', invoice })}
            />
          ) : null}
          {view === 'reports' ? <ReportsScreen clients={clients} entries={entries} /> : null}
          {view === 'settings' ? (
            <SettingsScreen
              settings={settings}
              setSettings={setSettings}
              connection={connection}
              onRetry={retry}
              onSignOut={signOut}
              onReset={() => setDialog({ type: 'reset' })}
            />
          ) : null}
        </div>
      </main>
      <MobileNav view={view} onView={setView} />
      <NavigationDrawer
        open={drawerOpen}
        view={view}
        onView={setView}
        onClose={() => setDrawerOpen(false)}
      />

      {dialog?.type === 'entry' ? (
        <EntryDialog
          entry={dialog.entry}
          duplicate={dialog.duplicate}
          initialDate={dialog.initialDate}
          clients={clients}
          entries={entries}
          defaultBillable={settings.defaultBillable}
          onClose={() => setDialog(null)}
          onSave={saveEntry}
        />
      ) : null}
      {dialog?.type === 'client' ? (
        <ClientDialog
          client={dialog.client}
          clients={clients}
          defaultCurrency={settings.currency}
          defaultRate={settings.defaultRate ?? 100}
          onClose={() => setDialog(null)}
          onSave={saveClient}
        />
      ) : null}
      {dialog?.type === 'invoice' ? (
        <InvoiceDialog
          clients={clients}
          entries={entries}
          settings={settings}
          invoice={dialog.invoice}
          selectedIds={dialog.selectedIds}
          onClose={() => setDialog(null)}
          onSubmit={dialog.invoice ? updateInvoice : createInvoice}
        />
      ) : null}
      {dialog?.type === 'delete-invoice' ? (
        <DeleteInvoiceDialog
          invoice={dialog.invoice}
          entryCount={dialog.invoice.entryIds?.length || 0}
          onClose={() => setDialog(null)}
          onConfirm={() => deleteInvoice(dialog.invoice)}
        />
      ) : null}
      {dialog?.type === 'reset' ? <ResetDialog onClose={() => setDialog(null)} onConfirm={resetData} /> : null}

      {toast ? (
        <ToastStack>
          <Toast
            icon="Check"
            actionLabel={toast.actionLabel}
            onAction={toast.onAction}
          >
            {toast.message}
          </Toast>
        </ToastStack>
      ) : null}
    </div>
  );
}
