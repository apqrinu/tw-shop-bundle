import { LitElement as w, css as $, html as c } from "lit";
import { property as b } from "lit/decorators.js";
function k() {
  var t, r, s, o, i, e, d;
  let n = "";
  try {
    const a = window.salla;
    n = ((r = (t = a == null ? void 0 : a.config) == null ? void 0 : t.get) == null ? void 0 : r.call(t, "user.language_code")) || ((o = (s = a == null ? void 0 : a.config) == null ? void 0 : s.get) == null ? void 0 : o.call(s, "user.language.code")) || ((e = (i = a == null ? void 0 : a.config) == null ? void 0 : i.get) == null ? void 0 : e.call(i, "store.language")) || ((d = a == null ? void 0 : a.lang) == null ? void 0 : d.locale) || "";
  } catch {
  }
  if (!n)
    try {
      n = document.documentElement.lang || document.documentElement.getAttribute("lang") || "";
    } catch {
    }
  return (n || "ar").toLowerCase().replace("_", "-").split("-")[0];
}
function m(n, t = "") {
  if (n == null) return t;
  if (typeof n == "string") return n;
  if (typeof n == "number" || typeof n == "boolean")
    return String(n);
  if (typeof n == "object") {
    const r = n, o = [k(), "ar", "en"];
    for (const i of o) {
      const e = r[i];
      if (typeof e == "string" && e.trim() !== "") return e;
      if (typeof e == "number" || typeof e == "boolean") return String(e);
    }
    for (const i of Object.keys(r)) {
      const e = r[i];
      if (typeof e == "string" && e.trim() !== "") return e;
    }
  }
  return t;
}
var v = Object.defineProperty, h = (n, t, r, s) => {
  for (var o = void 0, i = n.length - 1, e; i >= 0; i--)
    (e = n[i]) && (o = e(t, r, o) || o);
  return o && v(t, r, o), o;
};
const u = class u extends w {
  constructor() {
    super(...arguments), this.position = "0";
  }
  connectedCallback() {
    if (super.connectedCallback(), typeof this.config == "string")
      try {
        this.config = JSON.parse(this.config);
      } catch (t) {
        console.error("[enhanced-cats-banners] Failed to parse config:", t);
      }
  }
  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────
  /** Normalize the dropdown-list value to a plain animation string. */
  _animationName(t) {
    const r = t == null ? void 0 : t[0];
    return r ? typeof r == "string" ? r || "fade-up" : r.value || "fade-up" : "fade-up";
  }
  // ─────────────────────────────────────────────
  // CARD RENDERER
  // ─────────────────────────────────────────────
  _renderCard(t, r, s, o) {
    const i = r + 1, e = t.url || "#", d = m(t.title), a = m(t.badge), p = m(t.btn_text), f = t.image || `https://placehold.co/800x800?text=Card+${i}`, g = i * 100 + 100;
    return c`
      <a
        href="${e}"
        aria-label="${d || "card"}"
        class="ns-card ns-card--${i} ${s}"
        style="border-radius: ${o}px; animation-delay: ${g}ms;"
      >
        <img
          class="ns-card__img"
          src="${f}"
          alt="${d}"
          loading="lazy"
        />

        <span class="ns-card__overlay"></span>

        ${a ? c`
              <span
                class="ns-card__badge"
                style="color: ${t.badge_color || "#000"}; background-color: ${t.badge_bg_color || "#fff"};"
              >
                ${a}
              </span>
            ` : ""}

        <div class="ns-card__body">
          ${d ? c`
                <h3
                  class="ns-card__title"
                  style="color: ${t.title_color || "#fff"};"
                >
                  ${d}
                </h3>
              ` : ""}
          ${p ? c`
                <span
                  class="ns-card__btn"
                  style="color: ${t.btn_color || "#000"}; background-color: ${t.btn_bg_color || "#FFD93D"};"
                >
                  ${p}
                </span>
              ` : ""}
        </div>
      </a>
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
    const r = (t == null ? void 0 : t.ns_in_container) ?? !0, s = !!(t != null && t.ns_margin_top_zero), o = m(t == null ? void 0 : t.ns_main_title), i = (t == null ? void 0 : t.ns_main_title_color) || "#000", e = m(t == null ? void 0 : t.ns_main_subtitle), d = (t == null ? void 0 : t.ns_main_subtitle_color) || "#777", a = Number((t == null ? void 0 : t.ns_radius) ?? 16), p = Number((t == null ? void 0 : t.ns_gap) ?? 16), f = this._animationName(t == null ? void 0 : t.ns_animate), g = (t == null ? void 0 : t.ns_cards) ?? [], _ = `ns-block s-block s-block-${this.position}${s ? " ns-block--flush" : ""}`;
    return c`
      <section class="${_}">
        <div class="${r ? "ns-container" : "ns-container--full"}">

          ${o || e ? c`
                <div class="ns-header">
                  ${o ? c`
                        <h2
                          class="ns-header__title fade-up"
                          style="color: ${i};"
                        >
                          ${o}
                        </h2>
                      ` : ""}
                  ${e ? c`
                        <p
                          class="ns-header__subtitle fade-up"
                          style="color: ${d};"
                        >
                          ${e}
                        </p>
                      ` : ""}
                </div>
              ` : ""}

          <div class="ns-grid" style="gap: ${p}px;">
            ${g.map(
      (y, x) => this._renderCard(y, x, f, a)
    )}
          </div>
        </div>
      </section>
    `;
  }
};
u.styles = $`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :host {
      display: block;
    }

    /* ── Section ── */
    .ns-block {
      width: 100%;
    }

    .ns-block--flush {
      margin-top: 0 !important;
    }

    /* ── Container ── */
    .ns-container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .ns-container--full {
      width: 100%;
      padding: 0 1rem;
    }

    /* ── Header ── */
    .ns-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    @media (min-width: 1024px) {
      .ns-header {
        margin-bottom: 2rem;
      }
    }

    .ns-header__title {
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
    }

    .ns-header__subtitle {
      font-size: 0.875rem;
      line-height: 1.25rem;
      margin: 0;
    }

    @media (min-width: 1024px) {
      .ns-header__title {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }

      .ns-header__subtitle {
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }

    /* ── Grid ── */
    .ns-grid {
      display: grid;
      grid-template-columns: 1fr;
    }

    @media (min-width: 640px) {
      .ns-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .ns-grid {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        min-height: 520px;
      }
    }

    @media (min-width: 1280px) {
      .ns-grid {
        min-height: 620px;
      }
    }

    /* ── Card ── */
    .ns-card {
      position: relative;
      display: block;
      overflow: hidden;
      aspect-ratio: 4 / 3;
      text-decoration: none;
    }

    @media (min-width: 1024px) {
      .ns-card {
        aspect-ratio: auto;
        height: 100%;
      }

      .ns-card--1 {
        grid-column-start: 1;
        grid-row-start: 1;
      }

      .ns-card--2 {
        grid-column-start: 1;
        grid-row-start: 2;
      }

      .ns-card--3 {
        grid-column-start: 2;
        grid-row-start: 1;
        grid-row: span 2 / span 2;
      }

      .ns-card--4 {
        grid-column-start: 3;
        grid-row-start: 1;
        grid-row: span 2 / span 2;
      }
    }

    .ns-card__img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .ns-card:hover .ns-card__img {
      transform: scale(1.05);
    }

    .ns-card__overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.35),
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0)
      );
    }

    .ns-card__badge {
      position: absolute;
      top: 0.75rem;
      inset-inline-start: 0.75rem;
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 500;
      border-radius: 9999px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .ns-card__body {
      position: absolute;
      inset-inline: 0;
      bottom: 0;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    @media (min-width: 1024px) {
      .ns-card__body {
        padding: 1.25rem;
      }
    }

    .ns-card__title {
      font-size: 1.125rem;
      line-height: 1.4;
      font-weight: 600;
      margin: 0;
      filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
    }

    @media (min-width: 1024px) {
      .ns-card__title {
        font-size: 1.5rem;
      }
    }

    .ns-card__btn {
      display: inline-flex;
      align-items: center;
      padding: 0.375rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .ns-card:hover .ns-card__btn {
      transform: translateY(-0.125rem);
    }

    /* ── Animation Hooks ── */
    .fade-up,
    .fade-down,
    .fade-in,
    .scale-in,
    .slide-in-up {
      animation-duration: 700ms;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: both;
    }

    .fade-up {
      animation-name: ns-fade-up;
    }

    .fade-down {
      animation-name: ns-fade-down;
    }

    .fade-in {
      animation-name: ns-fade-in;
    }

    .scale-in {
      animation-name: ns-scale-in;
    }

    .slide-in-up {
      animation-name: ns-slide-in-up;
    }

    @keyframes ns-fade-up {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes ns-fade-down {
      from {
        opacity: 0;
        transform: translateY(-16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes ns-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes ns-scale-in {
      from {
        opacity: 0;
        transform: scale(0.92);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes ns-slide-in-up {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
let l = u;
h([
  b({
    type: Object,
    converter: {
      fromAttribute: (n) => {
        if (n) {
          if (typeof n == "object") return n;
          try {
            return JSON.parse(n);
          } catch {
            return;
          }
        }
      }
    }
  })
], l.prototype, "config");
h([
  b({ type: String })
], l.prototype, "position");
typeof l < "u" && l.registerSallaComponent("salla-enhanced-cats-banners");
export {
  l as EnhancedCatsBanners
};
