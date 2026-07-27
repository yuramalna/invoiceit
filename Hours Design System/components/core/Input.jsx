import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from './Icon.jsx';

injectStyle('input', `
.hrs-input{display:flex;align-items:center;gap:var(--space-2);height:var(--control-h);padding:0 var(--space-3);background:var(--surface-raised);border:1px solid var(--line-rule);border-radius:var(--radius-md);transition:var(--transition-control)}
.hrs-input:hover{border-color:var(--line-strong)}
.hrs-input:focus-within{border-color:var(--pine-500);box-shadow:var(--ring-focus)}
.hrs-input--lg{height:var(--control-h-lg)}
.hrs-input--sm{height:var(--control-h-sm);padding:0 var(--space-2)}
.hrs-input--invalid{border-color:var(--rust-500)}
.hrs-input--invalid:focus-within{box-shadow:0 0 0 3px rgba(166,58,42,.15)}
.hrs-input--disabled{background:var(--paper-100);opacity:.7}
.hrs-input--seamless{background:transparent;border-color:transparent;box-shadow:none}
.hrs-input--seamless:hover{background:var(--surface-hover);border-color:transparent}
.hrs-input__el{flex:1;min-width:0;border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:14px;color:var(--ink-900)}
.hrs-input__el::placeholder{color:var(--text-faint)}
.hrs-input--num .hrs-input__el{font-family:var(--font-mono);font-variant-numeric:tabular-nums;letter-spacing:var(--num-ls)}
.hrs-input--right .hrs-input__el{text-align:right}
.hrs-input__affix{font-size:13px;color:var(--text-faint);font-family:var(--font-mono);flex:0 0 auto}
.hrs-input textarea.hrs-input__el{resize:vertical;padding:0;line-height:1.5}
.hrs-input--area{height:auto;padding:var(--space-3)}
`);

export function Input({ prefix, suffix, icon, size = 'md', numeric, align, invalid, seamless, multiline, rows = 3, disabled, ...rest }) {
  const cls = ['hrs-input', size !== 'md' ? 'hrs-input--' + size : '', numeric ? 'hrs-input--num' : '',
    align === 'right' ? 'hrs-input--right' : '', invalid ? 'hrs-input--invalid' : '',
    seamless ? 'hrs-input--seamless' : '', disabled ? 'hrs-input--disabled' : '', multiline ? 'hrs-input--area' : ''].join(' ').trim();
  return (
    <div className={cls}>
      {icon ? <Icon name={icon} size={14} color="var(--text-faint)" /> : null}
      {prefix ? <span className="hrs-input__affix">{prefix}</span> : null}
      {multiline
        ? <textarea className="hrs-input__el" rows={rows} disabled={disabled} {...rest} />
        : <input className="hrs-input__el" disabled={disabled} {...rest} />}
      {suffix ? <span className="hrs-input__affix">{suffix}</span> : null}
    </div>
  );
}
