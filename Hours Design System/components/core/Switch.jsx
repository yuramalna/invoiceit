import React from 'react';
import { injectStyle } from '../_internal/style.js';

injectStyle('switch', `
.hrs-switch{display:inline-flex;align-items:center;gap:var(--space-3);cursor:pointer;font-size:14px;color:var(--ink-700)}
.hrs-switch input{position:absolute;opacity:0;width:0;height:0}
.hrs-switch__track{position:relative;flex:0 0 auto;width:32px;height:18px;border-radius:var(--radius-pill);background:var(--paper-300);transition:background-color var(--dur-fast) var(--ease-out)}
.hrs-switch__knob{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:var(--radius-pill);background:var(--surface-raised);box-shadow:var(--shadow-sm);transition:transform var(--dur-fast) var(--ease-out)}
.hrs-switch--on .hrs-switch__track{background:var(--pine-600)}
.hrs-switch--on .hrs-switch__knob{transform:translateX(14px)}
.hrs-switch input:focus-visible + .hrs-switch__track{box-shadow:var(--ring-focus)}
.hrs-switch--disabled{opacity:.45;cursor:not-allowed}
`);

export function Switch({ checked, label, disabled, onChange }) {
  return (
    <label className={['hrs-switch', checked ? 'hrs-switch--on' : '', disabled ? 'hrs-switch--disabled' : ''].join(' ').trim()}>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={onChange} />
      <span className="hrs-switch__track"><span className="hrs-switch__knob" /></span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
