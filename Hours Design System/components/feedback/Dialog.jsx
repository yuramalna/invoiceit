import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { IconButton } from '../core/IconButton.jsx';

injectStyle('dialog', `
.hrs-scrim{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:var(--space-8);background:rgba(22,21,16,.32);backdrop-filter:blur(2px);z-index:40;animation:hours-fade-up var(--dur-base) var(--ease-out)}
.hrs-dialog{width:100%;max-width:480px;background:var(--surface-raised);border:1px solid var(--line-rule);border-radius:var(--radius-xl);box-shadow:var(--shadow-modal);overflow:hidden}
.hrs-dialog--wide{max-width:680px}
.hrs-dialog__head{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-5) var(--space-6) var(--space-4)}
.hrs-dialog__title{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--display-3-size);line-height:var(--display-3-lh);letter-spacing:var(--display-3-ls);color:var(--text-display)}
.hrs-dialog__sub{font-size:13px;color:var(--text-muted);margin-top:var(--space-1)}
.hrs-dialog__body{padding:0 var(--space-6) var(--space-6);display:flex;flex-direction:column;gap:var(--space-4)}
.hrs-dialog__foot{display:flex;justify-content:flex-end;gap:var(--space-2);padding:var(--space-4) var(--space-6);background:var(--surface-sunken);border-top:1px solid var(--line-rule)}
`);

export function Dialog({ open = true, title, subtitle, footer, wide, onClose, children }) {
  if (!open) return null;
  return (
    <div className="hrs-scrim" onClick={onClose}>
      <div className={['hrs-dialog', wide ? 'hrs-dialog--wide' : ''].join(' ').trim()} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <header className="hrs-dialog__head">
          <div>
            <div className="hrs-dialog__title">{title}</div>
            {subtitle ? <div className="hrs-dialog__sub">{subtitle}</div> : null}
          </div>
          {onClose ? <IconButton icon="X" size="sm" label="Close" onClick={onClose} /> : null}
        </header>
        <div className="hrs-dialog__body">{children}</div>
        {footer ? <footer className="hrs-dialog__foot">{footer}</footer> : null}
      </div>
    </div>
  );
}
