import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { SITE } from "./src/config";
// @ts-check

// https://astro.build/config
export default defineConfig({
  base: SITE.base || undefined,
  site: SITE.url,

  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        drafts: {
          customMedia: true,
        },
      },
    },
  },

  server: {
    host: true,
    open: true,
  },

  integrations: [sitemap()],
});
