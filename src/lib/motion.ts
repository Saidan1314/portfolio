import type { CSSProperties } from 'react';

/** Delay between two consecutive items in a staggered reveal. */
export const REVEAL_STAGGER_MS = 80;

/** Delay before the first item of a staggered reveal starts. */
export const REVEAL_BASE_DELAY_MS = 100;

/**
 * Per-item delay for a staggered reveal.
 *
 * The value is only known at render time (it depends on the item's index), so
 * it is passed as a CSS custom property. The transition itself stays in CSS —
 * see the `.reveal-item` utility in `index.css`.
 */
export function revealDelay(index: number): CSSProperties {
  const delayMs = index * REVEAL_STAGGER_MS + REVEAL_BASE_DELAY_MS;

  return { '--reveal-delay': `${delayMs}ms` } as CSSProperties;
}
