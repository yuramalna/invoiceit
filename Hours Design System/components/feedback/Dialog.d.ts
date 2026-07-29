/** Modal for a single focused task: edit entry, new client, confirm delete. */
export interface DialogProps {
  /** @default true */
  open?: boolean;
  /** Serif title, sentence case. */
  title: string;
  subtitle?: string;
  /** Action row, right-aligned on sunken paper. */
  footer?: React.ReactNode;
  /** 680px instead of 480px. */
  wide?: boolean;
  /** Set false for forms where an accidental backdrop click would discard work. @default true */
  closeOnBackdrop?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}
export declare function Dialog(props: DialogProps): JSX.Element;
