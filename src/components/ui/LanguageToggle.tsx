import type { CSSProperties } from 'react';

import { LOCALES, type Locale } from '@/i18n/types';
import { useLanguage } from '@/i18n/useLanguage';
import { cn } from '@/lib/cn';

/** What each language calls itself — never translated. */
const ENDONYM: Record<Locale, string> = { en: 'EN', es: 'ES' };

interface LanguageToggleProps {
  readonly className?: string;
  readonly style?: CSSProperties;
}

/**
 * Two-state language switch.
 *
 * Each option is a real button in a `radiogroup`, not a single toggle: with
 * only two languages a plain toggle would leave the current one unnamed, and
 * a visitor who cannot read the page needs to see both choices to escape it.
 * The labels are endonyms — "ES" reads as Spanish to a Spanish speaker
 * whatever language the rest of the page happens to be in.
 */
export function LanguageToggle({ className, style }: LanguageToggleProps) {
  const { locale, copy, setLocale } = useLanguage();

  return (
    <div
      role="radiogroup"
      style={style}
      aria-label={copy.language.label}
      className={cn(
        'inline-flex shrink-0 items-center gap-0.5 rounded-full border border-white/20 p-0.5',
        className,
      )}
    >
      {LOCALES.map((option) => {
        const active = option === locale;

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={copy.language[option]}
            onClick={() => setLocale(option)}
            className={cn(
              'rounded-full px-2 py-1 font-inter text-[10px] font-semibold tracking-widest',
              'transition-colors duration-300 ease-cinematic lg:text-xs',
              active ? 'bg-white text-ink' : 'text-white/60 hover:text-white',
            )}
          >
            {ENDONYM[option]}
          </button>
        );
      })}
    </div>
  );
}
