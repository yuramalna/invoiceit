const injected = new Set();
export function injectStyle(id, css) {
  if (typeof document === 'undefined' || injected.has(id)) return;
  injected.add(id);
  const el = document.createElement('style');
  el.setAttribute('data-hours', id);
  el.textContent = css;
  document.head.appendChild(el);
}
