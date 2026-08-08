import { useEffect } from 'react';

/**
 * Prevents the document from scrolling behind a fullscreen overlay.
 * Restores the previous value on unlock so it composes with other locks.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
