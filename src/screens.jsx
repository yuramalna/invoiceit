import React from 'react';
import InvoiceDocument from './InvoiceDocument.jsx';
import Pagination, { pageCount, pageSlice } from './Pagination.jsx';
import { CURRENCY_OPTIONS } from './data.js';
import {
  currencySymbol,
  csvCell,
  dateKey,
  downloadFile,
  entryAmount,
  entrySeconds,
  formatDate,
  formatDecimalHours,
  formatMoney,
  formatTime,
  getBillingProfile,
  getClient,
  getProject,
  isSameLocalDay,
  startOfWeek,
  uid,
} from './utils.js';

const {
  Badge,
  Button,
  Card,
  Checkbox,
  DataTable,
  Duration,
  EmptyState,
  Field,
  IconButton,
  Input,
  ProgressBar,
  Select,
  StatTile,
  Switch,
  Tabs,
  Tag,
  TimeEntryRow,
  Timer,
} = window.HoursDesignSystem_76f0a9;

function viewEntry(entry, clients) {
  const client = getClient(clients, entry.clientId);
  const project = getProject(clients, entry.clientId, entry.projectId);
  const seconds = entrySeconds(entry);
  return {
    ...entry,
    client: client?.name || 'Unknown client',
    project: project?.name || 'Unknown project',
    dot: client?.color || 'var(--client-6)',
    seconds,
    amount: entry.billable ? formatMoney((seconds / 3600) * (project?.rate || 0), client?.currency) : null,
    span: `${formatTime(entry.start)} – ${entry.running ? 'now' : formatTime(entry.end)}`,
  };
}

function dayLabel(dateValue, now = new Date()) {
  if (isSameLocalDay(dateValue, now)) {
    return `Today · ${formatDate(dateValue, { weekday: 'short', day: '2-digit', month: 'short' })}`;
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (isSameLocalDay(dateValue, yesterday)) {
    return `Yesterday · ${formatDate(dateValue, { weekday: 'short', day: '2-digit', month: 'short' })}`;
  }
  return formatDate(dateValue, { weekday: 'short', day: '2-digit', month: 'short' });
}

function groupEntries(entries) {
  const groups = new Map();
  [...entries]
    .sort((a, b) => new Date(b.start) - new Date(a.start))
    .forEach((entry) => {
      const key = dateKey(entry.start);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(entry);
    });
  return [...groups.entries()].map(([key, items]) => ({ key, day: dayLabel(items[0].start), items }));
}

function WeekBars({ entries }) {
  const start = startOfWeek();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(date.getDate() + index);
    const seconds = entries
      .filter((entry) => isSameLocalDay(entry.start, date))
      .reduce((sum, entry) => sum + entrySeconds(entry), 0);
    return {
      label: new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(date).slice(0, 3),
      hours: seconds / 3600,
      today: isSameLocalDay(date, new Date()),
    };
  });
  const max = Math.max(8, ...days.map((day) => day.hours));

  return (
    <div className="week-bars" aria-label="Hours this week">
      {days.map((day) => (
        <div className="week-bars__day" key={day.label}>
          <span className="week-bars__value">{day.hours ? day.hours.toFixed(1) : ''}</span>
          <div
            className={day.today ? 'week-bars__bar week-bars__bar--today' : 'week-bars__bar'}
            style={{ height: `${Math.max(2, (day.hours / max) * 76)}px` }}
          />
          <span>{day.label}</span>
        </div>
      ))}
    </div>
  );
}

function EntryGroups({ entries, clients, onEdit, onResume, onDelete }) {
  const groups = groupEntries(entries);

  if (!groups.length) {
    return (
      <EmptyState
        icon="Clock"
        title="No time logged yet"
        description="Start a timer, or add an entry by hand."
      />
    );
  }

  return (
    <div className="entry-groups">
      {groups.map((group) => (
        <section className="entry-group" key={group.key}>
          <header>
            <span className="label">{group.day}</span>
            <Duration
              seconds={group.items.reduce((sum, entry) => sum + entrySeconds(entry), 0)}
              format="decimal"
              size="sm"
              tone="muted"
            />
          </header>
          <div className="entry-ledger">
            {group.items.map((entry) => {
              const item = viewEntry(entry, clients);
              return (
                <TimeEntryRow
                  key={entry.id}
                  {...item}
                  dotColor={item.dot}
                  onEdit={() => onEdit(entry)}
                  onResume={entry.running ? undefined : () => onResume(entry)}
                  onDelete={() => onDelete(entry)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export function TodayScreen({
  clients,
  entries,
  timerDraft,
  setTimerDraft,
  onStart,
  onStop,
  onEdit,
  onResume,
  onDelete,
}) {
  const running = entries.find((entry) => entry.running);
  const today = entries.filter((entry) => isSameLocalDay(entry.start, new Date()));
  const weekStart = startOfWeek();
  const week = entries.filter((entry) => new Date(entry.start) >= weekStart);
  const unbilled = entries
    .filter((entry) => entry.billable && !entry.invoiced)
    .reduce((sum, entry) => sum + entryAmount(entry, clients), 0);
  const projectOptions = clients.flatMap((client) =>
    client.projects.map((project) => ({
      value: `${client.id}:${project.id}`,
      label: `${client.name} · ${project.name}`,
    })),
  );
  const runningKey = running ? `${running.clientId}:${running.projectId}` : timerDraft.projectKey;
  const runningClient = running ? getClient(clients, running.clientId) : getClient(clients, runningKey?.split(':')[0]);

  const budgetRows = clients.slice(0, 4).map((client) => {
    const used = entries
      .filter((entry) => entry.clientId === client.id && new Date(entry.start).getMonth() === new Date().getMonth())
      .reduce((sum, entry) => sum + entrySeconds(entry) / 3600, 0);
    const max = client.projects.reduce((sum, project) => sum + (project.budget || 0), 0);
    return { ...client, used, max };
  }).filter((client) => client.max > 0);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">
        <Timer
          running={Boolean(running)}
          seconds={running ? entrySeconds(running) : 0}
          task={running?.task ?? timerDraft.task}
          onTaskChange={(task) => {
            if (!running) setTimerDraft((value) => ({ ...value, task }));
          }}
          projects={projectOptions}
          project={runningKey}
          onProjectChange={(projectKey) => {
            if (!running) setTimerDraft((value) => ({ ...value, projectKey }));
          }}
          dotColor={runningClient?.color}
          onStart={onStart}
          onStop={onStop}
        />

        <div className="stats-row stats-row--three">
          <StatTile
            label="Today"
            value={formatDecimalHours(today.reduce((sum, entry) => sum + entrySeconds(entry), 0))}
            unit="h"
            note={`${today.filter((entry) => entry.billable).length} of ${today.length} entries billable`}
          />
          <StatTile
            label="This week"
            value={formatDecimalHours(week.reduce((sum, entry) => sum + entrySeconds(entry), 0))}
            unit="h"
            note={`${week.length} entries`}
          />
          <StatTile
            label="Unbilled"
            value={formatMoney(unbilled, 'USD').replace('.00', '')}
            note={`across ${new Set(entries.filter((entry) => entry.billable && !entry.invoiced).map((entry) => entry.clientId)).size} clients`}
          />
        </div>

        <EntryGroups
          entries={entries.slice(0, 12)}
          clients={clients}
          onEdit={onEdit}
          onResume={onResume}
          onDelete={onDelete}
        />
      </div>

      <aside className="dashboard-rail">
        <Card eyebrow="Week to date" title={`${formatDecimalHours(week.reduce((sum, entry) => sum + entrySeconds(entry), 0))} hours`}>
          <WeekBars entries={entries} />
        </Card>
        <Card eyebrow="Hour limits" title="This month">
          <div className="progress-stack">
            {budgetRows.map((client) => (
              <ProgressBar
                key={client.id}
                value={client.used}
                max={client.max}
                color={client.color}
                left={client.name}
                right={<><b>{client.used.toFixed(1)}</b> / {client.max}h</>}
              />
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}

export function EntriesScreen({ clients, entries, onAdd, onEdit, onDelete, onInvoice }) {
  const [tab, setTab] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [clientFilter, setClientFilter] = React.useState('all');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);

  const filtered = entries
    .filter((entry) => {
      if (tab === 'unbilled' && (!entry.billable || entry.invoiced)) return false;
      if (tab === 'invoiced' && !entry.invoiced) return false;
      if (clientFilter !== 'all' && entry.clientId !== clientFilter) return false;
      const client = getClient(clients, entry.clientId);
      return `${entry.task} ${entry.description} ${client?.name}`.toLowerCase().includes(query.toLowerCase());
    })
    .sort((a, b) => new Date(b.start) - new Date(a.start));

  const totalPages = pageCount(filtered.length, pageSize);
  const pagedEntries = pageSlice(filtered, Math.min(page, totalPages), pageSize);
  React.useEffect(() => {
    setPage(1);
  }, [tab, query, clientFilter, pageSize]);
  React.useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const rows = [];
  groupEntries(pagedEntries).forEach((group) => {
    rows.push({ __group: group.day });
    group.items.forEach((entry) => rows.push(viewEntry(entry, clients)));
  });

  const columns = [
    { key: 'pick', label: '', width: 46 },
    { key: 'task', label: 'Task' },
    { key: 'client', label: 'Client', width: 210 },
    { key: 'span', label: 'Span', width: 130 },
    { key: 'seconds', label: 'Hours', numeric: true, width: 80 },
    { key: 'amount', label: 'Amount', numeric: true, width: 110 },
    { key: 'actions', label: '', width: 84 },
  ];
  const renderCell = (column, row) => {
    if (column.key === 'pick') {
      return (
        <Checkbox
          checked={selected.includes(row.id)}
          aria-label={`Select ${row.task}`}
          onChange={(event) => setSelected((current) =>
            event.target.checked ? [...current, row.id] : current.filter((id) => id !== row.id),
          )}
        />
      );
    }
    if (column.key === 'task') {
      return (
        <span className="table-task">
          <span className="table-task__title" title={row.task}>{row.task}</span>
          {row.running ? <Badge tone="live" dot pulse>Running</Badge> : null}
          {!row.billable ? <Badge tone="draft">Non-billable</Badge> : null}
        </span>
      );
    }
    if (column.key === 'client') {
      return (
        <span className="client-cell" title={`${row.client} · ${row.project}`}>
          <span className="client-dot" style={{ background: row.dot }} />
          <span className="client-cell__copy">
            <strong>{row.client}</strong>
            <small>{row.project}</small>
          </span>
        </span>
      );
    }
    if (column.key === 'seconds') return <Duration seconds={row.seconds} format="decimal" size="sm" />;
    if (column.key === 'actions') {
      return (
        <span className="row-actions">
          <IconButton icon="Pencil" size="sm" label={`Edit ${row.task}`} onClick={() => onEdit(row)} />
          <IconButton icon="Trash2" size="sm" tone="danger" label={`Delete ${row.task}`} onClick={() => onDelete(row)} />
        </span>
      );
    }
    return row[column.key] || <span className="muted">—</span>;
  };

  const exportCsv = () => {
    const header = ['Date', 'Client', 'Project', 'Task', 'Description', 'Start', 'End', 'Hours', 'Rate', 'Amount'];
    const body = filtered.map((entry) => {
      const client = getClient(clients, entry.clientId);
      const project = getProject(clients, entry.clientId, entry.projectId);
      return [
        dateKey(entry.start),
        client?.name,
        project?.name,
        entry.task,
        entry.description,
        formatTime(entry.start),
        entry.running ? '' : formatTime(entry.end),
        formatDecimalHours(entrySeconds(entry)),
        project?.rate,
        entryAmount(entry, clients).toFixed(2),
      ].map(csvCell).join(',');
    });
    downloadFile(`hours-entries-${dateKey(new Date())}.csv`, [header.map(csvCell).join(','), ...body].join('\n'), 'text/csv;charset=utf-8');
  };

  return (
    <div className="screen-stack">
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'all', label: 'All', count: entries.length },
          { value: 'unbilled', label: 'Unbilled', count: entries.filter((entry) => entry.billable && !entry.invoiced).length },
          { value: 'invoiced', label: 'Invoiced', count: entries.filter((entry) => entry.invoiced).length },
        ]}
      />
      <div className="filter-bar">
        <div className="search-field">
          <Input
            icon="Search"
            aria-label="Search tasks and notes"
            placeholder="Search tasks and notes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Select
          aria-label="Filter by client"
          value={clientFilter}
          onChange={(event) => setClientFilter(event.target.value)}
          options={[{ value: 'all', label: 'All clients' }, ...clients.map((client) => ({ value: client.id, label: client.name }))]}
        />
        <div className="filter-bar__actions">
          <Button size="sm" icon="Download" onClick={exportCsv}>Export CSV</Button>
          <Button size="sm" variant="secondary" icon="Plus" onClick={onAdd}>Add entry</Button>
          <Button
            size="sm"
            variant="primary"
            icon="Receipt"
            disabled={!selected.length}
            onClick={() => onInvoice(selected)}
          >
            Invoice {selected.length ? selected.length : 'selection'}
          </Button>
        </div>
      </div>
      <div className="paginated-list">
        <div className="table-scroll entries-table">
          <Card flush>
            <DataTable
              columns={columns}
              rows={rows}
              renderCell={renderCell}
              empty="No entries match these filters"
            />
          </Card>
        </div>
        <Pagination
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          label="entries"
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}

export function ClientsScreen({ clients, entries, onAdd, onEdit }) {
  const columns = [
    { key: 'name', label: 'Client' },
    { key: 'projects', label: 'Projects' },
    { key: 'rate', label: 'Rates', numeric: true, width: 110 },
    { key: 'month', label: 'This month', numeric: true, width: 110 },
    { key: 'unbilled', label: 'Unbilled', numeric: true, width: 120 },
    { key: 'actions', label: '', width: 52 },
  ];
  const rows = clients.map((client) => {
    const clientEntries = entries.filter((entry) => entry.clientId === client.id);
    const monthSeconds = clientEntries
      .filter((entry) => new Date(entry.start).getMonth() === new Date().getMonth())
      .reduce((sum, entry) => sum + entrySeconds(entry), 0);
    const unbilled = clientEntries
      .filter((entry) => entry.billable && !entry.invoiced)
      .reduce((sum, entry) => sum + entryAmount(entry, clients), 0);
    return { ...client, monthSeconds, unbilled };
  });
  const renderCell = (column, row) => {
    if (column.key === 'name') {
      return (
        <span className="client-cell">
          <span className="client-dot" style={{ background: row.color }} />
          <strong>{row.name}</strong>
        </span>
      );
    }
    if (column.key === 'projects') {
      return <span className="tag-list">{row.projects.map((project) => <Tag key={project.id}>{project.name}</Tag>)}</span>;
    }
    if (column.key === 'rate') {
      const rates = [...new Set(row.projects.map((project) => project.rate))];
      return rates.length === 1 ? formatMoney(rates[0], row.currency) : `${formatMoney(Math.min(...rates), row.currency)}+`;
    }
    if (column.key === 'month') return formatDecimalHours(row.monthSeconds);
    if (column.key === 'unbilled') return row.unbilled ? formatMoney(row.unbilled, row.currency) : <span className="muted">—</span>;
    if (column.key === 'actions') return <IconButton icon="Pencil" size="sm" label={`Edit ${row.name}`} onClick={() => onEdit(row)} />;
    return row[column.key];
  };

  const budgetRows = rows.map((client) => {
    const used = client.monthSeconds / 3600;
    const max = client.projects.reduce((sum, project) => sum + (project.budget || 0), 0);
    return { ...client, used, max };
  }).filter((client) => client.max > 0);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main table-scroll">
        <Card
          flush
          eyebrow={`${clients.length} clients · ${clients.reduce((sum, client) => sum + client.projects.length, 0)} projects`}
          title="Rates and retainers"
          action={<Button size="sm" variant="primary" icon="Plus" onClick={onAdd}>New client</Button>}
        >
          <DataTable columns={columns} rows={rows} renderCell={renderCell} />
        </Card>
      </div>
      <aside className="dashboard-rail">
        <Card eyebrow="Monthly hour limits" title={formatDate(new Date(), { month: 'long' })}>
          <div className="progress-stack">
            {budgetRows.map((client) => (
              <ProgressBar
                key={client.id}
                value={client.used}
                max={client.max}
                color={client.color}
                left={client.name}
                right={<><b>{client.used.toFixed(1)}</b> / {client.max}h</>}
              />
            ))}
          </div>
        </Card>
        <div className="ledger-note">
          <span className="label">How limits work</span>
          <p>An hour limit is optional. Use it for retainers or capped engagements; leave it blank for open-ended projects.</p>
        </div>
      </aside>
    </div>
  );
}

export function InvoicesScreen({
  clients,
  entries,
  invoices,
  settings,
  onCreate,
  onStatus,
  onEdit,
  onDelete,
}) {
  const [tab, setTab] = React.useState('all');
  const [selectedId, setSelectedId] = React.useState(invoices[0]?.id);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  React.useEffect(() => {
    if (!invoices.some((invoice) => invoice.id === selectedId)) setSelectedId(invoices[0]?.id);
  }, [invoices, selectedId]);

  const filtered = invoices.filter((invoice) => {
    if (tab === 'open') return invoice.status === 'pending' || invoice.status === 'overdue';
    if (tab === 'overdue') return invoice.status === 'overdue';
    if (tab === 'drafts') return invoice.status === 'draft';
    return true;
  });
  const totalPages = pageCount(filtered.length, pageSize);
  const pagedInvoices = pageSlice(filtered, Math.min(page, totalPages), pageSize);
  const selected = pagedInvoices.find((invoice) => invoice.id === selectedId)
    || pagedInvoices[0]
    || null;
  React.useEffect(() => {
    setPage(1);
  }, [tab, pageSize]);
  React.useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);
  const columns = [
    { key: 'number', label: 'No.', width: 76 },
    { key: 'client', label: 'Client' },
    { key: 'issued', label: 'Issued', width: 116 },
    { key: 'due', label: 'Due', width: 116 },
    { key: 'hours', label: 'Hours', numeric: true, width: 78 },
    { key: 'total', label: 'Total', numeric: true, width: 112 },
    { key: 'status', label: 'Status', width: 120 },
  ];
  const rows = pagedInvoices.map((invoice) => {
    const client = getClient(clients, invoice.clientId);
    const invoiceEntries = entries.filter((entry) => invoice.entryIds?.includes(entry.id));
    const hours = invoiceEntries.length
      ? invoiceEntries.reduce((sum, entry) => sum + entrySeconds(entry), 0) / 3600
      : invoice.hours || 0;
    const subtotal = invoiceEntries.length
      ? invoiceEntries.reduce((sum, entry) => sum + entryAmount(entry, clients), 0)
      : invoice.subtotal || 0;
    const billingProfile = invoice.billingProfile
      || getBillingProfile(settings, invoice.billingProfileId);
    const taxRate = Number(invoice.taxRate ?? billingProfile?.taxRate) || 0;
    const total = invoice.total ?? subtotal + ((subtotal * taxRate) / 100);
    return { ...invoice, client, hours, subtotal, total };
  });
  const renderCell = (column, row) => {
    if (column.key === 'number') {
      return <span className="invoice-link">#{row.number}</span>;
    }
    if (column.key === 'client') {
      return (
        <span className="client-cell">
          <span className="client-dot" style={{ background: row.client?.color }} />
          <span>{row.client?.name}</span>
        </span>
      );
    }
    if (column.key === 'issued' || column.key === 'due') return formatDate(row[column.key], { day: '2-digit', month: 'short', year: 'numeric' });
    if (column.key === 'hours') return Number(row.hours).toFixed(2);
    if (column.key === 'total') return formatMoney(row.total, row.client?.currency);
    if (column.key === 'status') {
      const label = row.status === 'pending' ? 'Sent' : row.status.charAt(0).toUpperCase() + row.status.slice(1);
      return <Badge tone={row.status} dot={row.status !== 'draft'}>{label}</Badge>;
    }
    return row[column.key];
  };

  const exportAll = () => {
    downloadFile(`hours-invoices-${dateKey(new Date())}.json`, JSON.stringify(invoices, null, 2), 'application/json');
  };

  return (
    <div className={selected ? 'invoice-layout' : 'invoice-layout invoice-layout--empty'}>
      <div className="invoice-list">
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'all', label: 'All', count: invoices.length },
            { value: 'open', label: 'Open', count: invoices.filter((invoice) => ['pending', 'overdue'].includes(invoice.status)).length },
            { value: 'overdue', label: 'Overdue', count: invoices.filter((invoice) => invoice.status === 'overdue').length },
            { value: 'drafts', label: 'Drafts', count: invoices.filter((invoice) => invoice.status === 'draft').length },
          ]}
        />
        <div className="filter-bar">
          <Button size="sm" icon="Download" onClick={exportAll}>Export all</Button>
          <Button size="sm" variant="primary" icon="Receipt" onClick={() => onCreate()}>
            New invoice
          </Button>
        </div>
        <div className="paginated-list">
          <div className="table-scroll">
            <Card flush>
              <table className="hrs-table hrs-table--hover invoice-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      style={{ width: column.width, textAlign: column.numeric ? 'right' : 'left' }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length ? rows.map((row) => {
                  const isSelected = row.id === selected?.id;
                  const selectRow = () => setSelectedId(row.id);
                  return (
                    <tr
                      key={row.id}
                      className="invoice-table__row"
                      tabIndex={0}
                      aria-current={isSelected ? 'true' : undefined}
                      aria-label={`Preview invoice #${row.number} for ${row.client?.name || 'client'}`}
                      onClick={selectRow}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          selectRow();
                        }
                      }}
                    >
                      {columns.map((column) => (
                        <td key={column.key} className={column.numeric ? 'hrs-table__num' : ''}>
                          {renderCell(column, row)}
                        </td>
                      ))}
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={columns.length} className="invoice-table__empty">
                      No invoices in this view
                    </td>
                  </tr>
                )}
              </tbody>
              </table>
            </Card>
          </div>
          <Pagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            label="invoices"
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[10, 20, 50]}
          />
        </div>
      </div>
      {selected ? (
        <aside className="invoice-preview">
          <InvoiceDocument
            invoice={selected}
            entries={entries}
            clients={clients}
            settings={settings}
            onStatusChange={(status) => onStatus(selected.id, status)}
            onEdit={() => onEdit(selected)}
            onDelete={() => onDelete(selected)}
            onPrint={() => window.print()}
          />
        </aside>
      ) : null}
    </div>
  );
}

function useStoredReportValue(key, fallback) {
  const [value, setValue] = React.useState(() => {
    try {
      return window.localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  });
  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Report controls still work when browser storage is unavailable.
    }
  }, [key, value]);
  return [value, setValue];
}

function dateFromKey(value) {
  return new Date(`${value}T00:00:00`);
}

function addDays(value, days) {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date;
}

function reportDateRange(preset, customFrom, customTo) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let from = new Date(today);
  let to = new Date(today);

  if (preset === 'week') {
    from = startOfWeek(today);
  } else if (preset === 'month') {
    from.setDate(1);
  } else if (preset === '30days') {
    from = addDays(today, -29);
  } else {
    from = customFrom ? dateFromKey(customFrom) : new Date(today);
    to = customTo ? dateFromKey(customTo) : new Date(today);
  }

  if (from > to) [from, to] = [to, from];
  return {
    from,
    to,
    fromKey: dateKey(from),
    toKey: dateKey(to),
  };
}

function reportRangeLabel(range) {
  if (range.fromKey === range.toKey) {
    return formatDate(range.from, { day: '2-digit', month: 'short', year: 'numeric' });
  }
  const sameYear = range.from.getFullYear() === range.to.getFullYear();
  return `${formatDate(range.from, { day: '2-digit', month: 'short', year: sameYear ? undefined : 'numeric' })} – ${formatDate(range.to, { day: '2-digit', month: 'short', year: 'numeric' })}`;
}

function reportBuckets(entries, range) {
  const dayCount = Math.round((range.to - range.from) / (24 * 60 * 60 * 1000)) + 1;
  const buckets = [];

  if (dayCount <= 31) {
    for (let index = 0; index < dayCount; index += 1) {
      const start = addDays(range.from, index);
      buckets.push({
        key: dateKey(start),
        start,
        end: start,
        label: formatDate(start, { day: '2-digit', month: dayCount <= 10 ? 'short' : undefined }),
        fullLabel: formatDate(start, { weekday: 'short', day: '2-digit', month: 'short' }),
      });
    }
  } else if (dayCount <= 180) {
    let start = startOfWeek(range.from);
    while (start <= range.to) {
      const end = addDays(start, 6);
      buckets.push({
        key: dateKey(start),
        start,
        end,
        label: formatDate(start, { day: '2-digit', month: 'short' }),
        fullLabel: `Week of ${formatDate(start, { day: '2-digit', month: 'short', year: 'numeric' })}`,
      });
      start = addDays(start, 7);
    }
  } else {
    let start = new Date(range.from.getFullYear(), range.from.getMonth(), 1);
    while (start <= range.to) {
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
      buckets.push({
        key: `${start.getFullYear()}-${start.getMonth()}`,
        start,
        end,
        label: formatDate(start, { month: 'short' }),
        fullLabel: formatDate(start, { month: 'long', year: 'numeric' }),
      });
      start = new Date(start.getFullYear(), start.getMonth() + 1, 1);
    }
  }

  return buckets.map((bucket) => {
    const items = entries.filter((entry) => {
      const key = dateKey(entry.start);
      return key >= dateKey(bucket.start) && key <= dateKey(bucket.end);
    });
    return {
      ...bucket,
      hours: items.reduce((sum, entry) => sum + entrySeconds(entry), 0) / 3600,
      billableHours: items
        .filter((entry) => entry.billable)
        .reduce((sum, entry) => sum + entrySeconds(entry), 0) / 3600,
    };
  });
}

function reportMoneySummary(entries, clients) {
  const totals = new Map();
  entries.forEach((entry) => {
    if (!entry.billable) return;
    const currency = getClient(clients, entry.clientId)?.currency || 'USD';
    totals.set(currency, (totals.get(currency) || 0) + entryAmount(entry, clients));
  });
  if (!totals.size) return '—';
  return [...totals.entries()]
    .map(([currency, amount]) => formatMoney(amount, currency).replace('.00', ''))
    .join(' · ');
}

function ReportBarChart({ points, metric }) {
  const valueKey = metric === 'billable' ? 'billableHours' : 'hours';
  const values = points.map((point) => point[valueKey]);
  const max = Math.max(1, ...values);
  const labelEvery = Math.max(1, Math.ceil(points.length / 8));
  const chartLabel = metric === 'billable' ? 'Billable hours' : 'Tracked hours';

  return (
    <div
      className="report-chart"
      role="img"
      aria-label={`${chartLabel} over ${points.length} reporting periods`}
      style={{ '--report-points': points.length }}
    >
      <div className="report-chart__axis" aria-hidden="true">
        {[max, max * .67, max * .33, 0].map((value, index) => (
          <span key={index}>{value.toFixed(value >= 10 ? 0 : 1)}h</span>
        ))}
      </div>
      <div className="report-chart__plot">
        <div className="report-chart__grid" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        {points.map((point, index) => {
          const value = point[valueKey];
          const showLabel = index % labelEvery === 0 || index === points.length - 1;
          return (
            <div
              className="report-chart__column"
              key={point.key}
              title={`${point.fullLabel}: ${value.toFixed(2)} hours`}
            >
              <div className="report-chart__bar-slot">
                <span
                  className={value ? 'report-chart__bar' : 'report-chart__bar report-chart__bar--empty'}
                  style={{ height: `${Math.max(value ? 3 : 1, (value / max) * 100)}%` }}
                />
              </div>
              <span className={showLabel ? 'report-chart__label' : 'report-chart__label report-chart__label--hidden'}>
                {point.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReportBreakdown({ rows, totalSeconds }) {
  return (
    <div className="report-breakdown">
      {rows.map((row) => {
        const share = totalSeconds ? (row.seconds / totalSeconds) * 100 : 0;
        return (
          <div className="report-breakdown__row" key={row.id}>
            <div className="report-breakdown__identity">
              <span className="client-dot" style={{ background: row.color }} />
              <span>
                <strong>{row.name}</strong>
                {row.context ? <small>{row.context}</small> : null}
              </span>
            </div>
            <div className="report-breakdown__bar" aria-hidden="true">
              <span style={{ width: `${Math.max(share ? 2 : 0, share)}%`, background: row.color }} />
            </div>
            <div className="report-breakdown__numbers">
              <strong>{formatDecimalHours(row.seconds)}h</strong>
              <span>{share.toFixed(0)}% · {formatMoney(row.amount, row.currency)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ReportsScreen({ clients, entries }) {
  const todayKey = dateKey(new Date());
  const monthStart = new Date();
  monthStart.setDate(1);
  const [template, setTemplate] = useStoredReportValue('hours:report-template', 'overview');
  const [period, setPeriod] = useStoredReportValue('hours:report-period', 'month');
  const [metric, setMetric] = useStoredReportValue('hours:report-metric', 'hours');
  const [clientId, setClientId] = useStoredReportValue('hours:report-client', 'all');
  const [customFrom, setCustomFrom] = useStoredReportValue('hours:report-from', dateKey(monthStart));
  const [customTo, setCustomTo] = useStoredReportValue('hours:report-to', todayKey);
  const activeClientId = clients.some((client) => client.id === clientId) ? clientId : 'all';
  const range = reportDateRange(period, customFrom, customTo);
  const completed = entries
    .filter((entry) => !entry.running)
    .filter((entry) => {
      const key = dateKey(entry.start);
      return key >= range.fromKey && key <= range.toKey;
    })
    .filter((entry) => activeClientId === 'all' || entry.clientId === activeClientId)
    .sort((a, b) => new Date(b.start) - new Date(a.start));
  const totalSeconds = completed.reduce((sum, entry) => sum + entrySeconds(entry), 0);
  const billableSeconds = completed
    .filter((entry) => entry.billable)
    .reduce((sum, entry) => sum + entrySeconds(entry), 0);
  const activeClientCount = new Set(completed.map((entry) => entry.clientId)).size;
  const buckets = reportBuckets(completed, range);
  const rangeLabel = reportRangeLabel(range);

  const clientRows = clients
    .map((client) => {
      const clientEntries = completed.filter((entry) => entry.clientId === client.id);
      return {
        id: client.id,
        name: client.name,
        color: client.color,
        currency: client.currency,
        seconds: clientEntries.reduce((sum, entry) => sum + entrySeconds(entry), 0),
        amount: clientEntries.reduce((sum, entry) => sum + entryAmount(entry, clients), 0),
      };
    })
    .filter((row) => row.seconds > 0)
    .sort((a, b) => b.seconds - a.seconds);

  const projectRows = clients
    .flatMap((client) => client.projects.map((project) => {
      const projectEntries = completed.filter(
        (entry) => entry.clientId === client.id && entry.projectId === project.id,
      );
      return {
        id: `${client.id}:${project.id}`,
        name: project.name,
        context: client.name,
        color: client.color,
        currency: client.currency,
        seconds: projectEntries.reduce((sum, entry) => sum + entrySeconds(entry), 0),
        amount: projectEntries.reduce((sum, entry) => sum + entryAmount(entry, clients), 0),
      };
    }))
    .filter((row) => row.seconds > 0)
    .sort((a, b) => b.seconds - a.seconds);

  const detailRows = completed.map((entry) => {
    const client = getClient(clients, entry.clientId);
    const project = getProject(clients, entry.clientId, entry.projectId);
    return {
      id: entry.id,
      date: entry.start,
      task: entry.task,
      client: client?.name || 'Unknown client',
      project: project?.name || 'Unknown project',
      seconds: entrySeconds(entry),
      amount: entry.billable ? entryAmount(entry, clients) : null,
      currency: client?.currency,
    };
  });
  const detailColumns = [
    { key: 'date', label: 'Date', width: 110 },
    { key: 'task', label: 'Work' },
    { key: 'client', label: 'Client', width: 170 },
    { key: 'project', label: 'Project', width: 170 },
    { key: 'seconds', label: 'Hours', numeric: true, width: 82 },
    { key: 'amount', label: 'Value', numeric: true, width: 110 },
  ];
  const renderDetailCell = (column, row) => {
    if (column.key === 'date') return formatDate(row.date, { day: '2-digit', month: 'short', year: 'numeric' });
    if (column.key === 'task') return <strong className="report-task">{row.task}</strong>;
    if (column.key === 'seconds') return formatDecimalHours(row.seconds);
    if (column.key === 'amount') return row.amount == null ? <span className="muted">—</span> : formatMoney(row.amount, row.currency);
    return row[column.key];
  };

  const exportReport = () => {
    const header = ['Date', 'Client', 'Project', 'Task', 'Hours', 'Billable value', 'Currency'];
    const lines = detailRows.map((row) => [
      dateKey(row.date),
      row.client,
      row.project,
      row.task,
      formatDecimalHours(row.seconds),
      row.amount ?? '',
      row.currency || '',
    ].map(csvCell).join(','));
    downloadFile(
      `hours-report-${range.fromKey}-${range.toKey}.csv`,
      [header.map(csvCell).join(','), ...lines].join('\n'),
      'text/csv;charset=utf-8',
    );
  };

  const breakdownRows = template === 'clients' ? clientRows : projectRows;
  const breakdownTitle = template === 'clients' ? 'Time by client' : 'Time by project';

  return (
    <div className="report-screen">
      <div className="report-toolbar">
        <Tabs
          value={template}
          onChange={setTemplate}
          tabs={[
            { value: 'overview', label: 'Overview' },
            { value: 'clients', label: 'By client' },
            { value: 'projects', label: 'By project' },
          ]}
        />
        <Button size="sm" icon="Download" onClick={exportReport}>Export CSV</Button>
      </div>

      <div className={period === 'custom' ? 'report-controls report-controls--custom' : 'report-controls'}>
        <Field label="Period">
          <Select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            options={[
              { value: 'week', label: 'This week' },
              { value: 'month', label: 'This month' },
              { value: '30days', label: 'Last 30 days' },
              { value: 'custom', label: 'Custom range' },
            ]}
          />
        </Field>
        {period === 'custom' ? (
          <>
            <Field label="From">
              <Input type="date" value={customFrom} onChange={(event) => setCustomFrom(event.target.value)} />
            </Field>
            <Field label="To">
              <Input type="date" value={customTo} onChange={(event) => setCustomTo(event.target.value)} />
            </Field>
          </>
        ) : null}
        <Field label="Client">
          <Select
            value={activeClientId}
            onChange={(event) => setClientId(event.target.value)}
            options={[
              { value: 'all', label: 'All clients' },
              ...clients.map((client) => ({ value: client.id, label: client.name })),
            ]}
          />
        </Field>
        <Field label="Chart">
          <Select
            value={metric}
            onChange={(event) => setMetric(event.target.value)}
            options={[
              { value: 'hours', label: 'Tracked hours' },
              { value: 'billable', label: 'Billable hours' },
            ]}
          />
        </Field>
      </div>

      <div className="stats-row stats-row--four">
        <StatTile label="Tracked" value={formatDecimalHours(totalSeconds)} unit="h" note={rangeLabel} />
        <StatTile
          label="Billable"
          value={formatDecimalHours(billableSeconds)}
          unit="h"
          note={`${totalSeconds ? Math.round((billableSeconds / totalSeconds) * 100) : 0}% of tracked time`}
        />
        <StatTile label="Billable value" value={reportMoneySummary(completed, clients)} note="No currency conversion" />
        <StatTile label="Active clients" value={activeClientCount} note={`${completed.length} ${completed.length === 1 ? 'entry' : 'entries'}`} />
      </div>

      <Card
        eyebrow={rangeLabel}
        title={metric === 'billable' ? 'Billable hours over time' : 'Tracked hours over time'}
      >
        {completed.length ? (
          <ReportBarChart points={buckets} metric={metric} />
        ) : (
          <EmptyState
            icon="ChartNoAxesColumn"
            title="No work in this period"
            description="Choose a wider date range or another client."
          />
        )}
      </Card>

      {template === 'overview' ? (
        <div className="table-scroll report-detail-table">
          <Card flush eyebrow={`${detailRows.length} ${detailRows.length === 1 ? 'entry' : 'entries'}`} title="Work completed">
            <DataTable
              columns={detailColumns}
              rows={detailRows}
              renderCell={renderDetailCell}
              compact
              empty="No completed entries in this period"
            />
          </Card>
        </div>
      ) : (
        <Card eyebrow={rangeLabel} title={breakdownTitle}>
          {breakdownRows.length ? (
            <ReportBreakdown rows={breakdownRows} totalSeconds={totalSeconds} />
          ) : (
            <EmptyState
              icon={template === 'clients' ? 'Users' : 'Folder'}
              title={`No ${template === 'clients' ? 'clients' : 'projects'} in this period`}
              description="Change the period or client filter to see a breakdown."
            />
          )}
        </Card>
      )}
    </div>
  );
}

export function SettingsScreen({ settings, setSettings, connection, onRetry, onSignOut, onReset }) {
  const update = (key, value) => setSettings((current) => ({ ...current, [key]: value }));
  const profiles = settings.billingProfiles || [];
  const [selectedProfileId, setSelectedProfileId] = React.useState(
    settings.defaultBillingProfileId || profiles[0]?.id,
  );
  const selectedProfile = profiles.find((profile) => profile.id === selectedProfileId)
    || profiles[0];

  React.useEffect(() => {
    if (!profiles.some((profile) => profile.id === selectedProfileId)) {
      setSelectedProfileId(settings.defaultBillingProfileId || profiles[0]?.id);
    }
  }, [profiles, selectedProfileId, settings.defaultBillingProfileId]);

  const updateProfile = (key, value) => {
    if (!selectedProfile) return;
    setSettings((current) => ({
      ...current,
      billingProfiles: current.billingProfiles.map((profile) => (
        profile.id === selectedProfile.id ? { ...profile, [key]: value } : profile
      )),
    }));
  };
  const addProfile = () => {
    const profile = {
      id: uid('billing'),
      name: `Billing profile ${profiles.length + 1}`,
      entityType: 'fop',
      legalName: '',
      email: '',
      registrationAddress: '',
      taxId: '',
      vatNumber: '',
      preparedBy: '',
      currency: settings.currency || 'USD',
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
    setSettings((current) => ({
      ...current,
      billingProfiles: [...current.billingProfiles, profile],
      defaultBillingProfileId: current.defaultBillingProfileId || profile.id,
    }));
    setSelectedProfileId(profile.id);
  };
  const removeProfile = () => {
    if (!selectedProfile || profiles.length === 1) return;
    if (!window.confirm(`Remove “${selectedProfile.name}”? Existing invoices keep their saved billing details.`)) return;
    const remaining = profiles.filter((profile) => profile.id !== selectedProfile.id);
    setSettings((current) => ({
      ...current,
      billingProfiles: remaining,
      defaultBillingProfileId: current.defaultBillingProfileId === selectedProfile.id
        ? remaining[0].id
        : current.defaultBillingProfileId,
    }));
    setSelectedProfileId(remaining[0].id);
  };

  return (
    <div className="settings-layout">
      <Card eyebrow="Tracking" title="Defaults">
        <div className="form-stack">
          <Switch
            checked={settings.rounding === '15'}
            label="Round entries to the nearest 15 minutes"
            onChange={(event) => update('rounding', event.target.checked ? '15' : 'none')}
          />
          <Switch
            checked={settings.midnightStop}
            label="Stop the running timer at midnight"
            onChange={(event) => update('midnightStop', event.target.checked)}
          />
          <Switch
            checked={settings.defaultBillable}
            label="Treat new entries as billable"
            onChange={(event) => update('defaultBillable', event.target.checked)}
          />
          <div className="form-grid form-grid--two">
            <Field label="Default currency">
              <Select
                value={settings.currency}
                onChange={(event) => update('currency', event.target.value)}
                options={CURRENCY_OPTIONS}
              />
            </Field>
            <Field label="Default hourly rate" hint="Used for new clients and projects">
              <Input
                numeric
                type="number"
                min="0"
                step="0.01"
                prefix={currencySymbol(settings.currency)}
                align="right"
                value={settings.defaultRate ?? 100}
                onChange={(event) => update('defaultRate', event.target.value)}
                onBlur={(event) => update('defaultRate', Math.max(0, Number(event.target.value) || 0))}
              />
            </Field>
          </div>
        </div>
      </Card>
      <Card
        eyebrow={`${profiles.length} billing ${profiles.length === 1 ? 'profile' : 'profiles'}`}
        title="Invoice identity and payment accounts"
        action={<Button size="sm" icon="Plus" onClick={addProfile}>Add profile</Button>}
      >
        <div className="billing-profiles">
          <nav className="billing-profile-list" aria-label="Billing profiles">
            {profiles.map((profile) => {
              const active = profile.id === selectedProfile?.id;
              const isDefault = profile.id === settings.defaultBillingProfileId;
              const accountHint = profile.iban
                ? `${profile.iban.slice(0, 4)} ···· ${profile.iban.slice(-4)}`
                : 'Bank details incomplete';
              return (
                <button
                  key={profile.id}
                  type="button"
                  className={active ? 'billing-profile-option billing-profile-option--active' : 'billing-profile-option'}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => setSelectedProfileId(profile.id)}
                >
                  <span className="billing-profile-option__topline">
                    <strong>{profile.name || 'Untitled profile'}</strong>
                    <span>{profile.currency}</span>
                  </span>
                  <span>{profile.legalName || 'Add legal name'}</span>
                  <small>
                    {accountHint}
                    {isDefault ? ' · default' : ''}
                  </small>
                </button>
              );
            })}
          </nav>

          {selectedProfile ? (
            <div className="billing-profile-editor">
              <header className="billing-profile-editor__head">
                <div>
                  <h3>{selectedProfile.name || 'Untitled profile'}</h3>
                  <p>Invoice details are saved as a snapshot when you create a draft.</p>
                </div>
                <div className="button-row">
                  {selectedProfile.id !== settings.defaultBillingProfileId ? (
                    <Button
                      size="sm"
                      onClick={() => update('defaultBillingProfileId', selectedProfile.id)}
                    >
                      Make default
                    </Button>
                  ) : (
                    <span className="billing-profile-default">Default profile</span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Trash2"
                    disabled={profiles.length === 1}
                    onClick={removeProfile}
                  >
                    Remove
                  </Button>
                </div>
              </header>

              <section className="billing-profile-section">
                <div className="billing-profile-section__head">
                  <h4>Profile</h4>
                  <p>How this account appears when choosing it for an invoice.</p>
                </div>
                <div className="form-grid form-grid--two">
                  <Field label="Profile name">
                    <Input
                      value={selectedProfile.name || ''}
                      placeholder="e.g. FOP · USD"
                      onChange={(event) => updateProfile('name', event.target.value)}
                    />
                  </Field>
                  <Field label="Account currency">
                    <Select
                      value={selectedProfile.currency || 'USD'}
                      onChange={(event) => updateProfile('currency', event.target.value)}
                      options={CURRENCY_OPTIONS}
                    />
                  </Field>
                </div>
              </section>

              <section className="billing-profile-section">
                <div className="billing-profile-section__head">
                  <h4>Legal identity</h4>
                  <p>Use the exact details from your Ukrainian registration and tax records.</p>
                </div>
                <div className="form-grid form-grid--two">
                  <Field label="Legal name">
                    <Input
                      value={selectedProfile.legalName || ''}
                      placeholder="e.g. FOP Lastname Firstname"
                      onChange={(event) => updateProfile('legalName', event.target.value)}
                    />
                  </Field>
                  <Field label="Entity type">
                    <Select
                      value={selectedProfile.entityType || 'fop'}
                      onChange={(event) => updateProfile('entityType', event.target.value)}
                      options={[
                        { value: 'fop', label: 'Sole proprietor (FOP)' },
                        { value: 'company', label: 'Ukrainian company' },
                        { value: 'individual', label: 'Individual' },
                      ]}
                    />
                  </Field>
                  <Field label="Tax number / РНОКПП">
                    <Input
                      value={selectedProfile.taxId || ''}
                      inputMode="numeric"
                      onChange={(event) => updateProfile('taxId', event.target.value)}
                    />
                  </Field>
                  <Field label="VAT number" optional>
                    <Input
                      value={selectedProfile.vatNumber || ''}
                      onChange={(event) => updateProfile('vatNumber', event.target.value)}
                    />
                  </Field>
                  <Field label="Billing email">
                    <Input
                      type="email"
                      value={selectedProfile.email || ''}
                      onChange={(event) => updateProfile('email', event.target.value)}
                    />
                  </Field>
                  <Field label="Prepared by" optional hint="Person responsible for issuing the document">
                    <Input
                      value={selectedProfile.preparedBy || ''}
                      onChange={(event) => updateProfile('preparedBy', event.target.value)}
                    />
                  </Field>
                </div>
                <Field label="Registration address">
                  <Input
                    multiline
                    rows={2}
                    value={selectedProfile.registrationAddress || ''}
                    onChange={(event) => updateProfile('registrationAddress', event.target.value)}
                  />
                </Field>
              </section>

              <section className="billing-profile-section">
                <div className="billing-profile-section__head">
                  <h4>Payment account</h4>
                  <p>Copy the official receiving details supplied by your bank.</p>
                </div>
                <div className="form-grid form-grid--two">
                  <Field label="Beneficiary name">
                    <Input
                      value={selectedProfile.beneficiaryName || ''}
                      onChange={(event) => updateProfile('beneficiaryName', event.target.value)}
                    />
                  </Field>
                  <Field label="IBAN" hint="A Ukrainian IBAN is UA followed by 27 digits">
                    <Input
                      numeric
                      value={selectedProfile.iban || ''}
                      placeholder="UA00 0000 0000 0000 0000 0000 000"
                      onChange={(event) => updateProfile('iban', event.target.value.toUpperCase())}
                    />
                  </Field>
                  <Field label="Bank name">
                    <Input
                      value={selectedProfile.bankName || ''}
                      onChange={(event) => updateProfile('bankName', event.target.value)}
                    />
                  </Field>
                  <Field label="SWIFT / BIC" optional hint="Usually needed for international transfers">
                    <Input
                      numeric
                      value={selectedProfile.swiftBic || ''}
                      onChange={(event) => updateProfile('swiftBic', event.target.value.toUpperCase())}
                    />
                  </Field>
                </div>
                <Field label="Bank address" optional>
                  <Input
                    multiline
                    rows={2}
                    value={selectedProfile.bankAddress || ''}
                    onChange={(event) => updateProfile('bankAddress', event.target.value)}
                  />
                </Field>
                <Field label="Intermediary bank" optional hint="Only when your bank’s foreign-currency instructions include one">
                  <Input
                    multiline
                    rows={2}
                    value={selectedProfile.intermediaryBank || ''}
                    onChange={(event) => updateProfile('intermediaryBank', event.target.value)}
                  />
                </Field>
                <Field label="Additional payment instructions" optional>
                  <Input
                    multiline
                    rows={2}
                    value={selectedProfile.paymentInstructions || ''}
                    onChange={(event) => updateProfile('paymentInstructions', event.target.value)}
                  />
                </Field>
              </section>

              <section className="billing-profile-section">
                <div className="billing-profile-section__head">
                  <h4>Invoice defaults</h4>
                  <p>Tax wording is configurable; confirm it with your accountant for each service and client.</p>
                </div>
                <div className="form-grid billing-tax-grid">
                  <Field label="Tax label">
                    <Input
                      value={selectedProfile.taxLabel || ''}
                      placeholder="e.g. VAT not applicable"
                      onChange={(event) => updateProfile('taxLabel', event.target.value)}
                    />
                  </Field>
                  <Field label="Tax rate">
                    <Input
                      numeric
                      align="right"
                      type="number"
                      min="0"
                      step="0.01"
                      suffix="%"
                      value={selectedProfile.taxRate ?? 0}
                      onChange={(event) => updateProfile('taxRate', event.target.value)}
                      onBlur={(event) => updateProfile('taxRate', Math.max(0, Number(event.target.value) || 0))}
                    />
                  </Field>
                </div>
                <Field label="Payment purpose template" hint="Use #{number} to insert the invoice number">
                  <Input
                    value={selectedProfile.paymentPurpose || ''}
                    onChange={(event) => updateProfile('paymentPurpose', event.target.value)}
                  />
                </Field>
              </section>
            </div>
          ) : null}
        </div>
      </Card>
      <Card eyebrow="Instance" title="Self-hosting">
        <div className="form-stack">
          <Field label="Storage" hint="The server keeps this ledger in its mounted data directory">
            <Input disabled value={`SQLite · revision ${connection.meta?.revision || 0}`} />
          </Field>
          <Field
            label="API access"
            hint="The web app and future macOS tracker use the HOURS_API_TOKEN configured on the server"
          >
            <Input
              disabled
              value={connection.meta?.authentication === 'token' ? 'Access token required' : 'Open for local development'}
            />
          </Field>
          <div className="button-row">
            <Button icon="RefreshCw" size="sm" onClick={onRetry}>Test connection</Button>
            {connection.meta?.authentication === 'token' ? (
              <Button size="sm" onClick={onSignOut}>Forget access token</Button>
            ) : null}
            <Button variant="danger" icon="Trash2" size="sm" onClick={onReset}>
              Clear workspace
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
