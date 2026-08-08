import type { Decoration, Project, ReelPhoto } from '@/types/portfolio';

/**
 * The four objects framing the about section.
 *
 * Top corners: the two hands from Michelangelo's *Creation of Adam* (1512,
 * public domain), reaching toward each other across the heading — Adam's on
 * the left, God's on the right, the way the fresco sets them. Cut from the
 * Sistine Chapel detail on Wikimedia Commons; see `docs/hand-cutouts.md`.
 *
 * Bottom corners: the two ideas the page is actually about.
 *
 * Each drifts on its own clock so the four never move as a set.
 */
export const ABOUT_DECORATIONS: readonly Decoration[] = [
  {
    id: 'hand-of-adam',
    src: '/decor/hand-of-adam.webp',
    alt: "Adam's hand, from Michelangelo's Creation of Adam",
    className: 'top-[4%] left-[1%] w-[145px] sm:left-[2%] sm:w-[195px] md:left-[4%] md:w-[255px]',
    delay: 0.1,
    from: -80,
    driftDuration: 11,
    driftDelay: 0,
  },
  {
    // Wider and flatter than Adam's, so it is set a little larger to carry
    // the same visual weight in its corner.
    id: 'hand-of-god',
    src: '/decor/hand-of-god.webp',
    alt: "God's hand, from Michelangelo's Creation of Adam",
    className: 'top-[4%] right-[1%] w-[165px] sm:right-[2%] sm:w-[225px] md:right-[4%] md:w-[295px]',
    delay: 0.15,
    from: 80,
    driftDuration: 13,
    driftDelay: -3.5,
  },
  {
    id: 'neural-network',
    src: '/decor/neural-network.svg',
    alt: '',
    className: 'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    delay: 0.25,
    from: -80,
    driftDuration: 9,
    driftDelay: -1.8,
  },
  {
    id: 'ai-chip',
    src: '/decor/ai-chip.svg',
    alt: '',
    className:
      'bottom-[8%] right-[3%] w-[110px] sm:right-[6%] sm:w-[150px] md:right-[10%] md:w-[190px]',
    delay: 0.3,
    from: 80,
    driftDuration: 15,
    driftDelay: -6,
  },
] as const;

/** Stand-in copy, replaced project by project. Latin reads the same either way. */
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor ' +
  'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ' +
  'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const TEMPLATE = {
  category: { en: 'Property', es: 'Propiedad' },
  name: { en: 'Title', es: 'Título' },
  description: { en: LOREM, es: LOREM },
} as const;

/**
 * The project deck.
 *
 * These three are empty templates: real values go in as the projects exist,
 * and a fourth card is just a fourth entry in this array — the stacking
 * depths and scroll ranges are derived from the length, not hard-coded.
 *
 * The text carries both languages inline rather than living in the
 * dictionaries: a project is content, not page furniture, and adding one
 * should mean editing this file and nothing else.
 *
 * See the "Adding a project" section of the README.
 */
export const PROJECTS: readonly Project[] = [
  { id: 'project-01', number: '01', ...TEMPLATE, image: '', href: '' },
  { id: 'project-02', number: '02', ...TEMPLATE, image: '', href: '' },
  { id: 'project-03', number: '03', ...TEMPLATE, image: '', href: '' },
] as const;

/**
 * Photographs in the closing reel, served from `public/reel/`.
 *
 * `width` and `height` are the dimensions the browser will lay out, which is
 * not always what the file stores: `6.jpg` is written sideways with an EXIF
 * orientation tag, and browsers apply that tag by default — so it is recorded
 * here as the landscape frame it actually renders as.
 */
export const REEL_PHOTOS: readonly ReelPhoto[] = [
  {
    id: 'award-group',
    src: '/reel/1.jpeg',
    alt: 'Eight students lined up on stage holding certificates at an ESCOM award ceremony',
    width: 1440,
    height: 960,
  },
  {
    id: 'award-trio',
    src: '/reel/2.jpeg',
    alt: 'Three students on stage with a certificate and a tray of prizes',
    width: 1440,
    height: 960,
  },
  {
    id: 'lab-trio',
    src: '/reel/3.jpg',
    alt: 'Three students at a row of computers, balloons floating above the desks',
    width: 1365,
    height: 2048,
  },
  {
    id: 'lab-group',
    src: '/reel/4.jpg',
    alt: 'Five students posing together in a computer lab decorated with balloons',
    width: 2048,
    height: 1365,
  },
  {
    id: 'generation',
    src: '/reel/5.jpg',
    alt: 'A large group of students gathered outside the ESCOM building for a class photo',
    width: 2048,
    height: 1365,
  },
  {
    id: 'campus-night',
    // Stored portrait with EXIF orientation 8; renders landscape.
    src: '/reel/6.jpg',
    alt: 'The ESCOM campus buildings lit up at night',
    width: 2400,
    height: 1080,
  },
  {
    id: 'cecyt',
    src: '/reel/7.webp',
    alt: 'Standing in a suit outside CECyT 3 “Estanislao Ramírez Ruiz”, IPN',
    width: 525,
    height: 700,
  },
  {
    id: 'escom-sign',
    src: '/reel/8.jpg',
    alt: 'The #ESCOM IPN sign lit at night beside a decorated Christmas tree',
    width: 1080,
    height: 1237,
  },
] as const;

/** How many photographs belong to the top reel row. */
export const REEL_TOP_ROW_COUNT = 4;
