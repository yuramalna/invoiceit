import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from './Icon.jsx';

injectStyle('iconbutton', `
.hrs-iconbtn{display:inline-flex;align-items:center;justify-content:center;background:transparent;border:1px solid transparent;border-radius:var(--radius-sm);color:var(--ink-400);cursor:pointer;transition:var(--transition-control)}
.hrs-iconbtn:hover:not(:disabled){background:var(--surface-hover);color:var(--ink-700)}
.hrs-iconbtn:active:not(:disabled){background:var(--surface-active)}
.hrs-iconbtn:disabled{opacity:.4;cursor:not-allowed}
.hrs-iconbtn:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.hrs-iconbtn--outlined{border-color:var(--line-rule);background:var(--surface-raised)}
.hrs-iconbtn--sm{width:24px;height:24px}
.hrs-iconbtn--md{width:30px;height:30px}
.hrs-iconbtn--lg{width:36px;height:36px}
.hrs-iconbtn--danger:hover:not(:disabled){background:var(--rust-50);color:var(--rust-500)}
`);

export function IconButton({ icon, size = 'md', outlined, tone = 'default', label, ...rest }) {
  const px = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;
  return (
    <button type="button" aria-label={label} title={label}
      className={['hrs-iconbtn', 'hrs-iconbtn--' + size, outlined ? 'hrs-iconbtn--outlined' : '', tone === 'danger' ? 'hrs-iconbtn--danger' : ''].join(' ').trim()}
      {...rest}>
      <Icon name={icon} size={px} />
    </button>
  );
}
