One-line: the default panel for every block of app content.

```jsx
<Card eyebrow="This week" title="Tracked time" action={<Button size="sm">Export</Button>} flush>
  <DataTable ... />
</Card>
```

Notes: cards are defined by a hairline rule, not a shadow. Reserve `raised` for floating things (invoice preview, modals).
