import React from 'react';
import { injectStyle } from '../_internal/style.js';

injectStyle('card', `
.hrs-card{background:var(--surface-card);border:1px solid var(--line-rule);border-radius:var(--radius-lg);overflow:hidden}
.hrs-card--raised{background:var(--surface-raised);box-shadow:var(--shadow-card)}
.hrs-card--flat{background:transparent;border-color:var(--line-hairline)}
.hrs-card__head{display:flex;align-items:baseline;justify-content:space-between;gap:var(--space-4);padding:var(--space-4) var(--gutter-inline);border-bottom:1px solid var(--line-rule)}
.hrs-card__title{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--title-1-size);line-height:var(--title-1-lh);letter-spacing:var(--title-1-ls);color:var(--text-display)}
.hrs-card__eyebrow{font-size:var(--label-size);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);color:var(--text-muted);margin-bottom:var(--space-2)}
.hrs-card__body{padding:var(--gutter-inline)}
.hrs-card__body--flush{padding:0}
`);

export function Card({ title, eyebrow, action, flush, variant = 'default', children, style, ...rest }) {
  return (
    <section className={['hrs-card', variant !== 'default' ? 'hrs-card--' + variant : ''].join(' ').trim()} style={style} {...rest}>
      {(title || eyebrow || action) ? (
        <header className="hrs-card__head">
          <div>
            {eyebrow ? <div className="hrs-card__eyebrow">{eyebrow}</div> : null}
            {title ? <h2 className="hrs-card__title">{title}</h2> : null}
          </div>
          {action}
        </header>
      ) : null}
      <div className={['hrs-card__body', flush ? 'hrs-card__body--flush' : ''].join(' ').trim()}>{children}</div>
    </section>
  );
}
