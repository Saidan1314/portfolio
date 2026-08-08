/** The two languages the site is written in. */
export type Locale = 'en' | 'es';

export const LOCALES: readonly Locale[] = ['en', 'es'] as const;

/** A string that exists in both languages. Used for content that lives in `data/`. */
export type Localized = Readonly<Record<Locale, string>>;

/** A two-part statement in the hero's closing row. */
export interface FactCopy {
  readonly lead: string;
  readonly trail: string;
}

/**
 * Every piece of fixed copy on the page.
 *
 * Content that is really data — project entries, social handles, image paths —
 * stays in `src/data/`; only what the page says about itself lives here, so a
 * new project never means editing a dictionary.
 */
export interface Copy {
  readonly meta: {
    readonly description: string;
  };
  readonly nav: {
    readonly about: string;
    readonly techStack: string;
    readonly projects: string;
    readonly contact: string;
    readonly primaryLabel: string;
    readonly mobileLabel: string;
    readonly menuLabel: string;
    readonly openMenu: string;
    readonly closeMenu: string;
  };
  readonly hero: {
    readonly tagline: string;
    readonly heading: string;
    readonly quote: {
      readonly lead: string;
      readonly emphasis: string;
      readonly author: string;
    };
    readonly workCta: string;
    readonly badge: string;
    readonly facts: readonly FactCopy[];
  };
  readonly about: {
    readonly heading: string;
    readonly text: string;
    readonly resumeCta: string;
    /** Spells out that the résumé is a PDF opening in a new tab. */
    readonly resumeHint: string;
  };
  readonly techStack: {
    readonly heading: string;
    readonly intro: string;
  };
  readonly projects: {
    readonly heading: string;
    readonly imageSlot: string;
    readonly repoCta: string;
  };
  readonly reel: {
    readonly label: string;
  };
  readonly contact: {
    readonly headlines: readonly string[];
    readonly description: {
      readonly lead: string;
      readonly trail: string;
    };
    readonly socialHeading: string;
  };
  readonly language: {
    readonly label: string;
    readonly en: string;
    readonly es: string;
  };
}
