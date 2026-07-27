export const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD $' },
  { value: 'EUR', label: 'EUR €' },
  { value: 'GBP', label: 'GBP £' },
  { value: 'UAH', label: 'UAH ₴' },
];

export const defaultSettings = {
  currency: 'USD',
  defaultRate: 0,
  rounding: 'none',
  midnightStop: false,
  defaultBillable: true,
  defaultBillingProfileId: '',
  billingProfiles: [],
};

export function createEmptyState() {
  return {
    version: 1,
    clients: [],
    entries: [],
    invoices: [],
    settings: structuredClone(defaultSettings),
  };
}
