import {
  useStorageAtom,
  createLocalStorageAtom,
} from '@vertex-protocol/web-common';
import { useLocalStorageAddressKey } from 'client/modules/localstorage/hooks/useLocalStorageAddressKey';
import { KeyedByAddr } from 'client/modules/localstorage/types';
import { getUserSettingsWithDefaults } from 'client/modules/localstorage/userSettings/defaultUserSettings';
import { SavedUserSettings } from 'client/modules/localstorage/userSettings/types/SavedUserSettings';
import { setStateActionToState } from 'client/modules/localstorage/utils/setStateActionToState';
import { SetStateAction, useCallback, useMemo } from 'react';

const userSettingsAtom = createLocalStorageAtom(
  'vertex',
  'userSettings',
  {} as KeyedByAddr<SavedUserSettings>,
);

// Some duplication here with useSavedUserState, but not necessarily extractable
export function useSavedUserSettings() {
  const [
    userSettingsAtomValue,
    setUserSettingsAtomValue,
    didLoadPersistedValue,
  ] = useStorageAtom(userSettingsAtom, {});

  const addrKey = useLocalStorageAddressKey();

  const userSettingsForAddr = useMemo((): SavedUserSettings => {
    return getUserSettingsWithDefaults(userSettingsAtomValue[addrKey]);
  }, [addrKey, userSettingsAtomValue]);

  const setUserSettingsForAddr = useCallback(
    (setSettings: SetStateAction<SavedUserSettings>) => {
      setUserSettingsAtomValue((prev) => {
        const newSettingsForAddr = setStateActionToState(
          getUserSettingsWithDefaults(prev[addrKey]),
          setSettings,
        );

        return {
          ...prev,
          [addrKey]: newSettingsForAddr,
        };
      });
    },
    [setUserSettingsAtomValue, addrKey],
  );

  return {
    savedUserSettings: userSettingsForAddr,
    setSavedUserSettings: setUserSettingsForAddr,
    didLoadPersistedValue,
  };
}
