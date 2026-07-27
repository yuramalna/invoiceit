import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from '../core/Icon.jsx';

injectStyle('tag', `
.hrs-tag{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 8px;border:1px solid var(--line-rule);border-radius:var(--radius-pill);background:var(--surface-raised);font-size:12px;color:var(--ink-500);white-space:nowrap;transition:var(--transition-control)}
.hrs-tag--clickable{cursor:pointer}
.hrs-tag--clickable:hover{border-color:var(--line-strong);color:var(--ink-700)}
.hrs-tag__dot{width:6px;height:6px;border-radius:var(--radius-pill);flex:0 0 auto}
.hrs-tag__x{display:flex;color:var(--text-faint);cursor:pointer}
.hrs-tag__x:hover{color:var(--rust-500)}
`);

export function Tag({ children, color, onRemove, onClick }) {
  return (
    <span className={['hrs-tag', onClick ? 'hrs-tag--clickable' : ''].join(' ').trim()} onClick={onClick}>
      {color ? <span className="hrs-tag__dot" style={{ background: color }} /> : null}
      {children}
      {onRemove ? <span className="hrs-tag__x" onClick={(e) => { e.stopPropagation(); onRemove(e); }}><Icon name="X" size={11} /></span> : null}
    </span>
  );
}
