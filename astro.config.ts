import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
// @ts-check
import { defineConfig } from "astro/config";
import vaultcss from "vite-plugin-vaultcss";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  base: SITE.base || undefined,
  site: SITE.url,

  vite: {
    plugins: [vaultcss()],
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
