import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { BackgroundVideo } from '@/components/background/BackgroundVideo';
import { Hero } from '@/components/sections/Hero';
import { BACKGROUND_VIDEO_SRC } from '@/data/site';
import { cn } from '@/lib/cn';
import { HEADER_OFFSET } from '@/lib/layout';

/**
 * The opening viewport, and the hand-off into the portfolio below it.
 *
 * Two elements do two jobs. The outer one is an ordinary block exactly one
 * viewport tall: it holds the space in the document and is what `useScroll`
 * measures, so progress runs cleanly from 0 to 1 across the first screen.
 * The inner one is fixed, so the footage stays put while the portfolio sheet
 * climbs over it — over that same screen the hero recedes: dimming, easing
 * back, drifting up. It withdraws rather than scrolling away.
 *
 * Past the handover the layer is pulled out of the render entirely, so a 4K
 * video is not left compositing under an opaque page.
 */
export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const visibility = useTransform(scrollYProgress, (progress) =>
    progress >= 1 ? 'hidden' : 'visible',
  );

  return (
    <div ref={ref} className="relative h-[100svh]">
      <motion.div
        style={{ opacity, scale, y, visibility }}
        className="fixed inset-0 z-0 overflow-hidden will-change-transform"
      >
        <BackgroundVideo src={BACKGROUND_VIDEO_SRC} />

        <div className={cn('relative z-10 flex h-full flex-col', HEADER_OFFSET)}>
          <Hero />
        </div>
      </motion.div>
    </div>
  );
}
