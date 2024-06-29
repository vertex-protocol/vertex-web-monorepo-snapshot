import { atomWithStorage } from 'jotai/utils';

export function createLocalStorageAtom<Value>(
  keyPrefix: string,
  keyName: string,
  defaultValue: Value,
) {
  return atomWithStorage(`${keyPrefix}.${keyName}`, defaultValue, undefined, {
    // Jotai always returns the `defaultValue` on first render in order to avoid
    // hydration errors. However, we already avoid hydration errors ourselves.
    // So Jotai can instead immediately pull from storage.
    getOnInit: true,
  });
}
