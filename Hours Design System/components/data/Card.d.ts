/**
 * Panel container: hairline rule on off-white paper, 8px radius, no shadow by default.
 */
export interface CardProps {
  /** Serif display title. */
  title?: string;
  /** Uppercase 11px eyebrow above the title. */
  eyebrow?: string;
  /** Right-aligned node in the header, usually a Button or Select. */
  action?: React.ReactNode;
  /** Removes body padding — use when the body is a DataTable or row list. */
  flush?: boolean;
  /** raised adds the warm card shadow; flat drops the fill. @default "default" */
  variant?: 'default' | 'raised' | 'flat';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
