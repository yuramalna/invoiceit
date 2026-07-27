const { Card, DataTable, Button, Badge, Tabs } = window.HoursDesignSystem_76f0a9;

function InvoicesScreen({ selected, onSelect }) {
  const { INVOICES } = window.HOURS;
  const [tab, setTab] = React.useState('all');
  const columns = [
    { key:'id', label:'No.', width:76 },
    { key:'client', label:'Client' },
    { key:'issued', label:'Issued', width:120 },
    { key:'due', label:'Due', width:120 },
    { key:'hours', label:'Hours', numeric:true, width:80 },
    { key:'total', label:'Total', numeric:true, width:110 },
    { key:'status', label:'Status', width:130 },
  ];
  const renderCell = (c, r) => {
    if (c.key === 'id') return <span style={{fontFamily:'var(--font-mono)',color:'var(--ink-900)'}}>{r.id === 'draft' ? '—' : '#' + r.id}</span>;
    if (c.key === 'client') return (
      <span style={{display:'inline-flex',alignItems:'center',gap:8}}>
        <span style={{width:7,height:7,borderRadius:99,background:r.dot}} />
        <span style={{color:'var(--ink-900)'}}>{r.client}</span>
      </span>
    );
    if (c.key === 'status') return <Badge tone={r.status} dot={r.status !== 'draft'}>{r.statusLabel}</Badge>;
    return r[c.key];
  };
  return (
    <div style={{display:'flex',gap:'var(--space-8)',alignItems:'flex-start'}}>
      <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
        <Tabs value={tab} onChange={setTab} tabs={[{value:'all',label:'All',count:24},{value:'open',label:'Open',count:2},{value:'overdue',label:'Overdue',count:1},{value:'drafts',label:'Drafts',count:1}]} />
        <Card flush>
          <DataTable columns={columns} rows={INVOICES} renderCell={renderCell}
            onSort={() => {}} sortKey="issued" />
        </Card>
        <div style={{display:'flex',gap:'var(--space-2)'}}>
          {INVOICES.slice(0,3).map((i) => (
            <Button key={i.id} size="sm" variant={selected && selected.id === i.id ? 'primary' : 'secondary'} onClick={() => onSelect(i)}>
              Preview {i.id === 'draft' ? 'draft' : '#' + i.id}
            </Button>
          ))}
        </div>
      </div>
      <aside style={{flex:'0 0 520px'}}>
        <InvoiceDocument invoice={selected || INVOICES[0]} />
      </aside>
    </div>
  );
}

Object.assign(window, { InvoicesScreen });
