import { HeroFactItem } from '@/components/ui/HeroFactItem';
import { useCopy } from '@/i18n/useLanguage';
import { cn } from '@/lib/cn';

interface HeroFactsProps {
  readonly className?: string;
}

/**
 * The line that closes the hero: where things stand right now. Wraps instead
 * of overflowing on narrow screens.
 */
export function HeroFacts({ className }: HeroFactsProps) {
  const copy = useCopy();

  return (
    <ul className={cn('flex flex-wrap justify-center gap-6 sm:gap-12 lg:gap-16', className)}>
      {copy.hero.facts.map((fact) => (
        <HeroFactItem key={fact.lead} fact={fact} />
      ))}
    </ul>
  );
}
