import React from 'react';

const {
  IconButton,
  Select,
} = window.HoursDesignSystem_76f0a9;

export function pageCount(total, pageSize) {
  return Math.max(1, Math.ceil(total / pageSize));
}

export function pageSlice(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export default function Pagination({
  page,
  pageSize,
  total,
  label = 'items',
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
}) {
  if (!total) return null;

  const totalPages = pageCount(total, pageSize);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const first = ((safePage - 1) * pageSize) + 1;
  const last = Math.min(safePage * pageSize, total);

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
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
              options={pageSizeOptions.map((value) => ({ value: String(value), label: String(value) }))}
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
