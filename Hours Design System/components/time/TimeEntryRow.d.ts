/**
 * One logged entry, as it appears in the day list.
 * @startingPoint section="Time" subtitle="Time entry list rows" viewport="700x200"
 */
export interface TimeEntryRowProps {
  task: string;
  client: string;
  project?: string;
  /** Client identity dot, a --client-N token. @default "var(--client-1)" */
  dotColor?: string;
  /** Start–end text, e.g. "09:15 – 11:30". */
  span?: string;
  seconds?: number;
  /** Pre-formatted money, e.g. "$213.75". */
  amount?: string;
  /** @default true */
  billable?: boolean;
  running?: boolean;
  onResume?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
export declare function TimeEntryRow(props: TimeEntryRowProps): JSX.Element;
