const { Card, StatTile, Select, Button, ProgressBar, DataTable, Duration } = window.HoursDesignSystem_76f0a9;

function ReportsScreen() {
  const { CLIENTS, WEEK } = window.HOURS;
  const months = [['Feb',96],['Mar',122],['Apr',108],['May',131],['Jun',118],['Jul',84]];
  const max = 140;
  const columns = [
    { key:'name', label:'Client' },
    { key:'hours', label:'Hours', numeric:true, width:90 },
    { key:'rate', label:'Avg rate', numeric:true, width:100 },
    { key:'billed', label:'Billed', numeric:true, width:110 },
    { key:'share', label:'Share', numeric:true, width:80 },
  ];
  const rows = CLIENTS.map((c) => ({
    id:c.id, name:c.name, color:c.color, hours:c.budget.used.toFixed(2), rate:'$'+c.rate.toFixed(2),
    billed:'$'+(c.budget.used*c.rate).toLocaleString('en-US',{minimumFractionDigits:2}),
    share:Math.round((c.budget.used/59.5)*100)+'%',
  }));
  const renderCell = (c, r) => c.key === 'name'
    ? <span style={{display:'inline-flex',alignItems:'center',gap:8}}><span style={{width:7,height:7,borderRadius:99,background:r.color}} /><span style={{color:'var(--ink-900)'}}>{r.name}</span></span>
    : r[c.key];
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'var(--space-6)'}}>
      <div style={{display:'flex',gap:'var(--space-3)',alignItems:'center'}}>
        <Select options={['Last 6 months','This quarter','This year','Custom range']} />
        <Select options={['All clients','Billable only','Non-billable only']} />
        <div style={{marginLeft:'auto'}}><Button size="sm" icon="Download">Export report</Button></div>
      </div>
      <div style={{display:'flex',gap:'var(--space-4)'}}>
        <StatTile label="Hours · 6 months" value="659" unit="h" delta="+12%" direction="up" note="vs. prior 6" />
        <StatTile label="Billed" value="$62,410" note="avg $94.70/h" />
        <StatTile label="Billable ratio" value="87" unit="%" delta="-2pt" direction="down" />
        <StatTile label="Longest streak" value="14" unit="days" />
      </div>
      <Card eyebrow="Monthly" title="Hours tracked">
        <div style={{display:'flex',alignItems:'flex-end',gap:'var(--space-4)',height:180}}>
          {months.map(([m,h]) => (
            <div key={m} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--text-muted)'}}>{h}</span>
              <div style={{width:'100%',height:(h/max)*130,background:m==='Jul'?'var(--terracotta-500)':'var(--pine-500)',borderRadius:'2px 2px 0 0'}} />
              <span style={{fontSize:11,color:'var(--text-faint)'}}>{m}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card flush eyebrow="This month" title="By client">
        <DataTable columns={columns} rows={rows} renderCell={renderCell} compact />
      </Card>
    </div>
  );
}

Object.assign(window, { ReportsScreen });
