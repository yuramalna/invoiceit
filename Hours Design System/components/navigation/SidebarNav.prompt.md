One-line: the app's only top-level navigation; sunken paper rail, white pill for the active item.

```jsx
<SidebarNav value="today" onChange={fn} groups={[
  { items: [{value:'today',icon:'Clock',label:'Today'},{value:'entries',icon:'List',label:'Entries',badge:14}] },
  { label:'Billing', items:[{value:'invoices',icon:'FileText',label:'Invoices'}] },
]} />
```
