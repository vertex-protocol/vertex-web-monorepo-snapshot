import { useRef, useState, useEffect } from 'react';

interface Params {
  flashKey: string | undefined;
  flashOnMount?: boolean;
  flashDuration?: number;
}

/**
 * Returns `true` for the specified duration when the provided key changes.
 * Or, if `flashOnMount` is true, simply flashes once.
 *
 * Can be useful for temporarily changing styles in response to an updated value.
 */
export function useShouldFlash({
  flashKey,
  flashOnMount = false,
  flashDuration = 200,
}: Params) {
  const lastFlashKey = useRef(flashKey);
  const isFirstRender = useRef(true);
  const [shouldFlash, setShouldFlash] = useState(false);

  useEffect(() => {
    if (!flashKey || flashKey === lastFlashKey.current) {
      return;
    }

    lastFlashKey.current = flashKey;

    setShouldFlash(true);

    setTimeout(() => {
      setShouldFlash(false);
    }, flashDuration);
  }, [flashKey, flashDuration]);

  useEffect(() => {
    if (!flashOnMount || !isFirstRender.current) {
      return;
    }

    isFirstRender.current = false;

    setShouldFlash(true);

    setTimeout(() => {
      setShouldFlash(false);
    }, flashDuration);
  }, [flashOnMount, flashDuration]);

  return shouldFlash;
}
