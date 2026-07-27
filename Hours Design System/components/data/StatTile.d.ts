/**
 * Single headline number: hours tracked, amount billable, invoices outstanding.
 * @startingPoint section="Dashboard" subtitle="Headline stat tiles" viewport="700x180"
 */
export interface StatTileProps {
  /** Uppercase eyebrow, e.g. "Billable this week". */
  label: string;
  /** The number itself, pre-formatted. Rendered in mono tabular figures. */
  value: string | number;
  /** Small sans unit trailing the value, e.g. "h" or "hrs". */
  unit?: string;
  /** Comparison text, e.g. "+3.5h". */
  delta?: string;
  /** Colours + arrows the delta. */
  direction?: 'up' | 'down';
  /** Neutral trailing note, e.g. "vs. last week". */
  note?: string;
  /** Drops the card chrome and uses a left rule — for tiles in a row inside a Card. */
  bare?: boolean;
}
export declare function StatTile(props: StatTileProps): JSX.Element;
