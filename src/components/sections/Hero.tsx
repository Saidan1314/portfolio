import { Award } from 'lucide-react';

import { HeroFacts } from '@/components/sections/HeroFacts';
import { GradientShimmer } from '@/components/ui/GradientShimmer';
import { MexicoFlag } from '@/components/ui/MexicoFlag';
import { SlideGlowLink } from '@/components/ui/SlideGlowLink';
import { WORK_HREF } from '@/data/site';
import { useCopy } from '@/i18n/useLanguage';
import { cn } from '@/lib/cn';
import { SHELL_INLINE_PADDING } from '@/lib/layout';
import { SHIMMER } from '@/lib/shimmer';

/**
 * The hero composition: tagline, display statement, quote, calls to action and
 * status line — centred on the stage and revealed bottom-up in 0.2s
 * increments, so the eye lands on the statement first and the rest after.
 */
export function Hero() {
  const copy = useCopy();

  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 items-center justify-center py-8 lg:py-10',
        SHELL_INLINE_PADDING,
      )}
    >
      <div className="flex w-full max-w-5xl flex-col items-center text-center">
        <p
          className={cn(
            'animate-fade-up mb-6 flex items-center justify-center gap-3 font-inter text-xs',
            'uppercase tracking-[0.3em] text-white/70 sm:text-sm lg:mb-8',
          )}
        >
          <MexicoFlag />
          {copy.hero.tagline}
        </p>

        {/*
          Set in the body face, not a compressed display one: the shimmer
          needs open counters and thin stems to read as light passing over
          the letters rather than a block of colour.

          One unbroken line, so the size answers to width as much as height —
          `min(9vw, 13vh)` holds the longer Spanish heading inside the gutters
          on a phone and inside one viewport on a 720p laptop.
        */}
        <h1
          className={cn(
            'animate-fade-up-delay-1 font-inter font-semibold leading-[1.1] tracking-tight',
            'whitespace-nowrap text-white text-[clamp(1.6rem,min(9vw,13vh),6rem)]',
          )}
        >
          {/* Keyed on the text so the shimmer re-measures when the language changes. */}
          <GradientShimmer key={copy.hero.heading} {...SHIMMER}>
            {copy.hero.heading}
          </GradientShimmer>
        </h1>

        <blockquote
          className={cn(
            'animate-fade-up-delay-2 mt-6 max-w-md font-inter text-sm leading-relaxed',
            'text-white/70 sm:text-base lg:mt-8',
          )}
        >
          <p>
            {copy.hero.quote.lead}
            <strong className="font-semibold text-white">{copy.hero.quote.emphasis}</strong>.
          </p>
          <cite className="mt-3 block text-xs uppercase not-italic tracking-widest text-white/40">
            &mdash; {copy.hero.quote.author}
          </cite>
        </blockquote>

        <div
          className={cn(
            'animate-fade-up-delay-3 mt-8 flex flex-wrap items-center justify-center gap-4',
            'sm:gap-6 lg:mt-10',
          )}
        >
          <SlideGlowLink href={WORK_HREF} label={copy.hero.workCta} />

          <div className="hidden items-center gap-3 sm:flex">
            <Award aria-hidden="true" className="h-8 w-8 shrink-0 text-white/50" />
            <p className="text-xs uppercase tracking-wider text-white/60">{copy.hero.badge}</p>
          </div>
        </div>

        <HeroFacts className="animate-fade-up-delay-4 mt-8 sm:mt-10 lg:mt-14" />
      </div>
    </div>
  );
}
