/** In-page view switch: All / Unbilled / Invoiced. Underline is ink, not brand colour. */
export interface TabsProps {
  tabs: Array<string | { value: string; label: string; count?: number }>;
  value?: string;
  onChange?: (value: string) => void;
}
export declare function Tabs(props: TabsProps): JSX.Element;
