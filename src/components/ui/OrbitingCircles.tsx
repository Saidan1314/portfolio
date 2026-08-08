import type { CSSProperties } from 'react';

import { ParticleSphere } from '@/components/ui/ParticleSphere';
import { TECH_ORBITS } from '@/data/techStack';
import { cn } from '@/lib/cn';
import type { TechIcon, TechOrbit } from '@/types/portfolio';

const RING_BORDER = 'border border-[rgba(12,12,12,0.12)]';

const CHIP =
  'rounded-full border border-[rgba(12,12,12,0.12)] bg-white p-3 shadow-sm shadow-ink/5 sm:p-4';

/** Places the ring's centre on the bottom edge, so only its arc shows. */
const ANCHOR = 'absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2';

interface OrbitIconProps {
  readonly icon: TechIcon;
  readonly orbit: TechOrbit;
  readonly clockwise: boolean;
}

/**
 * One technology on a ring.
 *
 * The arm carries the chip around; the chip runs the mirrored animation at
 * the same duration, cancelling the rotation so the logo stays upright the
 * whole way round.
 */
function OrbitIcon({ icon, orbit, clockwise }: OrbitIconProps) {
  const armStyle = {
    '--start-angle': `${icon.angle}deg`,
    animation: `${clockwise ? 'orbit-cw' : 'orbit-ccw'} ${orbit.duration}s linear infinite`,
  } as CSSProperties;

  const chipStyle = {
    '--counter-offset': `${-icon.angle}deg`,
    animation: `${clockwise ? 'counter-cw' : 'counter-ccw'} ${orbit.duration}s linear infinite`,
  } as CSSProperties;

  return (
    <div
      style={armStyle}
      className="absolute left-1/2 top-0 -ml-8 flex h-1/2 origin-bottom flex-col items-center justify-start"
    >
      <div style={chipStyle} className={cn('relative z-10 -mt-8', CHIP)}>
        {icon.src ? (
          <img
            src={icon.src}
            alt={icon.label}
            width={32}
            height={32}
            loading="lazy"
            className="h-6 w-6 md:h-8 md:w-8"
          />
        ) : (
          <span
            aria-label={icon.label}
            role="img"
            className="flex h-6 w-6 items-center justify-center text-[10px] font-bold tracking-tight text-ink md:h-8 md:w-8 md:text-xs"
          >
            {icon.label}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * The stack as a rising orbit: a particle globe on the horizon with three
 * rings of tools turning above it, alternating direction so the layers read
 * as separate depths rather than one rigid diagram.
 */
export function OrbitingCircles() {
  return (
    <div className="relative flex h-[360px] w-full justify-center overflow-hidden sm:h-[440px] md:h-[640px]">
      <div
        className={cn(
          ANCHOR,
          'pointer-events-none z-10 aspect-square w-[210px] sm:w-[300px] md:w-[580px]',
        )}
      >
        <ParticleSphere />
      </div>

      {TECH_ORBITS.map((orbit, index) => {
        const clockwise = index % 2 === 0;

        return (
          <div key={orbit.id} className={cn(ANCHOR, 'rounded-full', RING_BORDER, orbit.size)}>
            {orbit.icons.map((icon) => (
              <OrbitIcon key={icon.id} icon={icon} orbit={orbit} clockwise={clockwise} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
