import React from 'react';

// Lucide (loaded from CDN as a UMD global) is the Hours icon set.
// Icon reads the icon's node data off the global and renders it as SVG —
// no hand-drawn paths live in this design system.
function nodes(name) {
  const l = typeof window !== 'undefined' ? window.lucide : null;
  if (!l) return null;
  const raw = (l.icons && (l.icons[name] || l.icons[name.toLowerCase()])) || l[name];
  if (!raw) return null;
  if (Array.isArray(raw) && raw[0] === 'svg') return raw[2] || [];
  return Array.isArray(raw) ? raw : null;
}

export function Icon({ name, size = 16, strokeWidth = 1.75, color = 'currentColor', style, className, label }) {
  const kids = nodes(name);
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round',
    className, role: label ? 'img' : undefined, 'aria-label': label,
    'aria-hidden': label ? undefined : true,
    style: { display: 'block', flex: '0 0 auto', ...style },
  };
  if (!kids) return <svg {...common} data-icon-missing={name} />;
  return (
    <svg {...common}>
      {kids.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
