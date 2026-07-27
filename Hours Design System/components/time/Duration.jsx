import React from 'react';
import { injectStyle } from '../_internal/style.js';

injectStyle('duration', `
.hrs-dur{font-family:var(--font-mono);font-variant-numeric:tabular-nums;letter-spacing:var(--num-ls);color:var(--ink-900)}
.hrs-dur--sm{font-size:var(--num-sm-size)}
.hrs-dur--md{font-size:var(--num-md-size)}
.hrs-dur--lg{font-size:var(--num-lg-size);line-height:1.05}
.hrs-dur--xl{font-size:52px;line-height:1}
.hrs-dur--live{color:var(--terracotta-600)}
.hrs-dur--muted{color:var(--text-muted)}
.hrs-dur__sec{opacity:.45}
`);

export function formatClock(seconds) {
  const s = Math.max(0, Math.round(seconds));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return [String(h).padStart(2, '0'), String(m).padStart(2, '0'), String(sec).padStart(2, '0')];
}
export function formatDecimal(seconds) {
  return (Math.round((seconds / 3600) * 100) / 100).toFixed(2);
}

export function Duration({ seconds = 0, format = 'clock', size = 'md', tone = 'default', showSeconds = true }) {
  const cls = ['hrs-dur', 'hrs-dur--' + size, tone !== 'default' ? 'hrs-dur--' + tone : ''].join(' ').trim();
  if (format === 'decimal') return <span className={cls}>{formatDecimal(seconds)}</span>;
  const [h, m, s] = formatClock(seconds);
  return (
    <span className={cls}>
      {h}:{m}{showSeconds ? <span className="hrs-dur__sec">:{s}</span> : null}
    </span>
  );
}
