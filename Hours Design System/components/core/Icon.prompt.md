One-line: the only sanctioned way to draw an icon in Hours — a thin wrapper over the Lucide set.

```jsx
<Icon name="Clock" size={16} />
<Icon name="Play" size={14} color="var(--terracotta-500)" />
```

Notes: stroke weight is fixed at 1.75 for optical match with Instrument Sans. Never inline your own SVG paths; if a glyph is missing, pick a different Lucide name.
