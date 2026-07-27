/* @ds-bundle: {"format":4,"namespace":"HoursDesignSystem_76f0a9","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},{"name":"Field","sourcePath":"components/core/Field.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Radio","sourcePath":"components/core/Radio.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"EmptyState","sourcePath":"components/data/EmptyState.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"StatTile","sourcePath":"components/data/StatTile.jsx"},{"name":"Tag","sourcePath":"components/data/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"ToastStack","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"SidebarNav","sourcePath":"components/navigation/SidebarNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Duration","sourcePath":"components/time/Duration.jsx"},{"name":"TimeEntryRow","sourcePath":"components/time/TimeEntryRow.jsx"},{"name":"Timer","sourcePath":"components/time/Timer.jsx"}],"sourceHashes":{"components/_internal/style.js":"5c9c6620801b","components/core/Button.jsx":"56d1d544e24e","components/core/Checkbox.jsx":"ce1769204eb0","components/core/Field.jsx":"233385275adf","components/core/Icon.jsx":"185427b3d732","components/core/IconButton.jsx":"152021d2ad3c","components/core/Input.jsx":"02b057639f0b","components/core/Radio.jsx":"f25550a4575d","components/core/Select.jsx":"8a3f8a32fe1e","components/core/Switch.jsx":"42ced3011686","components/data/Badge.jsx":"7ad493b2e495","components/data/Card.jsx":"32194bf62198","components/data/DataTable.jsx":"b5919d43121a","components/data/EmptyState.jsx":"5b51447f18e5","components/data/ProgressBar.jsx":"2f1ef7b5695e","components/data/StatTile.jsx":"aa8bea12e227","components/data/Tag.jsx":"a8bc3f7d08a1","components/feedback/Dialog.jsx":"f4682d744c5d","components/feedback/Toast.jsx":"e5b880965137","components/feedback/Tooltip.jsx":"8ea50afe004c","components/navigation/SidebarNav.jsx":"9aa415429054","components/navigation/Tabs.jsx":"b90aae28723b","components/time/Duration.jsx":"f0116ba257bc","components/time/TimeEntryRow.jsx":"97f184a6980b","components/time/Timer.jsx":"d99f79356ea0","ui_kits/app/AppShell.jsx":"48d7ddb103f4","ui_kits/app/ClientsScreen.jsx":"37688fbf43d0","ui_kits/app/EntriesScreen.jsx":"16bfa9d2d931","ui_kits/app/InvoiceDocument.jsx":"01a31fc4a2a3","ui_kits/app/InvoicesScreen.jsx":"08d336af23b2","ui_kits/app/ReportsScreen.jsx":"775f0283cb35","ui_kits/app/TodayScreen.jsx":"870eb35d3e07","ui_kits/app/data.jsx":"7f0f83043552"},"inlinedExternals":[],"unexposedExports":[{"name":"formatClock","sourcePath":"components/time/Duration.jsx"},{"name":"formatDecimal","sourcePath":"components/time/Duration.jsx"},{"name":"injectStyle","sourcePath":"components/_internal/style.js"}]} */

(() => {

const __ds_ns = (window.HoursDesignSystem_76f0a9 = window.HoursDesignSystem_76f0a9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/_internal/style.js
try { (() => {
const injected = new Set();
function injectStyle(id, css) {
  if (typeof document === 'undefined' || injected.has(id)) return;
  injected.add(id);
  const el = document.createElement('style');
  el.setAttribute('data-hours', id);
  el.textContent = css;
  document.head.appendChild(el);
}
Object.assign(__ds_scope, { injectStyle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/_internal/style.js", error: String((e && e.message) || e) }); }

// components/core/Field.jsx
try { (() => {
__ds_scope.injectStyle('field', `
.hrs-field{display:flex;flex-direction:column;gap:var(--space-2)}
.hrs-field__label{font-size:var(--label-size);line-height:var(--label-lh);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);color:var(--text-muted);display:flex;align-items:center;gap:var(--space-2)}
.hrs-field__opt{text-transform:none;letter-spacing:-.005em;font-size:11px;color:var(--text-faint);font-weight:var(--weight-regular)}
.hrs-field__hint{font-size:12px;color:var(--text-muted)}
.hrs-field__err{font-size:12px;color:var(--rust-500)}
`);
function Field({
  label,
  hint,
  error,
  optional,
  htmlFor,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hrs-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "hrs-field__label",
    htmlFor: htmlFor
  }, label, optional ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-field__opt"
  }, "optional") : null) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-field__err"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Field.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Lucide (loaded from CDN as a UMD global) is the Hours icon set.
// Icon reads the icon's node data off the global and renders it as SVG —
// no hand-drawn paths live in this design system.
function nodes(name) {
  const l = typeof window !== 'undefined' ? window.lucide : null;
  if (!l) return null;
  const raw = l.icons && (l.icons[name] || l.icons[name.toLowerCase()]) || l[name];
  if (!raw) return null;
  if (Array.isArray(raw) && raw[0] === 'svg') return raw[2] || [];
  return Array.isArray(raw) ? raw : null;
}
function Icon({
  name,
  size = 16,
  strokeWidth = 1.75,
  color = 'currentColor',
  style,
  className,
  label
}) {
  const kids = nodes(name);
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    role: label ? 'img' : undefined,
    'aria-label': label,
    'aria-hidden': label ? undefined : true,
    style: {
      display: 'block',
      flex: '0 0 auto',
      ...style
    }
  };
  if (!kids) return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
    "data-icon-missing": name
  }));
  return /*#__PURE__*/React.createElement("svg", common, kids.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyle('button', `
.hrs-btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);font-family:var(--font-sans);font-weight:var(--weight-medium);letter-spacing:-.002em;border-radius:var(--radius-md);border:1px solid transparent;cursor:pointer;white-space:nowrap;transition:var(--transition-control);text-decoration:none}
.hrs-btn:disabled{cursor:not-allowed;opacity:.45}
.hrs-btn--md{height:var(--control-h);padding:0 var(--space-4);font-size:14px}
.hrs-btn--sm{height:var(--control-h-sm);padding:0 var(--space-3);font-size:12.5px}
.hrs-btn--lg{height:var(--control-h-lg);padding:0 var(--space-5);font-size:15px}
.hrs-btn--full{width:100%}
.hrs-btn--primary{background:var(--pine-700);color:var(--paper-50);box-shadow:var(--shadow-sm)}
.hrs-btn--primary:hover:not(:disabled){background:var(--pine-600)}
.hrs-btn--primary:active:not(:disabled){background:var(--pine-700);box-shadow:none}
.hrs-btn--secondary{background:var(--surface-raised);color:var(--ink-700);border-color:var(--line-rule);box-shadow:var(--shadow-sm)}
.hrs-btn--secondary:hover:not(:disabled){background:var(--paper-50);border-color:var(--line-strong)}
.hrs-btn--secondary:active:not(:disabled){background:var(--paper-100);box-shadow:none}
.hrs-btn--ghost{background:transparent;color:var(--ink-500)}
.hrs-btn--ghost:hover:not(:disabled){background:var(--surface-hover);color:var(--ink-700)}
.hrs-btn--ghost:active:not(:disabled){background:var(--surface-active)}
.hrs-btn--accent{background:var(--terracotta-500);color:#fff;box-shadow:var(--shadow-sm)}
.hrs-btn--accent:hover:not(:disabled){background:var(--terracotta-600)}
.hrs-btn--danger{background:transparent;color:var(--rust-500);border-color:var(--rust-500)}
.hrs-btn--danger:hover:not(:disabled){background:var(--rust-50)}
.hrs-btn:focus-visible{outline:none;box-shadow:var(--ring-focus)}
`);
function Button({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  iconRight,
  full,
  as = 'button',
  ...rest
}) {
  const Tag = as;
  const cls = ['hrs-btn', 'hrs-btn--' + variant, 'hrs-btn--' + size, full ? 'hrs-btn--full' : ''].join(' ').trim();
  const s = size === 'sm' ? 13 : 15;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyle('checkbox', `
.hrs-check{display:inline-flex;align-items:flex-start;gap:var(--space-2);cursor:pointer;font-size:14px;color:var(--ink-700)}
.hrs-check input{position:absolute;opacity:0;width:0;height:0}
.hrs-check__box{flex:0 0 auto;width:16px;height:16px;margin-top:1px;border:1px solid var(--line-strong);border-radius:var(--radius-xs);background:var(--surface-raised);display:flex;align-items:center;justify-content:center;color:transparent;transition:var(--transition-control)}
.hrs-check:hover .hrs-check__box{border-color:var(--pine-500)}
.hrs-check--on .hrs-check__box{background:var(--pine-700);border-color:var(--pine-700);color:#fff}
.hrs-check input:focus-visible + .hrs-check__box{box-shadow:var(--ring-focus)}
.hrs-check--disabled{opacity:.45;cursor:not-allowed}
.hrs-check__note{display:block;font-size:12px;color:var(--text-muted)}
`);
function Checkbox({
  checked,
  label,
  note,
  disabled,
  onChange,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['hrs-check', checked ? 'hrs-check--on' : '', disabled ? 'hrs-check--disabled' : ''].join(' ').trim()
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "hrs-check__box"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "Check",
    size: 11,
    strokeWidth: 2.5
  })), label ? /*#__PURE__*/React.createElement("span", null, label, note ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-check__note"
  }, note) : null) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyle('iconbutton', `
.hrs-iconbtn{display:inline-flex;align-items:center;justify-content:center;background:transparent;border:1px solid transparent;border-radius:var(--radius-sm);color:var(--ink-400);cursor:pointer;transition:var(--transition-control)}
.hrs-iconbtn:hover:not(:disabled){background:var(--surface-hover);color:var(--ink-700)}
.hrs-iconbtn:active:not(:disabled){background:var(--surface-active)}
.hrs-iconbtn:disabled{opacity:.4;cursor:not-allowed}
.hrs-iconbtn:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.hrs-iconbtn--outlined{border-color:var(--line-rule);background:var(--surface-raised)}
.hrs-iconbtn--sm{width:24px;height:24px}
.hrs-iconbtn--md{width:30px;height:30px}
.hrs-iconbtn--lg{width:36px;height:36px}
.hrs-iconbtn--danger:hover:not(:disabled){background:var(--rust-50);color:var(--rust-500)}
`);
function IconButton({
  icon,
  size = 'md',
  outlined,
  tone = 'default',
  label,
  ...rest
}) {
  const px = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    className: ['hrs-iconbtn', 'hrs-iconbtn--' + size, outlined ? 'hrs-iconbtn--outlined' : '', tone === 'danger' ? 'hrs-iconbtn--danger' : ''].join(' ').trim()
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: px
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyle('input', `
.hrs-input{display:flex;align-items:center;gap:var(--space-2);height:var(--control-h);padding:0 var(--space-3);background:var(--surface-raised);border:1px solid var(--line-rule);border-radius:var(--radius-md);transition:var(--transition-control)}
.hrs-input:hover{border-color:var(--line-strong)}
.hrs-input:focus-within{border-color:var(--pine-500);box-shadow:var(--ring-focus)}
.hrs-input--lg{height:var(--control-h-lg)}
.hrs-input--sm{height:var(--control-h-sm);padding:0 var(--space-2)}
.hrs-input--invalid{border-color:var(--rust-500)}
.hrs-input--invalid:focus-within{box-shadow:0 0 0 3px rgba(166,58,42,.15)}
.hrs-input--disabled{background:var(--paper-100);opacity:.7}
.hrs-input--seamless{background:transparent;border-color:transparent;box-shadow:none}
.hrs-input--seamless:hover{background:var(--surface-hover);border-color:transparent}
.hrs-input__el{flex:1;min-width:0;border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:14px;color:var(--ink-900)}
.hrs-input__el::placeholder{color:var(--text-faint)}
.hrs-input--num .hrs-input__el{font-family:var(--font-mono);font-variant-numeric:tabular-nums;letter-spacing:var(--num-ls)}
.hrs-input--right .hrs-input__el{text-align:right}
.hrs-input__affix{font-size:13px;color:var(--text-faint);font-family:var(--font-mono);flex:0 0 auto}
.hrs-input textarea.hrs-input__el{resize:vertical;padding:0;line-height:1.5}
.hrs-input--area{height:auto;padding:var(--space-3)}
`);
function Input({
  prefix,
  suffix,
  icon,
  size = 'md',
  numeric,
  align,
  invalid,
  seamless,
  multiline,
  rows = 3,
  disabled,
  ...rest
}) {
  const cls = ['hrs-input', size !== 'md' ? 'hrs-input--' + size : '', numeric ? 'hrs-input--num' : '', align === 'right' ? 'hrs-input--right' : '', invalid ? 'hrs-input--invalid' : '', seamless ? 'hrs-input--seamless' : '', disabled ? 'hrs-input--disabled' : '', multiline ? 'hrs-input--area' : ''].join(' ').trim();
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14,
    color: "var(--text-faint)"
  }) : null, prefix ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-input__affix"
  }, prefix) : null, multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    className: "hrs-input__el",
    rows: rows,
    disabled: disabled
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    className: "hrs-input__el",
    disabled: disabled
  }, rest)), suffix ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-input__affix"
  }, suffix) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Radio.jsx
try { (() => {
__ds_scope.injectStyle('radio', `
.hrs-radio{display:inline-flex;align-items:flex-start;gap:var(--space-2);cursor:pointer;font-size:14px;color:var(--ink-700)}
.hrs-radio input{position:absolute;opacity:0;width:0;height:0}
.hrs-radio__dot{flex:0 0 auto;width:16px;height:16px;margin-top:1px;border:1px solid var(--line-strong);border-radius:var(--radius-pill);background:var(--surface-raised);display:flex;align-items:center;justify-content:center;transition:var(--transition-control)}
.hrs-radio__dot::after{content:'';width:7px;height:7px;border-radius:var(--radius-pill);background:var(--pine-700);transform:scale(0);transition:transform var(--dur-fast) var(--ease-out)}
.hrs-radio:hover .hrs-radio__dot{border-color:var(--pine-500)}
.hrs-radio--on .hrs-radio__dot{border-color:var(--pine-700)}
.hrs-radio--on .hrs-radio__dot::after{transform:scale(1)}
.hrs-radio input:focus-visible + .hrs-radio__dot{box-shadow:var(--ring-focus)}
.hrs-radio--disabled{opacity:.45;cursor:not-allowed}
.hrs-radio__note{display:block;font-size:12px;color:var(--text-muted)}
`);
function Radio({
  checked,
  label,
  note,
  name,
  disabled,
  onChange,
  value
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['hrs-radio', checked ? 'hrs-radio--on' : '', disabled ? 'hrs-radio--disabled' : ''].join(' ').trim()
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }), /*#__PURE__*/React.createElement("span", {
    className: "hrs-radio__dot"
  }), label ? /*#__PURE__*/React.createElement("span", null, label, note ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-radio__note"
  }, note) : null) : null);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Radio.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyle('select', `
.hrs-select{position:relative;display:flex;align-items:center;height:var(--control-h);background:var(--surface-raised);border:1px solid var(--line-rule);border-radius:var(--radius-md);transition:var(--transition-control)}
.hrs-select:hover{border-color:var(--line-strong)}
.hrs-select:focus-within{border-color:var(--pine-500);box-shadow:var(--ring-focus)}
.hrs-select--sm{height:var(--control-h-sm)}
.hrs-select--seamless{background:transparent;border-color:transparent}
.hrs-select--seamless:hover{background:var(--surface-hover)}
.hrs-select__el{appearance:none;flex:1;min-width:0;border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:14px;color:var(--ink-900);padding:0 26px 0 var(--space-3);height:100%;cursor:pointer}
.hrs-select__chev{position:absolute;right:var(--space-2);pointer-events:none;color:var(--text-faint)}
.hrs-select__dot{position:absolute;left:var(--space-3);width:7px;height:7px;border-radius:var(--radius-pill);pointer-events:none}
.hrs-select--dotted .hrs-select__el{padding-left:26px}
`);
function Select({
  options = [],
  size = 'md',
  seamless,
  dotColor,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['hrs-select', size !== 'md' ? 'hrs-select--' + size : '', seamless ? 'hrs-select--seamless' : '', dotColor ? 'hrs-select--dotted' : ''].join(' ').trim()
  }, dotColor ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-select__dot",
    style: {
      background: dotColor
    }
  }) : null, /*#__PURE__*/React.createElement("select", _extends({
    className: "hrs-select__el"
  }, rest), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "ChevronDown",
    size: 14,
    className: "hrs-select__chev"
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
__ds_scope.injectStyle('switch', `
.hrs-switch{display:inline-flex;align-items:center;gap:var(--space-3);cursor:pointer;font-size:14px;color:var(--ink-700)}
.hrs-switch input{position:absolute;opacity:0;width:0;height:0}
.hrs-switch__track{position:relative;flex:0 0 auto;width:32px;height:18px;border-radius:var(--radius-pill);background:var(--paper-300);transition:background-color var(--dur-fast) var(--ease-out)}
.hrs-switch__knob{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:var(--radius-pill);background:var(--surface-raised);box-shadow:var(--shadow-sm);transition:transform var(--dur-fast) var(--ease-out)}
.hrs-switch--on .hrs-switch__track{background:var(--pine-600)}
.hrs-switch--on .hrs-switch__knob{transform:translateX(14px)}
.hrs-switch input:focus-visible + .hrs-switch__track{box-shadow:var(--ring-focus)}
.hrs-switch--disabled{opacity:.45;cursor:not-allowed}
`);
function Switch({
  checked,
  label,
  disabled,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['hrs-switch', checked ? 'hrs-switch--on' : '', disabled ? 'hrs-switch--disabled' : ''].join(' ').trim()
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }), /*#__PURE__*/React.createElement("span", {
    className: "hrs-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hrs-switch__knob"
  })), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/data/Badge.jsx
try { (() => {
__ds_scope.injectStyle('badge', `
.hrs-badge{display:inline-flex;align-items:center;gap:6px;height:20px;padding:0 8px;border-radius:var(--radius-sm);font-size:var(--label-size);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);white-space:nowrap}
.hrs-badge__dot{width:5px;height:5px;border-radius:var(--radius-pill);background:currentColor}
.hrs-badge--live{animation:hours-pulse 1.8s var(--ease-in-out) infinite}
`);
const TONES = {
  live: ['--status-live-bg', '--status-live'],
  paid: ['--status-paid-bg', '--status-paid'],
  pending: ['--status-pending-bg', '--status-pending'],
  overdue: ['--status-overdue-bg', '--status-overdue'],
  draft: ['--status-draft-bg', '--status-draft'],
  info: ['--status-info-bg', '--status-info']
};
function Badge({
  tone = 'draft',
  children,
  dot,
  pulse
}) {
  const [bg, fg] = TONES[tone] || TONES.draft;
  return /*#__PURE__*/React.createElement("span", {
    className: "hrs-badge",
    style: {
      background: 'var(' + bg + ')',
      color: 'var(' + fg + ')'
    }
  }, dot ? /*#__PURE__*/React.createElement("span", {
    className: 'hrs-badge__dot' + (pulse ? ' hrs-badge--live' : '')
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyle('card', `
.hrs-card{background:var(--surface-card);border:1px solid var(--line-rule);border-radius:var(--radius-lg);overflow:hidden}
.hrs-card--raised{background:var(--surface-raised);box-shadow:var(--shadow-card)}
.hrs-card--flat{background:transparent;border-color:var(--line-hairline)}
.hrs-card__head{display:flex;align-items:baseline;justify-content:space-between;gap:var(--space-4);padding:var(--space-4) var(--gutter-inline);border-bottom:1px solid var(--line-rule)}
.hrs-card__title{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--title-1-size);line-height:var(--title-1-lh);letter-spacing:var(--title-1-ls);color:var(--text-display)}
.hrs-card__eyebrow{font-size:var(--label-size);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);color:var(--text-muted);margin-bottom:var(--space-2)}
.hrs-card__body{padding:var(--gutter-inline)}
.hrs-card__body--flush{padding:0}
`);
function Card({
  title,
  eyebrow,
  action,
  flush,
  variant = 'default',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    className: ['hrs-card', variant !== 'default' ? 'hrs-card--' + variant : ''].join(' ').trim(),
    style: style
  }, rest), title || eyebrow || action ? /*#__PURE__*/React.createElement("header", {
    className: "hrs-card__head"
  }, /*#__PURE__*/React.createElement("div", null, eyebrow ? /*#__PURE__*/React.createElement("div", {
    className: "hrs-card__eyebrow"
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h2", {
    className: "hrs-card__title"
  }, title) : null), action) : null, /*#__PURE__*/React.createElement("div", {
    className: ['hrs-card__body', flush ? 'hrs-card__body--flush' : ''].join(' ').trim()
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
__ds_scope.injectStyle('datatable', `
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
function DataTable({
  columns = [],
  rows = [],
  hover = true,
  compact,
  sortKey,
  onSort,
  renderCell,
  empty
}) {
  return /*#__PURE__*/React.createElement("table", {
    className: ['hrs-table', hover ? 'hrs-table--hover' : '', compact ? 'hrs-table--compact' : ''].join(' ').trim()
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      width: c.width,
      textAlign: c.numeric ? 'right' : 'left'
    }
  }, onSort ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-table__sort",
    onClick: () => onSort(c.key)
  }, c.label, sortKey === c.key ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "ChevronDown",
    size: 12
  }) : null) : c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      height: 88,
      textAlign: 'center',
      color: 'var(--text-faint)'
    }
  }, empty || 'Nothing here yet')) : rows.map((r, i) => r.__group ? /*#__PURE__*/React.createElement("tr", {
    className: "hrs-table__group",
    key: 'g' + i
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length
  }, r.__group)) : /*#__PURE__*/React.createElement("tr", {
    key: r.id ?? i
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    className: c.numeric ? 'hrs-table__num' : ''
  }, renderCell ? renderCell(c, r, i) : r[c.key]))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/EmptyState.jsx
try { (() => {
__ds_scope.injectStyle('empty', `
.hrs-empty{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--space-3);padding:var(--space-16) var(--space-8);background-image:var(--texture-rule)}
.hrs-empty__icon{color:var(--ink-200)}
.hrs-empty__title{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--display-3-size);line-height:var(--display-3-lh);letter-spacing:var(--display-3-ls);color:var(--text-display)}
.hrs-empty__body{max-width:38ch;font-size:14px;color:var(--text-muted)}
.hrs-empty__act{margin-top:var(--space-2)}
`);
function EmptyState({
  icon = 'Clock',
  title,
  body,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hrs-empty"
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 28,
    strokeWidth: 1.25,
    className: "hrs-empty__icon"
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "hrs-empty__title"
  }, title), body ? /*#__PURE__*/React.createElement("p", {
    className: "hrs-empty__body"
  }, body) : null, action ? /*#__PURE__*/React.createElement("div", {
    className: "hrs-empty__act"
  }, action) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
__ds_scope.injectStyle('progress', `
.hrs-prog{display:flex;flex-direction:column;gap:6px}
.hrs-prog__track{height:4px;border-radius:var(--radius-pill);background:var(--paper-200);overflow:hidden}
.hrs-prog__fill{height:100%;border-radius:var(--radius-pill);transition:width var(--dur-slow) var(--ease-out)}
.hrs-prog__meta{display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted)}
.hrs-prog__meta b{font-family:var(--font-mono);font-variant-numeric:tabular-nums;font-weight:var(--weight-medium);color:var(--ink-700)}
`);
function ProgressBar({
  value,
  max = 100,
  color = 'var(--pine-500)',
  left,
  right
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", {
    className: "hrs-prog"
  }, left || right ? /*#__PURE__*/React.createElement("div", {
    className: "hrs-prog__meta"
  }, /*#__PURE__*/React.createElement("span", null, left), /*#__PURE__*/React.createElement("span", null, right)) : null, /*#__PURE__*/React.createElement("div", {
    className: "hrs-prog__track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hrs-prog__fill",
    style: {
      width: pct + '%',
      background: color
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/StatTile.jsx
try { (() => {
__ds_scope.injectStyle('stattile', `
.hrs-stat{display:flex;flex-direction:column;gap:var(--space-2);padding:var(--space-5) var(--gutter-inline);background:var(--surface-card);border:1px solid var(--line-rule);border-radius:var(--radius-lg)}
.hrs-stat--bare{background:transparent;border:0;border-left:1px solid var(--line-rule);border-radius:0;padding:0 0 0 var(--space-5)}
.hrs-stat__label{font-size:var(--label-size);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);color:var(--text-muted)}
.hrs-stat__value{font-family:var(--font-mono);font-variant-numeric:tabular-nums;font-size:var(--num-lg-size);line-height:1.05;letter-spacing:var(--num-ls);color:var(--text-display);display:flex;align-items:baseline;gap:.18em}
.hrs-stat__unit{font-family:var(--font-sans);font-size:14px;color:var(--text-faint);letter-spacing:0}
.hrs-stat__foot{display:flex;align-items:center;gap:var(--space-1);font-size:12px;color:var(--text-muted)}
.hrs-stat__foot--up{color:var(--moss-500)}
.hrs-stat__foot--down{color:var(--rust-500)}
`);
function StatTile({
  label,
  value,
  unit,
  delta,
  direction,
  note,
  bare
}) {
  const dirClass = direction ? ' hrs-stat__foot--' + direction : '';
  return /*#__PURE__*/React.createElement("div", {
    className: ['hrs-stat', bare ? 'hrs-stat--bare' : ''].join(' ').trim()
  }, /*#__PURE__*/React.createElement("span", {
    className: "hrs-stat__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "hrs-stat__value"
  }, value, unit ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-stat__unit"
  }, unit) : null), delta || note ? /*#__PURE__*/React.createElement("span", {
    className: 'hrs-stat__foot' + dirClass
  }, direction ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: direction === 'up' ? 'ArrowUpRight' : 'ArrowDownRight',
    size: 13
  }) : null, delta, delta && note ? ' · ' : '', note) : null);
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/data/Tag.jsx
try { (() => {
__ds_scope.injectStyle('tag', `
.hrs-tag{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 8px;border:1px solid var(--line-rule);border-radius:var(--radius-pill);background:var(--surface-raised);font-size:12px;color:var(--ink-500);white-space:nowrap;transition:var(--transition-control)}
.hrs-tag--clickable{cursor:pointer}
.hrs-tag--clickable:hover{border-color:var(--line-strong);color:var(--ink-700)}
.hrs-tag__dot{width:6px;height:6px;border-radius:var(--radius-pill);flex:0 0 auto}
.hrs-tag__x{display:flex;color:var(--text-faint);cursor:pointer}
.hrs-tag__x:hover{color:var(--rust-500)}
`);
function Tag({
  children,
  color,
  onRemove,
  onClick
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ['hrs-tag', onClick ? 'hrs-tag--clickable' : ''].join(' ').trim(),
    onClick: onClick
  }, color ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-tag__dot",
    style: {
      background: color
    }
  }) : null, children, onRemove ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-tag__x",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "X",
    size: 11
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
__ds_scope.injectStyle('dialog', `
.hrs-scrim{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:var(--space-8);background:rgba(22,21,16,.32);backdrop-filter:blur(2px);z-index:40;animation:hours-fade-up var(--dur-base) var(--ease-out)}
.hrs-dialog{width:100%;max-width:480px;background:var(--surface-raised);border:1px solid var(--line-rule);border-radius:var(--radius-xl);box-shadow:var(--shadow-modal);overflow:hidden}
.hrs-dialog--wide{max-width:680px}
.hrs-dialog__head{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-5) var(--space-6) var(--space-4)}
.hrs-dialog__title{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--display-3-size);line-height:var(--display-3-lh);letter-spacing:var(--display-3-ls);color:var(--text-display)}
.hrs-dialog__sub{font-size:13px;color:var(--text-muted);margin-top:var(--space-1)}
.hrs-dialog__body{padding:0 var(--space-6) var(--space-6);display:flex;flex-direction:column;gap:var(--space-4)}
.hrs-dialog__foot{display:flex;justify-content:flex-end;gap:var(--space-2);padding:var(--space-4) var(--space-6);background:var(--surface-sunken);border-top:1px solid var(--line-rule)}
`);
function Dialog({
  open = true,
  title,
  subtitle,
  footer,
  wide,
  onClose,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "hrs-scrim",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: ['hrs-dialog', wide ? 'hrs-dialog--wide' : ''].join(' ').trim(),
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("header", {
    className: "hrs-dialog__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hrs-dialog__title"
  }, title), subtitle ? /*#__PURE__*/React.createElement("div", {
    className: "hrs-dialog__sub"
  }, subtitle) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "X",
    size: "sm",
    label: "Close",
    onClick: onClose
  }) : null), /*#__PURE__*/React.createElement("div", {
    className: "hrs-dialog__body"
  }, children), footer ? /*#__PURE__*/React.createElement("footer", {
    className: "hrs-dialog__foot"
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
__ds_scope.injectStyle('toast', `
.hrs-toast{display:inline-flex;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--space-4);background:var(--ink-900);color:var(--paper-50);border-radius:var(--radius-md);box-shadow:var(--shadow-popover);font-size:13.5px;animation:hours-fade-up var(--dur-base) var(--ease-out)}
.hrs-toast__act{background:none;border:0;color:var(--terracotta-200);cursor:pointer;font-size:13px;font-weight:var(--weight-medium);padding:0;border-bottom:1px solid transparent}
.hrs-toast__act:hover{border-bottom-color:var(--terracotta-200)}
.hrs-toast--ok{color:var(--moss-50)}
.hrs-toast__stack{position:absolute;bottom:var(--space-6);left:50%;transform:translateX(-50%);display:flex;flex-direction:column;gap:var(--space-2);align-items:center;z-index:50}
`);
function Toast({
  children,
  icon,
  actionLabel,
  onAction,
  tone = 'default'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['hrs-toast', tone === 'success' ? 'hrs-toast--ok' : ''].join(' ').trim()
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }) : null, /*#__PURE__*/React.createElement("span", null, children), actionLabel ? /*#__PURE__*/React.createElement("button", {
    className: "hrs-toast__act",
    onClick: onAction
  }, actionLabel) : null);
}
function ToastStack({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hrs-toast__stack"
  }, children);
}
Object.assign(__ds_scope, { Toast, ToastStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
__ds_scope.injectStyle('tooltip', `
.hrs-tip{position:relative;display:inline-flex}
.hrs-tip__bub{position:absolute;left:50%;transform:translateX(-50%) translateY(2px);bottom:calc(100% + 6px);padding:5px 8px;background:var(--ink-900);color:var(--paper-50);border-radius:var(--radius-sm);font-size:12px;line-height:1.35;white-space:nowrap;box-shadow:var(--shadow-popover);opacity:0;pointer-events:none;transition:opacity var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out);z-index:30}
.hrs-tip__bub--below{bottom:auto;top:calc(100% + 6px)}
.hrs-tip:hover .hrs-tip__bub{opacity:1;transform:translateX(-50%) translateY(0)}
.hrs-tip__bub b{font-family:var(--font-mono);font-weight:var(--weight-medium);font-variant-numeric:tabular-nums}
`);
function Tooltip({
  label,
  placement = 'top',
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "hrs-tip"
  }, children, /*#__PURE__*/React.createElement("span", {
    className: ['hrs-tip__bub', placement === 'bottom' ? 'hrs-tip__bub--below' : ''].join(' ').trim()
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNav.jsx
try { (() => {
__ds_scope.injectStyle('sidebarnav', `
.hrs-nav{width:var(--sidebar-w);flex:0 0 var(--sidebar-w);height:100%;display:flex;flex-direction:column;gap:var(--space-6);padding:var(--space-6) var(--space-4);background:var(--surface-sunken);border-right:1px solid var(--line-rule)}
.hrs-nav__brand{display:flex;align-items:baseline;gap:8px;padding:0 var(--space-2)}
.hrs-nav__mark{font-family:var(--font-display);font-weight:var(--weight-display);font-size:21px;letter-spacing:-.045em;color:var(--ink-900)}
.hrs-nav__mark em{font-style:normal;color:var(--terracotta-500)}
.hrs-nav__ver{font-family:var(--font-mono);font-size:10px;color:var(--text-faint)}
.hrs-nav__group{display:flex;flex-direction:column;gap:2px}
.hrs-nav__gl{padding:0 var(--space-2) var(--space-2);font-size:var(--label-size);letter-spacing:var(--label-ls);text-transform:uppercase;font-weight:var(--weight-medium);color:var(--text-faint)}
.hrs-nav__item{display:flex;align-items:center;gap:var(--space-3);height:32px;padding:0 var(--space-2);border:0;background:none;border-radius:var(--radius-sm);cursor:pointer;font-size:14px;color:var(--ink-500);text-align:left;transition:var(--transition-control)}
.hrs-nav__item:hover{background:var(--paper-200);color:var(--ink-900)}
.hrs-nav__item--on{background:var(--surface-raised);color:var(--ink-900);font-weight:var(--weight-medium);box-shadow:var(--shadow-sm)}
.hrs-nav__item span{flex:1}
.hrs-nav__badge{font-family:var(--font-mono);font-size:11px;color:var(--text-faint);font-variant-numeric:tabular-nums}
.hrs-nav__foot{margin-top:auto;display:flex;flex-direction:column;gap:var(--space-2)}
`);
function SidebarNav({
  groups = [],
  value,
  onChange,
  brand = 'Hours',
  footer
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "hrs-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hrs-nav__brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hrs-nav__mark"
  }, brand, /*#__PURE__*/React.createElement("em", null, ".")), /*#__PURE__*/React.createElement("span", {
    className: "hrs-nav__ver"
  }, "self-hosted")), groups.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    className: "hrs-nav__group",
    key: gi
  }, g.label ? /*#__PURE__*/React.createElement("div", {
    className: "hrs-nav__gl"
  }, g.label) : null, g.items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.value,
    onClick: () => onChange && onChange(it.value),
    className: ['hrs-nav__item', value === it.value ? 'hrs-nav__item--on' : ''].join(' ').trim()
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, it.label), it.badge != null ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-nav__badge"
  }, it.badge) : null)))), footer ? /*#__PURE__*/React.createElement("div", {
    className: "hrs-nav__foot"
  }, footer) : null);
}
Object.assign(__ds_scope, { SidebarNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
__ds_scope.injectStyle('tabs', `
.hrs-tabs{display:flex;gap:var(--space-5);border-bottom:1px solid var(--line-rule)}
.hrs-tabs__tab{position:relative;padding:0 0 var(--space-3);background:none;border:0;cursor:pointer;font-size:14px;color:var(--text-muted);transition:color var(--dur-fast) var(--ease-out);display:inline-flex;align-items:center;gap:6px}
.hrs-tabs__tab:hover{color:var(--ink-700)}
.hrs-tabs__tab--on{color:var(--ink-900);font-weight:var(--weight-medium)}
.hrs-tabs__tab--on::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:1.5px;background:var(--ink-900)}
.hrs-tabs__count{font-family:var(--font-mono);font-size:11px;color:var(--text-faint);font-variant-numeric:tabular-nums}
`);
function Tabs({
  tabs = [],
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hrs-tabs",
    role: "tablist"
  }, tabs.map(t => {
    const v = typeof t === 'string' ? t : t.value;
    const l = typeof t === 'string' ? t : t.label;
    const c = typeof t === 'string' ? null : t.count;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": value === v,
      onClick: () => onChange && onChange(v),
      className: ['hrs-tabs__tab', value === v ? 'hrs-tabs__tab--on' : ''].join(' ').trim()
    }, l, c != null ? /*#__PURE__*/React.createElement("span", {
      className: "hrs-tabs__count"
    }, c) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/time/Duration.jsx
try { (() => {
__ds_scope.injectStyle('duration', `
.hrs-dur{font-family:var(--font-mono);font-variant-numeric:tabular-nums;letter-spacing:var(--num-ls);color:var(--ink-900)}
.hrs-dur--sm{font-size:var(--num-sm-size)}
.hrs-dur--md{font-size:var(--num-md-size)}
.hrs-dur--lg{font-size:var(--num-lg-size);line-height:1.05}
.hrs-dur--xl{font-size:52px;line-height:1}
.hrs-dur--live{color:var(--terracotta-600)}
.hrs-dur--muted{color:var(--text-muted)}
.hrs-dur__sec{opacity:.45}
`);
function formatClock(seconds) {
  const s = Math.max(0, Math.round(seconds));
  const h = Math.floor(s / 3600),
    m = Math.floor(s % 3600 / 60),
    sec = s % 60;
  return [String(h).padStart(2, '0'), String(m).padStart(2, '0'), String(sec).padStart(2, '0')];
}
function formatDecimal(seconds) {
  return (Math.round(seconds / 3600 * 100) / 100).toFixed(2);
}
function Duration({
  seconds = 0,
  format = 'clock',
  size = 'md',
  tone = 'default',
  showSeconds = true
}) {
  const cls = ['hrs-dur', 'hrs-dur--' + size, tone !== 'default' ? 'hrs-dur--' + tone : ''].join(' ').trim();
  if (format === 'decimal') return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, formatDecimal(seconds));
  const [h, m, s] = formatClock(seconds);
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, h, ":", m, showSeconds ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-dur__sec"
  }, ":", s) : null);
}
Object.assign(__ds_scope, { formatClock, formatDecimal, Duration });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/time/Duration.jsx", error: String((e && e.message) || e) }); }

// components/time/TimeEntryRow.jsx
try { (() => {
__ds_scope.injectStyle('entryrow', `
.hrs-entry{display:flex;align-items:center;gap:var(--space-4);height:56px;padding:0 var(--gutter-inline);border-bottom:1px solid var(--line-hairline);transition:background-color var(--dur-fast) var(--ease-out)}
.hrs-entry:hover{background:var(--surface-hover)}
.hrs-entry:last-child{border-bottom:0}
.hrs-entry__dot{width:7px;height:7px;border-radius:var(--radius-pill);flex:0 0 auto}
.hrs-entry__main{flex:1;min-width:0}
.hrs-entry__task{font-size:14px;color:var(--ink-900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hrs-entry__meta{font-size:12px;color:var(--text-muted);display:flex;gap:6px;align-items:center;margin-top:2px}
.hrs-entry__span{font-family:var(--font-mono);font-size:12px;color:var(--text-faint);font-variant-numeric:tabular-nums}
.hrs-entry__amt{font-family:var(--font-mono);font-variant-numeric:tabular-nums;font-size:13px;color:var(--text-muted);min-width:72px;text-align:right}
.hrs-entry__acts{display:flex;gap:2px;opacity:0;transition:opacity var(--dur-fast) var(--ease-out)}
.hrs-entry:hover .hrs-entry__acts{opacity:1}
.hrs-entry--running{background:var(--terracotta-50)}
`);
function TimeEntryRow({
  task,
  client,
  project,
  dotColor = 'var(--client-1)',
  span,
  seconds = 0,
  amount,
  billable = true,
  running,
  onResume,
  onEdit,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['hrs-entry', running ? 'hrs-entry--running' : ''].join(' ').trim()
  }, /*#__PURE__*/React.createElement("span", {
    className: "hrs-entry__dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "hrs-entry__main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hrs-entry__task"
  }, task), /*#__PURE__*/React.createElement("div", {
    className: "hrs-entry__meta"
  }, /*#__PURE__*/React.createElement("span", null, client, project ? ' · ' + project : ''), span ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-entry__span"
  }, span) : null, !billable ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "draft"
  }, "Non-billable") : null, running ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "live",
    dot: true,
    pulse: true
  }, "Running") : null)), amount ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-entry__amt"
  }, amount) : null, /*#__PURE__*/React.createElement(__ds_scope.Duration, {
    seconds: seconds,
    format: "decimal",
    size: "md",
    tone: running ? 'live' : 'default'
  }), /*#__PURE__*/React.createElement("div", {
    className: "hrs-entry__acts"
  }, onResume ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "Play",
    size: "sm",
    label: "Resume",
    onClick: onResume
  }) : null, onEdit ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "Pencil",
    size: "sm",
    label: "Edit",
    onClick: onEdit
  }) : null, onDelete ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "Trash2",
    size: "sm",
    tone: "danger",
    label: "Delete",
    onClick: onDelete
  }) : null));
}
Object.assign(__ds_scope, { TimeEntryRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/time/TimeEntryRow.jsx", error: String((e && e.message) || e) }); }

// components/time/Timer.jsx
try { (() => {
__ds_scope.injectStyle('timer', `
.hrs-timer{display:flex;align-items:center;gap:var(--space-4);padding:var(--space-4) var(--gutter-inline);background:var(--surface-raised);border:1px solid var(--line-rule);border-radius:var(--radius-lg);box-shadow:var(--shadow-card)}
.hrs-timer--running{border-color:var(--terracotta-200);background:linear-gradient(to right,var(--terracotta-50),var(--surface-raised) 40%)}
.hrs-timer__fields{flex:1;display:flex;align-items:center;gap:var(--space-3);min-width:0}
.hrs-timer__task{flex:1;min-width:0}
.hrs-timer__clock{display:flex;align-items:center;gap:var(--space-2);padding-left:var(--space-4);border-left:1px solid var(--line-rule)}
.hrs-timer__pulse{width:6px;height:6px;border-radius:var(--radius-pill);background:var(--terracotta-500);animation:hours-pulse 1.8s var(--ease-in-out) infinite}
.hrs-timer__btn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border:0;border-radius:var(--radius-pill);cursor:pointer;transition:var(--transition-control);color:#fff}
.hrs-timer__btn--start{background:var(--terracotta-500)}
.hrs-timer__btn--start:hover{background:var(--terracotta-600)}
.hrs-timer__btn--stop{background:var(--ink-900)}
.hrs-timer__btn--stop:hover{background:var(--ink-700)}
.hrs-timer__btn:focus-visible{outline:none;box-shadow:var(--ring-focus)}
`);
function Timer({
  running = false,
  seconds = 0,
  task = '',
  projects = [],
  project,
  dotColor,
  onStart,
  onStop,
  onTaskChange,
  onProjectChange,
  ticking = true
}) {
  const [elapsed, setElapsed] = React.useState(seconds);
  React.useEffect(() => setElapsed(seconds), [seconds]);
  React.useEffect(() => {
    if (!running || !ticking) return;
    const id = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running, ticking]);
  return /*#__PURE__*/React.createElement("div", {
    className: ['hrs-timer', running ? 'hrs-timer--running' : ''].join(' ').trim()
  }, /*#__PURE__*/React.createElement("div", {
    className: "hrs-timer__fields"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hrs-timer__task"
  }, onTaskChange ? /*#__PURE__*/React.createElement(__ds_scope.Input, {
    seamless: true,
    placeholder: "What are you working on?",
    value: task,
    onChange: e => onTaskChange(e.target.value)
  }) : /*#__PURE__*/React.createElement(__ds_scope.Input, {
    seamless: true,
    placeholder: "What are you working on?",
    defaultValue: task,
    key: task
  })), projects.length ? onProjectChange ? /*#__PURE__*/React.createElement(__ds_scope.Select, {
    seamless: true,
    size: "md",
    options: projects,
    value: project,
    dotColor: dotColor,
    onChange: e => onProjectChange(e.target.value)
  }) : /*#__PURE__*/React.createElement(__ds_scope.Select, {
    seamless: true,
    size: "md",
    options: projects,
    defaultValue: project,
    key: project,
    dotColor: dotColor
  }) : null), /*#__PURE__*/React.createElement("div", {
    className: "hrs-timer__clock"
  }, running ? /*#__PURE__*/React.createElement("span", {
    className: "hrs-timer__pulse"
  }) : null, /*#__PURE__*/React.createElement(__ds_scope.Duration, {
    seconds: elapsed,
    size: "lg",
    tone: running ? 'live' : 'muted'
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": running ? 'Stop timer' : 'Start timer',
    className: 'hrs-timer__btn ' + (running ? 'hrs-timer__btn--stop' : 'hrs-timer__btn--start'),
    onClick: running ? onStop : onStart
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: running ? 'Square' : 'Play',
    size: 15,
    strokeWidth: 2,
    color: "#fff"
  })));
}
Object.assign(__ds_scope, { Timer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/time/Timer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppShell.jsx
try { (() => {
const {
  SidebarNav,
  Button,
  IconButton,
  Icon,
  Tooltip
} = window.HoursDesignSystem_76f0a9;
function TopBar({
  title,
  meta,
  actions
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 'var(--topbar-h)',
      flex: '0 0 var(--topbar-h)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      padding: '0 var(--gutter-page)',
      borderBottom: '1px solid var(--line-rule)',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 23,
      letterSpacing: '-.035em',
      color: 'var(--text-display)'
    }
  }, title), meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, meta) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)'
    }
  }, actions));
}
function AppShell({
  view,
  onView,
  title,
  meta,
  actions,
  children,
  overlay
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      height: '100%',
      background: 'var(--surface-page)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SidebarNav, {
    value: view,
    onChange: onView,
    footer: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-2)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--text-faint)'
      }
    }, "sqlite \xB7 4.2 MB"), /*#__PURE__*/React.createElement(Tooltip, {
      label: "Settings"
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "Settings",
      size: "sm",
      label: "Settings",
      onClick: () => onView('settings')
    }))),
    groups: [{
      items: [{
        value: 'today',
        icon: 'Clock',
        label: 'Today'
      }, {
        value: 'entries',
        icon: 'List',
        label: 'Entries',
        badge: 14
      }, {
        value: 'reports',
        icon: 'ChartNoAxesColumn',
        label: 'Reports'
      }]
    }, {
      label: 'Billing',
      items: [{
        value: 'clients',
        icon: 'Users',
        label: 'Clients',
        badge: 5
      }, {
        value: 'invoices',
        icon: 'FileText',
        label: 'Invoices',
        badge: 2
      }]
    }]
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: title,
    meta: meta,
    actions: actions
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 'var(--space-8) var(--gutter-page) var(--space-16)'
    }
  }, children)), overlay);
}
Object.assign(window, {
  AppShell,
  TopBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ClientsScreen.jsx
try { (() => {
const {
  Card,
  DataTable,
  Button,
  Badge,
  Tag,
  ProgressBar,
  Duration
} = window.HoursDesignSystem_76f0a9;
function ClientsScreen({
  onNew
}) {
  const {
    CLIENTS
  } = window.HOURS;
  const columns = [{
    key: 'name',
    label: 'Client'
  }, {
    key: 'projects',
    label: 'Projects'
  }, {
    key: 'rate',
    label: 'Rate',
    numeric: true,
    width: 100
  }, {
    key: 'month',
    label: 'This month',
    numeric: true,
    width: 110
  }, {
    key: 'unbilled',
    label: 'Unbilled',
    numeric: true,
    width: 120
  }];
  const renderCell = (c, r) => {
    if (c.key === 'name') return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: 99,
        background: r.color
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 500,
        color: 'var(--ink-900)'
      }
    }, r.name));
    if (c.key === 'projects') return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        gap: 6
      }
    }, r.projects.map(p => /*#__PURE__*/React.createElement(Tag, {
      key: p
    }, p)));
    if (c.key === 'rate') return '$' + r.rate.toFixed(2);
    if (c.key === 'month') return r.budget.used.toFixed(2);
    if (c.key === 'unbilled') return r.unbilled ? '$' + r.unbilled.toLocaleString('en-US', {
      minimumFractionDigits: 2
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)'
      }
    }, "\u2014");
    return r[c.key];
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Card, {
    flush: true,
    eyebrow: "5 clients \xB7 8 projects",
    title: "Rates and retainers",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "primary",
      icon: "Plus",
      onClick: onNew
    }, "New client")
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    rows: CLIENTS,
    renderCell: renderCell
  }))), /*#__PURE__*/React.createElement("aside", {
    style: {
      flex: '0 0 300px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Retainer usage",
    title: "July"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, CLIENTS.map(c => /*#__PURE__*/React.createElement(ProgressBar, {
    key: c.id,
    value: c.budget.used,
    max: c.budget.total,
    color: c.color,
    left: c.name,
    right: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, c.budget.used), " / ", c.budget.total, "h")
  })))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Rate history",
    title: "Northwind"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontSize: 13
    }
  }, [['Jan 2026', '$95.00', 'current'], ['Jul 2025', '$85.00', ''], ['Feb 2025', '$75.00', '']].map(([d, r, n]) => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--line-hairline)',
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, d), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, n ? /*#__PURE__*/React.createElement(Badge, {
    tone: "paid"
  }, n) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--ink-900)'
    }
  }, r))))))));
}
Object.assign(window, {
  ClientsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ClientsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/EntriesScreen.jsx
try { (() => {
const {
  Tabs,
  Card,
  DataTable,
  Input,
  Select,
  Button,
  Badge,
  Checkbox,
  Tag
} = window.HoursDesignSystem_76f0a9;
function EntriesScreen({
  onEdit
}) {
  const {
    ENTRIES
  } = window.HOURS;
  const [tab, setTab] = React.useState('unbilled');
  const rows = [];
  ENTRIES.forEach(g => {
    rows.push({
      __group: g.day
    });
    g.items.forEach(e => rows.push(e));
  });
  const columns = [{
    key: 'task',
    label: 'Task'
  }, {
    key: 'client',
    label: 'Client',
    width: 200
  }, {
    key: 'span',
    label: 'Span',
    width: 130
  }, {
    key: 'seconds',
    label: 'Hours',
    numeric: true,
    width: 80
  }, {
    key: 'amount',
    label: 'Amount',
    numeric: true,
    width: 110
  }];
  const {
    Duration
  } = window.HoursDesignSystem_76f0a9;
  const renderCell = (c, r) => {
    if (c.key === 'client') return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: 99,
        background: r.dot,
        flex: '0 0 auto'
      }
    }), /*#__PURE__*/React.createElement("span", null, r.client, r.project ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)'
      }
    }, " \xB7 ", r.project) : null));
    if (c.key === 'task') return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, r.task, r.running ? /*#__PURE__*/React.createElement(Badge, {
      tone: "live",
      dot: true,
      pulse: true
    }, "Running") : null, r.billable === false ? /*#__PURE__*/React.createElement(Badge, {
      tone: "draft"
    }, "Non-billable") : null);
    if (c.key === 'seconds') return /*#__PURE__*/React.createElement(Duration, {
      seconds: r.seconds,
      format: "decimal",
      size: "sm"
    });
    if (c.key === 'amount') return r.amount || /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)'
      }
    }, "\u2014");
    return r[c.key];
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      value: 'all',
      label: 'All',
      count: 128
    }, {
      value: 'unbilled',
      label: 'Unbilled',
      count: 14
    }, {
      value: 'invoiced',
      label: 'Invoiced',
      count: 114
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "Search",
    placeholder: "Search tasks and notes"
  })), /*#__PURE__*/React.createElement(Select, {
    options: ['All clients', 'Northwind Studio', 'Alder & Vine', 'Peak Labs']
  }), /*#__PURE__*/React.createElement(Select, {
    options: ['This month', 'This week', 'Last 30 days', 'Custom range']
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "Download"
  }, "Export CSV"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    icon: "Receipt"
  }, "Invoice selection"))), /*#__PURE__*/React.createElement(Card, {
    flush: true
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    rows: rows,
    renderCell: renderCell,
    onSort: () => {},
    sortKey: "span"
  })));
}
Object.assign(window, {
  EntriesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/EntriesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/InvoiceDocument.jsx
try { (() => {
const {
  Button,
  Badge
} = window.HoursDesignSystem_76f0a9;

// The printable artefact. Deliberately plainer than the app: white stock,
// serif headings, mono figures, one hairline table.
function InvoiceDocument({
  invoice,
  onClose
}) {
  const lines = [['Landing page revisions', '6.25', '$95.00', '$593.75'], ['Component audit', '3.50', '$95.00', '$332.50'], ['Retainer check-in', '0.75', '$95.00', '$71.25'], ['Design QA pass', '2.50', '$95.00', '$237.50']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-raised)',
      border: '1px solid var(--line-rule)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--space-3) var(--space-5)',
      borderBottom: '1px solid var(--line-rule)',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--label-size)',
      letterSpacing: 'var(--label-ls)',
      textTransform: 'uppercase',
      fontWeight: 500,
      color: 'var(--text-muted)'
    }
  }, "Preview \xB7 A4"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "Download"
  }, "PDF"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    icon: "Send"
  }, "Mark as sent"), onClose ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    onClick: onClose
  }, "Close") : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-12) var(--space-12) var(--space-10)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 30,
      letterSpacing: '-.035em',
      color: 'var(--ink-900)'
    }
  }, "Invoice ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      letterSpacing: '-.06em'
    }
  }, "#", invoice.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, "Issued ", invoice.issued, " \xB7 Due ", invoice.due, " \xB7 Net 14")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 19,
      letterSpacing: '-.045em',
      color: 'var(--ink-900)'
    }
  }, "Hours", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--terracotta-500)'
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      lineHeight: 1.6,
      marginTop: 4
    }
  }, "Independent design practice", /*#__PURE__*/React.createElement("br", null), "hello@example.com", /*#__PURE__*/React.createElement("br", null), "VAT EE000000000"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-16)'
    }
  }, [['Billed to', invoice.client + '\nAttn. Accounts\n12 Harbour Row\nTallinn, Estonia'], ['Period', '01 – 22 July 2026\nGrouped by project'], ['Payable', 'Bank transfer\nEE00 0000 0000 0000']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--label-size)',
      letterSpacing: 'var(--label-ls)',
      textTransform: 'uppercase',
      fontWeight: 500,
      color: 'var(--text-faint)',
      marginBottom: 8
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ink-700)',
      lineHeight: 1.7,
      whiteSpace: 'pre-line'
    }
  }, v)))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 13.5
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Description', 'Hours', 'Rate', 'Amount'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: i ? 'right' : 'left',
      fontSize: 'var(--label-size)',
      letterSpacing: 'var(--label-ls)',
      textTransform: 'uppercase',
      fontWeight: 500,
      color: 'var(--text-muted)',
      padding: '0 0 var(--space-3)',
      borderBottom: '1px solid var(--ink-200)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, lines.map(l => /*#__PURE__*/React.createElement("tr", {
    key: l[0]
  }, l.map((cell, i) => /*#__PURE__*/React.createElement("td", {
    key: i,
    style: {
      padding: 'var(--space-3) 0',
      borderBottom: '1px solid var(--line-hairline)',
      textAlign: i ? 'right' : 'left',
      color: i ? 'var(--ink-900)' : 'var(--ink-700)',
      fontFamily: i ? 'var(--font-mono)' : 'var(--font-sans)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, cell)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [['Subtotal', '$1,235.00'], ['VAT 0%', '$0.00']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--ink-700)'
    }
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingTop: 12,
      borderTop: '1px solid var(--ink-200)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 18,
      letterSpacing: '-.03em',
      color: 'var(--ink-900)'
    }
  }, "Total due"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 21,
      letterSpacing: '-.06em',
      color: 'var(--ink-900)'
    }
  }, invoice.total)))), /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--line-hairline)',
      paddingTop: 'var(--space-4)',
      fontSize: 11.5,
      color: 'var(--text-faint)',
      letterSpacing: '-.005em'
    }
  }, "Thank you. Payment within 14 days, please \u2014 a full time log is attached.")));
}
Object.assign(window, {
  InvoiceDocument
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/InvoiceDocument.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/InvoicesScreen.jsx
try { (() => {
const {
  Card,
  DataTable,
  Button,
  Badge,
  Tabs
} = window.HoursDesignSystem_76f0a9;
function InvoicesScreen({
  selected,
  onSelect
}) {
  const {
    INVOICES
  } = window.HOURS;
  const [tab, setTab] = React.useState('all');
  const columns = [{
    key: 'id',
    label: 'No.',
    width: 76
  }, {
    key: 'client',
    label: 'Client'
  }, {
    key: 'issued',
    label: 'Issued',
    width: 120
  }, {
    key: 'due',
    label: 'Due',
    width: 120
  }, {
    key: 'hours',
    label: 'Hours',
    numeric: true,
    width: 80
  }, {
    key: 'total',
    label: 'Total',
    numeric: true,
    width: 110
  }, {
    key: 'status',
    label: 'Status',
    width: 130
  }];
  const renderCell = (c, r) => {
    if (c.key === 'id') return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--ink-900)'
      }
    }, r.id === 'draft' ? '—' : '#' + r.id);
    if (c.key === 'client') return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: 99,
        background: r.dot
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-900)'
      }
    }, r.client));
    if (c.key === 'status') return /*#__PURE__*/React.createElement(Badge, {
      tone: r.status,
      dot: r.status !== 'draft'
    }, r.statusLabel);
    return r[c.key];
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      value: 'all',
      label: 'All',
      count: 24
    }, {
      value: 'open',
      label: 'Open',
      count: 2
    }, {
      value: 'overdue',
      label: 'Overdue',
      count: 1
    }, {
      value: 'drafts',
      label: 'Drafts',
      count: 1
    }]
  }), /*#__PURE__*/React.createElement(Card, {
    flush: true
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    rows: INVOICES,
    renderCell: renderCell,
    onSort: () => {},
    sortKey: "issued"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)'
    }
  }, INVOICES.slice(0, 3).map(i => /*#__PURE__*/React.createElement(Button, {
    key: i.id,
    size: "sm",
    variant: selected && selected.id === i.id ? 'primary' : 'secondary',
    onClick: () => onSelect(i)
  }, "Preview ", i.id === 'draft' ? 'draft' : '#' + i.id)))), /*#__PURE__*/React.createElement("aside", {
    style: {
      flex: '0 0 520px'
    }
  }, /*#__PURE__*/React.createElement(InvoiceDocument, {
    invoice: selected || INVOICES[0]
  })));
}
Object.assign(window, {
  InvoicesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/InvoicesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ReportsScreen.jsx
try { (() => {
const {
  Card,
  StatTile,
  Select,
  Button,
  ProgressBar,
  DataTable,
  Duration
} = window.HoursDesignSystem_76f0a9;
function ReportsScreen() {
  const {
    CLIENTS,
    WEEK
  } = window.HOURS;
  const months = [['Feb', 96], ['Mar', 122], ['Apr', 108], ['May', 131], ['Jun', 118], ['Jul', 84]];
  const max = 140;
  const columns = [{
    key: 'name',
    label: 'Client'
  }, {
    key: 'hours',
    label: 'Hours',
    numeric: true,
    width: 90
  }, {
    key: 'rate',
    label: 'Avg rate',
    numeric: true,
    width: 100
  }, {
    key: 'billed',
    label: 'Billed',
    numeric: true,
    width: 110
  }, {
    key: 'share',
    label: 'Share',
    numeric: true,
    width: 80
  }];
  const rows = CLIENTS.map(c => ({
    id: c.id,
    name: c.name,
    color: c.color,
    hours: c.budget.used.toFixed(2),
    rate: '$' + c.rate.toFixed(2),
    billed: '$' + (c.budget.used * c.rate).toLocaleString('en-US', {
      minimumFractionDigits: 2
    }),
    share: Math.round(c.budget.used / 59.5 * 100) + '%'
  }));
  const renderCell = (c, r) => c.key === 'name' ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 99,
      background: r.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-900)'
    }
  }, r.name)) : r[c.key];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    options: ['Last 6 months', 'This quarter', 'This year', 'Custom range']
  }), /*#__PURE__*/React.createElement(Select, {
    options: ['All clients', 'Billable only', 'Non-billable only']
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "Download"
  }, "Export report"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Hours \xB7 6 months",
    value: "659",
    unit: "h",
    delta: "+12%",
    direction: "up",
    note: "vs. prior 6"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Billed",
    value: "$62,410",
    note: "avg $94.70/h"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Billable ratio",
    value: "87",
    unit: "%",
    delta: "-2pt",
    direction: "down"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Longest streak",
    value: "14",
    unit: "days"
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Monthly",
    title: "Hours tracked"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 'var(--space-4)',
      height: 180
    }
  }, months.map(([m, h]) => /*#__PURE__*/React.createElement("div", {
    key: m,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, h), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: h / max * 130,
      background: m === 'Jul' ? 'var(--terracotta-500)' : 'var(--pine-500)',
      borderRadius: '2px 2px 0 0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, m))))), /*#__PURE__*/React.createElement(Card, {
    flush: true,
    eyebrow: "This month",
    title: "By client"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    rows: rows,
    renderCell: renderCell,
    compact: true
  })));
}
Object.assign(window, {
  ReportsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ReportsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/TodayScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Timer,
  TimeEntryRow,
  StatTile,
  Card,
  Button,
  Duration,
  Badge,
  ProgressBar
} = window.HoursDesignSystem_76f0a9;
function DayList({
  groups,
  onEdit,
  onResume
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)'
    }
  }, groups.map(g => {
    const total = g.items.reduce((a, e) => a + e.seconds, 0);
    return /*#__PURE__*/React.createElement("section", {
      key: g.day
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        padding: '0 var(--gutter-inline) var(--space-2)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--label-size)',
        letterSpacing: 'var(--label-ls)',
        textTransform: 'uppercase',
        fontWeight: 500,
        color: 'var(--text-muted)'
      }
    }, g.day), /*#__PURE__*/React.createElement(Duration, {
      seconds: total,
      format: "decimal",
      size: "sm",
      tone: "muted"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-card)',
        border: '1px solid var(--line-rule)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden'
      }
    }, g.items.map(e => /*#__PURE__*/React.createElement(TimeEntryRow, _extends({
      key: e.id
    }, e, {
      dotColor: e.dot,
      billable: e.billable !== false,
      onEdit: () => onEdit(e),
      onResume: e.running ? undefined : () => onResume(e),
      onDelete: () => {}
    })))));
  }));
}
function WeekBars({
  week
}) {
  const max = Math.max(...week.map(d => d.h), 8);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      height: 96
    }
  }, week.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.d,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: d.h / max * 72 + 2,
      background: d.h ? 'var(--pine-500)' : 'var(--paper-200)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: 'var(--text-faint)'
    }
  }, d.d))));
}
function TodayScreen({
  running,
  seconds,
  task,
  onStart,
  onStop,
  onEdit
}) {
  const {
    ENTRIES,
    WEEK,
    CLIENTS
  } = window.HOURS;
  const [draftTask, setDraftTask] = React.useState(task || '');
  const [project, setProject] = React.useState('Northwind · Website');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Timer, {
    running: running,
    seconds: seconds,
    task: draftTask,
    onTaskChange: setDraftTask,
    projects: ['Northwind · Website', 'Alder & Vine · Brand refresh', 'Peak Labs · App'],
    project: project,
    onProjectChange: setProject,
    dotColor: "var(--client-1)",
    onStart: onStart,
    onStop: onStop
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Today",
    value: "3.75",
    unit: "h",
    note: "2 of 3 entries billable"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "This week",
    value: "20.50",
    unit: "h",
    delta: "+3.5h",
    direction: "up",
    note: "vs. last week"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Unbilled",
    value: "$4,420",
    note: "across 4 clients"
  })), /*#__PURE__*/React.createElement(DayList, {
    groups: ENTRIES,
    onEdit: onEdit,
    onResume: onStart
  })), /*#__PURE__*/React.createElement("aside", {
    style: {
      flex: '0 0 300px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Week to date",
    title: "20.5 hours"
  }, /*#__PURE__*/React.createElement(WeekBars, {
    week: WEEK
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Budgets",
    title: "This month"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, CLIENTS.slice(0, 4).map(c => /*#__PURE__*/React.createElement(ProgressBar, {
    key: c.id,
    value: c.budget.used,
    max: c.budget.total,
    color: c.color,
    left: c.name,
    right: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, c.budget.used), " / ", c.budget.total, "h")
  }))))));
}
Object.assign(window, {
  TodayScreen,
  DayList,
  WeekBars
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/TodayScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.jsx
try { (() => {
// Fake data for the Hours app kit. Amounts are pre-formatted strings on purpose:
// formatting lives with the data, never in a component.
const CLIENTS = [{
  id: 'nw',
  name: 'Northwind Studio',
  color: 'var(--client-1)',
  rate: 95,
  projects: ['Website', 'Retainer'],
  unbilled: 1235.25,
  budget: {
    used: 18.5,
    total: 40
  }
}, {
  id: 'av',
  name: 'Alder & Vine',
  color: 'var(--client-2)',
  rate: 110,
  projects: ['Brand refresh', 'Packaging'],
  unbilled: 2145.00,
  budget: {
    used: 26,
    total: 30
  }
}, {
  id: 'pl',
  name: 'Peak Labs',
  color: 'var(--client-3)',
  rate: 120,
  projects: ['App', 'Design system'],
  unbilled: 800.00,
  budget: {
    used: 8,
    total: 24
  }
}, {
  id: 'mh',
  name: 'Meridian Health',
  color: 'var(--client-4)',
  rate: 105,
  projects: ['Dashboard'],
  unbilled: 0,
  budget: {
    used: 4,
    total: 12
  }
}, {
  id: 'kb',
  name: 'Kestrel Books',
  color: 'var(--client-5)',
  rate: 80,
  projects: ['Site maintenance'],
  unbilled: 240.00,
  budget: {
    used: 3,
    total: 8
  }
}];
const ENTRIES = [{
  day: 'Today · Wed 22 Jul',
  items: [{
    id: 1,
    task: 'Landing page revisions',
    client: 'Northwind Studio',
    project: 'Website',
    dot: 'var(--client-1)',
    span: '09:15 – now',
    seconds: 8048,
    amount: '$212.42',
    running: true
  }, {
    id: 2,
    task: 'Sprint planning call',
    client: 'Peak Labs',
    project: 'App',
    dot: 'var(--client-3)',
    span: '13:00 – 14:00',
    seconds: 3600,
    amount: '$120.00'
  }, {
    id: 3,
    task: 'Reading the new brief',
    client: 'Alder & Vine',
    project: 'Brand refresh',
    dot: 'var(--client-2)',
    span: '15:30 – 16:00',
    seconds: 1800,
    billable: false
  }]
}, {
  day: 'Tue 21 Jul',
  items: [{
    id: 4,
    task: 'Component audit',
    client: 'Peak Labs',
    project: 'Design system',
    dot: 'var(--client-3)',
    span: '09:00 – 12:30',
    seconds: 12600,
    amount: '$420.00'
  }, {
    id: 5,
    task: 'Packaging dielines',
    client: 'Alder & Vine',
    project: 'Packaging',
    dot: 'var(--client-2)',
    span: '13:30 – 17:45',
    seconds: 15300,
    amount: '$467.50'
  }]
}, {
  day: 'Mon 20 Jul',
  items: [{
    id: 6,
    task: 'Retainer check-in',
    client: 'Northwind Studio',
    project: 'Retainer',
    dot: 'var(--client-1)',
    span: '10:00 – 10:45',
    seconds: 2700,
    amount: '$71.25'
  }, {
    id: 7,
    task: 'Dashboard chart states',
    client: 'Meridian Health',
    project: 'Dashboard',
    dot: 'var(--client-4)',
    span: '11:00 – 15:00',
    seconds: 14400,
    amount: '$420.00'
  }, {
    id: 8,
    task: 'Invoice admin',
    client: 'Internal',
    project: 'Ops',
    dot: 'var(--client-6)',
    span: '16:00 – 16:30',
    seconds: 1800,
    billable: false
  }]
}];
const INVOICES = [{
  id: '0142',
  client: 'Alder & Vine',
  dot: 'var(--client-2)',
  issued: '01 Jul 2026',
  due: '15 Jul 2026',
  hours: '19.50',
  total: '$2,145.00',
  status: 'overdue',
  statusLabel: 'Overdue 12d'
}, {
  id: '0141',
  client: 'Peak Labs',
  dot: 'var(--client-3)',
  issued: '01 Jul 2026',
  due: '31 Jul 2026',
  hours: '16.00',
  total: '$1,920.00',
  status: 'pending',
  statusLabel: 'Sent'
}, {
  id: '0140',
  client: 'Northwind Studio',
  dot: 'var(--client-1)',
  issued: '01 Jun 2026',
  due: '15 Jun 2026',
  hours: '22.25',
  total: '$2,113.75',
  status: 'paid',
  statusLabel: 'Paid'
}, {
  id: '0139',
  client: 'Meridian Health',
  dot: 'var(--client-4)',
  issued: '01 Jun 2026',
  due: '15 Jun 2026',
  hours: '12.00',
  total: '$1,260.00',
  status: 'paid',
  statusLabel: 'Paid'
}, {
  id: 'draft',
  client: 'Northwind Studio',
  dot: 'var(--client-1)',
  issued: '—',
  due: '—',
  hours: '13.00',
  total: '$1,235.25',
  status: 'draft',
  statusLabel: 'Draft'
}];
const WEEK = [{
  d: 'Mon',
  h: 8.25
}, {
  d: 'Tue',
  h: 8.5
}, {
  d: 'Wed',
  h: 3.75
}, {
  d: 'Thu',
  h: 0
}, {
  d: 'Fri',
  h: 0
}, {
  d: 'Sat',
  h: 0
}, {
  d: 'Sun',
  h: 0
}];
Object.assign(window, {
  HOURS: {
    CLIENTS,
    ENTRIES,
    INVOICES,
    WEEK
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.ToastStack = __ds_scope.ToastStack;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Duration = __ds_scope.Duration;

__ds_ns.TimeEntryRow = __ds_scope.TimeEntryRow;

__ds_ns.Timer = __ds_scope.Timer;

})();
