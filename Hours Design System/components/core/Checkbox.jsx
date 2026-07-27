import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from './Icon.jsx';

injectStyle('checkbox', `
.hrs-check{display:inline-flex;align-items:flex-start;gap:var(--space-2);cursor:pointer;font-size:14px;color:var(--ink-700)}
.hrs-check input{position:absolute;opacity:0;width:0;height:0}
.hrs-check__box{flex:0 0 auto;width:16px;height:16px;margin-top:1px;border:1px solid var(--line-strong);border-radius:var(--radius-xs);background:var(--surface-raised);display:flex;align-items:center;justify-content:center;color:transparent;transition:var(--transition-control)}
.hrs-check:hover .hrs-check__box{border-color:var(--pine-500)}
.hrs-check--on .hrs-check__box{background:var(--pine-700);border-color:var(--pine-700);color:#fff}
.hrs-check input:focus-visible + .hrs-check__box{box-shadow:var(--ring-focus)}
.hrs-check--disabled{opacity:.45;cursor:not-allowed}
.hrs-check__note{display:block;font-size:12px;color:var(--text-muted)}
`);

export function Checkbox({ checked, label, note, disabled, onChange, ...rest }) {
  return (
    <label className={['hrs-check', checked ? 'hrs-check--on' : '', disabled ? 'hrs-check--disabled' : ''].join(' ').trim()}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} {...rest} />
      <span className="hrs-check__box"><Icon name="Check" size={11} strokeWidth={2.5} /></span>
      {label ? <span>{label}{note ? <span className="hrs-check__note">{note}</span> : null}</span> : null}
    </label>
  );
}
