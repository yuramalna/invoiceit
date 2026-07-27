One-line: one focused task at a time; the scrim is warm ink at 32% with a 2px blur.

```jsx
<Dialog title="Edit entry" subtitle="Wed 22 Jul · Northwind"
  footer={<><Button variant="ghost">Cancel</Button><Button variant="primary">Save</Button></>} onClose={fn}>
  <Field label="Task"><Input defaultValue="Landing page revisions" /></Field>
</Dialog>
```

Notes: the scrim is absolutely positioned — the app shell must be `position:relative`.
