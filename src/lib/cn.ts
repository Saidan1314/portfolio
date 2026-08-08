type ClassValue = string | false | null | undefined;

/**
 * Joins conditional class names into a single string.
 * Keeps Tailwind utility composition readable without a runtime dependency.
 */
export function cn(...values: readonly ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
