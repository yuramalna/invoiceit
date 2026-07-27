One-line: any tabular list in Hours; put it in a `<Card flush>`.

```jsx
<DataTable
  columns={[{key:'task',label:'Task'},{key:'client',label:'Client'},{key:'hours',label:'Hours',numeric:true,width:96}]}
  rows={[{__group:'Wed 22 Jul'},{id:1,task:'Landing revisions',client:'Northwind',hours:'2.25'}]}
/>
```

Notes: numeric columns are right-aligned mono — always mark hours/amounts `numeric`. Insert `{__group:'…'}` rows to break a list by day.
