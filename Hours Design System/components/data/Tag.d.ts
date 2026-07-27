/** Neutral pill for taxonomy: project name, client, filter chip. */
export interface TagProps {
  /** Identity dot colour, usually a --client-N token. */
  color?: string;
  /** Renders a remove affordance. */
  onRemove?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): JSX.Element;
