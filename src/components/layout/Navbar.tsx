import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

import { HeaderBar } from '@/components/layout/HeaderBar';
import { ActionLink } from '@/components/ui/ActionLink';
import { BrandMark } from '@/components/ui/BrandMark';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { MenuToggle } from '@/components/ui/MenuToggle';
import { NavLink } from '@/components/ui/NavLink';
import { BRAND_NAME, CONTACT_HREF, NAVIGATION_LINKS } from '@/data/site';
import { useCopy } from '@/i18n/useLanguage';
import { cn } from '@/lib/cn';

/** Scroll distance after which the bar earns a background. */
const BACKDROP_THRESHOLD = 24;

interface NavbarProps {
  readonly onOpenMenu: () => void;
  readonly menuId: string;
  readonly menuOpen: boolean;
}

/**
 * Top bar: wordmark, centred navigation, language switch and a contact CTA
 * that collapses into a hamburger below `lg`.
 *
 * The fold is at `lg`, not `md`: at 768px the wordmark, three links, the
 * language switch and the CTA cannot share a line without colliding, and a
 * tablet is perfectly happy with the overlay menu.
 *
 * Fixed, because the page runs well past the opening viewport. It stays
 * transparent over the hero footage and only takes on a tinted, blurred
 * backdrop once there is content behind it to separate from.
 */
export function Navbar({ onOpenMenu, menuId, menuOpen }: NavbarProps) {
  const copy = useCopy();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > BACKDROP_THRESHOLD);
  });

  return (
    <header
      className={cn(
        'animate-fade-in fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-cinematic',
        scrolled
          ? 'border-b border-white/10 bg-ink/70 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <HeaderBar>
        <BrandMark name={BRAND_NAME} />

        {/*
          Pinned to the optical centre of the page rather than distributed by
          `justify-between`, so the links stay centred whatever the wordmark
          and the controls on the right measure.
        */}
        <nav
          aria-label={copy.nav.primaryLabel}
          className={cn(
            'absolute left-1/2 hidden -translate-x-1/2 items-center gap-8',
            'lg:flex xl:gap-12',
          )}
        >
          {NAVIGATION_LINKS.map((link) => (
            <NavLink
              key={link.id}
              href={link.href}
              label={copy.nav[link.id]}
              className={cn(
                'font-inter text-sm tracking-widest text-white/80',
                'transition-colors hover:text-white',
              )}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <LanguageToggle />

          <ActionLink
            href={CONTACT_HREF}
            label={copy.nav.contact}
            className="hidden lg:inline-flex"
          />

          <MenuToggle
            onClick={onOpenMenu}
            controls={menuId}
            expanded={menuOpen}
            label={copy.nav.openMenu}
            className="lg:hidden"
          />
        </div>
      </HeaderBar>
    </header>
  );
}
