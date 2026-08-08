import { cn } from '@/lib/cn';

/** GitHub's mark, drawn here because `lucide-react` v1 carries no brand icons. */
const GITHUB_PATH =
  'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12';

const SHELL = cn(
  'btn-rainbow group relative inline-flex h-11 items-center justify-center gap-2 rounded-md',
  'whitespace-nowrap px-4 font-kanit text-sm font-medium text-white',
  'transition-transform duration-200',
);

interface RepoButtonProps {
  /** The repository URL. Empty renders the button inert. */
  readonly href: string;
  readonly label: string;
  /** Names the project this button belongs to, for assistive tech. */
  readonly describedProject: string;
  readonly className?: string;
}

/**
 * Link to a project's repository, wrapped in a travelling rainbow rim.
 *
 * Every card wears the same button whether or not its repository exists yet,
 * so the deck looks finished while it is still being filled in. What the URL
 * changes is only what the element *is*: with one it is an anchor that lifts
 * on hover; without, a plain span, dimmed and inert. A link to nowhere is a
 * trap for anyone on a keyboard or a screen reader, so the empty state simply
 * is not a link.
 */
export function RepoButton({
  href,
  label,
  describedProject,
  className,
}: RepoButtonProps) {
  const icon = (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0">
      <path d={GITHUB_PATH} />
    </svg>
  );

  const content = (
    <>
      {icon}
      {label}
    </>
  );

  if (!href) {
    return (
      <span aria-hidden="true" className={cn(SHELL, 'opacity-45', className)}>
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${describedProject}`}
      className={cn(SHELL, 'hover:scale-105 active:scale-95', className)}
    >
      {content}
    </a>
  );
}
