// ============================================
// SHARED i18n UTILITY
// ============================================
//
// Salla may deliver a localizable settings field as either a plain string
// or as an object keyed by language code, e.g. { ar: "نص عربي", en: "English" }.
// Rendering such an object directly produces "[object Object]", an empty value,
// or a framework error. Every component must funnel localizable settings text
// through `resolveText` before display so a single, consistent string is shown
// according to the active store language — with safe fallbacks.

/** A settings value that may be a plain string or a per-language object. */
export type LocalizedText =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>;

/**
 * Resolve the active store/display language code (normalized, e.g. "ar", "en").
 * Reads from Salla first, then the document, and finally falls back to Arabic.
 */
export function getStoreLang(): string {
  let lang = "";

  try {
    const salla = (window as any).salla;
    lang =
      salla?.config?.get?.("user.language_code") ||
      salla?.config?.get?.("user.language.code") ||
      salla?.config?.get?.("store.language") ||
      salla?.lang?.locale ||
      "";
  } catch {
    /* salla not available */
  }

  if (!lang) {
    try {
      lang =
        document.documentElement.lang ||
        document.documentElement.getAttribute("lang") ||
        "";
    } catch {
      /* document not available */
    }
  }

  // Normalize e.g. "ar-SA" / "en_US" → "ar" / "en"; default to Arabic.
  return (lang || "ar").toLowerCase().replace("_", "-").split("-")[0];
}

/**
 * Convert a (possibly multilingual) settings value into a single display string.
 *
 * - plain string → returned as-is
 * - number / boolean → stringified
 * - { ar, en, ... } object → picks the active store language, then falls back
 *   through a priority order so text is never lost and never rendered as
 *   "[object Object]".
 *
 * @param value    The raw settings value coming from Salla.
 * @param fallback Returned when no usable text can be resolved.
 */
export function resolveText(value: LocalizedText, fallback = ""): string {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const lang = getStoreLang();

    // Priority: active language → Arabic → English → any non-empty value.
    const order = [lang, "ar", "en"];
    for (const key of order) {
      const v = obj[key];
      if (typeof v === "string" && v.trim() !== "") return v;
      if (typeof v === "number" || typeof v === "boolean") return String(v);
    }
    for (const key of Object.keys(obj)) {
      const v = obj[key];
      if (typeof v === "string" && v.trim() !== "") return v;
    }
  }

  return fallback;
}
