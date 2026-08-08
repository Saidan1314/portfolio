import { createContext } from 'react';

import type { Copy, Locale } from '@/i18n/types';

export interface LanguageValue {
  readonly locale: Locale;
  readonly copy: Copy;
  readonly setLocale: (next: Locale) => void;
}

/**
 * Kept apart from the provider so that file exports components and nothing
 * else — which is what keeps fast refresh working.
 */
export const LanguageContext = createContext<LanguageValue | null>(null);
