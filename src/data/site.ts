import type { NavigationLink } from '@/types/site';

/** Wordmark, shown in the navbar and the mobile menu header. A name, not copy. */
export const BRAND_NAME = 'Adán Arteaga';

/** Fullscreen looping background footage. */
export const BACKGROUND_VIDEO_SRC = 'https://www.pexels.com/download/video/33248294/';

/**
 * Single source of truth for the primary navigation (navbar + mobile menu).
 * Ordered the way the page reads. There is no Contact entry — the "Get in
 * touch" button is the contact affordance.
 */
export const NAVIGATION_LINKS: readonly NavigationLink[] = [
  { id: 'about', href: '#about' },
  { id: 'techStack', href: '#tech-stack' },
  { id: 'projects', href: '#projects' },
] as const;

/** Where the primary call to action points. */
export const CONTACT_HREF = '#contact';

/** Where the hero's secondary call to action points. */
export const WORK_HREF = '#projects';

/**
 * Résumé download. GitHub serves the release asset with
 * `Content-Disposition: attachment`, so a plain link downloads the PDF.
 */
export const RESUME_HREF =
  'https://github.com/Saidan1314/Saidan1314/releases/download/v1.0/CV_Adan_Arteaga.ENG.pdf';
