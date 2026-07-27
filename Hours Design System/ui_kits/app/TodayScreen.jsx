const { Timer, TimeEntryRow, StatTile, Card, Button, Duration, Badge, ProgressBar } = window.HoursDesignSystem_76f0a9;

function DayList({ groups, onEdit, onResume }) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'var(--space-8)'}}>
      {groups.map((g) => {
        const total = g.items.reduce((a, e) => a + e.seconds, 0);
        return (
          <section key={g.day}>
            <header style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',padding:'0 var(--gutter-inline) var(--space-2)'}}>
              <span style={{fontSize:'var(--label-size)',letterSpacing:'var(--label-ls)',textTransform:'uppercase',fontWeight:500,color:'var(--text-muted)'}}>{g.day}</span>
              <Duration seconds={total} format="decimal" size="sm" tone="muted" />
            </header>
            <div style={{background:'var(--surface-card)',border:'1px solid var(--line-rule)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
              {g.items.map((e) => (
                <TimeEntryRow key={e.id} {...e} dotColor={e.dot} billable={e.billable !== false}
                  onEdit={() => onEdit(e)} onResume={e.running ? undefined : () => onResume(e)} onDelete={() => {}} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function WeekBars({ week }) {
  const max = Math.max(...week.map((d) => d.h), 8);
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:10,height:96}}>
      {week.map((d) => (
        <div key={d.d} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
          <div style={{width:'100%',height:(d.h/max)*72+2,background:d.h?'var(--pine-500)':'var(--paper-200)',borderRadius:2}} />
          <span style={{fontSize:10.5,color:'var(--text-faint)'}}>{d.d}</span>
        </div>
      ))}
    </div>
  );
}

function TodayScreen({ running, seconds, task, onStart, onStop, onEdit }) {
  const { ENTRIES, WEEK, CLIENTS } = window.HOURS;
  const [draftTask, setDraftTask] = React.useState(task || '');
  const [project, setProject] = React.useState('Northwind · Website');
  return (
    <div style={{display:'flex',gap:'var(--space-8)',alignItems:'flex-start'}}>
      <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:'var(--space-8)'}}>
        <Timer running={running} seconds={seconds} task={draftTask} onTaskChange={setDraftTask}
          projects={['Northwind · Website','Alder & Vine · Brand refresh','Peak Labs · App']}
          project={project} onProjectChange={setProject} dotColor="var(--client-1)"
          onStart={onStart} onStop={onStop} />
        <div style={{display:'flex',gap:'var(--space-4)'}}>
          <StatTile label="Today" value="3.75" unit="h" note="2 of 3 entries billable" />
          <StatTile label="This week" value="20.50" unit="h" delta="+3.5h" direction="up" note="vs. last week" />
          <StatTile label="Unbilled" value="$4,420" note="across 4 clients" />
        </div>
        <DayList groups={ENTRIES} onEdit={onEdit} onResume={onStart} />
      </div>
      <aside style={{flex:'0 0 300px',display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
        <Card eyebrow="Week to date" title="20.5 hours"><WeekBars week={WEEK} /></Card>
        <Card eyebrow="Budgets" title="This month">
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
            {CLIENTS.slice(0,4).map((c) => (
              <ProgressBar key={c.id} value={c.budget.used} max={c.budget.total} color={c.color}
                left={c.name} right={<><b>{c.budget.used}</b> / {c.budget.total}h</>} />
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}

Object.assign(window, { TodayScreen, DayList, WeekBars });
