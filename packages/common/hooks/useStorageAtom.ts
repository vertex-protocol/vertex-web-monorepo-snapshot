import { useAtom, WritableAtom } from 'jotai';
import { useMemo } from 'react';
import { useIsClient } from './useIsClient';

type AtomSetter<
  Value,
  Update extends unknown[],
  Result extends void | Promise<void>,
> = ReturnType<typeof useAtom<Value, Update, Result>>[1];

// A SSR-safe version of `useAtom` for atomWithStorage
export function useStorageAtom<
  Value,
  Update extends unknown[],
  Result extends void | Promise<void>,
>(
  atom: WritableAtom<Value, Update, Result>,
  defaultValue: Value,
): [
  value: Value,
  setValue: AtomSetter<Value, Update, Result>,
  didLoad: boolean,
] {
  const isClient = useIsClient();
  const [val, set] = useAtom<Value, Update, Result>(atom);

  const didLoad = isClient;
  const safeVal = useMemo(() => {
    if (!didLoad) {
      return defaultValue;
    }
    return val;
  }, [defaultValue, didLoad, val]);

  return [safeVal, set, didLoad];
}
