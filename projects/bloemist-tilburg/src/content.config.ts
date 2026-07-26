import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const page = defineCollection({
  loader: glob({ pattern: 'home.md', base: './src/content' }),
  schema: ({ image }) => z.object({
    hero_label: z.string(),
    hero_heading: z.string(),
    hero_sub: z.string(),
    // Path relative to this content file, e.g. './images/hero.jpg'. Optional —
    // Hero.astro falls back to src/assets/stock/hero.png when unset, so the
    // section is never empty even before real shop photos exist.
    hero_image: image().optional(),
    trust: z.array(z.string()).max(4).optional(),
    about_heading: z.string(),
    about: z.string(),
    about_image: image().optional(), // same fallback rule as hero_image
    services: z.array(z.object({ title: z.string(), body: z.string() })),
    testimonials: z.array(z.object({
      name: z.string(), rating: z.number().optional(), quote: z.string(),
    })).optional(),                    // only via a compliant intake path — omitted for this build
    hours: z.array(z.object({ day: z.string(), open: z.string() })).optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    contact_email: z.string().email().optional(),  // often a gap — keep optional
    address: z.string().optional(),
    map_query: z.string().optional(),
  }),
});

export const collections = { page };
