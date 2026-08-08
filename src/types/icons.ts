import type { SVGProps } from 'react';

/**
 * Props accepted by the hand-drawn brand glyphs.
 *
 * `viewBox`, `fill` and `xmlns` are fixed by the glyph. `path` is omitted too:
 * React's `SVGAttributes` already declares it as an optional presentation
 * attribute, so leaving it in would let a spread overwrite the geometry.
 */
export type BrandIconProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'fill' | 'xmlns' | 'path'>;
