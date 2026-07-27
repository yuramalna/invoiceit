/** Status marker for invoices and entries. Uppercase, never sentence case. */
export interface BadgeProps {
  /** Maps to the status colour pairs in tokens/colors.css. @default "draft" */
  tone?: 'live' | 'paid' | 'pending' | 'overdue' | 'draft' | 'info';
  /** Leading 5px dot. */
  dot?: boolean;
  /** Pulses the dot — only for a running timer. */
  pulse?: boolean;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
