import React from 'react';
import { injectStyle } from '../_internal/style.js';

injectStyle('tooltip', `
.hrs-tip{position:relative;display:inline-flex}
.hrs-tip__bub{position:absolute;left:50%;transform:translateX(-50%) translateY(2px);bottom:calc(100% + 6px);padding:5px 8px;background:var(--ink-900);color:var(--paper-50);border-radius:var(--radius-sm);font-size:12px;line-height:1.35;white-space:nowrap;box-shadow:var(--shadow-popover);opacity:0;pointer-events:none;transition:opacity var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out);z-index:30}
.hrs-tip__bub--below{bottom:auto;top:calc(100% + 6px)}
.hrs-tip:hover .hrs-tip__bub{opacity:1;transform:translateX(-50%) translateY(0)}
.hrs-tip__bub b{font-family:var(--font-mono);font-weight:var(--weight-medium);font-variant-numeric:tabular-nums}
`);

export function Tooltip({ label, placement = 'top', children }) {
  return (
    <span className="hrs-tip">
      {children}
      <span className={['hrs-tip__bub', placement === 'bottom' ? 'hrs-tip__bub--below' : ''].join(' ').trim()}>{label}</span>
    </span>
  );
}
