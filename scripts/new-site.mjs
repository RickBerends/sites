#!/usr/bin/env node
/**
 * new-site.mjs — stamp out a new one-pager from templates/one-pager/.
 *
 * Usage:
 *   node scripts/new-site.mjs <slug> --identity=B --name="Wereldwinkel Tilburg" [options]
 *
 * Required:
 *   <slug>                kebab-case project folder, e.g. wereldwinkel-tilburg
 *   --identity=A|B|C      visual identity (see .claude/skills/visual-identity)
 *   --name="…"            the business's trading name
 *
 * Optional:
 *   --lang=nl|en          UI string preset            (default nl)
 *   --sections=a,b,c      which sections render       (default all eight)
 *   --accent=#RRGGBB      accent override — REQUIRES --accent-reason
 *   --accent-reason="…"   why the identity accent was not good enough
 *   --no-install          skip npm install (lockfile is copied either way)
 *
 * What it does NOT do: write any of the business's words. That is the part that
 * needs a human or a model, and it lives entirely in src/content/home.md.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templateDir = path.join(repoRoot, 'templates', 'one-pager');

/** The string the template uses everywhere its own slug appears. */
const TEMPLATE_SLUG = 'one-pager-template';

const ALL_SECTIONS = [
  'hero',
  'trust',
  'services',
  'about',
  'testimonials',
  'location',
  'hours',
  'contact',
];

/** UI chrome only — never business copy. */
const LANG_PRESETS = {
  nl: {
    skipToContent: 'Naar de inhoud',
    primaryCta: 'Bel ons',
    secondaryCta: 'Bekijk openingstijden',
    navServices: 'Diensten',
    navAbout: 'Over ons',
    navHours: 'Openingstijden',
    navContact: 'Contact',
    servicesHeading: 'Wat we doen',
    aboutHeading: 'Over ons',
    testimonialsHeading: 'Wat klanten zeggen',
    locationHeading: 'Waar je ons vindt',
    hoursHeading: 'Openingstijden',
    contactHeading: 'Contact',
    phoneLabel: 'Telefoon',
    emailLabel: 'E-mail',
    whatsappLabel: 'WhatsApp',
    addressLabel: 'Adres',
    mapsLinkLabel: 'Bekijk op Google Maps',
    closedLabel: 'Gesloten',
    draftBanner:
      'Concept — voorbeeldpagina ter beoordeling. Teksten zijn nog niet definitief.',
    notFoundHeading: 'Pagina niet gevonden',
    notFoundBody: 'Deze pagina bestaat niet (meer).',
    notFoundCta: 'Terug naar de homepage',
  },
  en: {
    skipToContent: 'Skip to content',
    primaryCta: 'Call us',
    secondaryCta: 'See opening hours',
    navServices: 'Services',
    navAbout: 'About',
    navHours: 'Opening hours',
    navContact: 'Contact',
    servicesHeading: 'What we do',
    aboutHeading: 'About us',
    testimonialsHeading: 'What customers say',
    locationHeading: 'Where to find us',
    hoursHeading: 'Opening hours',
    contactHeading: 'Contact',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    addressLabel: 'Address',
    mapsLinkLabel: 'View on Google Maps',
    closedLabel: 'Closed',
    draftBanner: 'Draft — preview for review. Copy is not final.',
    notFoundHeading: 'Page not found',
    notFoundBody: "This page doesn't exist (any more).",
    notFoundCta: 'Back to the homepage',
  },
};

function fail(message) {
  console.error(`new-site: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      const [key, ...rest] = arg.slice(2).split('=');
      flags[key] = rest.length > 0 ? rest.join('=') : true;
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const slug = positional[0];

  // ---- validate -----------------------------------------------------------

  if (!slug) fail('missing <slug>. See the usage block at the top of this file.');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    fail(`slug "${slug}" must be kebab-case: lowercase letters, digits and single hyphens.`);
  }
  if (slug === TEMPLATE_SLUG) fail(`slug cannot be "${TEMPLATE_SLUG}" — that name is the template's.`);

  const identity = String(flags.identity ?? '').toUpperCase();
  if (!['A', 'B', 'C'].includes(identity)) {
    fail('--identity must be A, B or C. See .claude/skills/visual-identity/SKILL.md.');
  }

  const name = typeof flags.name === 'string' ? flags.name : null;
  if (!name) fail('--name="Business Name" is required.');

  const lang = String(flags.lang ?? 'nl');
  if (!LANG_PRESETS[lang]) {
    fail(`--lang=${lang} has no string preset. Available: ${Object.keys(LANG_PRESETS).join(', ')}.`);
  }

  let sections = ALL_SECTIONS;
  if (typeof flags.sections === 'string') {
    sections = flags.sections.split(',').map((s) => s.trim()).filter(Boolean);
    const unknown = sections.filter((s) => !ALL_SECTIONS.includes(s));
    if (unknown.length > 0) {
      fail(`unknown section(s): ${unknown.join(', ')}. Available: ${ALL_SECTIONS.join(', ')}.`);
    }
  }

  // An accent override is a real design decision (visual-identity step 3), so it
  // has to come with a reason that lands in the CSS as a comment. Across the
  // five sites built before this template exactly one override was justified.
  const accent = typeof flags.accent === 'string' ? flags.accent : null;
  const accentReason = typeof flags['accent-reason'] === 'string' ? flags['accent-reason'] : null;
  if (accent && !/^#[0-9a-fA-F]{6}$/.test(accent)) fail(`--accent must be #RRGGBB, got "${accent}".`);
  if (accent && !accentReason) {
    fail('--accent requires --accent-reason="…" (visual-identity: adapt the accent only for a real reason).');
  }
  if (accentReason && !accent) fail('--accent-reason was given without --accent.');

  if (!(await exists(templateDir))) fail(`template not found at ${templateDir}.`);

  const targetDir = path.join(repoRoot, 'projects', slug);
  if (await exists(targetDir)) {
    fail(`projects/${slug} already exists. Pick another slug, or delete it first.`);
  }

  // ---- copy ---------------------------------------------------------------

  await fs.mkdir(path.dirname(targetDir), { recursive: true });
  await fs.cp(templateDir, targetDir, {
    recursive: true,
    // node_modules/dist/.astro are gitignored, but a local run of the template
    // leaves them behind — never copy them into a fresh project.
    filter: (src) => {
      const rel = path.relative(templateDir, src);
      return !rel.split(path.sep).some((seg) => ['node_modules', 'dist', '.astro'].includes(seg));
    },
  });

  const write = (rel, contents) => fs.writeFile(path.join(targetDir, rel), contents, 'utf8');
  const read = (rel) => fs.readFile(path.join(targetDir, rel), 'utf8');

  // ---- site.config.json ---------------------------------------------------

  const siteConfig = {
    slug,
    name,
    lang,
    identity,
    draft: true,
    sections,
    strings: LANG_PRESETS[lang],
  };
  if (accent) siteConfig.accentOverride = { value: accent, reason: accentReason };
  await write('site.config.json', `${JSON.stringify(siteConfig, null, 2)}\n`);

  // ---- package.json name --------------------------------------------------

  const pkg = JSON.parse(await read('package.json'));
  pkg.name = slug;
  await write('package.json', `${JSON.stringify(pkg, null, 2)}\n`);

  // ---- astro.config.mjs base ----------------------------------------------
  // Both segments: /sites/<slug>. Generating this line is the whole reason the
  // "#1 cause of broken MVP links" (build-part-1 §3) cannot happen here.

  const astroConfig = await read('astro.config.mjs');
  if (!astroConfig.includes(`/sites/${TEMPLATE_SLUG}`)) {
    fail(`could not find base '/sites/${TEMPLATE_SLUG}' in astro.config.mjs — the template changed shape.`);
  }
  await write('astro.config.mjs', astroConfig.replace(`/sites/${TEMPLATE_SLUG}`, `/sites/${slug}`));

  // ---- identity: keep one, delete the rest --------------------------------

  const keep = `identity-${identity.toLowerCase()}.css`;
  for (const letter of ['a', 'b', 'c']) {
    const file = `identity-${letter}.css`;
    if (file !== keep) await fs.rm(path.join(targetDir, 'src', 'styles', file));
  }

  let globalCss = await read('src/styles/global.css');
  const identityImport = /@import '\.\/identity-[abc]\.css';/;
  // Test for the pattern rather than comparing before/after: when the requested
  // identity is the template's own default the rewrite is a legitimate no-op.
  if (!identityImport.test(globalCss)) {
    fail('could not find the identity @import in global.css — the template changed shape.');
  }
  globalCss = globalCss.replace(identityImport, `@import './${keep}';`);

  if (accent) {
    globalCss += `\n/* Accent override — ${accentReason} */\n:root {\n  --color-accent: ${accent};\n}\n`;
  }
  await write('src/styles/global.css', globalCss);

  // ---- install ------------------------------------------------------------

  if (flags['no-install'] !== true) {
    console.log(`new-site: installing dependencies in projects/${slug} …`);
    try {
      execFileSync('npm', ['install', '--silent'], { cwd: targetDir, stdio: 'inherit' });
    } catch {
      console.warn('new-site: npm install failed — run it yourself in the project folder.');
    }
  }

  // ---- what now -----------------------------------------------------------

  console.log(`
new-site: created projects/${slug}
  identity   ${identity}${accent ? `  (accent overridden to ${accent} — ${accentReason})` : ''}
  language   ${lang}
  sections   ${sections.join(' · ')}
  URL        https://rickberends.github.io/sites/${slug}/

Next — the part no script can do for you:
  1. Write projects/${slug}/src/content/home.md from the intake brief.
     Never invent a fact. Delete any field you cannot source.
  2. cd projects/${slug} && npm run build && npm run check-links
  3. Commit and push. CI builds only this project.

The project is yours now — rewrite any component you like. The template sets the
floor, not the ceiling. See BUILD.md.
`);
}

main().catch((err) => {
  console.error('new-site: unexpected error', err);
  process.exit(1);
});
