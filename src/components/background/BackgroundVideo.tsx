import { useEffect, useRef } from 'react';

interface BackgroundVideoProps {
  readonly src: string;
}

/**
 * Fullscreen looping footage behind the hero.
 *
 * The video is decorative: it carries no information, so it is hidden from
 * assistive tech and taken out of the tab order. Two gradient scrims sit on
 * top — a left-to-right wash that anchors the left-aligned copy, and a bottom
 * fade that grounds the stats row — keeping text contrast readable no matter
 * which frame is on screen.
 */
export function BackgroundVideo({ src }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Browsers defer autoplay on pages that are backgrounded or not painting,
  // and never retry once the page comes forward. Nudge it when it does.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const start = (): void => {
      if (video.paused) void video.play().catch(() => undefined);
    };

    start();
    document.addEventListener('visibilitychange', start);

    return () => {
      document.removeEventListener('visibilitychange', start);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-0 overflow-hidden bg-neutral-950">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40"
      />
    </div>
  );
}
