//@ts-nocheck
declare global {
  const Salla: any;
}
// vite.config.ts
import { defineConfig, transformWithEsbuild } from "vite";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  sallaTransformPlugin,
  sallaBuildPlugin,
  sallaDemoPlugin,
} from "@salla.sa/twilight-bundles/vite-plugins";

/**
 * Salla loads each `dist/<component>.js` as a standalone module, so the build
 * must not split shared helpers (e.g. utils/i18n) into a separate chunk.
 * This plugin gives every importer its own copy of the shared helper, keeping
 * a single source of truth in `src/utils/i18n.ts` while inlining it into each
 * component's self-contained output.
 */
function inlineSharedI18n() {
  const PREFIX = "\0inline-i18n:";
  const i18nSource = resolve(process.cwd(), "src/utils/i18n.ts");
  return {
    name: "inline-shared-i18n",
    enforce: "pre" as const,
    resolveId(source: string, importer?: string) {
      if (importer && /\/utils\/i18n(\.js|\.ts)?$/.test(source)) {
        // Unique virtual id per importer → no cross-entry shared chunk.
        return PREFIX + importer;
      }
      return null;
    },
    async load(id: string) {
      if (id.startsWith(PREFIX)) {
        const code = readFileSync(i18nSource, "utf-8");
        const res = await transformWithEsbuild(code, "i18n.ts", {
          loader: "ts",
        });
        return res.code;
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    inlineSharedI18n(),
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin({
      // Inject into <head>
      css: `
        /* Tailwind CSS CDN */
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@3/dist/tailwind.min.css');

        /* Swiper CSS */
        @import url('https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css');

        /* Twilight (Salla) base theme CSS */
        @import url('https://cdn.jsdelivr.net/npm/@salla.sa/twilight@latest/dist/css/twilight.min.css');
      `
    }),
  ],
});