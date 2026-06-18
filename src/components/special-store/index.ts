import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

// ============================================
// TYPES
// ============================================

interface FeatureItem {
  icon?: string;
  image?: string;
  title?: string;
  title_color?: string;
  des?: string;
  des_color?: string;
  [key: string]: any;
}

interface ComponentConfig {
  sp_bg_color?: string;
  sp_bg_color_part1?: string;
  sp_bg_color_part2?: string;

  sp_video?: string;

  sp?: FeatureItem[];

  [key: string]: any;
}

// ============================================
// COMPONENT
// ============================================

export class SpecialStore extends LitElement {

  @property({
    type: Object,
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) return undefined;
        if (typeof value === "object") return value;
        try {
          return JSON.parse(value);
        } catch {
          return undefined;
        }
      },
    },
  })
  config?: ComponentConfig;

  @property({ type: String })
  position: string = "0";

  connectedCallback() {
    super.connectedCallback();
    if (typeof this.config === "string") {
      try {
        this.config = JSON.parse(this.config as any);
      } catch (e) {
        console.error("[special-store] Failed to parse config:", e);
      }
    }
  }

  static styles = css`
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
    }

    @media (min-width: 1024px) {
      .ss-left-side {
        width: 33.3333%;
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

  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────

  /**
   * Mirrors Twig's `delay-{{ loop.index * 100 + base }}` pattern.
   * loop.index in Twig is 1-based, so we add 1 to the JS array index.
   */
  private _delayStyle(index: number, base: number): string {
    const delay = (index + 1) * 100 + base;
    return `animation-delay: ${delay}ms;`;
  }

  // ─────────────────────────────────────────────
  // FEATURE ITEM RENDERER
  // ─────────────────────────────────────────────

  private _renderFeature(feature: FeatureItem, index: number) {
    const titleColor = feature.title_color || "#000";
    const desColor = feature.des_color || "#777";

    return html`
      <div class="ss-item">
        <div
          class="ss-item-media fade-right"
          style="${this._delayStyle(index, 100)}"
        >
          ${feature.image
            ? html`<img src="${feature.image}" loading="lazy" alt="${feature.title ?? ""}" />`
            : html`<i class="${feature.icon ?? ""}"></i>`}
        </div>
        <div class="ss-item-content">
          <h3
            class="ss-item-title fade-right"
            style="color: ${titleColor}; ${this._delayStyle(index, 200)}"
          >
            ${feature.title ?? ""}
          </h3>
          <p
            class="ss-item-des fade-right"
            style="color: ${desColor}; ${this._delayStyle(index, 300)}"
          >
            ${feature.des ?? ""}
          </p>
        </div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  render() {
    const cfg = this.config;

    // Safety check — re-parse if still string at render time
    if (typeof cfg === "string") {
      try {
        this.config = JSON.parse(cfg as any);
      } catch { }
      return html``;
    }

    const sectionBg = cfg?.sp_bg_color || "#f9fafb";
    const part1Bg = cfg?.sp_bg_color_part1 || "#f9fafb";
    const part2Bg = cfg?.sp_bg_color_part2 || "#f9fafb";
    const features = cfg?.sp ?? [];
    const videoUrl = cfg?.sp_video ?? "";

    return html`
      <section class="ss-section" style="background-color: ${sectionBg};">
        <div class="ss-container">
          <div class="ss-inner">
            <div class="ss-row">

              <!-- Right Side: Features -->
              <div class="ss-right-side" style="background-color: ${part1Bg};">
                <div class="ss-right-inner">
                  <div class="ss-features-box">
                    <div class="ss-features-list">
                      ${features.map((feature, index) => this._renderFeature(feature, index))}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Left Side: Video (replaces special_product) -->
              <div class="ss-left-side" style="background-color: ${part2Bg};">
                <div class="ss-left-inner fade-up" style="${this._delayStyle(0, 200)}">
                  ${videoUrl
                    ? html`
                        <video
                          class="ss-video"
                          autoplay
                          muted
                          loop
                          playsinline
                          preload="metadata"
                        >
                          <source src="${videoUrl}" type="video/mp4" />
                          <p>متصفحك لا يدعم تشغيل الفيديو.</p>
                        </video>
                      `
                    : ""}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    `;
  }
}