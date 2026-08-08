import type { ReactNode } from 'react';

import { FadeIn } from '@/components/motion/FadeIn';
import { cn } from '@/lib/cn';

type HeadingTone = 'gradient' | 'ink';

const TONE_CLASSES: Record<HeadingTone, string> = {
  gradient: 'hero-heading',
  ink: 'text-ink',
};

interface SectionHeadingProps {
  readonly children: ReactNode;
  /** `gradient` on the dark panels, `ink` on the white one. */
  readonly tone?: HeadingTone;
  readonly delay?: number;
  readonly className?: string;
}

/**
 * The display heading shared by every section: one fluid type ramp, so
 * "About me", "Services" and "Project" always sit on the same optical scale.
 */
export function SectionHeading({
  children,
  tone = 'gradient',
  delay = 0,
  className,
}: SectionHeadingProps) {
  return (
    <FadeIn
      as="h2"
      delay={delay}
      y={40}
      className={cn(
        'text-center font-kanit text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none',
        'tracking-tight',
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </FadeIn>
  );
}
