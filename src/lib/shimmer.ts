import type { EasingPreset, GradientStop } from '@/lib/gradient-shimmer';

/**
 * A band of violets, light at the edges and saturated through the middle, so
 * the sweep reads as one moving highlight rather than a rainbow. Seven stops
 * because the band is only convincing when the colour actually travels
 * through a range — two would just look like a smudge.
 */
const VIOLET_BAND: readonly GradientStop[] = [
  { color: '#EDE9FE', position: 0 },
  { color: '#C4B5FD', position: 0.18 },
  { color: '#A78BFA', position: 0.36 },
  { color: '#8B5CF6', position: 0.52 },
  { color: '#A855F7', position: 0.68 },
  { color: '#C084FC', position: 0.84 },
  { color: '#E9D5FF', position: 1 },
];

/**
 * One shimmer setting for the whole page, so the wordmark and the hero
 * statement read as the same material catching the same light. `gentle`
 * dwells at the ends, which makes the sweep arrive as a slow pass rather
 * than a flicker.
 */
export const SHIMMER: {
  readonly gradient: readonly GradientStop[];
  readonly easing: EasingPreset;
  readonly duration: number;
  readonly pauseBetween: number;
} = {
  gradient: VIOLET_BAND,
  easing: 'gentle',
  duration: 2.2,
  pauseBetween: 2600,
};
