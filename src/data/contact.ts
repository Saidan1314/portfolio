/** The 3D scene behind the contact section. */
export const CONTACT_SCENE_SRC = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

/**
 * Where to find me.
 *
 * `accent` is the brand colour, used only for the hover edge — the glyphs
 * themselves stay black so the row reads as one set rather than six logos.
 *
 * Outlook is drawn as an envelope rather than the Microsoft mark: at 22px a
 * traced Outlook logo turns to mush, and the envelope reads as mail instantly
 * while matching the weight of the other five glyphs.
 */
export const SOCIAL_LINKS = [
  { id: 'discord', label: 'Discord', href: 'https://discord.gg/ZpN9PPMSq', accent: '#5865F2' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/adanis369/',
    accent: '#0A66C2',
  },
  {
    id: 'outlook',
    label: 'Email',
    href: 'mailto:adanarteagacontact@gmail.com',
    accent: '#0078D4',
  },
  // GitHub's own near-black would vanish on this section's background, so its
  // hover edge borrows the mark's other colour: plain white.
  { id: 'github', label: 'GitHub', href: 'https://github.com/Saidan1314', accent: '#FFFFFF' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@AdamIs_7', accent: '#FF0000' },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/adamis7_/',
    accent: '#E4405F',
  },
] as const;
