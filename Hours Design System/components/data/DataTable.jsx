import React from 'react';
import { injectStyle } from '../_internal/style.js';
import { Icon } from '../core/Icon.jsx';

injectStyle('datatable', `
.hrs-table{width:100%;border-collapse:collapse;font-size:14px}
.hrs-table th{text-align:left;font-size:var(--label-size);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);color:var(--text-muted);padding:var(--space-3) var(--gutter-inline);border-bottom:1px solid var(--line-rule);white-space:nowrap;background:var(--surface-card)}
.hrs-table td{padding:0 var(--gutter-inline);height:var(--row-h);border-bottom:1px solid var(--line-hairline);color:var(--ink-700);vertical-align:middle}
.hrs-table tbody tr:last-child td{border-bottom:0}
.hrs-table tbody tr{transition:background-color var(--dur-fast) var(--ease-out)}
.hrs-table--hover tbody tr:hover{background:var(--surface-hover)}
.hrs-table__num{text-align:right;font-family:var(--font-mono);font-variant-numeric:tabular-nums;letter-spacing:var(--num-ls);color:var(--ink-900)}
.hrs-table__sort{display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:inherit}
.hrs-table__sort:hover{color:var(--ink-700)}
.hrs-table--compact td{height:36px}
.hrs-table__group td{height:32px;background:var(--surface-sunken);border-bottom:1px solid var(--line-rule);font-size:var(--label-size);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);color:var(--text-muted)}
`);

export function DataTable({ columns = [], rows = [], hover = true, compact, sortKey, onSort, renderCell, empty }) {
  return (
    <table className={['hrs-table', hover ? 'hrs-table--hover' : '', compact ? 'hrs-table--compact' : ''].join(' ').trim()}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} style={{ width: c.width, textAlign: c.numeric ? 'right' : 'left' }}>
              {onSort ? (
                <span className="hrs-table__sort" onClick={() => onSort(c.key)}>
                  {c.label}{sortKey === c.key ? <Icon name="ChevronDown" size={12} /> : null}
                </span>
              ) : c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={columns.length} style={{ height: 88, textAlign: 'center', color: 'var(--text-faint)' }}>{empty || 'Nothing here yet'}</td></tr>
        ) : rows.map((r, i) => (
          r.__group ? (
            <tr className="hrs-table__group" key={'g' + i}><td colSpan={columns.length}>{r.__group}</td></tr>
          ) : (
            <tr key={r.id ?? i}>
              {columns.map((c) => (
                <td key={c.key} className={c.numeric ? 'hrs-table__num' : ''}>
                  {renderCell ? renderCell(c, r, i) : r[c.key]}
                </td>
              ))}
            </tr>
          )
        ))}
      </tbody>
    </table>
  );
}
