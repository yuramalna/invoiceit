# Hours · web app UI kit

The self-hosted time-tracking app. One product, six views, all click-through in `index.html`.

| File | What it is |
| --- | --- |
| `index.html` | Interactive kit. Sidebar switches views; the timer starts/stops, entries open an edit dialog, toasts confirm with undo, invoices preview live. |
| `AppShell.jsx` | Sidebar + top bar + scrolling content frame. Owns the fixed geometry (232px rail, 60px bar, 40px page gutter). |
| `TodayScreen.jsx` | The default view: timer bar, three stat tiles, day-grouped entry list, week bars + budget rail. |
| `EntriesScreen.jsx` | Full ledger: tabs, filters, hairline table with day group rows. |
| `ClientsScreen.jsx` | Clients, projects, rates, retainer usage, rate history. |
| `InvoicesScreen.jsx` | Invoice ledger with a live document preview beside it. |
| `InvoiceDocument.jsx` | The printable artefact — plainer than the app, white stock, one hairline table. |
| `ReportsScreen.jsx` | Six-month bars and a per-client breakdown. |
| `data.jsx` | Fake clients, entries, invoices. Amounts are pre-formatted strings by design. |

## Rules this kit demonstrates
- Only one running timer, and it is always the topmost object on Today.
- Terracotta appears **only** where time is actively running. Everything else is pine, ink and paper.
- Durations are wall-clock while tracking (`02:14:08`), decimal everywhere money is derived (`2.24`), always Martian Mono at −.06em.
- Numbers are right-aligned mono with tabular figures — columns must align down the page.
- Row actions stay hidden until hover; the list should read like a ledger, not a toolbar.
