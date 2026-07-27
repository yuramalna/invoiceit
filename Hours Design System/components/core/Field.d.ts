/** Label + hint + error wrapper for any form control. */
export interface FieldProps {
  /** Rendered as an uppercase 11px eyebrow. Sentence-case words, not Title Case. */
  label?: string;
  hint?: string;
  /** Replaces the hint when present. */
  error?: string;
  /** Appends an italic serif "optional" marker. */
  optional?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
}
export declare function Field(props: FieldProps): JSX.Element;
