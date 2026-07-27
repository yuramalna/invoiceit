/** Boolean toggle in forms and bulk-select table headers. */
export interface CheckboxProps {
  checked?: boolean;
  label?: string;
  /** Secondary line under the label. */
  note?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
