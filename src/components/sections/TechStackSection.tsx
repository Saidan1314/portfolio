import { FadeIn } from '@/components/motion/FadeIn';
import { OrbitingCircles } from '@/components/ui/OrbitingCircles';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TECH_TERMS } from '@/data/techStack';
import { useCopy } from '@/i18n/useLanguage';
import { cn } from '@/lib/cn';
import { emphasise } from '@/lib/emphasise';

/**
 * The white panel. Inverting the palette here is what makes the dark sections
 * on either side read as separate acts rather than one long scroll.
 *
 * The stack is stated twice over: once in prose, once as an orbit. The
 * paragraph is what a reader takes in; the orbit is what they remember.
 */
export function TechStackSection() {
  const copy = useCopy();

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className={cn(
        'relative overflow-hidden bg-white px-5 pt-20 text-ink sm:px-8 sm:pt-24 md:px-10 md:pt-32',
        'rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]',
      )}
    >
      <SectionHeading tone="ink" className="mb-10 sm:mb-12 md:mb-16">
        <span id="tech-stack-heading">{copy.techStack.heading}</span>
      </SectionHeading>

      <FadeIn
        as="p"
        className={cn(
          'mx-auto max-w-3xl text-center font-kanit text-[clamp(0.95rem,1.7vw,1.35rem)]',
          'font-light leading-relaxed text-ink/70',
        )}
      >
        {emphasise(copy.techStack.intro, TECH_TERMS)}
      </FadeIn>

      {/* Breaks the section gutters: the rings are wider than the column, and
          every pixel of frame is another mark kept in view. */}
      <FadeIn delay={0.1} className="-mx-5 mt-4 sm:-mx-8 sm:mt-8 md:-mx-10">
        <OrbitingCircles />
      </FadeIn>
    </section>
  );
}
