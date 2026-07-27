# Hours — Design System

**Hours** is a self-hosted time tracker and invoicing tool for one person with many part-time engagements. Multiple clients, multiple projects, one rate per project, a running timer, and — the point of the whole thing — an invoice you can send at the end of the month.

It is designed to be run privately: a Docker container on a home server, a SQLite file on a mounted volume. A future macOS companion app will push entries into the same instance over a token, so the web app is the system of record, not a front end for something else.

The aesthetic brief was "minimal but editorial, beautiful typography". So Hours is built like a well-set ledger: warm paper, warm near-black ink, hairline rules instead of shadows. There is no display serif — the editorial quality comes from a single tight semibold grotesque doing all the headings and all the interface, set against an engineered monospace that owns every number. Exactly one accent colour is allowed to shout, and only when the clock is running.

## Sources

None were supplied. No codebase, Figma file, screenshots, decks, logo or font binaries were attached — this system was authored from the written product brief only. Two substitutions were made and both need the user's sign-off:

- **Typefaces** — no brand fonts were provided. Nearest Google Fonts matches are used: **Archivo** at 600 for display and 400/500 for UI, and **Martian Mono** for numerals, loaded from Google's CDN in `tokens/fonts.css`. Drop real font binaries into `assets/fonts/` and replace the `@import` with `@font-face` rules when they exist.
- **Icons** — no icon set was provided. **Lucide 0.469.0** is used from CDN, at 1.75 stroke weight. See ICONOGRAPHY.
- **Logo** — none was provided, and none was invented. The mark is the word *Hours* set in Archivo 600 at −.05em tracking with a terracotta period. `assets/` therefore contains no logo file.

---

## Content fundamentals

**Voice.** Plain, quiet, slightly bookish. This is a tool one person uses on their own, so it never markets to you and never congratulates you. Copy is written as if the product were a well-kept notebook: short, factual, a little dry.

**Person.** Second person for instructions ("Start a timer, or add an entry by hand"), no first person plural — there is no "we" here, there is no company. Never "Let's…".

**Casing.** Sentence case everywhere: buttons ("Start timer", "Invoice selection", "Mark as sent"), dialog titles ("Edit entry"), card titles ("Rates and retainers"). The only uppercase is the 10.5px label/eyebrow style, at .1em tracking ("BILLABLE THIS WEEK", "JULY · UNBILLED").

**Punctuation.** No exclamation marks. No trailing periods on labels, table headers, badges, or button text. Full sentences in hints and empty-state bodies do take a period. The middle dot `·` is the house separator for metadata: `Northwind · Website`, `Wed 22 Jul · Northwind`, `sqlite · 4.2 MB`. Ranges use an en dash with spaces: `09:15 – 11:30`.

**Numbers.** Hours to two decimals in any billing context (`2.25`), wall clock while tracking (`02:14:08`). Currency always with symbol and two decimals (`$213.75`), thousands separated (`$4,180.00`). Never "2h 15m" in a table; never a bare "2.25" without a column header saying Hours.

**Emoji.** Never. Not in UI, not in empty states, not in the invoice.

**Examples of the register:**
- Empty state: *"No time logged yet — Start a timer, or add an entry by hand."*
- Toast: *"Entry saved · 2.25h to Northwind"* with an `Undo`.
- Badge: *"Overdue 12d"*, not "⚠️ Payment overdue!".
- Field hint: *"Applied to new entries only"*.
- Invoice footer, kept plain and small rather than set in a warm italic: *"Thank you. Payment within 14 days, please — a full time log is attached."*

---

## Visual foundations

**Colour.** Two families and one accent.
*Paper* is a warm off-white ramp (`--paper-25` → `--paper-300`) used for every surface; the page is `--paper-50`, cards are `--paper-25`, sunken areas (sidebar, table headers, dialog footers) are `--paper-100`. *Ink* is a warm near-black ramp used for text and lines — `--ink-900` for figures and headings, `--ink-700` for body, `--ink-400` for metadata, `--ink-200/100` for rules. Pure black and pure grey are never used. `#FFFFFF` appears only as `--surface-raised` (timers, dialogs, inputs, the invoice) so raised things read as a fresh sheet on top of paper.
*Pine* (`--pine-700/600/500`) is the structural brand colour: primary buttons, focus rings, active tab underline, chart bars. *Terracotta* (`--terracotta-500`) is reserved: a running timer, and nothing else. If terracotta appears on a screen, something is being timed.
Semantic pairs (`--status-*` + `--status-*-bg`) cover invoice life: live, paid, pending, overdue, draft, info. Clients get identity colours from `--client-1…6`, assigned in order and used **only** as 7px dots and progress-bar fills — never as text or backgrounds.

**Type.** Two faces, and the division is by *weight*, not by family. **Archivo** does everything textual: 600 for display (page titles 46/34/24, card and dialog titles, empty states, invoice headings, the wordmark) pulled hard to −.035em/−.032em/−.028em; 500 for UI titles and emphasis; 400 for body (14.5/13). Nothing is set in a serif — there is no display serif in this system, and italics are used nowhere. **Martian Mono** with `font-variant-numeric: tabular-nums` owns **every** number — durations, rates, totals, counts, file sizes. Martian Mono runs wide, so it is set a notch smaller than the sans at the same optical size and tracked to −.06em; without that negative tracking it reads as a placeholder, so never omit it. The 10.5px uppercase label at .1em tracking is the connective tissue: it sits above every stat, every table header, every card eyebrow.

**Why no serif.** An earlier direction paired Instrument Serif with Instrument Sans. It was rejected: the serif read as magazine-editorial rather than instrument-editorial, and it fought the mono. The tight grotesque gets the same density and confidence while looking like a tool. Do not reintroduce a display serif.

**Spacing & layout.** 4px grid, `--space-1` … `--space-24`, addressed through semantic aliases (`--stack-tight` 8, `--stack` 16, `--stack-loose` 32, `--gutter-inline` 24, `--gutter-page` 40, `--section-gap` 64). Fixed frames are constants, not choices: 232px sidebar, 60px top bar, 44px table rows (56px for two-line entry rows), 34px controls, 66ch prose measure. Content is a wide main column with an optional 300px right rail; nothing is centred except modal dialogs and empty states.

**Backgrounds.** Flat warm paper. No photography, no illustration, no gradient meshes. Two exceptions: a running timer bar gets a subtle left-to-right terracotta wash (`--terracotta-50` → white, first 40%), and empty states sit on `--texture-rule` — a 44px repeating hairline, i.e. ruled notebook paper. That texture is the only pattern in the system.

**Borders & elevation.** A card is a 1px `--line-rule` on `--paper-25` at 8px radius, **no shadow**. Shadows are shallow and warm-tinted (`rgba(22,21,16,…)`, never blue-black) and only appear on things that genuinely float: the timer bar and invoice sheet (`--shadow-card`), tooltips and toasts (`--shadow-popover`), dialogs (`--shadow-modal`). Row separators are `--line-hairline` at 10% ink; structural separators are `--line-rule`; `--line-strong` is for input borders on hover and the invoice table's head/total rules.

**Radii.** 2 / 3 / 5 / 8 / 14 / pill. Controls are 5px, cards 8px, dialogs 14px. Pills only for dots, tags, switch tracks and progress tracks. Nothing in Hours is bubbly.

**Animation.** Short, flat, no personality. 80/130/190/280ms with a single easing, `cubic-bezier(.2,.6,.2,1)`. No springs, no bounce, no overshoot, no page transitions, no skeleton shimmer. Only three motions exist: colour/shadow transitions on controls (130ms), a 4px fade-up for things that appear (dialogs, toasts, 190ms), and a 1.8s opacity pulse on the running-timer dot — the only looping animation in the system.

**Interaction states.** Hover *warms the surface*: transparent controls take `--paper-100`, white controls take `--paper-50` plus a stronger border, table rows take `--paper-100`, and filled buttons go one step darker (pine 700 → 600). Press *does not shrink* — filled buttons return to the darker base and drop their shadow; ghost controls go to `--paper-200`. There is no scale transform anywhere. Focus is a 2px pine outline for keyboard users, or a 3px `--ring-focus` halo inside components. Disabled is 45% opacity with `not-allowed`. Row actions (edit, resume, delete) are `opacity: 0` until the row is hovered.

**Transparency & blur.** Used once: the dialog scrim, warm ink at 32% with a 2px backdrop blur. No frosted panels, no translucent sidebars.

**Imagery.** There is none. If imagery is ever added it should be warm, matte, and printed-looking — never cool, glossy, or gradient-lit. The system is deliberately drawing-free: no illustration, no spot art, no hero graphics.

**Data display.** Bars are flat rectangles with 2px top radii, pine for history and terracotta for the current period. Progress tracks are 4px pills. No axis lines, no gridlines, no legends, no tooltips-on-charts, no donuts. Numbers do the work.

---

## Iconography

- **Set:** Lucide, loaded from CDN (`https://unpkg.com/lucide@0.469.0/dist/umd/lucide.js`). This is a **substitution** — no icon assets were supplied. If a real set exists, replace it and keep the `Icon` API.
- **Rendering:** always through the `Icon` component, which reads the glyph data off the Lucide global. No SVG paths are hand-written anywhere in this system, and no icon files live in `assets/` (nothing to copy — the set is CDN-only).
- **Weight & size:** stroke 1.75 at all sizes, matched optically to Archivo. 14px in dense rows and small buttons, 16px default, 18–20px in navigation, 28px at stroke 1.25 for the single muted glyph in an empty state.
- **Colour:** `currentColor`, inheriting the text colour of the control. Icons are never brand-coloured except inside an accent button (white on terracotta).
- **Vocabulary in use:** `Clock`, `Play`, `Square`, `List`, `ChartNoAxesColumn`, `Users`, `Briefcase`, `FileText`, `Receipt`, `Download`, `Send`, `Plus`, `Search`, `ChevronDown`, `Check`, `X`, `Copy`, `Pencil`, `Trash2`, `Settings`, `RefreshCw`, `CalendarDays`, `ArrowUpRight`, `ArrowDownRight`.
- **Emoji and unicode as icons:** never. The one non-Lucide glyph in the system is the middle dot `·` used as a metadata separator, and the en dash in time spans.

---

## Index

**Root**
- `Type Directions.html` — the four-way type comparison that settled this direction (B, "grotesque ledger", was chosen).
- `styles.css` — the single entry point consumers link. `@import` lines only.
- `thumbnail.html` — homepage tile.
- `readme.md` — this file.
- `SKILL.md` — Agent Skills wrapper.

**`tokens/`** — `fonts.css` (Archivo + Martian Mono, Google Fonts substitution), `colors.css`, `typography.css` (`--font-display`, `--font-sans`, `--font-mono`; `--font-serif-display` survives only as a back-compat alias to `--font-display`), `spacing.css`, `shape.css` (radii, borders, shadows, texture), `motion.css`, `base.css` (element resets, link colours, `.num` / `.label` helpers).

**`guidelines/`** — 19 specimen cards feeding the Design System tab, grouped **Colors** (brand, paper, ink, status, client identity), **Type** (display, UI, numerals, label, pairing in use), **Spacing** (scale, semantic rhythm, fixed frames), **Shape** (radii, elevation, rules & texture), **Motion**, **Brand** (wordmark, iconography).

**`components/`** — 25 primitives, each with `.jsx`, `.d.ts`, `.prompt.md`, and one `@dsCard` per directory.
- `core/` — **Icon**, **Button**, **IconButton**, **Field**, **Input**, **Select**, **Checkbox**, **Radio**, **Switch**
- `data/` — **Card**, **StatTile**, **Badge**, **Tag**, **ProgressBar**, **DataTable**, **EmptyState**
- `time/` — **Duration** (+ `formatClock`, `formatDecimal`), **Timer**, **TimeEntryRow**
- `navigation/` — **SidebarNav**, **Tabs**
- `feedback/` — **Dialog**, **Toast** (+ **ToastStack**), **Tooltip**

**`ui_kits/app/`** — the Hours web app, click-through: `index.html`, `AppShell.jsx`, `TodayScreen.jsx`, `EntriesScreen.jsx`, `ClientsScreen.jsx`, `InvoicesScreen.jsx`, `InvoiceDocument.jsx`, `ReportsScreen.jsx`, `data.jsx`, `README.md`.

**`assets/`** — empty by design: no logo, icon or font binaries were supplied. See Sources.

### Intentional additions
No source defined a component inventory, so the standard primitive set was authored. Four domain components were added because the product cannot be described without them, and each is documented above:
- **Timer** — the running-clock bar; the product's central object.
- **TimeEntryRow** — a two-line ledger row with hover actions, which a generic table row cannot express.
- **Duration** — owns the two duration formats so no screen formats time by hand.
- **StatTile** — the dashboard's headline figure, in the system's mono/label pairing.

### Not built (needs the user's direction)
- A calendar/week grid view for dragging entries — the brief mentions a dashboard and lists, not a calendar.
- Anything for the future macOS tracker beyond the token field in Settings.
- Multi-currency, tax rules and payment reconciliation are stubbed visually only.
