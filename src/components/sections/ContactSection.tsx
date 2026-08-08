import { motion } from 'framer-motion';

import { SocialLinks } from '@/components/contact/SocialLinks';
import { SplineScene } from '@/components/ui/SplineScene';
import { CONTACT_SCENE_SRC } from '@/data/contact';
import { useCopy } from '@/i18n/useLanguage';
import { useTypewriter } from '@/hooks/useTypewriter';
import { cn } from '@/lib/cn';

/**
 * The closing act, and the target of every "Get in touch" on the page.
 *
 * Black, with a 3D scene behind the copy on desktop; below `lg` the scene
 * drops into a block of its own beneath the text.
 */
export function ContactSection() {
  const copy = useCopy();
  const { displayed } = useTypewriter(copy.contact.headlines);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={cn(
        'relative z-10 -mt-10 flex flex-col overflow-hidden bg-black font-inter text-white',
        'antialiased selection:bg-[#EAECE9] selection:text-[#1C2E1E]',
        'rounded-t-[40px] sm:-mt-12 sm:rounded-t-[50px] md:-mt-14 md:rounded-t-[60px]',
        // Both this and the reel above it are near-black, so the lip needs a
        // lit edge of its own or the seam between them disappears.
        'border-t border-white/10',
        'lg:block lg:min-h-screen',
      )}
    >
      {/*
        Wider than the section and anchored left, so the scene's centre — and
        the robot with it — lands right of the copy while the canvas still
        spans the full width. That span is what lets the robot track the
        cursor everywhere, not just over its own half.
      */}
      <div
        className={cn(
          'order-last w-full overflow-hidden lg:order-none',
          'relative aspect-square md:aspect-video',
          'lg:absolute lg:inset-y-0 lg:left-0 lg:z-0 lg:aspect-auto lg:w-[135%]',
        )}
      >
        <SplineScene scene={CONTACT_SCENE_SRC} />
      </div>

      {/*
        `pointer-events-none` so the cursor reaches the canvas underneath
        through the empty space around the copy — the links switch it back on
        for themselves.
      */}
      <div
        className={cn(
          'pointer-events-none relative z-10 order-first flex w-full flex-col pb-8',
          'lg:order-none lg:min-h-screen lg:pb-0',
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/*
              An `h2`, not an `h1`: the hero already owns the page's single
              first-level heading. The heading also carries a stable copy of
              its text — a screen reader should hear "Contact me!", not
              whatever fragment the typewriter happens to be mid-way through.
            */}
            <h2
              id="contact-heading"
              className={cn(
                'mb-8 w-full select-none whitespace-pre-wrap text-5xl font-normal leading-[1.08]',
                'tracking-tight text-white md:text-6xl lg:text-[76px]',
              )}
            >
              <span className="sr-only">{copy.contact.headlines[0]}</span>
              <span aria-hidden="true">
                {displayed}
                <span className="animate-blink ml-[2px] inline-block h-[1.1em] w-[2px] bg-white align-middle" />
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="mb-14 max-w-2xl text-lg font-normal leading-relaxed text-neutral-400 md:text-xl">
              {copy.contact.description.lead}
              <br />
              {copy.contact.description.trail}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-6 text-2xl font-medium tracking-tight">{copy.contact.socialHeading}</h3>
            <SocialLinks />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
