import React from 'react';
import {
  entryAmount,
  entrySeconds,
  formatDate,
  formatDecimalHours,
  formatMoney,
  getBillingProfile,
  getClient,
  getProject,
} from './utils.js';

const {
  Badge,
  Button,
  Select,
} = window.HoursDesignSystem_76f0a9;

function statusLabel(status) {
  return {
    draft: 'Draft',
    pending: 'Sent',
    paid: 'Paid',
    overdue: 'Overdue',
  }[status] || status;
}

function entityLabel(entityType) {
  return {
    fop: 'Sole proprietor (FOP) · Ukraine',
    company: 'Company · Ukraine',
    individual: 'Individual · Ukraine',
  }[entityType] || '';
}

function DetailLines({ lines }) {
  const visible = lines.filter(Boolean);
  return visible.map((line, index) => (
    <React.Fragment key={`${line}-${index}`}>
      {line}
      {index < visible.length - 1 ? <br /> : null}
    </React.Fragment>
  ));
}

export default function InvoiceDocument({
  invoice,
  entries,
  clients,
  settings,
  onStatusChange,
  onEdit,
  onDelete,
  onPrint,
}) {
  const client = getClient(clients, invoice.clientId) || clients[0];
  const invoiceEntries = invoice.entryIds?.length
    ? entries.filter((entry) => invoice.entryIds.includes(entry.id))
    : [];
  const lines = invoiceEntries.length
    ? invoiceEntries.map((entry) => {
        const project = getProject(clients, entry.clientId, entry.projectId);
        return {
          id: entry.id,
          description: entry.task,
          detail: entry.description || project?.name,
          hours: formatDecimalHours(entrySeconds(entry)),
          rate: project?.rate || 0,
          amount: entryAmount(entry, clients),
        };
      })
    : [
        {
          id: 'summary',
          description: 'Professional services',
          detail: 'Time log attached',
          hours: Number(invoice.hours || 0).toFixed(2),
          rate: invoice.hours ? invoice.subtotal / invoice.hours : 0,
          amount: invoice.subtotal || 0,
        },
      ];
  const subtotal = invoiceEntries.length
    ? lines.reduce((sum, line) => sum + line.amount, 0)
    : invoice.subtotal || 0;
  const currency = client.currency || settings.currency;
  const billingProfile = invoice.billingProfile
    || getBillingProfile(settings, invoice.billingProfileId)
    || {};
  const taxRate = Number(invoice.taxRate ?? billingProfile.taxRate) || 0;
  const tax = (subtotal * taxRate) / 100;
  const total = invoice.total ?? subtotal + tax;
  const paymentPurpose = (billingProfile.paymentPurpose || '')
    .replaceAll('#{number}', String(invoice.number));
  const taxLabel = billingProfile.taxLabel || (taxRate ? `Tax ${taxRate}%` : 'Tax');

  return (
    <section className="invoice-frame" aria-label={`Invoice ${invoice.number}`}>
      <div className="invoice-toolbar">
        <div className="invoice-toolbar__meta">
          <span className="label">Preview · A4</span>
          <Badge tone={invoice.status} dot={invoice.status !== 'draft'}>
            {statusLabel(invoice.status)}
          </Badge>
        </div>
        <div className="invoice-toolbar__actions">
          <div className="invoice-toolbar__status">
            <Select
              size="sm"
              aria-label={`Status for invoice ${invoice.number}`}
              value={invoice.status}
              onChange={(event) => onStatusChange(event.target.value)}
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'pending', label: 'Sent' },
                { value: 'paid', label: 'Paid' },
                { value: 'overdue', label: 'Overdue' },
              ]}
            />
          </div>
          {invoice.status === 'draft' ? (
            <Button size="sm" icon="Pencil" onClick={onEdit}>Edit draft</Button>
          ) : null}
          <Button size="sm" icon="Download" onClick={onPrint}>PDF</Button>
          <Button size="sm" variant="danger" icon="Trash2" onClick={onDelete}>Delete</Button>
        </div>
      </div>
      <article className="invoice-sheet">
        <header className="invoice-head">
          <div>
            <h2>
              Invoice <span className="invoice-number">#{invoice.number}</span>
            </h2>
            <p>
              Issued {formatDate(invoice.issued)} · Due {formatDate(invoice.due)}
            </p>
          </div>
          <div className="invoice-brand">
            <strong>Hours<span>.</span></strong>
            <p>
              <DetailLines
                lines={[
                  billingProfile.legalName,
                  entityLabel(billingProfile.entityType),
                  billingProfile.email,
                  billingProfile.registrationAddress,
                  billingProfile.taxId ? `Tax ID / РНОКПП · ${billingProfile.taxId}` : '',
                  billingProfile.vatNumber ? `VAT · ${billingProfile.vatNumber}` : '',
                ]}
              />
            </p>
          </div>
        </header>

        <div className="invoice-parties">
          <div>
            <span className="label">Billed to</span>
            <p>
              {client.name}<br />
              {client.contact}<br />
              <span className="preline">{client.address}</span>
            </p>
          </div>
          <div>
            <span className="label">Service period</span>
            <p>
              {formatDate(invoice.periodStart || invoice.issued, { day: '2-digit', month: 'short' })} –{' '}
              {formatDate(invoice.periodEnd || invoice.issued, { day: '2-digit', month: 'short', year: 'numeric' })}
              <br />
              Grouped by project
            </p>
          </div>
          <div>
            <span className="label">Payment account</span>
            <p className="invoice-payment">
              <DetailLines
                lines={[
                  billingProfile.beneficiaryName || billingProfile.legalName,
                  billingProfile.iban ? `IBAN · ${billingProfile.iban}` : '',
                  billingProfile.bankName ? `Bank · ${billingProfile.bankName}` : '',
                  billingProfile.swiftBic ? `SWIFT / BIC · ${billingProfile.swiftBic}` : '',
                  billingProfile.currency ? `Account currency · ${billingProfile.currency}` : '',
                  billingProfile.bankAddress,
                  billingProfile.intermediaryBank,
                  billingProfile.paymentInstructions,
                  paymentPurpose ? `Purpose · ${paymentPurpose}` : '',
                ]}
              />
            </p>
          </div>
        </div>

        <div className="invoice-lines">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Hours</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line) => (
                <tr key={line.id}>
                  <td>
                    <strong>{line.description}</strong>
                    {line.detail ? <small>{line.detail}</small> : null}
                  </td>
                  <td>{line.hours}</td>
                  <td>{formatMoney(line.rate, currency)}</td>
                  <td>{formatMoney(line.amount, currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="invoice-total">
          <div>
            <span>Subtotal</span>
            <span>{formatMoney(subtotal, currency)}</span>
          </div>
          <div>
            <span>{taxLabel}{taxRate ? ` · ${taxRate}%` : ''}</span>
            <span>{formatMoney(tax, currency)}</span>
          </div>
          <div className="invoice-total__due">
            <strong>Total due</strong>
            <strong>{formatMoney(total, currency)}</strong>
          </div>
        </div>

      </article>
    </section>
  );
}
