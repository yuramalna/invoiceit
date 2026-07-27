One-line: never print a duration by hand — this owns both formats and the tabular figures.

```jsx
<Duration seconds={8048} size="xl" tone="live" />
<Duration seconds={8048} format="decimal" size="sm" />
```

Rule: clock format while tracking, decimal everywhere money is calculated (tables, invoices, reports).
