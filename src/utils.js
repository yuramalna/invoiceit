export function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getClient(clients, clientId) {
  return clients.find((client) => client.id === clientId);
}

export function getProject(clients, clientId, projectId) {
  return getClient(clients, clientId)?.projects.find((project) => project.id === projectId);
}

export function getBillingProfile(settings, profileId) {
  const profiles = settings?.billingProfiles || [];
  return profiles.find((profile) => profile.id === profileId)
    || profiles.find((profile) => profile.id === settings?.defaultBillingProfileId)
    || profiles[0];
}

export function entrySeconds(entry, now = Date.now()) {
  if (!entry.running) return entry.seconds || 0;
  return (entry.seconds || 0) + Math.max(0, Math.floor((now - new Date(entry.start).getTime()) / 1000));
}

export function entryAmount(entry, clients) {
  if (!entry.billable) return 0;
  const project = getProject(clients, entry.clientId, entry.projectId);
  return Number(formatDecimalHours(entrySeconds(entry))) * (project?.rate || 0);
}

export function invoiceItemAmount(item) {
  const quantity = Math.max(0, Number(item?.quantity) || 0);
  const unitPrice = Math.max(0, Number(item?.unitPrice) || 0);
  return Math.round((quantity * unitPrice + Number.EPSILON) * 100) / 100;
}

export function additionalItemsSubtotal(items = []) {
  return (Array.isArray(items) ? items : [])
    .reduce((sum, item) => sum + invoiceItemAmount(item), 0);
}

export function formatMoney(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

export function currencySymbol(currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).formatToParts(0).find((part) => part.type === 'currency')?.value || currency;
}

export function formatDate(value, options = { day: '2-digit', month: 'short', year: 'numeric' }) {
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(value));
}

export function formatTime(value) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value));
}

export function formatDecimalHours(seconds) {
  return (Math.max(0, Number(seconds) || 0) / 3600).toFixed(2);
}

export function dateKey(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function isSameLocalDay(a, b) {
  return dateKey(a) === dateKey(b);
}

export function startOfWeek(value = new Date()) {
  const date = new Date(value);
  const day = date.getDay() || 7;
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - day + 1);
  return date;
}

export function downloadFile(name, text, type = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function csvCell(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}
