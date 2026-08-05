import siteConfig from '../site.config.json';

export type SectionName =
  | 'hero'
  | 'trust'
  | 'services'
  | 'projects'
  | 'highlights'
  | 'about'
  | 'process'
  | 'testimonials'
  | 'location'
  | 'hours'
  | 'contact';

export const site = siteConfig;
export const strings = siteConfig.strings as Record<string, string>;

/**
 * Is this section switched on for this site?
 *
 * `sections` in site.config.json is how lovable-page's "if a section doesn't
 * increase trust, remove it" survives without editing any component. Drop a
 * name from the array and the section stops rendering — no dead markup, no
 * dangling nav anchor.
 */
export function hasSection(name: SectionName): boolean {
  return (siteConfig.sections as string[]).includes(name);
}

/** A phone number safe to put in a tel: href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** A WhatsApp number safe to put in a wa.me link. */
export function whatsappHref(number: string): string {
  return `https://wa.me/${number.replace(/[^\d]/g, '')}`;
}
