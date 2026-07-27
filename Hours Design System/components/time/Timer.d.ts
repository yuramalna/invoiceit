/**
 * The running-clock bar: task field, project picker, elapsed time, start/stop.
 * @startingPoint section="Time" subtitle="Running timer bar" viewport="700x120"
 */
export interface TimerProps {
  running?: boolean;
  /** Starting elapsed seconds; the component ticks from here while running. */
  seconds?: number;
  task?: string;
  /** Options for the project picker; strings or {value,label}. */
  projects?: Array<string | { value: string; label: string }>;
  project?: string;
  /** Identity dot for the selected client, e.g. "var(--client-2)". */
  dotColor?: string;
  onStart?: () => void;
  onStop?: () => void;
  onTaskChange?: (value: string) => void;
  onProjectChange?: (value: string) => void;
  /** Set false to freeze the clock (screenshots, cards). @default true */
  ticking?: boolean;
}
export declare function Timer(props: TimerProps): JSX.Element;
