import { LitElement as h, css as u, html as d } from "lit";
import { property as p } from "lit/decorators.js";
function y() {
  var e, r, a, o, s, i, c;
  let t = "";
  try {
    const n = window.salla;
    t = ((r = (e = n == null ? void 0 : n.config) == null ? void 0 : e.get) == null ? void 0 : r.call(e, "user.language_code")) || ((o = (a = n == null ? void 0 : n.config) == null ? void 0 : a.get) == null ? void 0 : o.call(a, "user.language.code")) || ((i = (s = n == null ? void 0 : n.config) == null ? void 0 : s.get) == null ? void 0 : i.call(s, "store.language")) || ((c = n == null ? void 0 : n.lang) == null ? void 0 : c.locale) || "";
  } catch {
  }
  if (!t)
    try {
      t = document.documentElement.lang || document.documentElement.getAttribute("lang") || "";
    } catch {
    }
  return (t || "ar").toLowerCase().replace("_", "-").split("-")[0];
}
function m(t, e = "") {
  if (t == null) return e;
  if (typeof t == "string") return t;
  if (typeof t == "number" || typeof t == "boolean")
    return String(t);
  if (typeof t == "object") {
    const r = t, o = [y(), "ar", "en"];
    for (const s of o) {
      const i = r[s];
      if (typeof i == "string" && i.trim() !== "") return i;
      if (typeof i == "number" || typeof i == "boolean") return String(i);
    }
    for (const s of Object.keys(r)) {
      const i = r[s];
      if (typeof i == "string" && i.trim() !== "") return i;
    }
  }
  return e;
}
var b = Object.defineProperty, g = (t, e, r, a) => {
  for (var o = void 0, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (o = i(e, r, o) || o);
  return o && b(e, r, o), o;
};
const f = class f extends h {
  constructor() {
    super(...arguments), this.position = "0";
  }
  connectedCallback() {
    if (super.connectedCallback(), typeof this.config == "string")
      try {
        this.config = JSON.parse(this.config);
      } catch (e) {
        console.error("[special-store] Failed to parse config:", e);
      }
  }
  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────
  /**
   * Mirrors Twig's `delay-{{ loop.index * 100 + base }}` pattern.
   * loop.index in Twig is 1-based, so we add 1 to the JS array index.
   */
  _delayStyle(e, r) {
    return `animation-delay: ${(e + 1) * 100 + r}ms;`;
  }
  // ─────────────────────────────────────────────
  // FEATURE ITEM RENDERER
  // ─────────────────────────────────────────────
  _renderFeature(e, r) {
    const a = e.title_color || "#000", o = e.des_color || "#777", s = m(e.title), i = m(e.des);
    return d`
      <div class="ss-item">
        <div
          class="ss-item-media fade-right"
          style="${this._delayStyle(r, 100)}"
        >
          ${e.image ? d`<img src="${e.image}" loading="lazy" alt="${s}" />` : d`<i class="${e.icon ?? ""}"></i>`}
        </div>
        <div class="ss-item-content">
          <h3
            class="ss-item-title fade-right"
            style="color: ${a}; ${this._delayStyle(r, 200)}"
          >
            ${s}
          </h3>
          <p
            class="ss-item-des fade-right"
            style="color: ${o}; ${this._delayStyle(r, 300)}"
          >
            ${i}
          </p>
        </div>
      </div>
    `;
  }
  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  render() {
    const e = this.config;
    if (typeof e == "string") {
      try {
        this.config = JSON.parse(e);
      } catch {
      }
      return d``;
    }
    const r = (e == null ? void 0 : e.sp_bg_color) || "#f9fafb", a = (e == null ? void 0 : e.sp_bg_color_part1) || "#f9fafb", o = (e == null ? void 0 : e.sp_bg_color_part2) || "#f9fafb", s = (e == null ? void 0 : e.sp) ?? [], i = (e == null ? void 0 : e.sp_video) ?? "";
    return d`
      <section class="ss-section" style="background-color: ${r};">
        <div class="ss-container">
          <div class="ss-inner">
            <div class="ss-row">

              <!-- Right Side: Features -->
              <div class="ss-right-side" style="background-color: ${a};">
                <div class="ss-right-inner">
                  <div class="ss-features-box">
                    <div class="ss-features-list">
                      ${s.map((c, n) => this._renderFeature(c, n))}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Left Side: Video (replaces special_product) -->
              <div class="ss-left-side" style="background-color: ${o};">
                <div class="ss-left-inner fade-up" style="${this._delayStyle(0, 200)}">
                  ${i ? d`
                        <video
                          class="ss-video"
                          autoplay
                          muted
                          loop
                          playsinline
                          preload="metadata"
                        >
                          <source src="${i}" type="video/mp4" />
                          <p>${m({ ar: "متصفحك لا يدعم تشغيل الفيديو.", en: "Your browser doesn't support HTML video." })}</p>
                        </video>
                      ` : ""}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    `;
  }
};
f.styles = u`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :host {
      display: block;
    }

    /* ── Section ── */
    .ss-section {
      width: 100%;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      border-radius: 0.75rem;
    }

    @media (min-width: 1024px) {
      .ss-section {
        border-radius: 1.5rem;
      }
    }

    /* ── Container ── */
    .ss-container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .ss-inner {
      width: 100%;
    }

    /* ── Layout Row ── */
    .ss-row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 1rem;
    }

    @media (min-width: 1024px) {
      .ss-row {
        flex-direction: row;
        padding: 1rem;
      }
    }

    /* ── Right Side (features) ── */
    .ss-right-side {
      align-self: stretch;
      width: 100%;
      padding: 0.5rem;
      border-radius: 1rem;
    }

    @media (min-width: 1024px) {
      .ss-right-side {
        width: 66.6667%;
        padding: 1rem;
      }
    }

    .ss-right-inner {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      width: 100%;
      align-self: stretch;
      gap: 0.5rem;
      height: 100%;
    }

    /* ── Features Box ── */
    .ss-features-box {
      width: 100%;
      background-color: #fff;
      border-radius: 1rem;
      align-self: stretch;
    }

    .ss-features-list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      gap: 1rem;
      border-radius: 1rem;
      padding: 1rem;
    }

    /* ── Feature Item ── */
    .ss-item {
      flex: 1 1 auto;
      padding: 0.75rem;
      gap: 0.5rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      width: 100%;
      align-self: stretch;
      border-radius: 1rem;
      background-color: #fff;
      border: 1px solid #e5e7eb;
    }

    @media (min-width: 1024px) {
      .ss-item {
        padding: 1rem;
        gap: 1rem;
      }
    }

    .ss-item-media img {
      width: 3rem;
      height: 3rem;
      border-radius: 1rem;
      display: block;
      object-fit: cover;
    }

    @media (min-width: 1024px) {
      .ss-item-media img {
        width: 5rem;
        height: 5rem;
      }
    }

    .ss-item-media i {
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 9999px;
    }

    @media (min-width: 1024px) {
      .ss-item-media i {
        width: 4rem;
        height: 4rem;
      }
    }

    .ss-item-content {
      flex: 1;
      min-width: 0;
    }

    .ss-item-title {
      font-size: 1rem;
      line-height: 1.25rem;
      margin: 0 0 0.25rem 0;
    }

    @media (min-width: 1024px) {
      .ss-item-title {
        font-size: 1.25rem;
      }
    }

    .ss-item-des {
      font-size: 0.75rem;
      margin: 0;
    }

    /* ── Left Side (video) ── */
    .ss-left-side {
      align-self: stretch;
      width: 100%;
      padding: 2.5rem;
      border-radius: 1rem;
      /* On mobile (column layout) show the video before the features */
      order: -1;
    }

    @media (min-width: 1024px) {
      .ss-left-side {
        width: 33.3333%;
        /* Restore the original DOM order on desktop (row layout) */
        order: 0;
      }
    }

    .ss-left-inner {
      width: 100%;
      height: 100%;
    }

    .ss-video {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      object-fit: cover;
      display: block;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -4px rgba(0, 0, 0, 0.03);
    }

    /* ── Animation Hooks ── */
    .fade-left,
    .fade-right,
    .fade-up {
      animation-duration: 700ms;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: both;
    }

    .fade-left {
      animation-name: ss-fade-left;
    }

    .fade-right {
      animation-name: ss-fade-right;
    }

    .fade-up {
      animation-name: ss-fade-up;
    }

    @keyframes ss-fade-left {
      from {
        opacity: 0;
        transform: translateX(16px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes ss-fade-right {
      from {
        opacity: 0;
        transform: translateX(-16px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes ss-fade-up {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
let l = f;
g([
  p({
    type: Object,
    converter: {
      fromAttribute: (t) => {
        if (t) {
          if (typeof t == "object") return t;
          try {
            return JSON.parse(t);
          } catch {
            return;
          }
        }
      }
    }
  })
], l.prototype, "config");
g([
  p({ type: String })
], l.prototype, "position");
typeof l < "u" && l.registerSallaComponent("salla-special-store");
export {
  l as SpecialStore
};
