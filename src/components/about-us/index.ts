import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { resolveText, type LocalizedText } from "../../utils/i18n.js";

// ============================================
// TYPES
// ============================================

interface ComponentConfig {
  // Media (video / image toggle)
  about_us_video_s?: boolean;
  about_us_video?: string;
  about_us_image?: string;
  about_us_image_en?: string;

  // Animation
  about_us_animate?: string;

  // Title
  about_us_main_title?: LocalizedText;
  about_us_title?: LocalizedText;
  about_us_title_color?: string;

  // Description
  about_us_des?: LocalizedText;
  about_us_des_color?: string;

  // Button
  about_us_btn?: LocalizedText;
  about_us_btn_url?: string;
  about_us_btn_color?: string;
  about_us_btn_bg_color?: string;

  [key: string]: any;
}

// ============================================
// COMPONENT
// ============================================

export class AboutUs extends LitElement {

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

  /**
   * Twig's `theme.is_rtl` has no direct equivalent inside an isolated
   * Lit component, so we read the document direction instead.
   * Override by setting the `dir` attribute on the element if needed.
   */
  @property({ type: Boolean })
  isRtl: boolean = document?.documentElement?.dir === "rtl";

  connectedCallback() {
    super.connectedCallback();
    if (typeof this.config === "string") {
      try {
        this.config = JSON.parse(this.config as any);
      } catch (e) {
        console.error("[about-us] Failed to parse config:", e);
      }
    }
  }

  static styles = css`
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

  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────

  /**
   * Mirrors the Twig RTL/EN image fallback chain:
   * RTL  -> about_us_image
   * LTR  -> about_us_image_en (if set) else about_us_image
   */
  private _resolveImage(): string {
    const cfg = this.config;
    if (this.isRtl) {
      return cfg?.about_us_image ?? "";
    }
    return cfg?.about_us_image_en ?? cfg?.about_us_image ?? "";
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

    const animateClass = cfg?.about_us_animate ?? "";
    const hasVideo = !!cfg?.about_us_video_s;

    const mainTitle = resolveText(cfg?.about_us_main_title);
    const title = resolveText(cfg?.about_us_title);
    const des = resolveText(cfg?.about_us_des);
    const btnText = resolveText(cfg?.about_us_btn);
    const hasBtn = btnText !== "";

    const titleColor = cfg?.about_us_title_color || "#000";
    const desColor = cfg?.about_us_des_color || "#777";
    const btnColor = cfg?.about_us_btn_color || "#fff";
    const btnBgColor = cfg?.about_us_btn_bg_color || "#000";

    return html`
      <section class="s-block--about-us">
        <div class="au-container">
          <div class="au-wrap">
            <div class="au-grid">

              ${hasVideo
                ? html`
                    <video
                      class="au-media ${animateClass}"
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
                      <source src="${cfg?.about_us_video ?? ""}" type="video/mp4" />
                      <p>${resolveText({ ar: "متصفحك لا يدعم تشغيل الفيديو.", en: "Your browser doesn't support HTML video." })}</p>
                    </video>
                  `
                : html`
                    <img
                      class="au-media au-media--image ${animateClass}"
                      src="${this._resolveImage()}"
                      alt="${mainTitle}"
                    />
                  `}

              <div class="au-content">
                <div class="au-text-group">
                  <h2 class="au-title ${animateClass}" style="color: ${titleColor};">
                    ${title}
                  </h2>
                  <p class="au-desc ${animateClass}" style="color: ${desColor};">
                    ${des}
                  </p>
                </div>

                ${hasBtn
                  ? html`
                      <a
                        href="${cfg?.about_us_btn_url ?? "#"}"
                        class="au-btn ${animateClass}"
                        style="color: ${btnColor}; background-color: ${btnBgColor};"
                      >
                        ${btnText}
                        <i class="${this.isRtl ? "sicon-arrow-left" : "sicon-arrow-right"}"></i>
                      </a>
                    `
                  : ""}
              </div>

            </div>
          </div>
        </div>
      </section>
    `;
  }
}