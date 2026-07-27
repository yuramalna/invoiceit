One-line: dashboard headline figures; 3–4 across, never more.

```jsx
<StatTile label="Billable this week" value="27.75" unit="h" delta="+3.5h" direction="up" note="vs. last week" />
```

Notes: pre-format the value (2 decimals for hours, no currency symbol drift). Use `bare` when grouping tiles inside one Card.
