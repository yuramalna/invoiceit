/**
 * Primary action control.
 * @startingPoint section="Core" subtitle="Buttons, icon buttons and switches" viewport="700x200"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = pine, one per view. accent = terracotta, reserved for starting a timer. @default "secondary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name rendered before the label. */
  icon?: string;
  /** Lucide icon name rendered after the label. */
  iconRight?: string;
  full?: boolean;
  /** Render as another element, e.g. "a". @default "button" */
  as?: 'button' | 'a';
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
