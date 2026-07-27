/** Hover label for icon-only controls and truncated values. */
export interface TooltipProps {
  /** Short, no trailing period. Wrap numbers in <b> for mono figures. */
  label: React.ReactNode;
  /** @default "top" */
  placement?: 'top' | 'bottom';
  children?: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
