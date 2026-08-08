import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { HeaderBar } from '@/components/layout/HeaderBar';
import { ActionLink } from '@/components/ui/ActionLink';
import { BrandMark } from '@/components/ui/BrandMark';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { NavLink } from '@/components/ui/NavLink';
import { BRAND_NAME, CONTACT_HREF, NAVIGATION_LINKS } from '@/data/site';
import { useCopy } from '@/i18n/useLanguage';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/cn';
import { SHELL_INLINE_PADDING } from '@/lib/layout';
import { revealDelay } from '@/lib/motion';

interface MobileMenuProps {
  readonly id: string;
  readonly open: boolean;
  readonly onClose: () => void;
}

/** Reveal state for a staggered item. */
function revealClass(open: boolean): string {
  return cn('reveal-item', open ? 'reveal-item-visible' : 'reveal-item-hidden');
}

/**
 * Fullscreen navigation overlay for viewports below `lg`.
 *
 * Entries rise into place one after another; on close they leave together, so
 * dismissing never feels slower than the tap that triggered it.
 */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const copy = useCopy();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(open);
  useEscapeKey(open, onClose);

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={copy.nav.menuLabel}
      inert={!open}
      className={cn(
        'fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm lg:hidden',
        'transition-all duration-500 ease-cinematic',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <HeaderBar>
        <BrandMark name={BRAND_NAME} onNavigate={onClose} />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={copy.nav.closeMenu}
          className="-mr-2 p-2 text-white transition-opacity duration-300 hover:opacity-70"
        >
          <X aria-hidden="true" className="h-6 w-6" />
        </button>
      </HeaderBar>

      <nav
        aria-label={copy.nav.mobileLabel}
        className={cn('flex flex-1 flex-col justify-center gap-6', SHELL_INLINE_PADDING)}
      >
        {NAVIGATION_LINKS.map((link, index) => (
          <NavLink
            key={link.id}
            href={link.href}
            label={copy.nav[link.id]}
            onClick={onClose}
            style={revealDelay(index)}
            className={cn(
              'font-inter text-4xl font-semibold tracking-tight text-white sm:text-5xl hover:text-white/70',
              revealClass(open),
            )}
          />
        ))}

        <ActionLink
          href={CONTACT_HREF}
          label={copy.nav.contact}
          onClick={onClose}
          style={revealDelay(NAVIGATION_LINKS.length)}
          className={cn('mt-4 self-start', revealClass(open))}
        />

        <LanguageToggle
          style={revealDelay(NAVIGATION_LINKS.length + 1)}
          className={cn('mt-2 self-start', revealClass(open))}
        />
      </nav>
    </div>
  );
}
