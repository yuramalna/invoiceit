/** Native select styled to match Input. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Strings, or {value,label} pairs. */
  options?: Array<string | { value: string; label: string }>;
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Chromeless until hover — for in-row client/project pickers. */
  seamless?: boolean;
  /** Shows a client identity dot at the leading edge, e.g. "var(--client-2)". */
  dotColor?: string;
}
export declare function Select(props: SelectProps): JSX.Element;
