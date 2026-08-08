import type { CSSProperties } from 'react';

import { AnimatedText } from '@/components/motion/AnimatedText';
import { FadeIn } from '@/components/motion/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WetPaintButton } from '@/components/ui/WetPaintButton';
import { ABOUT_DECORATIONS } from '@/data/portfolio';
import { RESUME_HREF } from '@/data/site';
import { useCopy } from '@/i18n/useLanguage';
import { cn } from '@/lib/cn';
import type { Decoration } from '@/types/portfolio';

/** Hands the drift timing to CSS, where the keyframes pick it up. */
const driftStyle = (decoration: Decoration): CSSProperties =>
  ({
    '--drift-duration': `${decoration.driftDuration}s`,
    '--drift-delay': `${decoration.driftDelay}s`,
  }) as CSSProperties;

/**
 * The opening statement of the portfolio: four objects holding the corners of
 * the frame, a display heading, and a paragraph read into view one character
 * at a time.
 *
 * The entrance and the idle drift are deliberately on separate elements. The
 * wrapper does the one-shot reveal; the image underneath never stops moving.
 * Sharing one element would mean the reveal's final transform and the drift
 * fighting over the same property.
 */
export function AboutSection() {
  const copy = useCopy();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={cn(
        'relative flex min-h-screen flex-col items-center justify-center overflow-hidden',
        'px-5 py-20 sm:px-8 md:px-10',
      )}
    >
      {ABOUT_DECORATIONS.map((decoration) => (
        <FadeIn
          key={decoration.id}
          delay={decoration.delay}
          duration={0.9}
          x={decoration.from}
          y={0}
          className={cn('pointer-events-none absolute select-none', decoration.className)}
        >
          <img
            src={decoration.src}
            alt={decoration.alt}
            loading="lazy"
            style={driftStyle(decoration)}
            className="animate-drift w-full"
          />
        </FadeIn>
      ))}

      <div className="relative flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <SectionHeading>
            <span id="about-heading">{copy.about.heading}</span>
          </SectionHeading>

          <AnimatedText
            key={copy.about.text}
            text={copy.about.text}
            className={cn(
              'max-w-[560px] text-center font-kanit text-[clamp(1rem,2vw,1.35rem)] font-medium',
              'leading-relaxed text-mist',
            )}
          />
        </div>

        <WetPaintButton
          href={RESUME_HREF}
          label={copy.about.resumeCta}
          external
          ariaLabel={`${copy.about.resumeCta} (${copy.about.resumeHint})`}
        />
      </div>
    </section>
  );
}
