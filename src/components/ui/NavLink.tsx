import type { CSSProperties } from 'react';

import { cn } from '@/lib/cn';

interface NavLinkProps {
  readonly href: string;
  readonly label: string;
  readonly onClick?: () => void;
  readonly className?: string;
  readonly style?: CSSProperties;
}

/**
 * A navigation anchor. Presentation is passed in by the caller so the same
 * link can read as a small navbar item or a display-size menu entry.
 */
export function NavLink({ href, label, onClick, className, style }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={style}
      className={cn(
        'whitespace-nowrap uppercase transition-colors duration-300 ease-cinematic',
        className,
      )}
    >
      {label}
    </a>
  );
}
