import { ProjectCard } from '@/components/sections/ProjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECTS } from '@/data/portfolio';
import { useCopy } from '@/i18n/useLanguage';
import { cn } from '@/lib/cn';

/**
 * The project deck. Pulled up over the white panel above it so the rounded
 * corners cut into it, which is what sells the two as stacked sheets rather
 * than adjacent blocks.
 */
export function ProjectsSection() {
  const copy = useCopy();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={cn(
        'relative z-10 -mt-10 bg-ink px-5 pb-20 pt-20 sm:-mt-12 sm:px-8 md:-mt-14 md:px-10',
        'rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]',
      )}
    >
      <SectionHeading className="mb-16 sm:mb-20 md:mb-28">
        <span id="projects-heading">{copy.projects.heading}</span>
      </SectionHeading>

      <div className="mx-auto max-w-6xl">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
}
