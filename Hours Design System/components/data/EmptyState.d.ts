/** Zero-data state for lists and reports; sits on the ruled-paper texture. */
export interface EmptyStateProps {
  /** Lucide name. @default "Clock" */
  icon?: string;
  /** Serif, short, no punctuation, e.g. "No time logged yet". */
  title: string;
  /** One plain sentence saying what to do next. */
  body?: string;
  action?: React.ReactNode;
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
