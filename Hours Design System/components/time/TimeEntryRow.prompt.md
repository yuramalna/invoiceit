One-line: the day-grouped entry list; use instead of DataTable when rows need two lines and hover actions.

```jsx
<TimeEntryRow task="Landing page revisions" client="Northwind" project="Website"
  span="09:15 – 11:30" seconds={8100} amount="$213.75" onResume={fn} onEdit={fn} />
```

Notes: row actions are hidden until hover. Duration renders decimal here — the list is a billing artefact, not a stopwatch.
