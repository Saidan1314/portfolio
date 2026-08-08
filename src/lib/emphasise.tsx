import { Fragment, type ReactNode } from 'react';

const REGEXP_SPECIALS = /[.*+?^${}()|[\]\\]/g;

const escapeForRegExp = (value: string): string => value.replace(REGEXP_SPECIALS, '\\$&');

/**
 * Sets the given terms in bold inside a sentence.
 *
 * Terms are matched longest-first, which is what stops "Git" from claiming
 * the opening of "GitHub". Escaping matters too — "C++" is a valid regular
 * expression that matches nothing like itself.
 */
export function emphasise(text: string, terms: readonly string[]): ReactNode[] {
  if (terms.length === 0) return [text];

  const ordered = [...terms].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${ordered.map(escapeForRegExp).join('|')})`, 'g');
  const lookup = new Set(terms);

  return text.split(pattern).map((part, index) =>
    lookup.has(part) ? (
      <strong key={`${part}-${index}`} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <Fragment key={`t-${index}`}>{part}</Fragment>
    ),
  );
}
