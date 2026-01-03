// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  // TODO: change to the actual domain
  site: 'https://adexot.github.io',

  // Only use base path in production (GitHub Pages)
  base: '/',

  integrations: [react(), sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      langs: [],
      wrap: true,
    },
  },

  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
  },
});