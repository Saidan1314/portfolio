import { cn } from '@/lib/cn';

interface SlideGlowLinkProps {
  readonly href: string;
  readonly label: string;
  readonly className?: string;
}

/**
 * An outlined label that fills with light, left to right, on hover.
 *
 * Rendered as an anchor, not the button the source used: this navigates, and
 * a `<button>` would cost middle-click and "open in new tab". The finish
 * lives in the `.slide-glow` component class — the effect needs two stacked
 * copies of the same text and a clip that animates, which utilities cannot
 * express.
 *
 * The duplicate is hidden from assistive tech so the label is announced once.
 */
export function SlideGlowLink({ href, label, className }: SlideGlowLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'slide-glow font-inter text-2xl font-bold uppercase tracking-[0.2em] sm:text-3xl',
        className,
      )}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="slide-glow__fill">
        {label}
      </span>
    </a>
  );
}
