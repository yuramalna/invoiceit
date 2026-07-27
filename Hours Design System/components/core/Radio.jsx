import React from 'react';
import { injectStyle } from '../_internal/style.js';

injectStyle('radio', `
.hrs-radio{display:inline-flex;align-items:flex-start;gap:var(--space-2);cursor:pointer;font-size:14px;color:var(--ink-700)}
.hrs-radio input{position:absolute;opacity:0;width:0;height:0}
.hrs-radio__dot{flex:0 0 auto;width:16px;height:16px;margin-top:1px;border:1px solid var(--line-strong);border-radius:var(--radius-pill);background:var(--surface-raised);display:flex;align-items:center;justify-content:center;transition:var(--transition-control)}
.hrs-radio__dot::after{content:'';width:7px;height:7px;border-radius:var(--radius-pill);background:var(--pine-700);transform:scale(0);transition:transform var(--dur-fast) var(--ease-out)}
.hrs-radio:hover .hrs-radio__dot{border-color:var(--pine-500)}
.hrs-radio--on .hrs-radio__dot{border-color:var(--pine-700)}
.hrs-radio--on .hrs-radio__dot::after{transform:scale(1)}
.hrs-radio input:focus-visible + .hrs-radio__dot{box-shadow:var(--ring-focus)}
.hrs-radio--disabled{opacity:.45;cursor:not-allowed}
.hrs-radio__note{display:block;font-size:12px;color:var(--text-muted)}
`);

export function Radio({ checked, label, note, name, disabled, onChange, value }) {
  return (
    <label className={['hrs-radio', checked ? 'hrs-radio--on' : '', disabled ? 'hrs-radio--disabled' : ''].join(' ').trim()}>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange} />
      <span className="hrs-radio__dot" />
      {label ? <span>{label}{note ? <span className="hrs-radio__note">{note}</span> : null}</span> : null}
    </label>
  );
}
