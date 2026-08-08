import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { HEADER_HEIGHT, SHELL_INLINE_PADDING } from '@/lib/layout';

interface HeaderBarProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * The top row shared by the navbar and the mobile menu.
 *
 * The fixed height matters twice over: the navbar's hamburger and the menu's
 * close icon are different sizes, so without it the wordmark would shift a
 * few pixels the moment the overlay opened — and the hero below reserves
 * exactly this much space to clear the fixed bar.
 */
export function HeaderBar({ children, className }: HeaderBarProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-between',
        HEADER_HEIGHT,
        SHELL_INLINE_PADDING,
        className,
      )}
    >
      {children}
    </div>
  );
}
