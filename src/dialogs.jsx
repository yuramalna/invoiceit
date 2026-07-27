import React from 'react';
import { CURRENCY_OPTIONS } from './data.js';
import {
  currencySymbol,
  entryAmount,
  entrySeconds,
  formatDate,
  formatDecimalHours,
  formatMoney,
  getBillingProfile,
  getClient,
  getProject,
  uid,
} from './utils.js';

const { Button, Checkbox, Dialog, Field, Input, Select } = window.HoursDesignSystem_76f0a9;

function localDate(value) {
  const date = value ? new Date(value) : new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function localTime(value, fallback) {
  const date = value ? new Date(value) : new Date();
  if (!value && fallback) return fallback;
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function combineDateTime(date, time) {
  return new Date(`${date}T${time}:00`).toISOString();
}

export function EntryDialog({ entry, clients, defaultBillable, onClose, onSave }) {
  const firstClient = getClient(clients, entry?.clientId) || clients[0];
  const [form, setForm] = React.useState(() => ({
    clientId: entry?.clientId || firstClient?.id || '',
    projectId: entry?.projectId || firstClient?.projects[0]?.id || '',
    task: entry?.task || '',
    description: entry?.description || '',
    date: localDate(entry?.start),
    start: localTime(entry?.start, '09:00'),
    end: localTime(entry?.end, '10:00'),
    hours: formatDecimalHours(entry ? entrySeconds(entry) : 3600),
    billable: entry?.billable ?? defaultBillable,
  }));
  const [error, setError] = React.useState('');
  const client = getClient(clients, form.clientId) || clients[0];
  const project = getProject(clients, form.clientId, form.projectId) || client?.projects[0];
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const save = () => {
    if (!form.task.trim()) {
      setError('Name the task before saving.');
      return;
    }
    if (!client || !project) {
      setError('Choose a client and project.');
      return;
    }
    const start = combineDateTime(form.date, form.start);
    const seconds = Math.max(60, Math.round(Number(form.hours) * 3600));
    const end = new Date(new Date(start).getTime() + seconds * 1000).toISOString();
    onSave({
      ...entry,
      id: entry?.id || uid('entry'),
      clientId: client.id,
      projectId: project.id,
      task: form.task.trim(),
      description: form.description.trim(),
      start,
      end,
      seconds,
      billable: form.billable,
      invoiced: entry?.invoiced || false,
      running: false,
    });
  };

  return (
    <Dialog
      wide
      title={entry ? 'Edit entry' : 'Add entry'}
      subtitle={`${formatDate(form.date)} · ${client?.name || 'Choose a client'}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={save}>Save entry</Button>
        </>
      }
    >
      <Field label="Task" error={error}>
        <Input
          autoFocus
          value={form.task}
          placeholder="What did you work on?"
          onChange={(event) => {
            update('task', event.target.value);
            if (error) setError('');
          }}
        />
      </Field>
      <div className="form-grid form-grid--two">
        <Field label="Client">
          <Select
            value={form.clientId}
            onChange={(event) => {
              const next = getClient(clients, event.target.value);
              setForm((current) => ({
                ...current,
                clientId: event.target.value,
                projectId: next?.projects[0]?.id || '',
              }));
            }}
            options={clients.map((item) => ({ value: item.id, label: item.name }))}
            dotColor={client?.color}
          />
        </Field>
        <Field label="Project">
          <Select
            value={form.projectId}
            onChange={(event) => update('projectId', event.target.value)}
            options={(client?.projects || []).map((item) => ({ value: item.id, label: item.name }))}
          />
        </Field>
      </div>
      <div className="form-grid form-grid--four">
        <Field label="Date"><Input type="date" value={form.date} onChange={(event) => update('date', event.target.value)} /></Field>
        <Field label="Start"><Input numeric type="time" value={form.start} onChange={(event) => update('start', event.target.value)} /></Field>
        <Field label="Hours"><Input numeric align="right" suffix="h" value={form.hours} onChange={(event) => update('hours', event.target.value)} /></Field>
        <Field label="Rate" hint="Applied from project">
          <Input numeric align="right" prefix="$" value={Number(project?.rate || 0).toFixed(2)} disabled />
        </Field>
      </div>
      <Field label="Note" optional hint="Shown in the detailed time log">
        <Input
          multiline
          rows={3}
          value={form.description}
          placeholder="Anything the client should see on the invoice"
          onChange={(event) => update('description', event.target.value)}
        />
      </Field>
      <Checkbox
        checked={form.billable}
        onChange={(event) => update('billable', event.target.checked)}
        label="Billable"
        note="Included on the next invoice for this client"
      />
    </Dialog>
  );
}

export function ClientDialog({ client, clients, defaultCurrency, defaultRate, onClose, onSave }) {
  const color = client?.color || `var(--client-${(clients.length % 6) + 1})`;
  const parsedDefaultRate = Number(defaultRate);
  const initialRate = Number.isFinite(parsedDefaultRate) ? Math.max(0, parsedDefaultRate) : 100;
  const [form, setForm] = React.useState(() => ({
    id: client?.id || uid('client'),
    name: client?.name || '',
    contact: client?.contact || '',
    address: client?.address || '',
    currency: client?.currency || defaultCurrency || 'USD',
    terms: client?.terms ?? 14,
    color,
    projects: client?.projects?.map((project) => ({ ...project })) || [
      { id: uid('project'), name: '', rate: initialRate, budget: '' },
    ],
  }));
  const [error, setError] = React.useState('');
  const projectRows = React.useRef(new Map());
  const pendingProjectId = React.useRef(null);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const updateProject = (id, key, value) => {
    setForm((current) => ({
      ...current,
      projects: current.projects.map((project) => project.id === id ? { ...project, [key]: value } : project),
    }));
  };
  React.useEffect(() => {
    if (!pendingProjectId.current) return;
    projectRows.current.get(pendingProjectId.current)?.scrollIntoView({ block: 'nearest' });
    pendingProjectId.current = null;
  }, [form.projects.length]);
  const addProject = () => {
    const project = { id: uid('project'), name: '', rate: initialRate, budget: '' };
    pendingProjectId.current = project.id;
    update('projects', [...form.projects, project]);
  };
  const save = () => {
    if (!form.name.trim()) {
      setError('Name the client before saving.');
      return;
    }
    if (!form.projects.some((project) => project.name.trim())) {
      setError('Add at least one named project.');
      return;
    }
    onSave({
      ...form,
      name: form.name.trim(),
      terms: Number(form.terms),
      projects: form.projects
        .filter((project) => project.name.trim())
        .map((project) => ({
          ...project,
          name: project.name.trim(),
          rate: Number(project.rate),
          budget: project.budget === '' ? 0 : Number(project.budget),
        })),
    });
  };

  return (
    <Dialog
      wide
      title={client ? 'Edit client' : 'New client'}
      subtitle="Set billing details once, then add one or more projects"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={save}>Save client</Button>
        </>
      }
    >
      <Field label="Client name" error={error}>
        <Input
          autoFocus
          value={form.name}
          placeholder="Studio or company"
          onChange={(event) => {
            update('name', event.target.value);
            if (error) setError('');
          }}
        />
      </Field>
      <div className="form-grid form-grid--two">
        <Field label="Billing email">
          <Input type="email" value={form.contact} onChange={(event) => update('contact', event.target.value)} />
        </Field>
        <div className="form-grid form-grid--two">
          <Field label="Currency">
            <Select
              value={form.currency}
              onChange={(event) => update('currency', event.target.value)}
              options={CURRENCY_OPTIONS}
            />
          </Field>
          <Field label="Payment due" hint="How long the client has to pay after an invoice is issued">
            <Select
              value={String(form.terms)}
              onChange={(event) => update('terms', Number(event.target.value))}
              options={[
                { value: '0', label: 'On receipt' },
                { value: '7', label: 'Within 7 days' },
                { value: '14', label: 'Within 14 days' },
                { value: '30', label: 'Within 30 days' },
              ]}
            />
          </Field>
        </div>
      </div>
      <Field label="Billing address">
        <Input multiline rows={2} value={form.address} onChange={(event) => update('address', event.target.value)} />
      </Field>
      <div className="project-editor">
        <div className="project-editor__head">
          <div className="project-editor__heading">
            <span className="label">Projects and rates</span>
            <p>Give each project its own hourly rate. Monthly limits are optional.</p>
          </div>
          <Button
            size="sm"
            icon="Plus"
            onClick={addProject}
          >
            Add project
          </Button>
        </div>
        {form.projects.map((project, index) => (
          <section
            className="project-row"
            key={project.id}
            ref={(node) => {
              if (node) projectRows.current.set(project.id, node);
              else projectRows.current.delete(project.id);
            }}
          >
            <header className="project-row__head">
              <span className="project-row__title">
                Project {index + 1}
                {project.name.trim() ? <strong>{project.name}</strong> : null}
              </span>
              <Button
                variant="ghost"
                size="sm"
                icon="Trash2"
                aria-label={`Remove ${project.name || `project ${index + 1}`}`}
                disabled={form.projects.length === 1}
                onClick={() => update('projects', form.projects.filter((item) => item.id !== project.id))}
              >
                Remove
              </Button>
            </header>
            <div className="project-row__fields">
              <Field label="Project name">
                <Input value={project.name} placeholder="e.g. Website redesign" onChange={(event) => updateProject(project.id, 'name', event.target.value)} />
              </Field>
              <Field label="Hourly rate">
                <Input
                  numeric
                  prefix={currencySymbol(form.currency)}
                  align="right"
                  value={project.rate}
                  onChange={(event) => updateProject(project.id, 'rate', event.target.value)}
                />
              </Field>
              <Field
                label="Monthly hour limit"
                optional
              >
                <Input
                  numeric
                  suffix="h"
                  align="right"
                  value={project.budget || ''}
                  placeholder="No limit"
                  onChange={(event) => updateProject(project.id, 'budget', event.target.value)}
                />
              </Field>
            </div>
          </section>
        ))}
      </div>
    </Dialog>
  );
}

export function InvoiceDialog({
  invoice,
  clients,
  entries,
  settings,
  selectedIds = [],
  onClose,
  onSubmit,
}) {
  const currentEntryIds = invoice?.entryIds || [];
  const eligible = entries.filter((entry) =>
    !entry.running
    && (currentEntryIds.includes(entry.id) || (entry.billable && !entry.invoiced)),
  );
  const selectedClient = invoice?.clientId
    || eligible.find((entry) => selectedIds.includes(entry.id))?.clientId
    || eligible[0]?.clientId
    || clients[0]?.id;
  const initialIssued = invoice?.issued || localDate();
  const initialClient = getClient(clients, selectedClient);
  const initialDue = invoice?.due || (() => {
    const due = new Date(`${initialIssued}T12:00:00`);
    due.setDate(due.getDate() + (initialClient?.terms ?? 14));
    return localDate(due);
  })();
  const [clientId, setClientId] = React.useState(selectedClient);
  const [billingProfileId, setBillingProfileId] = React.useState(
    invoice?.billingProfileId
      || settings.defaultBillingProfileId
      || settings.billingProfiles?.[0]?.id
      || '',
  );
  const [picked, setPicked] = React.useState(() =>
    (invoice?.entryIds || selectedIds).filter((id) => eligible.some((entry) => entry.id === id)),
  );
  const [issued, setIssued] = React.useState(initialIssued);
  const [due, setDue] = React.useState(initialDue);
  const [error, setError] = React.useState('');
  const client = getClient(clients, clientId);
  const billingProfile = getBillingProfile(settings, billingProfileId);
  const clientEntries = eligible.filter((entry) => entry.clientId === clientId);
  React.useEffect(() => {
    setPicked((current) => current.filter((id) => clientEntries.some((entry) => entry.id === id)));
  }, [clientId]);

  const subtotal = clientEntries
    .filter((entry) => picked.includes(entry.id))
    .reduce((sum, entry) => sum + entryAmount(entry, clients), 0);
  const taxRate = Number(billingProfile?.taxRate) || 0;
  const total = subtotal + ((subtotal * taxRate) / 100);

  const submit = () => {
    if (!picked.length) {
      setError('Select at least one entry for this invoice.');
      return;
    }
    if (!issued || !due) {
      setError('Choose an issue date and due date.');
      return;
    }
    if (due < issued) {
      setError('The due date cannot be before the issue date.');
      return;
    }
    onSubmit({
      id: invoice?.id,
      clientId,
      entryIds: picked,
      billingProfileId,
      issued,
      due,
    });
  };

  return (
    <Dialog
      wide
      title={invoice ? `Edit draft #${invoice.number}` : 'New invoice'}
      subtitle={invoice ? 'Update its entries, dates, and payment account' : 'Select unbilled entries for one client'}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            size="sm"
            icon="Receipt"
            disabled={!picked.length}
            onClick={submit}
          >
            {invoice ? 'Save changes' : `Create draft · ${formatMoney(total, client?.currency)}`}
          </Button>
        </>
      }
    >
      {eligible.length ? (
        <>
          <div className="form-grid form-grid--two">
            <Field label="Client">
              <Select
                value={clientId}
                onChange={(event) => {
                  const nextClient = getClient(clients, event.target.value);
                  setClientId(event.target.value);
                  if (!invoice && issued) {
                    const nextDue = new Date(`${issued}T12:00:00`);
                    nextDue.setDate(nextDue.getDate() + (nextClient?.terms ?? 14));
                    setDue(localDate(nextDue));
                  }
                  setError('');
                }}
                options={clients
                  .filter((item) => eligible.some((entry) => entry.clientId === item.id))
                  .map((item) => ({ value: item.id, label: item.name }))}
                dotColor={client?.color}
              />
            </Field>
            <Field label="Bill from" hint="The profile is saved with this invoice">
              <Select
                value={billingProfileId}
                onChange={(event) => setBillingProfileId(event.target.value)}
                options={(settings.billingProfiles || []).map((profile) => ({
                  value: profile.id,
                  label: `${profile.name} · ${profile.currency}`,
                }))}
              />
            </Field>
          </div>
          <div className="form-grid form-grid--two">
            <Field label="Issue date">
              <Input
                type="date"
                value={issued}
                onChange={(event) => {
                  setIssued(event.target.value);
                  if (error) setError('');
                }}
              />
            </Field>
            <Field label="Due date">
              <Input
                type="date"
                value={due}
                onChange={(event) => {
                  setDue(event.target.value);
                  if (error) setError('');
                }}
              />
            </Field>
          </div>
          {error ? <p className="dialog-error" role="alert">{error}</p> : null}
          {billingProfile && client?.currency !== billingProfile.currency ? (
            <p className="dialog-notice">
              This invoice is in {client?.currency}, while the selected payment account is in {billingProfile.currency}.
              Confirm that the account can receive this currency.
            </p>
          ) : null}
          <div className="invoice-entry-picker">
            {clientEntries.map((entry) => {
              const project = getProject(clients, entry.clientId, entry.projectId);
              return (
                <label className="invoice-entry-option" key={entry.id}>
                  <Checkbox
                    checked={picked.includes(entry.id)}
                    onChange={(event) => setPicked((current) =>
                      event.target.checked ? [...current, entry.id] : current.filter((id) => id !== entry.id),
                    )}
                  />
                  <span className="invoice-entry-option__main">
                    <strong>{entry.task}</strong>
                    <small>{formatDate(entry.start)} · {project?.name}</small>
                  </span>
                  <span className="invoice-entry-option__hours">{formatDecimalHours(entrySeconds(entry))}h</span>
                  <span className="invoice-entry-option__amount">{formatMoney(entryAmount(entry, clients), client?.currency)}</span>
                </label>
              );
            })}
          </div>
        </>
      ) : (
        <div className="dialog-empty">
          <strong>Everything billable is already invoiced.</strong>
          <span>Add a new billable entry before creating another invoice.</span>
        </div>
      )}
    </Dialog>
  );
}

export function DeleteInvoiceDialog({ invoice, entryCount, onClose, onConfirm }) {
  return (
    <Dialog
      title={`Delete invoice #${invoice.number}?`}
      subtitle="Remove this invoice from your records"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="danger" size="sm" icon="Trash2" onClick={onConfirm}>Delete invoice</Button>
        </>
      }
    >
      <p>
        {entryCount
          ? `${entryCount} ${entryCount === 1 ? 'time entry' : 'time entries'} will return to Unbilled so you can invoice them again.`
          : 'This invoice has no linked time entries.'}
      </p>
    </Dialog>
  );
}

export function ResetDialog({ onClose, onConfirm }) {
  return (
    <Dialog
      title="Clear workspace"
      subtitle="Remove every client, project, time entry, invoice, and billing profile"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="danger" size="sm" onClick={onConfirm}>Clear everything</Button>
        </>
      }
    >
      <p>This cannot be undone. Export a backup first if there is anything you may want to restore.</p>
    </Dialog>
  );
}
