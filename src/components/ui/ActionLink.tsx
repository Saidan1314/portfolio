import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/cn';

interface ActionLinkProps {
  /** Visible label — rendered uppercase. */
  readonly label: string;
  readonly href: string;
  readonly onClick?: () => void;
  readonly className?: string;
  readonly style?: CSSProperties;
}

/**
 * The outlined "get in touch" pill: an anchor with a trailing arrow that
 * lifts on hover. Used by the navbar and the mobile menu.
 *
 * The padding tightens below `lg`, where the header row has to hold the
 * wordmark, the nav links and this button on one line.
 */
export function ActionLink({ label, href, onClick, className, style }: ActionLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={style}
      className={cn(
        'group inline-flex items-center gap-2 whitespace-nowrap font-inter font-medium uppercase',
        'tracking-widest transition-colors duration-300 ease-cinematic',
        'border border-white/30 text-white hover:border-white/60 hover:bg-white/10',
        'px-4 py-3 text-[11px] lg:px-6 lg:text-xs',
        className,
      )}
    >
      {label}
      <ArrowUpRight
        aria-hidden="true"
        className={cn(
          'h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-cinematic',
          'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
        )}
      />
    </a>
  );
}
