import type { CSSProperties, FunctionComponent } from 'react';

import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  OutlookIcon,
  YoutubeIcon,
} from '@/components/contact/BrandIcons';
import { SOCIAL_LINKS } from '@/data/contact';
import { cn } from '@/lib/cn';
import type { BrandIconProps } from '@/types/icons';

type SocialId = (typeof SOCIAL_LINKS)[number]['id'];

const ICONS: Record<SocialId, FunctionComponent<BrandIconProps>> = {
  discord: DiscordIcon,
  linkedin: LinkedinIcon,
  outlook: OutlookIcon,
  github: GithubIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
};

/** Passes the brand colour to CSS, where the hover styles pick it up. */
const accentStyle = (accent: string): CSSProperties =>
  ({ '--accent': accent }) as CSSProperties;

/**
 * Where to find me.
 *
 * Every tile is the same white glyph on nothing — no brand fills, no coloured
 * chips. The colour is held back for the hover, where the edge lights up in
 * that network's own hue and the tile rises a little. At rest the row is one
 * quiet set; under the cursor, one of them is unmistakably itself.
 *
 * `pointer-events-auto` puts the cursor back: the section turns it off around
 * the copy so the 3D scene underneath can track the mouse, and these are the
 * only things in that column that need clicking.
 */
export function SocialLinks() {
  return (
    <ul className="pointer-events-auto flex flex-wrap gap-3 sm:gap-4">
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICONS[link.id];
        // Only real destinations open a tab — a placeholder `#` with
        // `target="_blank"` would spawn an empty window.
        const isExternal = link.href.startsWith('http');

        return (
          <li key={link.id}>
            <a
              href={link.href}
              aria-label={link.label}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              style={accentStyle(link.accent)}
              className={cn(
                'group flex h-14 w-14 items-center justify-center rounded-2xl',
                'border border-white/15 bg-transparent text-white',
                'transition-[transform,border-color,box-shadow] duration-300 ease-cinematic',
                'hover:-translate-y-1 hover:border-[var(--accent)]',
                'hover:shadow-[0_10px_28px_-12px_var(--accent)]',
                'focus-visible:-translate-y-1 focus-visible:border-[var(--accent)]',
              )}
            >
              <Icon className="h-[22px] w-[22px] transition-transform duration-300 ease-cinematic group-hover:scale-110" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
