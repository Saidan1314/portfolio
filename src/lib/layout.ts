/**
 * The page's horizontal rhythm. Every full-width row — navbar, hero, mobile
 * menu — shares this gutter so their content sits on one vertical line at
 * every breakpoint.
 */
export const SHELL_INLINE_PADDING = 'px-6 sm:px-10 lg:px-16';

/**
 * The navbar is fixed, so its height is pinned rather than derived from its
 * contents: anything that has to clear it needs the same number, and a bar
 * that resized with its own children would drag the hero out of alignment.
 */
export const HEADER_HEIGHT = 'h-20 lg:h-[100px]';

/** Top padding that clears the fixed navbar. Mirrors {@link HEADER_HEIGHT}. */
export const HEADER_OFFSET = 'pt-20 lg:pt-[100px]';
