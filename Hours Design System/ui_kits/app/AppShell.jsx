const { SidebarNav, Button, IconButton, Icon, Tooltip } = window.HoursDesignSystem_76f0a9;

function TopBar({ title, meta, actions }) {
  return (
    <header style={{height:'var(--topbar-h)',flex:'0 0 var(--topbar-h)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'var(--space-4)',padding:'0 var(--gutter-page)',borderBottom:'1px solid var(--line-rule)',background:'var(--surface-page)'}}>
      <div style={{display:'flex',alignItems:'baseline',gap:'var(--space-3)'}}>
        <h1 style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:23,letterSpacing:'-.035em',color:'var(--text-display)'}}>{title}</h1>
        {meta ? <span style={{fontSize:12.5,color:'var(--text-muted)'}}>{meta}</span> : null}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'var(--space-2)'}}>{actions}</div>
    </header>
  );
}

function AppShell({ view, onView, title, meta, actions, children, overlay }) {
  return (
    <div style={{position:'relative',display:'flex',height:'100%',background:'var(--surface-page)',overflow:'hidden'}}>
      <SidebarNav value={view} onChange={onView}
        footer={<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 var(--space-2)'}}>
          <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--text-faint)'}}>sqlite · 4.2 MB</span>
          <Tooltip label="Settings"><IconButton icon="Settings" size="sm" label="Settings" onClick={() => onView('settings')} /></Tooltip>
        </div>}
        groups={[
          { items:[
            { value:'today', icon:'Clock', label:'Today' },
            { value:'entries', icon:'List', label:'Entries', badge:14 },
            { value:'reports', icon:'ChartNoAxesColumn', label:'Reports' },
          ]},
          { label:'Billing', items:[
            { value:'clients', icon:'Users', label:'Clients', badge:5 },
            { value:'invoices', icon:'FileText', label:'Invoices', badge:2 },
          ]},
        ]} />
      <main style={{flex:1,display:'flex',flexDirection:'column',minWidth:0}}>
        <TopBar title={title} meta={meta} actions={actions} />
        <div style={{flex:1,overflowY:'auto',padding:'var(--space-8) var(--gutter-page) var(--space-16)'}}>{children}</div>
      </main>
      {overlay}
    </div>
  );
}

Object.assign(window, { AppShell, TopBar });
