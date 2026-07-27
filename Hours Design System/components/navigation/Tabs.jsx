import React from 'react';
import { injectStyle } from '../_internal/style.js';

injectStyle('tabs', `
.hrs-tabs{display:flex;gap:var(--space-5);border-bottom:1px solid var(--line-rule)}
.hrs-tabs__tab{position:relative;padding:0 0 var(--space-3);background:none;border:0;cursor:pointer;font-size:14px;color:var(--text-muted);transition:color var(--dur-fast) var(--ease-out);display:inline-flex;align-items:center;gap:6px}
.hrs-tabs__tab:hover{color:var(--ink-700)}
.hrs-tabs__tab--on{color:var(--ink-900);font-weight:var(--weight-medium)}
.hrs-tabs__tab--on::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:1.5px;background:var(--ink-900)}
.hrs-tabs__count{font-family:var(--font-mono);font-size:11px;color:var(--text-faint);font-variant-numeric:tabular-nums}
`);

export function Tabs({ tabs = [], value, onChange }) {
  return (
    <div className="hrs-tabs" role="tablist">
      {tabs.map((t) => {
        const v = typeof t === 'string' ? t : t.value;
        const l = typeof t === 'string' ? t : t.label;
        const c = typeof t === 'string' ? null : t.count;
        return (
          <button key={v} role="tab" aria-selected={value === v} onClick={() => onChange && onChange(v)}
            className={['hrs-tabs__tab', value === v ? 'hrs-tabs__tab--on' : ''].join(' ').trim()}>
            {l}{c != null ? <span className="hrs-tabs__count">{c}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
