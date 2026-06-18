//@ts-nocheck
declare global {
  const Salla: any;
}
// vite.config.ts
import { defineConfig } from "vite";
import {
  sallaTransformPlugin,
  sallaBuildPlugin,
  sallaDemoPlugin,
} from "@salla.sa/twilight-bundles/vite-plugins";

export default defineConfig({
  plugins: [
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