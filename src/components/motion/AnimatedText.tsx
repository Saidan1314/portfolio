import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Fragment, useRef } from 'react';

interface CharacterProps {
  readonly char: string;
  readonly progress: MotionValue<number>;
  readonly range: [number, number];
}

/**
 * One glyph. A transparent copy holds the space in normal flow — so line
 * breaking, kerning and selection behave exactly as they would without the
 * animation — while an absolutely positioned twin does the fading.
 */
function Character({ char, progress, range }: CharacterProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
}

interface AnimatedTextProps {
  readonly text: string;
  readonly className?: string;
}

/**
 * Scroll-driven read-along: each character lifts from 20% to full opacity as
 * the paragraph travels through the viewport, so the sentence appears to be
 * read rather than merely displayed.
 *
 * Characters are grouped per word, keeping words unbreakable while the
 * paragraph still wraps normally.
 *
 * The split-up glyphs are hidden from assistive tech — transparent text is
 * dropped from the accessibility tree anyway, and a per-character reading
 * would be unusable — so the sentence is also carried once, intact, in a
 * visually hidden copy.
 */
export function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });

  const words = text.split(' ');
  const total = text.length;
  let cursor = 0;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          const start = cursor;
          // +1 for the space that follows the word in the original string.
          cursor += word.length + 1;

          return (
            <Fragment key={`${word}-${start}`}>
              <span className="inline-block">
                {[...word].map((char, charIndex) => (
                  <Character
                    key={`${char}-${charIndex}`}
                    char={char}
                    progress={scrollYProgress}
                    range={[(start + charIndex) / total, (start + charIndex + 1) / total]}
                  />
                ))}
              </span>
              {wordIndex < words.length - 1 ? ' ' : null}
            </Fragment>
          );
        })}
      </span>
    </p>
  );
}
