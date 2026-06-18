import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { resolveText, type LocalizedText } from "../../utils/i18n.js";

// ============================================
// TYPES
// ============================================

interface CardItem {
  image?: string;
  badge?: LocalizedText;
  badge_color?: string;
  badge_bg_color?: string;
  title?: LocalizedText;
  title_color?: string;
  btn_text?: LocalizedText;
  btn_color?: string;
  btn_bg_color?: string;
  url?: string;
  [key: string]: any;
}

/** Salla dropdown-list values can arrive as ["fade-up"] or [{ value: "fade-up" }]. */
type AnimateField = Array<string | { value?: string }>;

interface ComponentConfig {
  ns_in_container?: boolean;
  ns_margin_top_zero?: boolean;

  ns_main_title?: LocalizedText;
  ns_main_title_color?: string;
  ns_main_subtitle?: LocalizedText;
  ns_main_subtitle_color?: string;

  ns_radius?: number | string;
  ns_gap?: number | string;

  ns_animate?: AnimateField;

  ns_cards?: CardItem[];

  [key: string]: any;
}

// ============================================
// COMPONENT
// ============================================

export class EnhancedCatsBanners extends LitElement {

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
        console.error("[enhanced-cats-banners] Failed to parse config:", e);
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

  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────

  /** Normalize the dropdown-list value to a plain animation string. */
  private _animationName(field?: AnimateField): string {
    const first = field?.[0];
    if (!first) return "fade-up";
    if (typeof first === "string") return first || "fade-up";
    return first.value || "fade-up";
  }

  // ─────────────────────────────────────────────
  // CARD RENDERER
  // ─────────────────────────────────────────────

  private _renderCard(card: CardItem, index: number, anim: string, radius: number) {
    const pos = index + 1; // mirror Twig's 1-based loop.index
    const url = card.url || "#";
    const title = resolveText(card.title);
    const badge = resolveText(card.badge);
    const btnText = resolveText(card.btn_text);
    const image =
      card.image || `https://placehold.co/800x800?text=Card+${pos}`;
    const delay = pos * 100 + 100;

    return html`
      <a
        href="${url}"
        aria-label="${title || "card"}"
        class="ns-card ns-card--${pos} ${anim}"
        style="border-radius: ${radius}px; animation-delay: ${delay}ms;"
      >
        <img
          class="ns-card__img"
          src="${image}"
          alt="${title}"
          loading="lazy"
        />

        <span class="ns-card__overlay"></span>

        ${badge
          ? html`
              <span
                class="ns-card__badge"
                style="color: ${card.badge_color || "#000"}; background-color: ${card.badge_bg_color || "#fff"};"
              >
                ${badge}
              </span>
            `
          : ""}

        <div class="ns-card__body">
          ${title
            ? html`
                <h3
                  class="ns-card__title"
                  style="color: ${card.title_color || "#fff"};"
                >
                  ${title}
                </h3>
              `
            : ""}
          ${btnText
            ? html`
                <span
                  class="ns-card__btn"
                  style="color: ${card.btn_color || "#000"}; background-color: ${card.btn_bg_color || "#FFD93D"};"
                >
                  ${btnText}
                </span>
              `
            : ""}
        </div>
      </a>
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

    const inContainer = cfg?.ns_in_container ?? true;
    const flushTop = !!cfg?.ns_margin_top_zero;

    const mainTitle = resolveText(cfg?.ns_main_title);
    const mainTitleColor = cfg?.ns_main_title_color || "#000";
    const mainSubtitle = resolveText(cfg?.ns_main_subtitle);
    const mainSubtitleColor = cfg?.ns_main_subtitle_color || "#777";

    const radius = Number(cfg?.ns_radius ?? 16);
    const gap = Number(cfg?.ns_gap ?? 16);
    const anim = this._animationName(cfg?.ns_animate);
    const cards = cfg?.ns_cards ?? [];

    const blockClasses = `ns-block s-block s-block-${this.position}${flushTop ? " ns-block--flush" : ""}`;
    const containerClass = inContainer ? "ns-container" : "ns-container--full";

    return html`
      <section class="${blockClasses}">
        <div class="${containerClass}">

          ${mainTitle || mainSubtitle
            ? html`
                <div class="ns-header">
                  ${mainTitle
                    ? html`
                        <h2
                          class="ns-header__title fade-up"
                          style="color: ${mainTitleColor};"
                        >
                          ${mainTitle}
                        </h2>
                      `
                    : ""}
                  ${mainSubtitle
                    ? html`
                        <p
                          class="ns-header__subtitle fade-up"
                          style="color: ${mainSubtitleColor};"
                        >
                          ${mainSubtitle}
                        </p>
                      `
                    : ""}
                </div>
              `
            : ""}

          <div class="ns-grid" style="gap: ${gap}px;">
            ${cards.map((card, index) =>
              this._renderCard(card, index, anim, radius)
            )}
          </div>
        </div>
      </section>
    `;
  }
}
