import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { LanguageContext, type LanguageValue } from '@/i18n/context';
import { en } from '@/i18n/en';
import { es } from '@/i18n/es';
import type { Copy, Locale } from '@/i18n/types';

const DICTIONARIES: Record<Locale, Copy> = { en, es };

const STORAGE_KEY = 'preferred-locale';

const isLocale = (value: unknown): value is Locale => value === 'en' || value === 'es';

/**
 * The visitor's language, in order of authority: what they last chose here,
 * then what their browser asks for, then English.
 */
function initialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;

  return window.navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
}

/**
 * Holds the chosen language and hands down the matching copy.
 *
 * It also keeps the document itself in step: `<html lang>` so screen readers
 * and translation tools pick the right pronunciation and rules, and the
 * description meta tag so a link shared from a Spanish page previews in
 * Spanish. The choice is remembered, so a return visit opens in the language
 * the visitor left in.
 */
export function LanguageProvider({ children }: { readonly children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', DICTIONARIES[locale].meta.description);
  }, [locale]);

  const value = useMemo<LanguageValue>(
    () => ({ locale, copy: DICTIONARIES[locale], setLocale }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
