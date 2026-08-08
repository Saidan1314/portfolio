import { GradientShimmer } from '@/components/ui/GradientShimmer';
import { cn } from '@/lib/cn';
import { SHIMMER } from '@/lib/shimmer';

interface BrandMarkProps {
  /** Brand name to render. */
  readonly name: string;
  /** Fires after navigating home — used to close the mobile menu. */
  readonly onNavigate?: () => void;
  readonly className?: string;
}

/**
 * The wordmark. Shared by the navbar and the mobile menu header so both stay
 * pixel-aligned on the same baseline.
 *
 * The shimmer sits on an inner span rather than the anchor itself: the link
 * keeps its own colour and hover, and the gradient only has the glyphs to
 * clip to.
 */
export function BrandMark({ name, onNavigate, className }: BrandMarkProps) {
  return (
    <a
      href="#top"
      onClick={onNavigate}
      className={cn(
        // Same face and weight as the hero statement, so the two read as one
        // voice. No `uppercase`: the name's own casing is the point.
        'font-inter text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl',
        'transition-opacity duration-300 hover:opacity-70',
        className,
      )}
    >
      <GradientShimmer {...SHIMMER}>{name}</GradientShimmer>
    </a>
  );
}
