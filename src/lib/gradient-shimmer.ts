/**
 * Palettes, curves and the band builder behind `<GradientShimmer>`.
 *
 * Kept apart from the component so that file exports components and nothing
 * else — which is what keeps fast refresh working — and so the pure pieces
 * here stay DOM-free and unit-testable.
 */

/** A single stop in the highlight band, positioned 0..1 across the sweep. */
export interface GradientStop {
  readonly position: number;
  readonly color: string;
}

export type GradientPresetName =
  | 'sunrise'
  | 'bubble'
  | 'peach'
  | 'tonic'
  | 'mint'
  | 'spring'
  | 'twilight'
  | 'bay';

/** Either an explicit multi-stop gradient or a built-in preset name. */
export type GradientInput = readonly GradientStop[] | GradientPresetName;

/** Named easing presets for the sweep (no raw cubic-bezier in the public API). */
export type EasingPreset = 'smooth' | 'gentle' | 'snappy';

/**
 * Built-in gradients. Rich multi-stop palettes — the multi-stop band is the
 * whole point, so two-colour presets would sell it short. Raw colours so they
 * read true regardless of theme.
 */
export const gradientPresets: Record<GradientPresetName, readonly GradientStop[]> = {
  sunrise: [
    { color: '#B6D3EF', position: 0 },
    { color: '#CAD1D7', position: 0.153 },
    { color: '#D7CFC8', position: 0.252 },
    { color: '#E1CDB9', position: 0.341 },
    { color: '#EAC6A5', position: 0.424 },
    { color: '#EDB185', position: 0.505 },
    { color: '#EF9B62', position: 0.586 },
    { color: '#F18F60', position: 0.669 },
    { color: '#F48D7A', position: 0.758 },
    { color: '#F78A94', position: 0.857 },
    { color: '#F888A0', position: 1 },
  ],
  bubble: [
    { color: '#F5EBD9', position: 0 },
    { color: '#F2D4DB', position: 0.31 },
    { color: '#EBBDDE', position: 0.5 },
    { color: '#CCBAE3', position: 0.65 },
    { color: '#8CBFF0', position: 0.82 },
    { color: '#78B0FF', position: 1 },
  ],
  peach: [
    { color: '#D9F5FA', position: 0 },
    { color: '#FCD9D6', position: 0.31 },
    { color: '#FCBAC9', position: 0.61 },
    { color: '#F0B3F5', position: 1 },
  ],
  tonic: [
    { color: '#E3EDF0', position: 0 },
    { color: '#E8EBB8', position: 0.27 },
    { color: '#F0DEA3', position: 0.43 },
    { color: '#E8B078', position: 0.75 },
    { color: '#F29682', position: 1 },
  ],
  mint: [
    { color: '#DECEE8', position: 0 },
    { color: '#CBBAEE', position: 0.21 },
    { color: '#7DC0FB', position: 0.46 },
    { color: '#00C7A6', position: 1 },
  ],
  spring: [
    { color: '#F7D5C5', position: 0.07 },
    { color: '#46A8C0', position: 0.58 },
    { color: '#43AE7D', position: 1 },
  ],
  twilight: [
    { color: '#E3CCE6', position: 0 },
    { color: '#4E8CD5', position: 0.35 },
    { color: '#6068C2', position: 0.64 },
    { color: '#38364E', position: 1 },
  ],
  bay: [
    { color: '#DBE3D0', position: 0 },
    { color: '#8DB8A7', position: 0.23 },
    { color: '#2D8E9A', position: 0.42 },
    { color: '#076492', position: 0.59 },
    { color: '#154288', position: 0.79 },
    { color: '#262C81', position: 1 },
  ],
};

/** Named easing presets mapped to their cubic-bezier curves. */
export const easingPresets: Record<EasingPreset, string> = {
  // Balanced ease-in-out: dwells off-text at the ends, accelerates across glyphs.
  smooth: 'cubic-bezier(0.45, 0, 0.55, 1)',
  // Softer, longer dwell at the ends.
  gentle: 'cubic-bezier(0.76, 0, 0.24, 1)',
  // Quicker pass across the text.
  snappy: 'cubic-bezier(0.3, 0, 0.2, 1)',
};

/** Saturated core half-width as a fraction of `--gs-spread-mid`. */
const BAND_CORE_RATIO = 0.44;

/**
 * Build the CSS `background-image` for the moving highlight band.
 *
 * Every stop is distributed across the saturated core
 * `[-spread_mid*0.44 .. +spread_mid*0.44]`, then fades out to the base text
 * colour through a soft mix at `±spread_mid` and the plain base at `±spread`.
 * The band reads the runtime CSS variables `--gs-base`, `--gs-spread` and
 * `--gs-spread-mid` (set by the component after measuring), so it scales with
 * font size. Pure and DOM-free.
 */
export function buildBandGradient(stops: readonly GradientStop[], angle: number): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const first = sorted[0]?.color ?? 'white';
  const last = sorted[sorted.length - 1]?.color ?? 'white';

  const core = sorted
    .map((stop) => {
      const factor = (stop.position - 0.5) * 2 * BAND_CORE_RATIO;
      return `${stop.color} calc(50% + var(--gs-spread-mid) * ${factor.toFixed(4)})`;
    })
    .join(', ');

  return [
    `linear-gradient(${angle}deg`,
    `var(--gs-base) calc(50% - var(--gs-spread))`,
    `color-mix(in oklab, var(--gs-base) 42%, ${first}) calc(50% - var(--gs-spread-mid))`,
    core,
    `color-mix(in oklab, var(--gs-base) 42%, ${last}) calc(50% + var(--gs-spread-mid))`,
    `var(--gs-base) calc(50% + var(--gs-spread)))`,
  ].join(', ');
}

/** True when `background-clip: text` is usable (prefixed or not). */
export function supportsBackgroundClipText(): boolean {
  if (typeof window === 'undefined') return true;
  if (typeof window.CSS?.supports !== 'function') return false;
  return (
    window.CSS.supports('background-clip', 'text') ||
    window.CSS.supports('-webkit-background-clip', 'text')
  );
}

/** True when the user asked for reduced motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

interface GateOptions {
  readonly pauseOnScroll: boolean;
  readonly pauseWhenOffscreen: boolean;
}

const VIEWPORT_ROOT_MARGIN = '160px';
const SCROLL_IDLE_MS = 120;

/**
 * Wire viewport, page-visibility and scroll-idle gates to `onChange(active)`.
 * `active` = on-screen (or that gate disabled) AND the page is visible AND
 * nothing is scrolling (or that gate disabled). Returns a cleanup.
 */
export function observeShimmerActive(
  el: Element,
  { pauseOnScroll, pauseWhenOffscreen }: GateOptions,
  onChange: (active: boolean) => void,
): () => void {
  if (typeof window === 'undefined') return () => undefined;

  let inViewport = !pauseWhenOffscreen || typeof IntersectionObserver === 'undefined';
  let pageVisible = typeof document === 'undefined' ? true : !document.hidden;
  let notScrolling = true;
  const compute = (): void => onChange(inViewport && pageVisible && notScrolling);

  let io: IntersectionObserver | undefined;
  if (pauseWhenOffscreen && typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        inViewport = entry.isIntersecting;
        compute();
      },
      { rootMargin: VIEWPORT_ROOT_MARGIN },
    );
    io.observe(el);
  }

  const onVisibility = (): void => {
    pageVisible = !document.hidden;
    compute();
  };
  document.addEventListener('visibilitychange', onVisibility);

  let scrollTimer: ReturnType<typeof setTimeout> | undefined;
  const onScroll = (): void => {
    notScrolling = false;
    compute();
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      notScrolling = true;
      compute();
    }, SCROLL_IDLE_MS);
  };
  const scrollOpts = { passive: true, capture: true } as const;
  if (pauseOnScroll) window.addEventListener('scroll', onScroll, scrollOpts);

  compute();

  return () => {
    io?.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    if (pauseOnScroll) window.removeEventListener('scroll', onScroll, { capture: true });
    clearTimeout(scrollTimer);
  };
}
