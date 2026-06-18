import { LitElement as _, css as x, html as l } from "lit";
import { property as m } from "lit/decorators.js";
function w() {
  var t, n, s, a, o, e, d;
  let i = "";
  try {
    const r = window.salla;
    i = ((n = (t = r == null ? void 0 : r.config) == null ? void 0 : t.get) == null ? void 0 : n.call(t, "user.language_code")) || ((a = (s = r == null ? void 0 : r.config) == null ? void 0 : s.get) == null ? void 0 : a.call(s, "user.language.code")) || ((e = (o = r == null ? void 0 : r.config) == null ? void 0 : o.get) == null ? void 0 : e.call(o, "store.language")) || ((d = r == null ? void 0 : r.lang) == null ? void 0 : d.locale) || "";
  } catch {
  }
  if (!i)
    try {
      i = document.documentElement.lang || document.documentElement.getAttribute("lang") || "";
    } catch {
    }
  return (i || "ar").toLowerCase().replace("_", "-").split("-")[0];
}
function c(i, t = "") {
  if (i == null) return t;
  if (typeof i == "string") return i;
  if (typeof i == "number" || typeof i == "boolean")
    return String(i);
  if (typeof i == "object") {
    const n = i, a = [w(), "ar", "en"];
    for (const o of a) {
      const e = n[o];
      if (typeof e == "string" && e.trim() !== "") return e;
      if (typeof e == "number" || typeof e == "boolean") return String(e);
    }
    for (const o of Object.keys(n)) {
      const e = n[o];
      if (typeof e == "string" && e.trim() !== "") return e;
    }
  }
  return t;
}
var v = Object.defineProperty, p = (i, t, n, s) => {
  for (var a = void 0, o = i.length - 1, e; o >= 0; o--)
    (e = i[o]) && (a = e(t, n, a) || a);
  return a && v(t, n, a), a;
};
const g = class g extends _ {
  constructor() {
    var t;
    super(...arguments), this.position = "0", this.isRtl = ((t = document == null ? void 0 : document.documentElement) == null ? void 0 : t.dir) === "rtl";
  }
  connectedCallback() {
    if (super.connectedCallback(), typeof this.config == "string")
      try {
        this.config = JSON.parse(this.config);
      } catch (t) {
        console.error("[about-us] Failed to parse config:", t);
      }
  }
  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────
  /**
   * Mirrors the Twig RTL/EN image fallback chain:
   * RTL  -> about_us_image
   * LTR  -> about_us_image_en (if set) else about_us_image
   */
  _resolveImage() {
    const t = this.config;
    return this.isRtl ? (t == null ? void 0 : t.about_us_image) ?? "" : (t == null ? void 0 : t.about_us_image_en) ?? (t == null ? void 0 : t.about_us_image) ?? "";
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
      return l``;
    }
    const n = (t == null ? void 0 : t.about_us_animate) ?? "", s = !!(t != null && t.about_us_video_s), a = c(t == null ? void 0 : t.about_us_main_title), o = c(t == null ? void 0 : t.about_us_title), e = c(t == null ? void 0 : t.about_us_des), d = c(t == null ? void 0 : t.about_us_btn), r = d !== "", b = (t == null ? void 0 : t.about_us_title_color) || "#000", f = (t == null ? void 0 : t.about_us_des_color) || "#777", h = (t == null ? void 0 : t.about_us_btn_color) || "#fff", y = (t == null ? void 0 : t.about_us_btn_bg_color) || "#000";
    return l`
      <section class="s-block--about-us">
        <div class="au-container">
          <div class="au-wrap">
            <div class="au-grid">

              ${s ? l`
                    <video
                      class="au-media ${n}"
                      autoplay
                      muted
                      loop
                      playsinline
                      preload="metadata"
                      width="800"
                      height="450"
                      controlslist="nodownload"
                      disablepictureinpicture="false"
                      role="region"
                      tabindex="0"
                    >
                      <source src="${(t == null ? void 0 : t.about_us_video) ?? ""}" type="video/mp4" />
                      <p>${c({ ar: "متصفحك لا يدعم تشغيل الفيديو.", en: "Your browser doesn't support HTML video." })}</p>
                    </video>
                  ` : l`
                    <img
                      class="au-media au-media--image ${n}"
                      src="${this._resolveImage()}"
                      alt="${a}"
                    />
                  `}

              <div class="au-content">
                <div class="au-text-group">
                  <h2 class="au-title ${n}" style="color: ${b};">
                    ${o}
                  </h2>
                  <p class="au-desc ${n}" style="color: ${f};">
                    ${e}
                  </p>
                </div>

                ${r ? l`
                      <a
                        href="${(t == null ? void 0 : t.about_us_btn_url) ?? "#"}"
                        class="au-btn ${n}"
                        style="color: ${h}; background-color: ${y};"
                      >
                        ${d}
                        <i class="${this.isRtl ? "sicon-arrow-left" : "sicon-arrow-right"}"></i>
                      </a>
                    ` : ""}
              </div>

            </div>
          </div>
        </div>
      </section>
    `;
  }
};
g.styles = x`
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
    .s-block--about-us {
      width: 100%;
      padding-top: 2rem;
      padding-bottom: 2rem;
      position: relative;
    }

    /* ── Container ── */
    .au-container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .au-wrap {
      width: 100%;
      margin: 0 auto;
    }

    /* ── Grid ── */
    .au-grid {
      width: 100%;
      display: grid;
      justify-content: start;
      align-items: center;
      gap: 2rem;
      grid-template-columns: 1fr;
    }

    @media (min-width: 1024px) {
      .au-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    /* ── Media (video / image) ── */
    .au-media {
      margin: 0 auto;
      border-radius: 1.5rem;
      transition-property: all;
      transition-duration: 700ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-delay: 200ms;
      max-width: 100%;
    }

    .au-media--image {
      height: 100%;
      object-fit: cover;
      max-height: 33rem;
      width: 100%;
    }

    /* ── Text Column ── */
    .au-content {
      width: 100%;
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 2.5rem;
    }

    @media (min-width: 1024px) {
      .au-content {
        align-items: flex-start;
      }
    }

    .au-text-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
    }

    @media (min-width: 1024px) {
      .au-text-group {
        align-items: flex-start;
      }
    }

    /* ── Title ── */
    .au-title {
      font-size: 2.25rem;
      line-height: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin: 0;
      transition-property: all;
      transition-duration: 700ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-delay: 200ms;
    }

    @media (min-width: 1024px) {
      .au-title {
        text-align: start;
      }
    }

    /* ── Description ── */
    .au-desc {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.625;
      text-align: center;
      margin: 0;
      transition-property: all;
      transition-duration: 700ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-delay: 300ms;
    }

    @media (min-width: 1024px) {
      .au-desc {
        text-align: start;
      }
      :host([dir="ltr"]) .au-desc {
        text-align: start;
      }
    }

    /* ── Button ── */
    .au-btn {
      width: 100%;
      padding: 0.5rem 0.875rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 9999px;
      transition-property: all;
      transition-duration: 700ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-delay: 400ms;
    }

    @media (min-width: 640px) {
      .au-btn {
        width: fit-content;
      }
    }

    .au-btn i {
      margin-inline-start: 0.5rem;
    }

    /* ── Animation Hook ── */
    .animate-fade-in {
      animation: au-fade-in 0.8s ease forwards;
    }

    @keyframes au-fade-in {
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
let u = g;
p([
  m({
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
], u.prototype, "config");
p([
  m({ type: String })
], u.prototype, "position");
p([
  m({ type: Boolean })
], u.prototype, "isRtl");
typeof u < "u" && u.registerSallaComponent("salla-about-us");
export {
  u as AboutUs
};
