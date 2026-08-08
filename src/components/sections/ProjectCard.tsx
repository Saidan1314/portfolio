import { motion, useScroll, useTransform } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { useRef } from 'react';

import { RepoButton } from '@/components/ui/RepoButton';
import { useCopy, usePick } from '@/i18n/useLanguage';
import { cn } from '@/lib/cn';
import type { Project } from '@/types/portfolio';

/** How much each card behind the front one shrinks. */
const SCALE_STEP = 0.03;

/** Vertical peek left by each card in the stack, in pixels. */
const STACK_OFFSET = 28;

/** Shared radius of the card and of the frame inside it. */
const CARD_RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

/**
 * The frame the project image sits in.
 *
 * With no image yet it still holds its ground — an outlined, labelled slot
 * rather than a collapsed row, so the card reads as waiting for artwork
 * instead of broken.
 */
function ProjectImage({ project, label, alt }: { readonly project: Project; readonly label: string; readonly alt: string }) {
  const frame = 'h-[clamp(200px,min(38vw,43vh),560px)] w-full';

  if (!project.image) {
    return (
      <div
        className={cn(
          frame,
          CARD_RADIUS,
          'flex flex-col items-center justify-center gap-3',
          'border border-dashed border-mist/25 bg-mist/[0.03] text-mist/40',
        )}
      >
        <ImageIcon aria-hidden="true" className="h-7 w-7" />
        <span className="font-kanit text-xs uppercase tracking-widest">{label}</span>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={alt}
      loading="lazy"
      className={cn(frame, 'object-cover', CARD_RADIUS)}
    />
  );
}

interface ProjectCardProps {
  readonly project: Project;
  readonly index: number;
  readonly total: number;
}

/**
 * One card of the stacking deck.
 *
 * The wrapper is sticky, so each card parks below the navbar while the next
 * one climbs over it; meanwhile the card itself scales down toward the depth
 * its position in the stack calls for. Scaling from the top edge keeps the
 * shrinking card visually anchored under the one arriving.
 */
export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const copy = useCopy();
  const pick = usePick();
  const name = pick(project.name);
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (total - 1 - index) * SCALE_STEP;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    // Below `sm` the deck unstacks: a pinned card that is taller than a phone
    // viewport can never be seen whole, so the cards simply flow there.
    <div
      ref={container}
      className="relative mb-8 sm:sticky sm:top-24 sm:mb-0 sm:h-[85vh] md:top-32"
    >
      <motion.article
        style={{ scale, top: index * STACK_OFFSET, transformOrigin: 'top' }}
        className={cn(
          'relative border-2 border-mist bg-ink p-4 will-change-transform sm:p-6 md:p-8',
          CARD_RADIUS,
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="flex items-center gap-4 sm:gap-6">
            {/*
              A pinned card has to fit between the navbar and the fold, so
              every fluid size here answers to viewport height as well as
              width — see the image frame above.
            */}
            <span
              aria-hidden="true"
              className="hero-heading font-kanit text-[clamp(2.5rem,min(10vw,11vh),140px)] font-black leading-none"
            >
              {project.number}
            </span>

            <div className="flex flex-col gap-1">
              <p className="font-kanit text-[10px] uppercase tracking-widest text-mist/50 sm:text-xs">
                {pick(project.category)}
              </p>
              <h3 className="font-kanit text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight text-mist">
                {name}
              </h3>
            </div>
          </div>

          <RepoButton href={project.href} label={copy.projects.repoCta} describedProject={name} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-[2fr_3fr] sm:gap-6">
          <p
            className={cn(
              'font-kanit text-[clamp(0.85rem,1.5vw,1.05rem)] font-light leading-relaxed',
              'text-mist/60',
            )}
          >
            {pick(project.description)}
          </p>

          <ProjectImage project={project} label={copy.projects.imageSlot} alt={`${name} — ${copy.projects.imageSlot}`} />
        </div>
      </motion.article>
    </div>
  );
}
