import { Suspense, lazy, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

const Spline = lazy(() => import('@splinetool/react-spline'));

/** How early to start fetching, as the section approaches the fold. */
const PRELOAD_MARGIN = '500px';

/** Holds the frame while the scene is still on its way. */
function ScenePlaceholder() {
  return <div aria-hidden="true" className="h-full w-full" />;
}

interface SplineSceneProps {
  /** URL of the exported `.splinecode` scene. */
  readonly scene: string;
  readonly className?: string;
}

/**
 * A Spline 3D scene, loaded late and only when it is worth loading.
 *
 * The runtime and the scene together are well over a megabyte, so neither is
 * fetched until the section is within a screen or so of the fold — a visitor
 * who never scrolls this far never pays for it. It is also skipped entirely
 * under `prefers-reduced-motion`: the scene turns and tracks the cursor
 * continuously, and the section reads perfectly well without it.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={cn('h-full w-full', className)}>
      {shouldLoad ? (
        <Suspense fallback={<ScenePlaceholder />}>
          <Spline scene={scene} className="!h-full !w-full" />
        </Suspense>
      ) : (
        <ScenePlaceholder />
      )}
    </div>
  );
}
