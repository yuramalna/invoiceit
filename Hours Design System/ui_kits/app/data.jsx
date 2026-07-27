// Fake data for the Hours app kit. Amounts are pre-formatted strings on purpose:
// formatting lives with the data, never in a component.
const CLIENTS = [
  { id:'nw', name:'Northwind Studio', color:'var(--client-1)', rate:95, projects:['Website','Retainer'], unbilled:1235.25, budget:{used:18.5,total:40} },
  { id:'av', name:'Alder & Vine', color:'var(--client-2)', rate:110, projects:['Brand refresh','Packaging'], unbilled:2145.00, budget:{used:26,total:30} },
  { id:'pl', name:'Peak Labs', color:'var(--client-3)', rate:120, projects:['App','Design system'], unbilled:800.00, budget:{used:8,total:24} },
  { id:'mh', name:'Meridian Health', color:'var(--client-4)', rate:105, projects:['Dashboard'], unbilled:0, budget:{used:4,total:12} },
  { id:'kb', name:'Kestrel Books', color:'var(--client-5)', rate:80, projects:['Site maintenance'], unbilled:240.00, budget:{used:3,total:8} },
];

const ENTRIES = [
  { day:'Today · Wed 22 Jul', items:[
    { id:1, task:'Landing page revisions', client:'Northwind Studio', project:'Website', dot:'var(--client-1)', span:'09:15 – now', seconds:8048, amount:'$212.42', running:true },
    { id:2, task:'Sprint planning call', client:'Peak Labs', project:'App', dot:'var(--client-3)', span:'13:00 – 14:00', seconds:3600, amount:'$120.00' },
    { id:3, task:'Reading the new brief', client:'Alder & Vine', project:'Brand refresh', dot:'var(--client-2)', span:'15:30 – 16:00', seconds:1800, billable:false },
  ]},
  { day:'Tue 21 Jul', items:[
    { id:4, task:'Component audit', client:'Peak Labs', project:'Design system', dot:'var(--client-3)', span:'09:00 – 12:30', seconds:12600, amount:'$420.00' },
    { id:5, task:'Packaging dielines', client:'Alder & Vine', project:'Packaging', dot:'var(--client-2)', span:'13:30 – 17:45', seconds:15300, amount:'$467.50' },
  ]},
  { day:'Mon 20 Jul', items:[
    { id:6, task:'Retainer check-in', client:'Northwind Studio', project:'Retainer', dot:'var(--client-1)', span:'10:00 – 10:45', seconds:2700, amount:'$71.25' },
    { id:7, task:'Dashboard chart states', client:'Meridian Health', project:'Dashboard', dot:'var(--client-4)', span:'11:00 – 15:00', seconds:14400, amount:'$420.00' },
    { id:8, task:'Invoice admin', client:'Internal', project:'Ops', dot:'var(--client-6)', span:'16:00 – 16:30', seconds:1800, billable:false },
  ]},
];

const INVOICES = [
  { id:'0142', client:'Alder & Vine', dot:'var(--client-2)', issued:'01 Jul 2026', due:'15 Jul 2026', hours:'19.50', total:'$2,145.00', status:'overdue', statusLabel:'Overdue 12d' },
  { id:'0141', client:'Peak Labs', dot:'var(--client-3)', issued:'01 Jul 2026', due:'31 Jul 2026', hours:'16.00', total:'$1,920.00', status:'pending', statusLabel:'Sent' },
  { id:'0140', client:'Northwind Studio', dot:'var(--client-1)', issued:'01 Jun 2026', due:'15 Jun 2026', hours:'22.25', total:'$2,113.75', status:'paid', statusLabel:'Paid' },
  { id:'0139', client:'Meridian Health', dot:'var(--client-4)', issued:'01 Jun 2026', due:'15 Jun 2026', hours:'12.00', total:'$1,260.00', status:'paid', statusLabel:'Paid' },
  { id:'draft', client:'Northwind Studio', dot:'var(--client-1)', issued:'—', due:'—', hours:'13.00', total:'$1,235.25', status:'draft', statusLabel:'Draft' },
];

const WEEK = [
  { d:'Mon', h:8.25 }, { d:'Tue', h:8.5 }, { d:'Wed', h:3.75 }, { d:'Thu', h:0 }, { d:'Fri', h:0 }, { d:'Sat', h:0 }, { d:'Sun', h:0 },
];

Object.assign(window, { HOURS: { CLIENTS, ENTRIES, INVOICES, WEEK } });
