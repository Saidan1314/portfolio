import { motion } from 'framer-motion';
import { useMemo, type ElementType, type ReactNode } from 'react';

/** Shared easing for every entrance on the page. */
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface FadeInProps {
  readonly children: ReactNode;
  /** Element to render. Defaults to a `div`. */
  readonly as?: ElementType;
  readonly className?: string;
  readonly delay?: number;
  readonly duration?: number;
  /** Horizontal travel, in pixels. */
  readonly x?: number;
  /** Vertical travel, in pixels. */
  readonly y?: number;
}

/**
 * Reveals its children once, the first time they enter the viewport.
 *
 * `amount: 0` fires as soon as a single pixel is in view, and the 50px margin
 * starts the motion just before the element reaches the fold — the reveal
 * should feel like it was already underway, never like it waited to be seen.
 */
export function FadeIn({
  children,
  as = 'div',
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  // Memoised: `motion.create` returns a new component type on every call, and
  // an unstable type would remount the subtree on each render.
  const Motion = useMemo(() => motion.create(as), [as]);

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Motion>
  );
}
