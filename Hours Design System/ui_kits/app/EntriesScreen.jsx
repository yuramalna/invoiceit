const { Tabs, Card, DataTable, Input, Select, Button, Badge, Checkbox, Tag } = window.HoursDesignSystem_76f0a9;

function EntriesScreen({ onEdit }) {
  const { ENTRIES } = window.HOURS;
  const [tab, setTab] = React.useState('unbilled');
  const rows = [];
  ENTRIES.forEach((g) => {
    rows.push({ __group: g.day });
    g.items.forEach((e) => rows.push(e));
  });
  const columns = [
    { key:'task', label:'Task' },
    { key:'client', label:'Client', width:200 },
    { key:'span', label:'Span', width:130 },
    { key:'seconds', label:'Hours', numeric:true, width:80 },
    { key:'amount', label:'Amount', numeric:true, width:110 },
  ];
  const { Duration } = window.HoursDesignSystem_76f0a9;
  const renderCell = (c, r) => {
    if (c.key === 'client') return (
      <span style={{display:'inline-flex',alignItems:'center',gap:8}}>
        <span style={{width:7,height:7,borderRadius:99,background:r.dot,flex:'0 0 auto'}} />
        <span>{r.client}{r.project ? <span style={{color:'var(--text-faint)'}}> · {r.project}</span> : null}</span>
      </span>
    );
    if (c.key === 'task') return (
      <span style={{display:'inline-flex',alignItems:'center',gap:8}}>
        {r.task}
        {r.running ? <Badge tone="live" dot pulse>Running</Badge> : null}
        {r.billable === false ? <Badge tone="draft">Non-billable</Badge> : null}
      </span>
    );
    if (c.key === 'seconds') return <Duration seconds={r.seconds} format="decimal" size="sm" />;
    if (c.key === 'amount') return r.amount || <span style={{color:'var(--text-faint)'}}>—</span>;
    return r[c.key];
  };
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
      <Tabs value={tab} onChange={setTab} tabs={[{value:'all',label:'All',count:128},{value:'unbilled',label:'Unbilled',count:14},{value:'invoiced',label:'Invoiced',count:114}]} />
      <div style={{display:'flex',alignItems:'center',gap:'var(--space-3)'}}>
        <div style={{width:240}}><Input icon="Search" placeholder="Search tasks and notes" /></div>
        <Select options={['All clients','Northwind Studio','Alder & Vine','Peak Labs']} />
        <Select options={['This month','This week','Last 30 days','Custom range']} />
        <div style={{marginLeft:'auto',display:'flex',gap:'var(--space-2)'}}>
          <Button size="sm" icon="Download">Export CSV</Button>
          <Button size="sm" variant="primary" icon="Receipt">Invoice selection</Button>
        </div>
      </div>
      <Card flush>
        <DataTable columns={columns} rows={rows} renderCell={renderCell} onSort={() => {}} sortKey="span" />
      </Card>
    </div>
  );
}

Object.assign(window, { EntriesScreen });
