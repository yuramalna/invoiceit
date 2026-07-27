import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Duration } from './Duration.jsx';
import { Icon } from '../core/Icon.jsx';
import { Input } from '../core/Input.jsx';
import { Select } from '../core/Select.jsx';

injectStyle('timer', `
.hrs-timer{display:flex;align-items:center;gap:var(--space-4);padding:var(--space-4) var(--gutter-inline);background:var(--surface-raised);border:1px solid var(--line-rule);border-radius:var(--radius-lg);box-shadow:var(--shadow-card)}
.hrs-timer--running{border-color:var(--terracotta-200);background:linear-gradient(to right,var(--terracotta-50),var(--surface-raised) 40%)}
.hrs-timer__fields{flex:1;display:flex;align-items:center;gap:var(--space-3);min-width:0}
.hrs-timer__task{flex:1;min-width:0}
.hrs-timer__clock{display:flex;align-items:center;gap:var(--space-2);padding-left:var(--space-4);border-left:1px solid var(--line-rule)}
.hrs-timer__pulse{width:6px;height:6px;border-radius:var(--radius-pill);background:var(--terracotta-500);animation:hours-pulse 1.8s var(--ease-in-out) infinite}
.hrs-timer__btn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border:0;border-radius:var(--radius-pill);cursor:pointer;transition:var(--transition-control);color:#fff}
.hrs-timer__btn--start{background:var(--terracotta-500)}
.hrs-timer__btn--start:hover{background:var(--terracotta-600)}
.hrs-timer__btn--stop{background:var(--ink-900)}
.hrs-timer__btn--stop:hover{background:var(--ink-700)}
.hrs-timer__btn:focus-visible{outline:none;box-shadow:var(--ring-focus)}
`);

export function Timer({ running = false, seconds = 0, task = '', projects = [], project, dotColor, onStart, onStop, onTaskChange, onProjectChange, ticking = true }) {
  const [elapsed, setElapsed] = React.useState(seconds);
  React.useEffect(() => setElapsed(seconds), [seconds]);
  React.useEffect(() => {
    if (!running || !ticking) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running, ticking]);
  return (
    <div className={['hrs-timer', running ? 'hrs-timer--running' : ''].join(' ').trim()}>
      <div className="hrs-timer__fields">
        <div className="hrs-timer__task">
          {onTaskChange
            ? <Input seamless placeholder="What are you working on?" value={task} onChange={(e) => onTaskChange(e.target.value)} />
            : <Input seamless placeholder="What are you working on?" defaultValue={task} key={task} />}
        </div>
        {projects.length ? (
          onProjectChange
            ? <Select seamless size="md" options={projects} value={project} dotColor={dotColor} onChange={(e) => onProjectChange(e.target.value)} />
            : <Select seamless size="md" options={projects} defaultValue={project} key={project} dotColor={dotColor} />
        ) : null}
      </div>
      <div className="hrs-timer__clock">
        {running ? <span className="hrs-timer__pulse" /> : null}
        <Duration seconds={elapsed} size="lg" tone={running ? 'live' : 'muted'} />
      </div>
      <button type="button" aria-label={running ? 'Stop timer' : 'Start timer'}
        className={'hrs-timer__btn ' + (running ? 'hrs-timer__btn--stop' : 'hrs-timer__btn--start')}
        onClick={running ? onStop : onStart}>
        <Icon name={running ? 'Square' : 'Play'} size={15} strokeWidth={2} color="#fff" />
      </button>
    </div>
  );
}
