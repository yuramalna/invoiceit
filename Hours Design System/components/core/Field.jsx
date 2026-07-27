import React from 'react';
import { injectStyle } from '../_internal/style.js';

injectStyle('field', `
.hrs-field{display:flex;flex-direction:column;gap:var(--space-2)}
.hrs-field__label{font-size:var(--label-size);line-height:var(--label-lh);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);color:var(--text-muted);display:flex;align-items:center;gap:var(--space-2)}
.hrs-field__opt{text-transform:none;letter-spacing:-.005em;font-size:11px;color:var(--text-faint);font-weight:var(--weight-regular)}
.hrs-field__hint{font-size:12px;color:var(--text-muted)}
.hrs-field__err{font-size:12px;color:var(--rust-500)}
`);

export function Field({ label, hint, error, optional, htmlFor, children }) {
  return (
    <div className="hrs-field">
      {label ? (
        <label className="hrs-field__label" htmlFor={htmlFor}>
          {label}{optional ? <span className="hrs-field__opt">optional</span> : null}
        </label>
      ) : null}
      {children}
      {error ? <span className="hrs-field__err">{error}</span> : hint ? <span className="hrs-field__hint">{hint}</span> : null}
    </div>
  );
}
