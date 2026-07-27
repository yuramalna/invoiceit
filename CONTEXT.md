# Hours

Hours is a private work ledger that turns client work and direct charges into invoices.

## Language

**Time entry**:
A tracked span of work associated with a client and project.
_Avoid_: Task, time report

**Invoice item**:
A charge listed on an invoice.
_Avoid_: Row, record

**Time item**:
An invoice item generated from a billable time entry, with hours as its quantity.
_Avoid_: Time report

**Additional item**:
An invoice item entered directly on a draft for goods, expenses, licenses, or fixed fees; it has no time entry.
_Avoid_: Manual charge, expense
