const { Card, DataTable, Button, Badge, Tag, ProgressBar, Duration } = window.HoursDesignSystem_76f0a9;

function ClientsScreen({ onNew }) {
  const { CLIENTS } = window.HOURS;
  const columns = [
    { key:'name', label:'Client' },
    { key:'projects', label:'Projects' },
    { key:'rate', label:'Rate', numeric:true, width:100 },
    { key:'month', label:'This month', numeric:true, width:110 },
    { key:'unbilled', label:'Unbilled', numeric:true, width:120 },
  ];
  const renderCell = (c, r) => {
    if (c.key === 'name') return (
      <span style={{display:'inline-flex',alignItems:'center',gap:8}}>
        <span style={{width:7,height:7,borderRadius:99,background:r.color}} />
        <span style={{fontWeight:500,color:'var(--ink-900)'}}>{r.name}</span>
      </span>
    );
    if (c.key === 'projects') return <span style={{display:'inline-flex',gap:6}}>{r.projects.map((p) => <Tag key={p}>{p}</Tag>)}</span>;
    if (c.key === 'rate') return '$' + r.rate.toFixed(2);
    if (c.key === 'month') return r.budget.used.toFixed(2);
    if (c.key === 'unbilled') return r.unbilled ? '$' + r.unbilled.toLocaleString('en-US',{minimumFractionDigits:2}) : <span style={{color:'var(--text-faint)'}}>—</span>;
    return r[c.key];
  };
  return (
    <div style={{display:'flex',gap:'var(--space-8)',alignItems:'flex-start'}}>
      <div style={{flex:1,minWidth:0}}>
        <Card flush eyebrow="5 clients · 8 projects" title="Rates and retainers"
          action={<Button size="sm" variant="primary" icon="Plus" onClick={onNew}>New client</Button>}>
          <DataTable columns={columns} rows={CLIENTS} renderCell={renderCell} />
        </Card>
      </div>
      <aside style={{flex:'0 0 300px',display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
        <Card eyebrow="Retainer usage" title="July">
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
            {CLIENTS.map((c) => (
              <ProgressBar key={c.id} value={c.budget.used} max={c.budget.total} color={c.color}
                left={c.name} right={<><b>{c.budget.used}</b> / {c.budget.total}h</>} />
            ))}
          </div>
        </Card>
        <Card eyebrow="Rate history" title="Northwind">
          <div style={{display:'flex',flexDirection:'column',gap:10,fontSize:13}}>
            {[['Jan 2026','$95.00','current'],['Jul 2025','$85.00',''],['Feb 2025','$75.00','']].map(([d,r,n]) => (
              <div key={d} style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--line-hairline)',paddingBottom:8}}>
                <span style={{color:'var(--text-muted)'}}>{d}</span>
                <span style={{display:'inline-flex',alignItems:'center',gap:8}}>
                  {n ? <Badge tone="paid">{n}</Badge> : null}
                  <span style={{fontFamily:'var(--font-mono)',fontVariantNumeric:'tabular-nums',color:'var(--ink-900)'}}>{r}</span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}

Object.assign(window, { ClientsScreen });
