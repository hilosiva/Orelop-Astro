// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/config';

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
});
