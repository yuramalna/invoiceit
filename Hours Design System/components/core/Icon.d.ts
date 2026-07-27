/**
 * Renders a Lucide glyph. Requires the Lucide UMD script on the page:
 * <script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.js"></script>
 */
export interface IconProps {
  /** Lucide icon name in PascalCase, e.g. "Clock", "Play", "FileText". */
  name: string;
  /** Pixel box. Hours uses 14 in dense rows, 16 default, 20 in nav. @default 16 */
  size?: number;
  /** @default 1.75 */
  strokeWidth?: number;
  /** @default "currentColor" */
  color?: string;
  style?: React.CSSProperties;
  className?: string;
  /** Accessible name; omit for decorative icons. */
  label?: string;
}
export declare function Icon(props: IconProps): JSX.Element;
