import { useEffect, useRef } from 'react';

import { cn } from '@/lib/cn';

const PARTICLE_COUNT = 900;
/** Golden angle — the spacing that keeps a Fibonacci sphere from banding. */
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const ROTATION_SPEED = 0.00018;
/** Tilt, so the poles never sit dead centre. */
const TILT = 0.42;
const PERSPECTIVE = 2.6;

interface Point {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

/** Evenly distributed points on a unit sphere. */
function fibonacciSphere(count: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * i;
    points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
  }
  return points;
}

interface ParticleSphereProps {
  /** CSS colour of the particles. */
  readonly color?: string;
  readonly className?: string;
}

/**
 * A slowly turning globe of points.
 *
 * Drawn on a canvas rather than as elements — nine hundred rotating DOM nodes
 * would cost a layout pass a frame. Depth is carried by size and opacity
 * alone: points on the far side shrink and fade, which reads as a sphere
 * without a single line being drawn.
 *
 * Stops when off screen, when the page is hidden, and under reduced motion.
 */
export function ParticleSphere({ color = '#0C0C0C', className }: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const points = fibonacciSphere(PARTICLE_COUNT);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let angle = 0;
    let lastTime = 0;
    let onScreen = true;

    const resize = (): void => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (): void => {
      const radius = Math.min(width, height) / 2;
      const cx = width / 2;
      const cy = height / 2;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);
      const sinTilt = Math.sin(TILT);
      const cosTilt = Math.cos(TILT);

      context.clearRect(0, 0, width, height);
      context.fillStyle = color;

      for (const point of points) {
        // Spin about Y, then tilt about X.
        const x1 = point.x * cos - point.z * sin;
        const z1 = point.x * sin + point.z * cos;
        const y2 = point.y * cosTilt - z1 * sinTilt;
        const z2 = point.y * sinTilt + z1 * cosTilt;

        const depth = PERSPECTIVE / (PERSPECTIVE - z2);
        const size = Math.max(0.35, depth * 1.15);
        context.globalAlpha = Math.max(0.06, (z2 + 1) / 2) * 0.85;
        context.beginPath();
        context.arc(cx + x1 * radius * depth, cy + y2 * radius * depth, size, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const tick = (time: number): void => {
      frame = requestAnimationFrame(tick);
      if (!onScreen || document.hidden) {
        lastTime = time;
        return;
      }
      const elapsed = lastTime === 0 ? 16 : time - lastTime;
      lastTime = time;
      angle += elapsed * ROTATION_SPEED;
      draw();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? true;
      },
      { rootMargin: '120px' },
    );
    intersectionObserver.observe(canvas);

    resize();
    draw();
    if (!reduced) frame = requestAnimationFrame(tick);

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [color]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('h-full w-full', className)} />;
}
