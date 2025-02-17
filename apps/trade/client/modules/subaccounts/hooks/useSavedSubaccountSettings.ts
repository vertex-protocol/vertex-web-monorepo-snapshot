import { useEVMContext } from '@vertex-protocol/react-client';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import { getSubaccountKey } from 'client/modules/subaccounts/utils/getSubaccountKey';
import { useCallback } from 'react';

export function useSavedSubaccountSettings() {
  const {
    savedUserSettings: {
      selectedSubaccountNameByChainEnv,
      profileBySubaccountKey,
    },
    setSavedUserSettings,
    didLoadPersistedValue,
  } = useSavedUserSettings();

  const { primaryChainEnv } = useEVMContext();

  const selectedSubaccountName =
    selectedSubaccountNameByChainEnv[primaryChainEnv];

  const saveSelectedSubaccountName = useCallback(
    (name: string) =>
      setSavedUserSettings((prev) => {
        prev.selectedSubaccountNameByChainEnv[primaryChainEnv] = name;
        return prev;
      }),
    [primaryChainEnv, setSavedUserSettings],
  );

  const saveSubaccountProfile = useCallback(
    (subaccountName: string, data: SubaccountProfile) => {
      const key = getSubaccountKey(primaryChainEnv, subaccountName);
      const { username, avatar } = data;

      setSavedUserSettings((prev) => {
        prev.profileBySubaccountKey[key] = { username, avatar };
        return prev;
      });
    },
    [setSavedUserSettings, primaryChainEnv],
  );

  const getSavedSubaccountProfile = useCallback(
    (subaccountName: string) => {
      const key = getSubaccountKey(primaryChainEnv, subaccountName);
      return profileBySubaccountKey[key];
    },
    [primaryChainEnv, profileBySubaccountKey],
  );

  return {
    selectedSubaccountName,
    saveSelectedSubaccountName,
    getSavedSubaccountProfile,
    saveSubaccountProfile,
    didLoadPersistedValue,
  };
}
