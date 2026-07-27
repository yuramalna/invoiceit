/** Hours-against-budget meter. 4px track, no labels inside the bar. */
export interface ProgressBarProps {
  value: number;
  /** @default 100 */
  max?: number;
  /** Fill colour; use a --client-N token when the bar represents a client. @default "var(--pine-500)" */
  color?: string;
  /** Caption above-left, e.g. a project name. */
  left?: React.ReactNode;
  /** Caption above-right, e.g. "18.5 / 40h". Wrap numbers in <b>. */
  right?: React.ReactNode;
}
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
