import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const page = defineCollection({
  loader: glob({ pattern: 'home.md', base: './src/content' }),
  schema: z.object({
    hero_label: z.string().optional(),
    hero_heading: z.string(),
    hero_sub: z.string(),
    trust: z.array(z.string()).max(4).optional(),
    about_heading: z.string().optional(),
    about: z.string(),
    services: z.array(z.object({ title: z.string(), body: z.string() })),
    testimonials: z.array(z.object({
      name: z.string(), rating: z.number().optional(), quote: z.string(),
    })).optional(),                    // only via a compliant intake path
    hours: z.array(z.object({ day: z.string(), open: z.string() })).optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    contact_email: z.string().email().optional(),  // often a gap — keep optional
    address: z.string().optional(),                // unconfirmed for this business — kept optional
    instagram_handle: z.string().optional(),
    instagram_url: z.string().url().optional(),
  }),
});

export const collections = { page };
