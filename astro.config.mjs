// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // TODO: change to the actual domain
  site: 'https://adexot.github.io',

  // Only use base path in production (GitHub Pages)
  base: '/',

  integrations: [sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      langs: [],
      wrap: true,
    },
  },

  adapter: cloudflare(),
});