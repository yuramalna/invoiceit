import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from '../core/Icon.jsx';

injectStyle('empty', `
.hrs-empty{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--space-3);padding:var(--space-16) var(--space-8);background-image:var(--texture-rule)}
.hrs-empty__icon{color:var(--ink-200)}
.hrs-empty__title{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--display-3-size);line-height:var(--display-3-lh);letter-spacing:var(--display-3-ls);color:var(--text-display)}
.hrs-empty__body{max-width:38ch;font-size:14px;color:var(--text-muted)}
.hrs-empty__act{margin-top:var(--space-2)}
`);

export function EmptyState({ icon = 'Clock', title, body, action }) {
  return (
    <div className="hrs-empty">
      {icon ? <Icon name={icon} size={28} strokeWidth={1.25} className="hrs-empty__icon" /> : null}
      <div className="hrs-empty__title">{title}</div>
      {body ? <p className="hrs-empty__body">{body}</p> : null}
      {action ? <div className="hrs-empty__act">{action}</div> : null}
    </div>
  );
}
