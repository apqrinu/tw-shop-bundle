import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

// ============================================
// TYPES
// ============================================

interface DropdownOption {
  value: string;
  label: string;
  key?: string;
}

interface LinkObject {
  url?: string;
  href?: string;
  value?: string;
}

/**
 * Category items follow Twilight's prefixed pattern.
 * The repeater id is "t_category", so subfields arrive as
 * "t_category.image", "t_category.title", ... with plain keys
 * (e.g. "image") kept as a fallback.
 */
interface CategoryItem {
  "t_category.image"?: string;
  "t_category.image_en"?: string;
  "t_category.title"?: string;
  "t_category.title_color"?: string;
  "t_category.sub_title"?: string;
  "t_category.sub_title_color"?: string;
  "t_category.display_none_subtitle"?: boolean;
  "t_category.btn_text"?: string;
  "t_category.btn_text_color"?: string;
  "t_category.btn_bg_color"?: string;
  "t_category.btn_link"?: string | LinkObject;
  "t_category.overlay"?: boolean;
  "t_category.border_radius_image"?: string | number;
  "t_category.animation"?: DropdownOption[] | string;

  [key: string]: any;
}

interface ComponentConfig {
  put_section_in_container?: boolean;

  enhanced_cat_1_main_title?: string;
  enhanced_cat_1_main_title_color?: string;
  enhanced_cat_1_main_subtitle?: string;
  enhanced_cat_1_main_subtitle_color?: string;

  t_category?: CategoryItem[];

  [key: string]: any;
}

// ============================================
// COMPONENT
// ============================================

export class SpecialCategories extends LitElement {

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
        console.error("[special-categories] Failed to parse config:", e);
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

  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────

  /** Reads a (possibly prefixed) subfield off a repeater item. */
  private _get(item: CategoryItem, key: string): any {
    const prefixed = (item as any)[`t_category.${key}`];
    if (prefixed !== undefined && prefixed !== null && prefixed !== "")
      return prefixed;
    const plain = (item as any)[key];
    if (plain !== undefined && plain !== null && plain !== "") return plain;
    return undefined;
  }

  private _resolveLink(val: any): string {
    if (!val) return "#";
    if (typeof val === "string") return val;
    if (typeof val === "object") {
      return val.url ?? val.href ?? val.value ?? "#";
    }
    return "#";
  }

  /** Selected value of a dropdown-list field ([{ value }]) or plain string. */
  private _getDropdownValue(
    field: DropdownOption[] | string | undefined,
    fallback: string
  ): string {
    if (!field) return fallback;
    if (typeof field === "string") return field;
    if (Array.isArray(field) && field.length > 0)
      return (field[0].value ?? fallback) as string;
    return fallback;
  }

  /** Twilight exposes RTL via theme.is_rtl; in the browser we read the document. */
  private get _isRtl(): boolean {
    if (typeof document === "undefined") return true;
    const dir =
      this.closest("[dir]")?.getAttribute("dir") ||
      document.documentElement.getAttribute("dir") ||
      document.dir;
    return dir ? dir.toLowerCase() === "rtl" : true;
  }

  // ─────────────────────────────────────────────
  // ITEM RENDERER
  // ─────────────────────────────────────────────

  private _renderItem(item: CategoryItem, index: number) {
    const image = this._get(item, "image") as string | undefined;
    const imageEn = this._get(item, "image_en") as string | undefined;
    const title = this._get(item, "title") as string | undefined;
    const titleColor = (this._get(item, "title_color") as string) || "#000000";
    const subTitle = this._get(item, "sub_title") as string | undefined;
    const subTitleColor =
      (this._get(item, "sub_title_color") as string) || "#000000";
    const hideSubtitleMobile = !!this._get(item, "display_none_subtitle");
    const btnText = this._get(item, "btn_text") as string | undefined;
    const btnTextColor =
      (this._get(item, "btn_text_color") as string) || "#000000";
    const btnBgColor = (this._get(item, "btn_bg_color") as string) || "#000000";
    const link = this._resolveLink(this._get(item, "btn_link"));
    const overlay = !!this._get(item, "overlay");
    const radius = parseInt(
      String(this._get(item, "border_radius_image") ?? "0"),
      10
    );
    const radiusPx = `${isNaN(radius) ? 0 : radius}px`;
    const animation = this._getDropdownValue(this._get(item, "animation"), "");

    // RTL shows the default image; LTR prefers the English image when present.
    const src = this._isRtl ? image : imageEn || image;

    const itemClasses = [
      "sc-item",
      `item-${index}`,
      animation ? "anim" : "",
      animation ? `anim-${animation}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    // Stagger like the original: delay-{{ loop.index0 * 100 + 100 }}
    const delay = `${(index - 1) * 100 + 100}ms`;

    return html`
      <div
        class="${itemClasses}"
        style="border-radius: ${radiusPx}; animation-delay: ${delay};"
      >
        <a
          href="${link}"
          class="sc-card-link ${overlay ? "sc-overlay" : ""}"
        >
          ${src
            ? html`<img
                src="${src}"
                class="sc-img"
                alt="${title ?? ""}"
                loading="lazy"
              />`
            : ""}
        </a>

        <div class="sc-content">
          ${title
            ? html`<h4 class="sc-item-title" style="color: ${titleColor};">
                ${title}
              </h4>`
            : ""}
          ${subTitle
            ? html`<p
                class="sc-item-subtitle ${hideSubtitleMobile
                  ? "sc-hide-mobile"
                  : ""}"
                style="color: ${subTitleColor};"
              >
                ${subTitle}
              </p>`
            : ""}
          ${btnText
            ? html`<a
                href="${link}"
                class="sc-btn"
                style="color: ${btnTextColor}; background-color: ${btnBgColor}; border-radius: ${radiusPx};"
              >
                ${btnText}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                  />
                </svg>
              </a>`
            : ""}
        </div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  render() {
    const cfg = this.config;

    // Safety check — re-parse if still a string at render time.
    if (typeof cfg === "string") {
      try {
        this.config = JSON.parse(cfg as any);
      } catch {}
      return html``;
    }

    const mainTitle = cfg?.enhanced_cat_1_main_title;
    const mainTitleColor =
      cfg?.enhanced_cat_1_main_title_color || "#000000";
    const mainSubtitle = cfg?.enhanced_cat_1_main_subtitle;
    const mainSubtitleColor =
      cfg?.enhanced_cat_1_main_subtitle_color || "#000000";

    const categories = cfg?.t_category ?? [];

    const grid = categories.length
      ? html`
          <div class="sc-grid" dir="rtl">
            ${categories.map((item, i) => this._renderItem(item, i + 1))}
          </div>
        `
      : html`<div class="sc-empty">لا توجد تصنيفات لعرضها</div>`;

    const body = html`
      <div class="sc-head">
        ${mainTitle
          ? html`<h2 class="sc-title" style="color: ${mainTitleColor};">
              ${mainTitle}
            </h2>`
          : ""}
        ${mainSubtitle
          ? html`<p class="sc-subtitle" style="color: ${mainSubtitleColor};">
              ${mainSubtitle}
            </p>`
          : ""}
      </div>
      ${grid}
    `;

    return html`
      <section
        class="sc-section"
        id="S_special_categories-${this.position}"
        aria-label="Special categories ${this.position}"
      >
        ${cfg?.put_section_in_container
          ? html`<div class="sc-container">${body}</div>`
          : html`<div class="sc-full">${body}</div>`}
      </section>
    `;
  }
}
