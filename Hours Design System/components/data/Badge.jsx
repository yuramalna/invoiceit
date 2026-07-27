import React from 'react';
import { injectStyle } from '../_internal/style.js';

injectStyle('badge', `
.hrs-badge{display:inline-flex;align-items:center;gap:6px;height:20px;padding:0 8px;border-radius:var(--radius-sm);font-size:var(--label-size);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);white-space:nowrap}
.hrs-badge__dot{width:5px;height:5px;border-radius:var(--radius-pill);background:currentColor}
.hrs-badge--live{animation:hours-pulse 1.8s var(--ease-in-out) infinite}
`);

const TONES = {
  live: ['--status-live-bg', '--status-live'],
  paid: ['--status-paid-bg', '--status-paid'],
  pending: ['--status-pending-bg', '--status-pending'],
  overdue: ['--status-overdue-bg', '--status-overdue'],
  draft: ['--status-draft-bg', '--status-draft'],
  info: ['--status-info-bg', '--status-info'],
};

export function Badge({ tone = 'draft', children, dot, pulse }) {
  const [bg, fg] = TONES[tone] || TONES.draft;
  return (
    <span className="hrs-badge" style={{ background: 'var(' + bg + ')', color: 'var(' + fg + ')' }}>
      {dot ? <span className={'hrs-badge__dot' + (pulse ? ' hrs-badge--live' : '')} /> : null}
      {children}
    </span>
  );
}
