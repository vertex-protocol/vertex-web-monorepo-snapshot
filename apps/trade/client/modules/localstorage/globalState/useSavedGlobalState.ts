import {
  useStorageAtom,
  createLocalStorageAtom,
} from '@vertex-protocol/web-common';
import { getGlobalStateWithDefaults } from 'client/modules/localstorage/globalState/defaultGlobalState';
import { SavedGlobalState } from 'client/modules/localstorage/globalState/SavedGlobalState';
import { setStateActionToState } from 'client/modules/localstorage/utils/setStateActionToState';
import { SetStateAction, useCallback, useMemo } from 'react';

const globalStateAtom = createLocalStorageAtom(
  'vertex',
  'globalState',
  {} as Partial<SavedGlobalState>,
);

export function useSavedGlobalState() {
  const [globalStateAtomValue, setGlobalStateAtomValue, didLoadPersistedValue] =
    useStorageAtom(globalStateAtom, {});

  const savedGlobalState = useMemo((): SavedGlobalState => {
    return getGlobalStateWithDefaults(globalStateAtomValue);
  }, [globalStateAtomValue]);

  const setSavedGlobalState = useCallback(
    (setState: SetStateAction<SavedGlobalState>) => {
      setGlobalStateAtomValue((prev) => {
        const newState = setStateActionToState(
          getGlobalStateWithDefaults(prev),
          setState,
        );
        return {
          ...prev,
          ...newState,
        };
      });
    },
    [setGlobalStateAtomValue],
  );

  return {
    savedGlobalState: savedGlobalState,
    setSavedGlobalState,
    didLoadPersistedValue,
  };
}
