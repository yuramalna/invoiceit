/**
 * The workhorse list: time entries, invoices, clients.
 * @startingPoint section="Data" subtitle="Hairline table with grouped rows" viewport="700x260"
 */
export interface DataTableColumn {
  key: string;
  label: string;
  /** Right-aligns and switches the cell to mono tabular figures. */
  numeric?: boolean;
  width?: string | number;
}
export interface DataTableRow {
  id?: string | number;
  /** When set, the row renders as a sunken day/section divider spanning all columns. */
  __group?: string;
  [key: string]: unknown;
}
export interface DataTableProps {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  /** @default true */
  hover?: boolean;
  /** 36px rows instead of 44px. */
  compact?: boolean;
  sortKey?: string;
  onSort?: (key: string) => void;
  /** Custom cell renderer; return a node for (column, row, index). */
  renderCell?: (col: DataTableColumn, row: DataTableRow, i: number) => React.ReactNode;
  /** Empty-state message. */
  empty?: React.ReactNode;
}
export declare function DataTable(props: DataTableProps): JSX.Element;
