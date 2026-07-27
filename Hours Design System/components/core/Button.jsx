import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from './Icon.jsx';

injectStyle('button', `
.hrs-btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);font-family:var(--font-sans);font-weight:var(--weight-medium);letter-spacing:-.002em;border-radius:var(--radius-md);border:1px solid transparent;cursor:pointer;white-space:nowrap;transition:var(--transition-control);text-decoration:none}
.hrs-btn:disabled{cursor:not-allowed;opacity:.45}
.hrs-btn--md{height:var(--control-h);padding:0 var(--space-4);font-size:14px}
.hrs-btn--sm{height:var(--control-h-sm);padding:0 var(--space-3);font-size:12.5px}
.hrs-btn--lg{height:var(--control-h-lg);padding:0 var(--space-5);font-size:15px}
.hrs-btn--full{width:100%}
.hrs-btn--primary{background:var(--pine-700);color:var(--paper-50);box-shadow:var(--shadow-sm)}
.hrs-btn--primary:hover:not(:disabled){background:var(--pine-600)}
.hrs-btn--primary:active:not(:disabled){background:var(--pine-700);box-shadow:none}
.hrs-btn--secondary{background:var(--surface-raised);color:var(--ink-700);border-color:var(--line-rule);box-shadow:var(--shadow-sm)}
.hrs-btn--secondary:hover:not(:disabled){background:var(--paper-50);border-color:var(--line-strong)}
.hrs-btn--secondary:active:not(:disabled){background:var(--paper-100);box-shadow:none}
.hrs-btn--ghost{background:transparent;color:var(--ink-500)}
.hrs-btn--ghost:hover:not(:disabled){background:var(--surface-hover);color:var(--ink-700)}
.hrs-btn--ghost:active:not(:disabled){background:var(--surface-active)}
.hrs-btn--accent{background:var(--terracotta-500);color:#fff;box-shadow:var(--shadow-sm)}
.hrs-btn--accent:hover:not(:disabled){background:var(--terracotta-600)}
.hrs-btn--danger{background:transparent;color:var(--rust-500);border-color:var(--rust-500)}
.hrs-btn--danger:hover:not(:disabled){background:var(--rust-50)}
.hrs-btn:focus-visible{outline:none;box-shadow:var(--ring-focus)}
`);

export function Button({ children, variant = 'secondary', size = 'md', icon, iconRight, full, as = 'button', ...rest }) {
  const Tag = as;
  const cls = ['hrs-btn', 'hrs-btn--' + variant, 'hrs-btn--' + size, full ? 'hrs-btn--full' : ''].join(' ').trim();
  const s = size === 'sm' ? 13 : 15;
  return (
    <Tag className={cls} {...rest}>
      {icon ? <Icon name={icon} size={s} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={s} /> : null}
    </Tag>
  );
}
