import { cn } from '@/lib/cn';

interface MexicoFlagProps {
  readonly className?: string;
}

/**
 * The flag of Mexico.
 *
 * A raster, not the hand-drawn triband this used to be: green-white-red on
 * its own is the flag of Italy, and what tells the two apart is the coat of
 * arms in the middle. That eagle is far too intricate to fake, so this is the
 * real thing — the public-domain artwork from Wikimedia Commons, at four
 * times its rendered size so it stays crisp on a retina display.
 */
export function MexicoFlag({ className }: MexicoFlagProps) {
  return (
    <img
      src="/decor/flag-mexico.png"
      alt="Mexico"
      width={250}
      height={143}
      className={cn('h-4 w-7 shrink-0 rounded-[2px] object-cover ring-1 ring-white/20', className)}
    />
  );
}
