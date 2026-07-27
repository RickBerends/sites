import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * THE canonical one-pager schema. Do not fork it per project.
 *
 * This is a superset of the five schemas that were hand-written before this
 * template existed. Their drift was arbitrary — `hero_label` required in some
 * and optional in others, `about_heading` present in three of five,
 * `map_query` in one and `maps_url` in another — and it costs real money later:
 * build-part-2 §7 attaches Decap CMS by writing this same `home.md`, and one
 * stable schema means one CMS config instead of one per client.
 *
 * Adding a field for a genuine business need is fine. Renaming an existing one
 * is not.
 *
 * NEVER INVENT A VALUE. `testimonials`, `contact_email`, `phone` and `address`
 * are optional precisely because they are frequently unavailable. A missing
 * value is a flagged gap for the client to fill — not a field to fill with a
 * plausible-looking guess. See the intake-research and lovable-page skills.
 */
const page = defineCollection({
  loader: glob({ pattern: 'home.md', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      // Hero
      hero_label: z.string().optional(),
      hero_heading: z.string(),
      hero_sub: z.string(),
      // Path relative to this content file, e.g. './images/hero.jpg'. Optional —
      // Hero.astro falls back to the identity's stock image when unset, so the
      // rendered slot is never empty even before real photos exist.
      hero_image: image().optional(),

      // Trust strip — max 4, directly below the hero
      trust: z.array(z.string()).max(4).optional(),

      // About
      about_heading: z.string().optional(),
      about: z.string(),
      // Same fallback rule as hero_image.
      about_image: image().optional(),

      // Services, written as outcomes rather than features
      services: z.array(
        z.object({
          title: z.string(),
          body: z.string(),
        }),
      ),

      // Social proof. Only via a compliant path: a live embed, client-permissioned
      // quotes, or fresh testimonials (intake-research §2b). Reproducing scraped
      // Google review text here is not one of them.
      testimonials: z
        .array(
          z.object({
            name: z.string(),
            rating: z.number().optional(),
            quote: z.string(),
          }),
        )
        .optional(),
      testimonials_source: z.string().optional(),

      // Opening hours
      hours: z
        .array(
          z.object({
            day: z.string(),
            open: z.string(),
          }),
        )
        .optional(),

      // Contact & location
      phone: z.string().optional(),
      whatsapp: z.string().optional(),
      contact_email: z.string().email().optional(),
      address: z.string().optional(),
      maps_url: z.string().url().optional(),

      // Social
      instagram_url: z.string().url().optional(),
      facebook_url: z.string().url().optional(),

      // <head>
      seo_title: z.string().optional(),
      seo_description: z.string().optional(),
    }),
});

export const collections = { page };
