import type { FactCopy } from '@/i18n/types';

interface HeroFactItemProps {
  readonly fact: FactCopy;
}

/**
 * One status statement, broken across two lines: the first carries the weight,
 * the second recedes. Same size on both lines — the contrast is weight and
 * brightness, not scale, so the row reads as a single quiet register.
 */
export function HeroFactItem({ fact }: HeroFactItemProps) {
  return (
    <li className="font-inter text-sm uppercase tracking-wider sm:text-base lg:text-lg">
      <span className="block font-bold text-white">{fact.lead}</span>
      <span className="block font-light text-white/55">{fact.trail}</span>
    </li>
  );
}
