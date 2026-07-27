import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from './Icon.jsx';

injectStyle('select', `
.hrs-select{position:relative;display:flex;align-items:center;height:var(--control-h);background:var(--surface-raised);border:1px solid var(--line-rule);border-radius:var(--radius-md);transition:var(--transition-control)}
.hrs-select:hover{border-color:var(--line-strong)}
.hrs-select:focus-within{border-color:var(--pine-500);box-shadow:var(--ring-focus)}
.hrs-select--sm{height:var(--control-h-sm)}
.hrs-select--seamless{background:transparent;border-color:transparent}
.hrs-select--seamless:hover{background:var(--surface-hover)}
.hrs-select__el{appearance:none;flex:1;min-width:0;border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:14px;color:var(--ink-900);padding:0 26px 0 var(--space-3);height:100%;cursor:pointer}
.hrs-select__chev{position:absolute;right:var(--space-2);pointer-events:none;color:var(--text-faint)}
.hrs-select__dot{position:absolute;left:var(--space-3);width:7px;height:7px;border-radius:var(--radius-pill);pointer-events:none}
.hrs-select--dotted .hrs-select__el{padding-left:26px}
`);

export function Select({ options = [], size = 'md', seamless, dotColor, ...rest }) {
  return (
    <div className={['hrs-select', size !== 'md' ? 'hrs-select--' + size : '', seamless ? 'hrs-select--seamless' : '', dotColor ? 'hrs-select--dotted' : ''].join(' ').trim()}>
      {dotColor ? <span className="hrs-select__dot" style={{ background: dotColor }} /> : null}
      <select className="hrs-select__el" {...rest}>
        {options.map((o) => {
          const v = typeof o === 'string' ? o : o.value;
          const l = typeof o === 'string' ? o : o.label;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
      <Icon name="ChevronDown" size={14} className="hrs-select__chev" />
    </div>
  );
}
