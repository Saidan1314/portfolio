import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
} from 'react';

import {
  buildBandGradient,
  easingPresets,
  gradientPresets,
  observeShimmerActive,
  prefersReducedMotion,
  supportsBackgroundClipText,
  type EasingPreset,
  type GradientInput,
  type GradientStop,
} from '@/lib/gradient-shimmer';

const FALLBACK_TEXT_WIDTH_PX = 96;
const MAX_SPREAD_PX = 48;
const SPREAD_MID_RATIO = 0.72;
/** Font size the spread-per-character default is tuned for. */
const BASE_FONT_PX = 14;
const DEFAULT_DURATION_SECONDS = 1.45;
const DEFAULT_SPREAD = 3;
const DEFAULT_ANGLE = 105;

export interface GradientShimmerProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** The text to shimmer. Plain string only — the gradient sweeps over it. */
  readonly children: string;
  /** Multi-stop gradient or a preset name. Defaults to `"sunrise"`. */
  readonly gradient?: GradientInput;
  /** Sweep curve. Defaults to `"smooth"`. */
  readonly easing?: EasingPreset;
  /** Sweep time in seconds, independent of text width. Defaults to `1.45`. */
  readonly duration?: number;
  /** Highlight band width in px per character; scales with font size. */
  readonly spread?: number;
  /** Gradient angle in degrees. Defaults to `105`. */
  readonly angle?: number;
  /** Idle gap (ms) after each sweep before the next one. */
  readonly pauseBetween?: number;
  /** Base text colour the band fades into. Defaults to `"currentColor"`. */
  readonly baseColor?: string;
  /** Pause the sweep while the page is scrolling. */
  readonly pauseOnScroll?: boolean;
  /** Pause while outside the viewport. */
  readonly pauseWhenOffscreen?: boolean;
  /** Render a static gradient under `prefers-reduced-motion`. */
  readonly respectReducedMotion?: boolean;
  /** Element to render. Defaults to `"span"`. */
  readonly as?: ElementType;
}

function resolveStops(gradient: GradientInput | undefined): readonly GradientStop[] {
  if (!gradient) return gradientPresets.sunrise;
  if (typeof gradient === 'string') return gradientPresets[gradient] ?? gradientPresets.sunrise;
  return gradient;
}

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}

function revealNormalText(el: HTMLElement): void {
  el.style.removeProperty('background-image');
  el.style.removeProperty('-webkit-text-fill-color');
}

/**
 * Text with a multi-stop gradient highlight sweeping across it.
 *
 * The band is clipped to the glyphs and driven by the Web Animations API, so
 * it costs nothing on the main thread between sweeps and stops entirely while
 * the text is off screen, the page is hidden, or the visitor is scrolling.
 * Where `background-clip: text` is unsupported the gradient is stripped and
 * the text simply renders in its own colour.
 */
export function GradientShimmer({
  children,
  gradient,
  easing = 'smooth',
  duration = DEFAULT_DURATION_SECONDS,
  spread = DEFAULT_SPREAD,
  angle = DEFAULT_ANGLE,
  pauseBetween = 1000,
  baseColor = 'currentColor',
  pauseOnScroll = true,
  pauseWhenOffscreen = true,
  respectReducedMotion = true,
  as = 'span',
  className,
  style,
  ...restProps
}: GradientShimmerProps) {
  const ref = useRef<HTMLElement | null>(null);

  const safeDuration = Math.max(0.001, finiteOr(duration, DEFAULT_DURATION_SECONDS));
  const safeSpread = Math.max(0, finiteOr(spread, DEFAULT_SPREAD));
  const safeAngle = finiteOr(angle, DEFAULT_ANGLE);

  const stops = useMemo(() => resolveStops(gradient), [gradient]);
  const backgroundImage = useMemo(() => buildBandGradient(stops, safeAngle), [stops, safeAngle]);
  const easingValue = easingPresets[easing] ?? easingPresets.smooth;

  // Seed so the very first paint has a valid band, before the font is measured.
  const initialSpread = Math.min(children.length * safeSpread, MAX_SPREAD_PX);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const textWidth = el.getBoundingClientRect().width || FALLBACK_TEXT_WIDTH_PX;
      const fontSize = Number.parseFloat(getComputedStyle(el).fontSize) || BASE_FONT_PX;
      const fontScale = fontSize / BASE_FONT_PX;
      const spreadPx = Math.min(
        children.length * safeSpread * fontScale,
        MAX_SPREAD_PX * fontScale,
      );
      const layerWidth = Math.max(1, textWidth + spreadPx * 2);

      el.style.setProperty('--gs-spread', `${spreadPx}px`);
      el.style.setProperty('--gs-spread-mid', `${spreadPx * SPREAD_MID_RATIO}px`);
      el.style.backgroundSize = `${layerWidth}px 100%`;

      return {
        start: -spreadPx - layerWidth / 2,
        end: textWidth + spreadPx - layerWidth / 2,
        durationMs: safeDuration * 1000,
      };
    };

    // Without `background-clip: text` the transparent fill would hide the text
    // entirely. Strip it and skip the sweep — there is nothing to clip to.
    if (!supportsBackgroundClipText()) {
      revealNormalText(el);
      return;
    }

    measure();

    if (respectReducedMotion && prefersReducedMotion()) return;
    if (typeof el.animate !== 'function') return;

    let anim: Animation | null = null;
    let pauseTimer: ReturnType<typeof setTimeout> | undefined;
    let active = true;
    let cancelled = false;

    const runSweep = (): void => {
      if (cancelled) return;
      const { start, end, durationMs } = measure();
      const next = el.animate(
        [
          { backgroundPosition: `${start}px center` },
          { backgroundPosition: `${end}px center` },
        ],
        { duration: durationMs, easing: easingValue, fill: 'forwards' },
      );
      if (!active) next.pause();
      // Cancel the finished sweep only once the next has taken over the
      // property, or `fill: forwards` animations pile up across cycles.
      anim?.cancel();
      anim = next;
      next.onfinish = () => {
        pauseTimer = setTimeout(runSweep, Math.max(0, pauseBetween));
      };
    };

    const stopVisibility = observeShimmerActive(
      el,
      { pauseOnScroll, pauseWhenOffscreen },
      (next) => {
        active = next;
        if (!anim) return;
        if (active) anim.play();
        else anim.pause();
      },
    );

    /**
     * Start over from the current measurements.
     *
     * The band's width is derived from the rendered text, so anything that
     * changes that text's size invalidates the sweep in flight: the display
     * face arriving after first paint, or a fluid `clamp()` re-resolving on
     * resize. Without this the band keeps the size it was born with — on a
     * heading that grew from its 1.75rem floor to 7rem, a sliver.
     */
    const restart = (): void => {
      if (cancelled) return;
      clearTimeout(pauseTimer);
      runSweep();
    };

    void document.fonts?.ready.then(restart).catch(() => undefined);

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(restart);
    resizeObserver?.observe(el);

    runSweep();

    return () => {
      cancelled = true;
      anim?.cancel();
      clearTimeout(pauseTimer);
      resizeObserver?.disconnect();
      stopVisibility();
    };
  }, [
    children,
    safeSpread,
    safeDuration,
    easingValue,
    pauseBetween,
    pauseOnScroll,
    pauseWhenOffscreen,
    respectReducedMotion,
  ]);

  const mergedStyle = {
    position: 'relative',
    display: 'inline-block',
    // `background-clip: text` can only paint inside the element's own box, so
    // on a tight line-height the tails of g, y and p fall outside it and are
    // simply not drawn. The padding grows the paint area; the negative margin
    // takes the space straight back, leaving layout untouched.
    paddingBottom: '0.2em',
    marginBottom: '-0.2em',
    backgroundImage,
    backgroundRepeat: 'no-repeat',
    // First paint spans the full text as a static gradient; the effect swaps
    // in the measured layer width and starts sweeping.
    backgroundSize: '100% 100%',
    backgroundColor: 'var(--gs-base)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    // Reveal through text-fill-color rather than `color: transparent`, so
    // `currentColor` in `--gs-base` still resolves to the real text colour.
    WebkitTextFillColor: 'transparent',
    '--gs-base': baseColor,
    '--gs-spread': `${initialSpread}px`,
    '--gs-spread-mid': `${initialSpread * SPREAD_MID_RATIO}px`,
    ...style,
  } as CSSProperties;

  return createElement(as, { ...restProps, ref, className, style: mergedStyle }, children);
}
