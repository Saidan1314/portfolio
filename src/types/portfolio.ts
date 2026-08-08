import type { Localized } from '@/i18n/types';

/** A decorative 3D render pinned to a corner of the about section. */
export interface Decoration {
  readonly id: string;
  readonly src: string;
  /** Empty string when the image is purely decorative. */
  readonly alt: string;
  /** Positioning + sizing utilities for this corner. */
  readonly className: string;
  readonly delay: number;
  /** Horizontal travel of the entrance, in pixels. */
  readonly from: number;
  /** Seconds for one idle drift cycle. Vary these so no two objects sync up. */
  readonly driftDuration: number;
  /** Offset into the drift cycle, in seconds. */
  readonly driftDelay: number;
}

/** One technology riding an orbit. */
export interface TechIcon {
  readonly id: string;
  readonly label: string;
  /** Omitted when the entry has no mark; the label is set as text instead. */
  readonly src?: string;
  /** Starting position on the ring, in degrees clockwise from the top. */
  readonly angle: number;
}

/** A ring of technologies turning at its own pace. */
export interface TechOrbit {
  readonly id: string;
  /** Diameter utilities for the ring. */
  readonly size: string;
  /** Seconds for one full revolution. */
  readonly duration: number;
  readonly icons: readonly TechIcon[];
}

/** A photograph in the closing reel. */
export interface ReelPhoto {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  /**
   * Dimensions **as displayed**, i.e. after the browser has applied any EXIF
   * rotation. The tile widths are derived from these, so a sideways-stored
   * photo has to report the shape it will actually take on screen.
   */
  readonly width: number;
  readonly height: number;
}

/**
 * A project card in the stacking deck.
 *
 * `href` and `image` are empty strings until the project is real: an empty
 * `href` renders the pill as inert rather than as a link to nowhere, and an
 * empty `image` renders the frame as a waiting slot. Both are deliberate
 * template states, not missing data.
 */
export interface Project {
  readonly id: string;
  /** Shown large at the left of the card. Any string; "01", "02" … by convention. */
  readonly number: string;
  /** Small label above the title — the kind of work, the client, the status. */
  readonly category: Localized;
  readonly name: Localized;
  /** Body copy for the narrow column. */
  readonly description: Localized;
  /** Path under `public/`, e.g. `/projects/my-project.webp`. Empty for none. */
  readonly image: string;
  /** The project's repository URL. Empty to render the button inert. */
  readonly href: string;
}
