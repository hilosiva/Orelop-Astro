// @ts-check
import { defineConfig } from "astro/config";
import { SITE } from "./src/config";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

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

  prefetch: {
    prefetchAll: true,
  },

  server: {
    host: true,
    open: true,
  },

  integrations: [
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
