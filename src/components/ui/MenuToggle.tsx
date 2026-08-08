import { cn } from '@/lib/cn';

interface MenuToggleProps {
  readonly onClick: () => void;
  /** Id of the overlay this button controls. */
  readonly controls: string;
  readonly expanded: boolean;
  readonly label: string;
  readonly className?: string;
}

const BAR_BASE = 'h-0.5 bg-white transition-all duration-300 ease-cinematic';

/**
 * Hamburger button. Three bars of decreasing width; the short one stretches
 * to full width on hover so the control feels alive before it is pressed.
 */
export function MenuToggle({ onClick, controls, expanded, label, className }: MenuToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-controls={controls}
      aria-expanded={expanded}
      className={cn('group -mr-2 space-y-1.5 p-2', className)}
    >
      <span className={cn(BAR_BASE, 'block w-6')} />
      <span className={cn(BAR_BASE, 'block w-6')} />
      <span className={cn(BAR_BASE, 'block w-4 group-hover:w-6')} />
    </button>
  );
}
