import { motion, useReducedMotion, type Transition } from 'framer-motion';

import { cn } from '@/lib/cn';

/** Every drip runs on the same clock; only the start offset differs. */
const cycle = (delay: number): Transition => ({
  duration: 2,
  delay,
  ease: 'easeIn',
  repeat: Infinity,
  repeatDelay: 2,
});

const STILL: Transition = { duration: 0 };

/** Where the drips hang, how far they run, and when each one starts. */
const DRIPS = [
  { id: 'a', left: '10%', height: 24, delay: 0.5 },
  { id: 'b', left: '30%', height: 20, delay: 3 },
  { id: 'c', left: '57%', height: 10, delay: 4.25 },
  { id: 'd', left: '85%', height: 16, delay: 1.5 },
] as const;

const PAINT = 'bg-violet-500 group-hover:bg-violet-600';
const PAINT_FILL = 'fill-violet-500 group-hover:fill-violet-600';

/** The quarter-round that blends a drip's shoulder into the button's edge. */
function DripShoulder({ className }: { readonly className: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      aria-hidden="true"
      className={cn('absolute top-0', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
        className={cn('transition-colors', PAINT_FILL)}
      />
    </svg>
  );
}

interface DripProps {
  readonly left: string;
  readonly height: number;
  readonly delay: number;
  readonly still: boolean;
}

/** One run of paint: a column that stretches, and a bead that lets go. */
function Drip({ left, height, delay, still }: DripProps) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute top-[99%] origin-top"
      style={{ left }}
      initial={{ scaleY: 0.75 }}
      animate={still ? { scaleY: 0.75 } : { scaleY: [0.75, 1, 0.75] }}
      transition={still ? STILL : { ...cycle(delay), times: [0, 0.25, 1] }}
    >
      <span
        style={{ height }}
        className={cn('block w-2 rounded-b-full transition-colors', PAINT)}
      />

      <DripShoulder className="left-full" />
      <DripShoulder className="right-full rotate-90" />

      <motion.span
        initial={{ y: -8, opacity: 1 }}
        animate={still ? { y: -8, opacity: 0 } : { y: [-8, 50], opacity: [1, 0] }}
        transition={still ? STILL : { ...cycle(delay), times: [0, 1] }}
        className={cn('absolute top-full block h-2 w-2 rounded-full transition-colors', PAINT)}
      />
    </motion.span>
  );
}

interface WetPaintButtonProps {
  readonly href: string;
  readonly label: string;
  /** Opens in a new tab, with the matching `rel` guard. */
  readonly external?: boolean;
  /** Spells out what the link does, when the label alone is not enough. */
  readonly ariaLabel?: string;
  readonly className?: string;
}

/**
 * A button that looks freshly painted — four runs of paint creep down from
 * its lower edge and shed a bead.
 *
 * Rendered as an anchor: this is a link to a file, and a `<button>` would
 * lose middle-click, right-click and keyboard "open in new tab". The drips
 * are decorative and hidden from assistive tech, and they hold still under
 * reduced motion rather than looping forever.
 */
export function WetPaintButton({
  href,
  label,
  external = false,
  ariaLabel,
  className,
}: WetPaintButtonProps) {
  const still = useReducedMotion() ?? false;

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group relative inline-block rounded font-kanit font-semibold uppercase tracking-widest',
        'text-white transition-colors',
        'px-6 py-3 text-xs sm:px-8 sm:py-3.5 sm:text-sm md:px-10 md:py-4 md:text-base',
        PAINT,
        className,
      )}
    >
      {label}
      {DRIPS.map((drip) => (
        <Drip
          key={drip.id}
          left={drip.left}
          height={drip.height}
          delay={drip.delay}
          still={still}
        />
      ))}
    </a>
  );
}
