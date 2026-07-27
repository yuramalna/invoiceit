import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from '../core/Icon.jsx';

injectStyle('sidebarnav', `
.hrs-nav{width:var(--sidebar-w);flex:0 0 var(--sidebar-w);height:100%;display:flex;flex-direction:column;gap:var(--space-6);padding:var(--space-6) var(--space-4);background:var(--surface-sunken);border-right:1px solid var(--line-rule)}
.hrs-nav__brand{display:flex;align-items:baseline;gap:8px;padding:0 var(--space-2)}
.hrs-nav__mark{font-family:var(--font-display);font-weight:var(--weight-display);font-size:21px;letter-spacing:-.045em;color:var(--ink-900)}
.hrs-nav__mark em{font-style:normal;color:var(--terracotta-500)}
.hrs-nav__ver{font-family:var(--font-mono);font-size:10px;color:var(--text-faint)}
.hrs-nav__group{display:flex;flex-direction:column;gap:2px}
.hrs-nav__gl{padding:0 var(--space-2) var(--space-2);font-size:var(--label-size);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);color:var(--text-faint)}
.hrs-nav__item{display:flex;align-items:center;gap:var(--space-3);height:32px;padding:0 var(--space-2);border:0;background:none;border-radius:var(--radius-sm);cursor:pointer;font-size:14px;color:var(--ink-500);text-align:left;transition:var(--transition-control)}
.hrs-nav__item:hover{background:var(--paper-200);color:var(--ink-900)}
.hrs-nav__item--on{background:var(--surface-raised);color:var(--ink-900);font-weight:var(--weight-medium);box-shadow:var(--shadow-sm)}
.hrs-nav__item span{flex:1}
.hrs-nav__badge{font-family:var(--font-mono);font-size:11px;color:var(--text-faint);font-variant-numeric:tabular-nums}
.hrs-nav__foot{margin-top:auto;display:flex;flex-direction:column;gap:var(--space-2)}
`);

export function SidebarNav({ groups = [], value, onChange, brand = 'Hours', footer }) {
  return (
    <nav className="hrs-nav">
      <div className="hrs-nav__brand">
        <span className="hrs-nav__mark">{brand}<em>.</em></span>
        <span className="hrs-nav__ver">self-hosted</span>
      </div>
      {groups.map((g, gi) => (
        <div className="hrs-nav__group" key={gi}>
          {g.label ? <div className="hrs-nav__gl">{g.label}</div> : null}
          {g.items.map((it) => (
            <button key={it.value} onClick={() => onChange && onChange(it.value)}
              className={['hrs-nav__item', value === it.value ? 'hrs-nav__item--on' : ''].join(' ').trim()}>
              <Icon name={it.icon} size={15} />
              <span>{it.label}</span>
              {it.badge != null ? <span className="hrs-nav__badge">{it.badge}</span> : null}
            </button>
          ))}
        </div>
      ))}
      {footer ? <div className="hrs-nav__foot">{footer}</div> : null}
    </nav>
  );
}
