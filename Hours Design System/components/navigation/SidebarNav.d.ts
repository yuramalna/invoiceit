/**
 * Fixed 232px left rail — top-level navigation for the Hours app shell.
 * @startingPoint section="Navigation" subtitle="App sidebar with grouped sections" viewport="700x360"
 */
export interface SidebarNavItem {
  value: string;
  label: string;
  /** Lucide icon name. */
  icon: string;
  /** Trailing mono count, e.g. unbilled entries. */
  badge?: string | number;
}
export interface SidebarNavGroup {
  /** Uppercase group heading; omit for the first group. */
  label?: string;
  items: SidebarNavItem[];
}
export interface SidebarNavProps {
  groups: SidebarNavGroup[];
  value?: string;
  onChange?: (value: string) => void;
  /** Wordmark text. @default "Hours" */
  brand?: string;
  /** Bottom-pinned node, e.g. a storage note or settings link. */
  footer?: React.ReactNode;
}
export declare function SidebarNav(props: SidebarNavProps): JSX.Element;
