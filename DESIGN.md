# Hours design system

## Direction

Hours is an editorial work ledger: warm paper, warm near-black ink, hairline rules, and a dense but calm application frame. The editorial quality comes from typography and composition rather than decoration.

## Color

- Page and structural surfaces use the `paper` ramp from `--paper-25` through `--paper-300`.
- Text and rules use the `ink` ramp; pure black is not used.
- Pine is structural: primary actions, focus, selection, and historical chart data.
- Terracotta means time is actively running. It is not a general accent.
- Client colors appear only as small identity dots and progress fills.
- Status colors always accompany a text label.

The canonical values live in `Hours Design System/tokens/colors.css`.

## Typography

- Archivo carries display and interface text at regular, medium, and semibold weights.
- Martian Mono carries every duration, count, rate, amount, date-like figure, and file size.
- Product typography uses fixed sizes. Headings are tightly tracked but never tighter than the supplied token values.
- Labels are 10.5px uppercase with 0.1em tracking and are reserved for metadata, table headings, and compact section context.

## Spacing and layout

- The system uses a 4px base grid.
- Desktop uses a 232px sidebar, 60px top bar, 40px page gutter, and an optional 300px detail rail.
- Related controls use 8–16px gaps; major blocks use 32–64px separation.
- Data tables remain ledger-like on wide screens and become readable record groups on narrow screens.
- Mobile replaces the sidebar with a persistent bottom navigation and keeps the timer within easy reach.

## Shape and elevation

- Controls use a 5px radius, cards 8px, dialogs 14px.
- Cards use a hairline border with no decorative shadow.
- Shadows are shallow and warm, reserved for floating timers, dialogs, toasts, and the invoice sheet.
- Pressed controls change color or shadow; they never scale.

## Motion

- Motion is limited to 80–280ms state transitions, a 4px fade-up for temporary UI, and the running timer pulse.
- No springs, bounce, page choreography, or skeleton shimmer.
- Reduced-motion preferences disable non-essential movement.

## Components

The production application consumes the canonical bundle in `Hours Design System/_ds_bundle.js` and the token entry point in `Hours Design System/styles.css`. Core patterns include Button, Input, Select, Dialog, Tabs, DataTable, Card, StatTile, ProgressBar, Timer, Duration, TimeEntryRow, SidebarNav, Toast, and Badge.

## Content

Use sentence case, short factual labels, and middle dots for metadata separation. Billing durations use decimal hours to two places; active tracking uses `HH:MM:SS`. Currency includes a symbol and two decimals. Empty states explain the next action without congratulating the user.

Billing settings avoid industry shorthand. Use “Payment due” instead of “Net days,” and “Monthly hour limit” instead of “Budget.” Both controls explain when they matter; the hour limit remains optional because not every engagement is a retainer or capped contract.

Invoice editing separates tracked time from additional items. Additional items use the familiar description, quantity, and unit-price pattern so equipment, expenses, licenses, and fixed fees can coexist with hourly work without changing the time ledger.

Entry duplication is review-first: “Duplicate” opens a prefilled new-entry dialog, while “Edit” continues to modify the original. A copy keeps the work details but receives a new identity and never inherits invoice linkage.
