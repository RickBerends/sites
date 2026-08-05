// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rickberends.github.io',

  // BOTH segments — the monorepo AND the project slug. GitHub Pages serves the
  // repo at /sites/ and each project one level deeper at /<slug>/. Dropping the
  // second segment is the #1 cause of a broken MVP link: assets 404 on the live
  // URL even though `npm run dev` looked fine (build-part-1 §3).
  //
  // scripts/new-site.mjs writes this line, so a generated project cannot get it
  // wrong. It is a literal string on purpose — scripts/check-links.mjs reads it
  // back with a regex to resolve root-relative links against dist/.
  base: '/sites/iris-exclusive-hair-tilburg',

  trailingSlash: 'always',
  integrations: [sitemap()],
});
