import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from '../core/Icon.jsx';

injectStyle('toast', `
.hrs-toast{display:inline-flex;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--space-4);background:var(--ink-900);color:var(--paper-50);border-radius:var(--radius-md);box-shadow:var(--shadow-popover);font-size:13.5px;animation:hours-fade-up var(--dur-base) var(--ease-out)}
.hrs-toast__act{background:none;border:0;color:var(--terracotta-200);cursor:pointer;font-size:13px;font-weight:var(--weight-medium);padding:0;border-bottom:1px solid transparent}
.hrs-toast__act:hover{border-bottom-color:var(--terracotta-200)}
.hrs-toast--ok{color:var(--moss-50)}
.hrs-toast__stack{position:absolute;bottom:var(--space-6);left:50%;transform:translateX(-50%);display:flex;flex-direction:column;gap:var(--space-2);align-items:center;z-index:50}
`);

export function Toast({ children, icon, actionLabel, onAction, tone = 'default' }) {
  return (
    <div className={['hrs-toast', tone === 'success' ? 'hrs-toast--ok' : ''].join(' ').trim()}>
      {icon ? <Icon name={icon} size={14} /> : null}
      <span>{children}</span>
      {actionLabel ? <button className="hrs-toast__act" onClick={onAction}>{actionLabel}</button> : null}
    </div>
  );
}
export function ToastStack({ children }) {
  return <div className="hrs-toast__stack">{children}</div>;
}
