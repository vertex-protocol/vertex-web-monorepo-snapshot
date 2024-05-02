import {
  useStorageAtom,
  createLocalStorageAtom,
} from '@vertex-protocol/web-common';
import { KeyedByAddr } from 'client/modules/localstorage/types';
import { SavedUserState } from 'client/modules/localstorage/userState/types/SavedUserState';
import { SetStateAction, useCallback, useMemo } from 'react';
import { useLocalStorageAddressKey } from 'client/modules/localstorage/hooks/useLocalStorageAddressKey';
import { setStateActionToState } from 'client/modules/localstorage/utils/setStateActionToState';
import { getUserStateWithDefaults } from 'client/modules/localstorage/userState/defaultUserState';

const userStateAtom = createLocalStorageAtom(
  'vertex',
  'userState',
  {} as KeyedByAddr<SavedUserState>,
);

export function useSavedUserState() {
  const [userStateAtomValue, setUserStateAtomValue, didLoadPersistedValue] =
    useStorageAtom(userStateAtom, {});
  const addrKey = useLocalStorageAddressKey();

  const userStateForAddr = useMemo((): SavedUserState => {
    return getUserStateWithDefaults(userStateAtomValue[addrKey]);
  }, [addrKey, userStateAtomValue]);

  const setUserStateForAddr = useCallback(
    (setState: SetStateAction<SavedUserState>) => {
      setUserStateAtomValue((prev) => {
        const newStateForAddr = setStateActionToState(
          getUserStateWithDefaults(prev[addrKey]),
          setState,
        );
        return {
          ...prev,
          [addrKey]: newStateForAddr,
        };
      });
    },
    [setUserStateAtomValue, addrKey],
  );

  return {
    savedUserState: userStateForAddr,
    setSavedUserState: setUserStateForAddr,
    didLoadPersistedValue,
  };
}
