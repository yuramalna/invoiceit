import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Duration } from './Duration.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { Badge } from '../data/Badge.jsx';

injectStyle('entryrow', `
.hrs-entry{display:flex;align-items:center;gap:var(--space-4);height:56px;padding:0 var(--gutter-inline);border-bottom:1px solid var(--line-hairline);transition:background-color var(--dur-fast) var(--ease-out)}
.hrs-entry:hover{background:var(--surface-hover)}
.hrs-entry:last-child{border-bottom:0}
.hrs-entry__dot{width:7px;height:7px;border-radius:var(--radius-pill);flex:0 0 auto}
.hrs-entry__main{flex:1;min-width:0}
.hrs-entry__task{font-size:14px;color:var(--ink-900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hrs-entry__meta{font-size:12px;color:var(--text-muted);display:flex;gap:6px;align-items:center;margin-top:2px}
.hrs-entry__span{font-family:var(--font-mono);font-size:12px;color:var(--text-faint);font-variant-numeric:tabular-nums}
.hrs-entry__amt{font-family:var(--font-mono);font-variant-numeric:tabular-nums;font-size:13px;color:var(--text-muted);min-width:72px;text-align:right}
.hrs-entry__acts{display:flex;gap:2px;opacity:0;transition:opacity var(--dur-fast) var(--ease-out)}
.hrs-entry:hover .hrs-entry__acts{opacity:1}
.hrs-entry--running{background:var(--terracotta-50)}
`);

export function TimeEntryRow({ task, client, project, dotColor = 'var(--client-1)', span, seconds = 0, amount, billable = true, running, onResume, onEdit, onDelete }) {
  return (
    <div className={['hrs-entry', running ? 'hrs-entry--running' : ''].join(' ').trim()}>
      <span className="hrs-entry__dot" style={{ background: dotColor }} />
      <div className="hrs-entry__main">
        <div className="hrs-entry__task">{task}</div>
        <div className="hrs-entry__meta">
          <span>{client}{project ? ' · ' + project : ''}</span>
          {span ? <span className="hrs-entry__span">{span}</span> : null}
          {!billable ? <Badge tone="draft">Non-billable</Badge> : null}
          {running ? <Badge tone="live" dot pulse>Running</Badge> : null}
        </div>
      </div>
      {amount ? <span className="hrs-entry__amt">{amount}</span> : null}
      <Duration seconds={seconds} format="decimal" size="md" tone={running ? 'live' : 'default'} />
      <div className="hrs-entry__acts">
        {onResume ? <IconButton icon="Play" size="sm" label="Resume" onClick={onResume} /> : null}
        {onEdit ? <IconButton icon="Pencil" size="sm" label="Edit" onClick={onEdit} /> : null}
        {onDelete ? <IconButton icon="Trash2" size="sm" tone="danger" label="Delete" onClick={onDelete} /> : null}
      </div>
    </div>
  );
}
