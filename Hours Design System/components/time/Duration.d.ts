/** Renders elapsed time in the two formats Hours uses: wall clock and decimal hours. */
export interface DurationProps {
  seconds?: number;
  /** clock = 02:14:08 (tracking UI). decimal = 2.24 (tables, invoices). @default "clock" */
  format?: 'clock' | 'decimal';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** live turns the value terracotta — only while a timer runs. @default "default" */
  tone?: 'default' | 'live' | 'muted';
  /** Dims and can hide the seconds pair. @default true */
  showSeconds?: boolean;
}
export declare function Duration(props: DurationProps): JSX.Element;
/** 02:14:08 parts. */
export declare function formatClock(seconds: number): [string, string, string];
/** "2.24" — decimal hours to 2dp. */
export declare function formatDecimal(seconds: number): string;
