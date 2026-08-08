import { useContext } from 'react';

import { LanguageContext } from '@/i18n/context';
import type { Copy, Locale, Localized } from '@/i18n/types';

/** The chosen language, the copy that goes with it, and a way to change it. */
export function useLanguage(): {
  readonly locale: Locale;
  readonly copy: Copy;
  readonly setLocale: (next: Locale) => void;
} {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return value;
}

/** Just the copy, for the many components that never change the language. */
export function useCopy(): Copy {
  return useLanguage().copy;
}

/** Picks the current language out of a piece of localized content. */
export function usePick(): (value: Localized) => string {
  const { locale } = useLanguage();
  return (value) => value[locale];
}
