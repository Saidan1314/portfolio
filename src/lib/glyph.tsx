import type { BrandIconProps } from '@/types/icons';

/**
 * Builds an icon component from a single 24×24 path.
 *
 * Painting with `currentColor` is what lets a whole row of these stay one
 * colour and still inherit whatever the container hands down.
 */
export function glyph(d: string) {
  return function Glyph(props: BrandIconProps) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d={d} />
      </svg>
    );
  };
}
