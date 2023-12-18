import { SITE } from "./src/config";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  base: SITE.base != "/" ? SITE.base : undefined,
  site: SITE.url,
  // compressHTML: false,
  // scopedStyleStrategy: "class",

  server: {
    host: true,
  },
  integrations: [sitemap()],
});
