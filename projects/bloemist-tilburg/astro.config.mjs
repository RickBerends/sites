// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rickberends.github.io',
  base: '/sites/bloemist-tilburg',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
