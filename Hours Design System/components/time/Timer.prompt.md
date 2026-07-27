One-line: the single most important object in Hours — pinned at the top of the app shell, one per app.

```jsx
<Timer running seconds={8048} task="Landing page revisions" projects={['Northwind · Website']} dotColor="var(--client-1)" onStop={fn} />
```

Notes: pass `onTaskChange`/`onProjectChange` to make the fields editable; omit them and the fields fall back to uncontrolled defaults (no React controlled-input warning). While running, the bar gains a terracotta wash, the elapsed time turns terracotta, and the dot pulses. Idle state is plain white with a pine-free grey clock. Pass `ticking={false}` in static previews.
