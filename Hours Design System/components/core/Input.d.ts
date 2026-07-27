/** Single- or multi-line text entry. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Static text before the value, e.g. "$". Rendered in mono. */
  prefix?: string;
  /** Static text after the value, e.g. "/hr" or "h". */
  suffix?: string;
  /** Lucide icon name at the leading edge (search fields). */
  icon?: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Mono + tabular figures. Use for durations, rates, amounts. */
  numeric?: boolean;
  align?: 'left' | 'right';
  invalid?: boolean;
  /** No border until hover/focus — for inline editing inside table rows. */
  seamless?: boolean;
  multiline?: boolean;
  rows?: number;
}
export declare function Input(props: InputProps): JSX.Element;
