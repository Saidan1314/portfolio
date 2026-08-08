import { useEffect, useState } from 'react';

interface TypewriterOptions {
  /** Milliseconds between keystrokes while typing. */
  readonly speed?: number;
  /** Milliseconds between keystrokes while erasing — always faster. */
  readonly deleteSpeed?: number;
  /** Pause before the first character appears. */
  readonly startDelay?: number;
  /** How long a finished phrase stays on screen before it is erased. */
  readonly holdDelay?: number;
}

interface TypewriterState {
  /** The text as far as it has been typed. */
  readonly displayed: string;
  /** True while a phrase is fully typed and holding. */
  readonly done: boolean;
}

type Phase = 'waiting' | 'typing' | 'deleting';

/**
 * Types a phrase out one character at a time, holds it, erases it, and moves
 * to the next — looping forever.
 *
 * Each keystroke schedules the one after it, rather than running on a fixed
 * interval: typing, holding and erasing all move at different speeds, and a
 * self-scheduling timeout expresses that without a second clock to keep in
 * sync. Under `prefers-reduced-motion` the first phrase is simply shown.
 */
export function useTypewriter(
  phrases: readonly string[],
  { speed = 38, deleteSpeed = 24, startDelay = 600, holdDelay = 1800 }: TypewriterOptions = {},
): TypewriterState {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<Phase>('waiting');

  const phrase = phrases[index] ?? '';
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reducedMotion) return;

    let delay: number;
    let advance: () => void;

    if (phase === 'waiting') {
      delay = startDelay;
      advance = () => setPhase('typing');
    } else if (phase === 'typing') {
      if (displayed.length < phrase.length) {
        delay = speed;
        advance = () => setDisplayed(phrase.slice(0, displayed.length + 1));
      } else {
        delay = holdDelay;
        advance = () => setPhase('deleting');
      }
    } else if (displayed.length > 0) {
      delay = deleteSpeed;
      advance = () => setDisplayed(phrase.slice(0, displayed.length - 1));
    } else {
      delay = speed * 4;
      advance = () => {
        setIndex((current) => (current + 1) % Math.max(phrases.length, 1));
        setPhase('typing');
      };
    }

    const timer = window.setTimeout(advance, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    displayed,
    phase,
    phrase,
    phrases.length,
    reducedMotion,
    speed,
    deleteSpeed,
    startDelay,
    holdDelay,
  ]);

  if (reducedMotion) {
    return { displayed: phrases[0] ?? '', done: true };
  }

  return { displayed, done: phase === 'typing' && displayed.length === phrase.length };
}
