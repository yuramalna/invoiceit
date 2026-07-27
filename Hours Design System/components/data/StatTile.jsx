import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from '../core/Icon.jsx';

injectStyle('stattile', `
.hrs-stat{display:flex;flex-direction:column;gap:var(--space-2);padding:var(--space-5) var(--gutter-inline);background:var(--surface-card);border:1px solid var(--line-rule);border-radius:var(--radius-lg)}
.hrs-stat--bare{background:transparent;border:0;border-left:1px solid var(--line-rule);border-radius:0;padding:0 0 0 var(--space-5)}
.hrs-stat__label{font-size:var(--label-size);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);color:var(--text-muted)}
.hrs-stat__value{font-family:var(--font-mono);font-variant-numeric:tabular-nums;font-size:var(--num-lg-size);line-height:1.05;letter-spacing:var(--num-ls);color:var(--text-display);display:flex;align-items:baseline;gap:.18em}
.hrs-stat__unit{font-family:var(--font-sans);font-size:14px;color:var(--text-faint);letter-spacing:0}
.hrs-stat__foot{display:flex;align-items:center;gap:var(--space-1);font-size:12px;color:var(--text-muted)}
.hrs-stat__foot--up{color:var(--moss-500)}
.hrs-stat__foot--down{color:var(--rust-500)}
`);

export function StatTile({ label, value, unit, delta, direction, note, bare }) {
  const dirClass = direction ? ' hrs-stat__foot--' + direction : '';
  return (
    <div className={['hrs-stat', bare ? 'hrs-stat--bare' : ''].join(' ').trim()}>
      <span className="hrs-stat__label">{label}</span>
      <span className="hrs-stat__value">{value}{unit ? <span className="hrs-stat__unit">{unit}</span> : null}</span>
      {(delta || note) ? (
        <span className={'hrs-stat__foot' + dirClass}>
          {direction ? <Icon name={direction === 'up' ? 'ArrowUpRight' : 'ArrowDownRight'} size={13} /> : null}
          {delta}{delta && note ? ' · ' : ''}{note}
        </span>
      ) : null}
    </div>
  );
}
