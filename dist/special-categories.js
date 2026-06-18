import { LitElement as z, css as S, html as c } from "lit";
import { property as w } from "lit/decorators.js";
function L() {
  var t, e, s, n, o, r, m;
  let i = "";
  try {
    const a = window.salla;
    i = ((e = (t = a == null ? void 0 : a.config) == null ? void 0 : t.get) == null ? void 0 : e.call(t, "user.language_code")) || ((n = (s = a == null ? void 0 : a.config) == null ? void 0 : s.get) == null ? void 0 : n.call(s, "user.language.code")) || ((r = (o = a == null ? void 0 : a.config) == null ? void 0 : o.get) == null ? void 0 : r.call(o, "store.language")) || ((m = a == null ? void 0 : a.lang) == null ? void 0 : m.locale) || "";
  } catch {
  }
  if (!i)
    try {
      i = document.documentElement.lang || document.documentElement.getAttribute("lang") || "";
    } catch {
    }
  return (i || "ar").toLowerCase().replace("_", "-").split("-")[0];
}
function l(i, t = "") {
  if (i == null) return t;
  if (typeof i == "string") return i;
  if (typeof i == "number" || typeof i == "boolean")
    return String(i);
  if (typeof i == "object") {
    const e = i, n = [L(), "ar", "en"];
    for (const o of n) {
      const r = e[o];
      if (typeof r == "string" && r.trim() !== "") return r;
      if (typeof r == "number" || typeof r == "boolean") return String(r);
    }
    for (const o of Object.keys(e)) {
      const r = e[o];
      if (typeof r == "string" && r.trim() !== "") return r;
    }
  }
  return t;
}
var T = Object.defineProperty, x = (i, t, e, s) => {
  for (var n = void 0, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = r(t, e, n) || n);
  return n && T(t, e, n), n;
};
const u = class u extends z {
  constructor() {
    super(...arguments), this.position = "0";
  }
  connectedCallback() {
    if (super.connectedCallback(), typeof this.config == "string")
      try {
        this.config = JSON.parse(this.config);
      } catch (t) {
        console.error("[special-categories] Failed to parse config:", t);
      }
  }
  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────
  /** Reads a (possibly prefixed) subfield off a repeater item. */
  _get(t, e) {
    const s = t[`t_category.${e}`];
    if (s != null && s !== "")
      return s;
    const n = t[e];
    if (n != null && n !== "") return n;
  }
  _resolveLink(t) {
    return t ? typeof t == "string" ? t : typeof t == "object" ? t.url ?? t.href ?? t.value ?? "#" : "#" : "#";
  }
  /** Selected value of a dropdown-list field ([{ value }]) or plain string. */
  _getDropdownValue(t, e) {
    return t ? typeof t == "string" ? t : Array.isArray(t) && t.length > 0 ? t[0].value ?? e : e : e;
  }
  /** Twilight exposes RTL via theme.is_rtl; in the browser we read the document. */
  get _isRtl() {
    var e;
    if (typeof document > "u") return !0;
    const t = ((e = this.closest("[dir]")) == null ? void 0 : e.getAttribute("dir")) || document.documentElement.getAttribute("dir") || document.dir;
    return t ? t.toLowerCase() === "rtl" : !0;
  }
  // ─────────────────────────────────────────────
  // ITEM RENDERER
  // ─────────────────────────────────────────────
  _renderItem(t, e) {
    const s = this._get(t, "image"), n = this._get(t, "image_en"), o = l(this._get(t, "title")), r = this._get(t, "title_color") || "#000000", m = l(this._get(t, "sub_title")), a = this._get(t, "sub_title_color") || "#000000", g = !!this._get(t, "display_none_subtitle"), p = l(this._get(t, "btn_text")), $ = this._get(t, "btn_text_color") || "#000000", v = this._get(t, "btn_bg_color") || "#000000", h = this._resolveLink(this._get(t, "btn_link")), k = !!this._get(t, "overlay"), y = parseInt(
      String(this._get(t, "border_radius_image") ?? "0"),
      10
    ), b = `${isNaN(y) ? 0 : y}px`, f = this._getDropdownValue(this._get(t, "animation"), ""), _ = this._isRtl ? s : n || s, R = [
      "sc-item",
      `item-${e}`,
      f ? "anim" : "",
      f ? `anim-${f}` : ""
    ].filter(Boolean).join(" "), C = `${(e - 1) * 100 + 100}ms`;
    return c`
      <div
        class="${R}"
        style="border-radius: ${b}; animation-delay: ${C};"
      >
        <a
          href="${h}"
          class="sc-card-link ${k ? "sc-overlay" : ""}"
        >
          ${_ ? c`<img
                src="${_}"
                class="sc-img"
                alt="${o ?? ""}"
                loading="lazy"
              />` : ""}
        </a>

        <div class="sc-content">
          ${o ? c`<h4 class="sc-item-title" style="color: ${r};">
                ${o}
              </h4>` : ""}
          ${m ? c`<p
                class="sc-item-subtitle ${g ? "sc-hide-mobile" : ""}"
                style="color: ${a};"
              >
                ${m}
              </p>` : ""}
          ${p ? c`<a
                href="${h}"
                class="sc-btn"
                style="color: ${$}; background-color: ${v}; border-radius: ${b};"
              >
                ${p}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                  />
                </svg>
              </a>` : ""}
        </div>
      </div>
    `;
  }
  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  render() {
    const t = this.config;
    if (typeof t == "string") {
      try {
        this.config = JSON.parse(t);
      } catch {
      }
      return c``;
    }
    const e = l(t == null ? void 0 : t.enhanced_cat_1_main_title), s = (t == null ? void 0 : t.enhanced_cat_1_main_title_color) || "#000000", n = l(t == null ? void 0 : t.enhanced_cat_1_main_subtitle), o = (t == null ? void 0 : t.enhanced_cat_1_main_subtitle_color) || "#000000", r = (t == null ? void 0 : t.t_category) ?? [], m = r.length ? c`
          <div class="sc-grid" dir="rtl">
            ${r.map((g, p) => this._renderItem(g, p + 1))}
          </div>
        ` : c`<div class="sc-empty">${l({ ar: "لا توجد تصنيفات لعرضها", en: "No categories to display" })}</div>`, a = c`
      <div class="sc-head">
        ${e ? c`<h2 class="sc-title" style="color: ${s};">
              ${e}
            </h2>` : ""}
        ${n ? c`<p class="sc-subtitle" style="color: ${o};">
              ${n}
            </p>` : ""}
      </div>
      ${m}
    `;
    return c`
      <section
        class="sc-section"
        id="S_special_categories-${this.position}"
        aria-label="Special categories ${this.position}"
      >
        ${t != null && t.put_section_in_container ? c`<div class="sc-container">${a}</div>` : c`<div class="sc-full">${a}</div>`}
      </section>
    `;
  }
};
u.styles = S`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    :host {
      display: block;
    }

    /* ── Section ── */
    .sc-section {
      width: 100%;
      padding-top: 2.5rem;
      padding-bottom: 2.5rem;
    }

    /* ── Container ── */
    .sc-container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .sc-full {
      width: 100%;
      padding: 0 0.5rem;
    }

    /* ── Header ── */
    .sc-head {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .sc-title {
      font-size: 1.5rem;
      line-height: 1.2;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }

    @media (min-width: 1024px) {
      .sc-title {
        font-size: 1.875rem;
      }
    }

    .sc-subtitle {
      margin: 0;
      font-size: 1rem;
    }

    /* ── Bento Grid ──
       Target layout (7 items, desktop): 5 columns × 2 rows, equal height.
       Grid flows RTL: the first category (item-1, large) starts on the RIGHT.
         Row 1 (R→L): item-1 (2 wide) · item-2 · item-3 · item-4  → 2+1+1+1 = 5
         Row 2 (R→L): item-5 (2 wide) · item-6 · item-7 (2 wide)  → 2+1+2 = 5 */
    .sc-grid {
      display: grid;
      direction: rtl;
      gap: 0.75rem;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 160px;
    }

    /* Mobile bento (uses a 6-column track so we can express thirds and an
       uneven pair):
         Row 1: item-1 · item-2 · item-3   (3 equal, each 2 cols)
         Row 2: item-4                      (full row)
         Row 3: item-5 (large) · item-6     (4 + 2 cols)
         Row 4: item-7                      (full row) */
    @media (max-width: 639px) {
      .sc-grid {
        grid-template-columns: repeat(6, 1fr);
      }
      .sc-item.item-1,
      .sc-item.item-2,
      .sc-item.item-3 {
        grid-column: span 2;
      }
      .sc-item.item-4 {
        grid-column: 1 / -1;
      }
      .sc-item.item-5 {
        grid-column: span 4;
      }
      .sc-item.item-6 {
        grid-column: span 2;
      }
      .sc-item.item-7 {
        grid-column: 1 / -1;
      }
    }

    @media (min-width: 640px) {
      .sc-grid {
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 220px;
      }
    }

    @media (min-width: 1024px) {
      .sc-grid {
        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: 300px;
        gap: 1rem;
      }
      /* Explicit placement (grid-area: row-start / col-start / row-end / col-end).
         Under direction:rtl, column line 1 is the RIGHT edge, so the order runs
         right→left, top→bottom. Row 1 starts with 3 small cards from the right,
         then the large card on the left:
           Row 1 (R→L): item-1 · item-2 · item-3 · item-4 (large, cols 4-5, left)
           Row 2 (R→L): item-5 (large, cols 1-2, right) · item-6 · item-7 (large, left) */
      .sc-item.item-1 { grid-area: 1 / 1 / 2 / 2; }
      .sc-item.item-2 { grid-area: 1 / 2 / 2 / 3; }
      .sc-item.item-3 { grid-area: 1 / 3 / 2 / 4; }
      .sc-item.item-4 { grid-area: 1 / 4 / 2 / 6; }
      .sc-item.item-5 { grid-area: 2 / 1 / 3 / 3; }
      .sc-item.item-6 { grid-area: 2 / 3 / 3 / 4; }
      .sc-item.item-7 { grid-area: 2 / 4 / 3 / 6; }
    }

    /* ── Card ── */
    .sc-item {
      position: relative;
      overflow: hidden;
      border-radius: 12px;
    }

    .sc-card-link {
      display: block;
      width: 100%;
      height: 100%;
    }

    .sc-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .sc-item:hover .sc-img {
      transform: scale(1.05);
    }

    /* Overlay layer */
    .sc-overlay::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.05) 0%,
        rgba(0, 0, 0, 0.45) 100%
      );
      z-index: 1;
      pointer-events: none;
    }

    /* ── Card Content ──
       RTL so the button aligns to the right (in line with the title text)
       and the arrow icon renders after the text (to its left). */
    .sc-content {
      position: absolute;
      top: 0.75rem;
      right: 0;
      left: 0;
      width: 100%;
      max-width: 100%;
      padding: 0.5rem;
      display: flex;
      direction: rtl;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 10;
    }

    @media (min-width: 1024px) {
      .sc-content {
        top: 2rem;
        gap: 0.75rem;
      }
    }

    .sc-item-title {
      width: 100%;
      text-align: right;
      font-size: 0.875rem;
      line-height: 1;
      margin: 0;
      font-weight: 600;
    }

    @media (min-width: 1024px) {
      .sc-item-title {
        font-size: 1.25rem;
      }
    }

    .sc-item-subtitle {
      width: 100%;
      text-align: right;
      font-size: 0.875rem;
      line-height: 1;
      margin: 0;
    }

    .sc-hide-mobile {
      display: none;
    }

    @media (min-width: 1024px) {
      .sc-hide-mobile {
        display: block;
      }
    }

    /* ── Button ── */
    .sc-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0.2rem 0.3rem;
      font-size: 0.75rem;
      border-radius: 8px;
    }

    @media (min-width: 1024px) {
      .sc-btn {
        padding: 0.75rem 1.5rem;
        font-size: 0.875rem;
      }
    }

    .sc-btn svg {
      width: 1em;
      height: 1em;
      fill: currentColor;
    }

    /* ── Empty State ── */
    .sc-empty {
      text-align: center;
      color: #999;
      padding: 2rem;
      font-size: 0.875rem;
      grid-column: 1 / -1;
    }

    /* ── Entrance Animations (reimplements theme AOS classes) ── */
    .anim {
      opacity: 0;
      animation-duration: 0.8s;
      animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      animation-fill-mode: both;
    }

    @media (prefers-reduced-motion: reduce) {
      .anim {
        opacity: 1;
        animation: none !important;
      }
    }

    .anim-fade-in { animation-name: sc-fade-in; }
    .anim-fade-up { animation-name: sc-fade-up; }
    .anim-fade-down { animation-name: sc-fade-down; }
    .anim-fade-left { animation-name: sc-fade-left; }
    .anim-fade-right { animation-name: sc-fade-right; }
    .anim-slide-in-right { animation-name: sc-slide-in-right; }
    .anim-slide-in-left { animation-name: sc-slide-in-left; }
    .anim-slide-in-up { animation-name: sc-slide-in-up; }
    .anim-slide-in-down { animation-name: sc-slide-in-down; }
    .anim-scale-in { animation-name: sc-scale-in; }
    .anim-scale-up { animation-name: sc-scale-up; }
    .anim-rotate-in { animation-name: sc-rotate-in; }

    @keyframes sc-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes sc-fade-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes sc-fade-down {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes sc-fade-left {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes sc-fade-right {
      from { opacity: 0; transform: translateX(-40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes sc-slide-in-right {
      from { opacity: 0; transform: translateX(60px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes sc-slide-in-left {
      from { opacity: 0; transform: translateX(-60px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes sc-slide-in-up {
      from { opacity: 0; transform: translateY(60px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes sc-slide-in-down {
      from { opacity: 0; transform: translateY(-60px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes sc-scale-in {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes sc-scale-up {
      from { opacity: 0; transform: scale(0.5); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes sc-rotate-in {
      from { opacity: 0; transform: rotate(-12deg) scale(0.9); }
      to { opacity: 1; transform: rotate(0) scale(1); }
    }
  `;
let d = u;
x([
  w({
    type: Object,
    converter: {
      fromAttribute: (i) => {
        if (i) {
          if (typeof i == "object") return i;
          try {
            return JSON.parse(i);
          } catch {
            return;
          }
        }
      }
    }
  })
], d.prototype, "config");
x([
  w({ type: String })
], d.prototype, "position");
typeof d < "u" && d.registerSallaComponent("salla-special-categories");
export {
  d as SpecialCategories
};
