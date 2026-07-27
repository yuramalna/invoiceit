const { Button, Badge } = window.HoursDesignSystem_76f0a9;

// The printable artefact. Deliberately plainer than the app: white stock,
// serif headings, mono figures, one hairline table.
function InvoiceDocument({ invoice, onClose }) {
  const lines = [
    ['Landing page revisions', '6.25', '$95.00', '$593.75'],
    ['Component audit', '3.50', '$95.00', '$332.50'],
    ['Retainer check-in', '0.75', '$95.00', '$71.25'],
    ['Design QA pass', '2.50', '$95.00', '$237.50'],
  ];
  return (
    <div style={{background:'var(--surface-raised)',border:'1px solid var(--line-rule)',borderRadius:'var(--radius-lg)',boxShadow:'var(--shadow-card)',overflow:'hidden'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--space-3) var(--space-5)',borderBottom:'1px solid var(--line-rule)',background:'var(--surface-sunken)'}}>
        <span style={{fontSize:'var(--label-size)',letterSpacing:'var(--label-ls)',textTransform:'uppercase',fontWeight:500,color:'var(--text-muted)'}}>Preview · A4</span>
        <div style={{display:'flex',gap:'var(--space-2)'}}>
          <Button size="sm" icon="Download">PDF</Button>
          <Button size="sm" variant="primary" icon="Send">Mark as sent</Button>
          {onClose ? <Button size="sm" variant="ghost" onClick={onClose}>Close</Button> : null}
        </div>
      </div>
      <div style={{padding:'var(--space-12) var(--space-12) var(--space-10)',display:'flex',flexDirection:'column',gap:'var(--space-10)'}}>
        <header style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div>
            <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:30,letterSpacing:'-.035em',color:'var(--ink-900)'}}>Invoice <span style={{fontFamily:'var(--font-mono)',fontSize:22,letterSpacing:'-.06em'}}>#{invoice.id}</span></div>
            <div style={{fontSize:13,color:'var(--text-muted)',marginTop:6}}>Issued {invoice.issued} · Due {invoice.due} · Net 14</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:19,letterSpacing:'-.045em',color:'var(--ink-900)'}}>Hours<span style={{color:'var(--terracotta-500)'}}>.</span></div>
            <div style={{fontSize:12,color:'var(--text-muted)',lineHeight:1.6,marginTop:4}}>Independent design practice<br/>hello@example.com<br/>VAT EE000000000</div>
          </div>
        </header>
        <div style={{display:'flex',gap:'var(--space-16)'}}>
          {[['Billed to', invoice.client + '\nAttn. Accounts\n12 Harbour Row\nTallinn, Estonia'],['Period','01 – 22 July 2026\nGrouped by project'],['Payable','Bank transfer\nEE00 0000 0000 0000']].map(([k,v]) => (
            <div key={k} style={{flex:1}}>
              <div style={{fontSize:'var(--label-size)',letterSpacing:'var(--label-ls)',textTransform:'uppercase',fontWeight:500,color:'var(--text-faint)',marginBottom:8}}>{k}</div>
              <div style={{fontSize:13,color:'var(--ink-700)',lineHeight:1.7,whiteSpace:'pre-line'}}>{v}</div>
            </div>
          ))}
        </div>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13.5}}>
          <thead><tr>
            {['Description','Hours','Rate','Amount'].map((h,i) => (
              <th key={h} style={{textAlign:i?'right':'left',fontSize:'var(--label-size)',letterSpacing:'var(--label-ls)',textTransform:'uppercase',fontWeight:500,color:'var(--text-muted)',padding:'0 0 var(--space-3)',borderBottom:'1px solid var(--ink-200)'}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l[0]}>
                {l.map((cell,i) => (
                  <td key={i} style={{padding:'var(--space-3) 0',borderBottom:'1px solid var(--line-hairline)',textAlign:i?'right':'left',color:i?'var(--ink-900)':'var(--ink-700)',fontFamily:i?'var(--font-mono)':'var(--font-sans)',fontVariantNumeric:'tabular-nums'}}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <div style={{width:260,display:'flex',flexDirection:'column',gap:10}}>
            {[['Subtotal','$1,235.00'],['VAT 0%','$0.00']].map(([k,v]) => (
              <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:13,color:'var(--text-muted)'}}>
                <span>{k}</span><span style={{fontFamily:'var(--font-mono)',fontVariantNumeric:'tabular-nums',color:'var(--ink-700)'}}>{v}</span>
              </div>
            ))}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',paddingTop:12,borderTop:'1px solid var(--ink-200)'}}>
              <span style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:18,letterSpacing:'-.03em',color:'var(--ink-900)'}}>Total due</span>
              <span style={{fontFamily:'var(--font-mono)',fontVariantNumeric:'tabular-nums',fontSize:21,letterSpacing:'-.06em',color:'var(--ink-900)'}}>{invoice.total}</span>
            </div>
          </div>
        </div>
        <footer style={{borderTop:'1px solid var(--line-hairline)',paddingTop:'var(--space-4)',fontSize:11.5,color:'var(--text-faint)',letterSpacing:'-.005em'}}>
          Thank you. Payment within 14 days, please — a full time log is attached.
        </footer>
      </div>
    </div>
  );
}

Object.assign(window, { InvoiceDocument });
