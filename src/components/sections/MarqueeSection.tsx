import { useEffect, useRef } from 'react';

import { REEL_PHOTOS, REEL_TOP_ROW_COUNT } from '@/data/portfolio';
import { useCopy } from '@/i18n/useLanguage';
import { cn } from '@/lib/cn';
import type { ReelPhoto } from '@/types/portfolio';

/** Every tile shares one height; width follows the photograph's own shape. */
const TILE_HEIGHT = 270;
const TILE_GAP = 12;

/** Bounds on tile width, so a panorama cannot dominate the row and a portrait
 *  cannot shrink to a sliver. Anything outside is cropped by `object-cover`. */
const MIN_TILE_WIDTH = 200;
const MAX_TILE_WIDTH = 560;

/** Scroll distance converted to reel travel. */
const SCROLL_RATIO = 0.3;
/** Head start so the rows are already in motion when the section appears. */
const LEAD_IN = 200;

/** Widest viewport a single pass must be able to cover without a seam. */
const WIDEST_SUPPORTED_VIEWPORT = 2560;

const TOP_ROW = REEL_PHOTOS.slice(0, REEL_TOP_ROW_COUNT);
const BOTTOM_ROW = REEL_PHOTOS.slice(REEL_TOP_ROW_COUNT);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** Rendered width of one tile, derived from the photograph's aspect ratio. */
const tileWidth = (photo: ReelPhoto): number =>
  clamp(Math.round((TILE_HEIGHT * photo.width) / photo.height), MIN_TILE_WIDTH, MAX_TILE_WIDTH);

/** Width of one un-repeated pass of a row, used to wrap the travel seamlessly. */
const passWidth = (photos: readonly ReelPhoto[]): number =>
  photos.reduce((total, photo) => total + tileWidth(photo) + TILE_GAP, 0);

/**
 * How many times a row repeats. The track has to stay at least one viewport
 * longer than a single pass, or wrapping would expose its end.
 */
const repeatCount = (photos: readonly ReelPhoto[]): number =>
  Math.max(3, Math.ceil(WIDEST_SUPPORTED_VIEWPORT / passWidth(photos)) + 2);

/** Positive modulo, so wrapping works for leftward travel too. */
const wrap = (value: number, span: number): number => ((value % span) + span) % span;

interface MarqueeRowProps {
  readonly photos: readonly ReelPhoto[];
  readonly rowRef: React.RefObject<HTMLDivElement | null>;
}

/** One row, repeated so a full pass can wrap without ever showing a seam. */
function MarqueeRow({ photos, rowRef }: MarqueeRowProps) {
  const copies = repeatCount(photos);

  return (
    <div ref={rowRef} className="flex w-max gap-3 will-change-transform">
      {Array.from({ length: copies }, (_, copy) =>
        photos.map((photo) => (
          <img
            key={`${photo.id}-${copy}`}
            src={photo.src}
            // Only the first pass is announced; the repeats are duplicates.
            alt={copy === 0 ? photo.alt : ''}
            aria-hidden={copy === 0 ? undefined : true}
            loading="lazy"
            decoding="async"
            width={tileWidth(photo)}
            height={TILE_HEIGHT}
            style={{ width: tileWidth(photo) }}
            className="h-[270px] shrink-0 rounded-2xl object-cover"
          />
        )),
      )}
    </div>
  );
}

/**
 * The closing reel: two rows of photographs driven by page scroll rather than
 * a timer, so the wall only moves while the visitor does. The top row travels
 * right, the bottom row left — the counter-motion reads as depth.
 */
export function MarqueeSection() {
  const copy = useCopy();
  const sectionRef = useRef<HTMLElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const render = (): void => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * SCROLL_RATIO;
      const travel = offset - LEAD_IN;

      if (topRowRef.current) {
        const span = passWidth(TOP_ROW);
        topRowRef.current.style.transform = `translateX(${wrap(travel, span) - span}px)`;
      }
      if (bottomRowRef.current) {
        const span = passWidth(BOTTOM_ROW);
        bottomRowRef.current.style.transform = `translateX(${-wrap(travel, span)}px)`;
      }
    };

    const schedule = (): void => {
      if (frame === 0) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label={copy.reel.label}
      className={cn(
        'relative overflow-hidden bg-ink pt-24 sm:pt-32 md:pt-40',
        // Deep enough that the next section's rounded lip lands on empty
        // black rather than clipping the bottom row of tiles.
        'pb-28 sm:pb-32 md:pb-40',
      )}
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow photos={TOP_ROW} rowRef={topRowRef} />
        <MarqueeRow photos={BOTTOM_ROW} rowRef={bottomRowRef} />
      </div>

      {/* The reel dissolves into black before the contact sheet arrives, so
          the two sections hand over rather than butt against each other. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink via-ink/80 to-transparent sm:h-40"
      />
    </section>
  );
}
