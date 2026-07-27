/** Transient confirmation, bottom-centre, ink-filled. Undo lives here. */
export interface ToastProps {
  /** Lucide icon name. */
  icon?: string;
  /** Text of the trailing action, usually "Undo". */
  actionLabel?: string;
  onAction?: () => void;
  /** @default "default" */
  tone?: 'default' | 'success';
  children?: React.ReactNode;
}
export declare function Toast(props: ToastProps): JSX.Element;
/** Bottom-centre positioner; requires a relatively positioned shell. */
export declare function ToastStack(props: { children?: React.ReactNode }): JSX.Element;
