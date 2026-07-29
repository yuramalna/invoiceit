import React from 'react';

const {
  IconButton,
  Select,
} = window.HoursDesignSystem_76f0a9;

export function pageCount(total, pageSize) {
  if (pageSize === 'all') return 1;
  return Math.max(1, Math.ceil(total / Math.max(1, Number(pageSize) || 1)));
}

export function pageSlice(items, page, pageSize) {
  if (pageSize === 'all') return items;
  const resolvedPageSize = Math.max(1, Number(pageSize) || 1);
  const start = (page - 1) * resolvedPageSize;
  return items.slice(start, start + resolvedPageSize);
}

export default function Pagination({
  page,
  pageSize,
  total,
  label = 'items',
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100, 'all'],
}) {
  if (!total) return null;

  const resolvedPageSize = pageSize === 'all' ? total : Math.max(1, Number(pageSize) || 1);
  const totalPages = pageCount(total, pageSize);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const first = ((safePage - 1) * resolvedPageSize) + 1;
  const last = Math.min(safePage * resolvedPageSize, total);

  return (
    <nav className="pagination" aria-label={`${label} pagination`}>
      <span className="pagination__summary">
        <span className="pagination__range">{first}–{last}</span> of {total} {label}
      </span>
      <div className="pagination__settings">
        {onPageSizeChange ? (
          <label className="pagination__size">
            <span>Per page</span>
            <Select
              size="sm"
              aria-label={`${label} per page`}
              value={String(pageSize)}
              onChange={(event) => onPageSizeChange(
                event.target.value === 'all' ? 'all' : Number(event.target.value),
              )}
              options={pageSizeOptions.map((value) => ({
                value: String(value),
                label: value === 'all' ? 'All' : String(value),
              }))}
            />
          </label>
        ) : null}
        <div className="pagination__controls">
          <IconButton
            icon="ChevronLeft"
            size="sm"
            outlined
            label={`Previous ${label} page`}
            disabled={safePage <= 1}
            onClick={() => onPageChange(safePage - 1)}
          />
          <span className="pagination__page">Page {safePage} of {totalPages}</span>
          <IconButton
            icon="ChevronRight"
            size="sm"
            outlined
            label={`Next ${label} page`}
            disabled={safePage >= totalPages}
            onClick={() => onPageChange(safePage + 1)}
          />
        </div>
      </div>
    </nav>
  );
}
