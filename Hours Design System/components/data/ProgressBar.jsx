import React from 'react';
import { injectStyle } from '../_internal/style.js';

injectStyle('progress', `
.hrs-prog{display:flex;flex-direction:column;gap:6px}
.hrs-prog__track{height:4px;border-radius:var(--radius-pill);background:var(--paper-200);overflow:hidden}
.hrs-prog__fill{height:100%;border-radius:var(--radius-pill);transition:width var(--dur-slow) var(--ease-out)}
.hrs-prog__meta{display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted)}
.hrs-prog__meta b{font-family:var(--font-mono);font-variant-numeric:tabular-nums;font-weight:var(--weight-medium);color:var(--ink-700)}
`);

export function ProgressBar({ value, max = 100, color = 'var(--pine-500)', left, right }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="hrs-prog">
      {(left || right) ? <div className="hrs-prog__meta"><span>{left}</span><span>{right}</span></div> : null}
      <div className="hrs-prog__track"><div className="hrs-prog__fill" style={{ width: pct + '%', background: color }} /></div>
    </div>
  );
}
