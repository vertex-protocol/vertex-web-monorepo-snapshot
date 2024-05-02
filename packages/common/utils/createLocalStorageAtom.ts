import { atomWithStorage } from 'jotai/utils';

export function createLocalStorageAtom<Value>(
  keyPrefix: string,
  keyName: string,
  defaultValue: Value,
) {
  return atomWithStorage(`${keyPrefix}.${keyName}`, defaultValue);
}
