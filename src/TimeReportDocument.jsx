import React from 'react';
import {
  entrySeconds,
  formatDate,
  formatDecimalHours,
  getBillingProfile,
  getClient,
  getProject,
} from './utils.js';

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

export default function TimeReportDocument({ invoice, entries, clients, settings }) {
  const client = getClient(clients, invoice.clientId) || clients[0];
  const reportEntries = invoice.entryIds?.length
    ? entries
      .filter((entry) => invoice.entryIds.includes(entry.id))
      .sort((a, b) => new Date(a.start) - new Date(b.start))
    : [];
  const billingProfile = invoice.billingProfile
    || getBillingProfile(settings, invoice.billingProfileId)
    || {};
  const totalSeconds = reportEntries.reduce((sum, entry) => sum + entrySeconds(entry), 0);

  return (
    <section className="time-report-frame" aria-label={`Time report for invoice ${invoice.number}`}>
      <article className="invoice-sheet time-report-sheet">
        <header className="invoice-head">
          <div>
            <span className="label">Tracked work</span>
            <h2>Time report</h2>
            <p>
              {formatDate(invoice.periodStart || invoice.issued, { day: '2-digit', month: 'short' })} –{' '}
              {formatDate(invoice.periodEnd || invoice.issued, { day: '2-digit', month: 'short', year: 'numeric' })}
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
                ]}
              />
            </p>
          </div>
        </header>

        <div className="time-report-context">
          <div>
            <span className="label">Client</span>
            <p>{client?.name || 'Client'}</p>
          </div>
          <div>
            <span className="label">Report reference</span>
            <p>Invoice #{invoice.number} · {reportEntries.length} {reportEntries.length === 1 ? 'entry' : 'entries'}</p>
          </div>
        </div>

        <div className="invoice-lines time-report-lines">
          <table>
            <thead>
              <tr>
                <th className="time-report-line__date">Date</th>
                <th>Work completed</th>
                <th className="time-report-line__project">Project</th>
                <th className="time-report-line__hours">Hours</th>
              </tr>
            </thead>
            <tbody>
              {reportEntries.length ? reportEntries.map((entry) => {
                const project = getProject(clients, entry.clientId, entry.projectId);
                return (
                  <tr key={entry.id}>
                    <td className="time-report-line__date">{formatDate(entry.start)}</td>
                    <td>
                      <strong>{entry.task}</strong>
                      {entry.description ? <small>{entry.description}</small> : null}
                    </td>
                    <td className="time-report-line__project">{project?.name || '—'}</td>
                    <td className="time-report-line__hours">{formatDecimalHours(entrySeconds(entry))}</td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="4" className="time-report-lines__empty">No tracked time is attached to this invoice.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="time-report-total">
          <span>Total hours</span>
          <strong>{formatDecimalHours(totalSeconds)} h</strong>
        </div>
      </article>
    </section>
  );
}
