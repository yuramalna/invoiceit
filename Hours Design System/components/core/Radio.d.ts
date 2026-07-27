/** One-of-many choice, 2–4 options; more than that use Select. */
export interface RadioProps {
  checked?: boolean;
  label?: string;
  note?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare function Radio(props: RadioProps): JSX.Element;
