/** Square, label-less control for row actions and toolbars. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name. */
  icon: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Adds a hairline rule + white fill; use when the button sits on paper, not in a row. */
  outlined?: boolean;
  /** @default "default" */
  tone?: 'default' | 'danger';
  /** Required accessible name, also used as the tooltip. */
  label: string;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
