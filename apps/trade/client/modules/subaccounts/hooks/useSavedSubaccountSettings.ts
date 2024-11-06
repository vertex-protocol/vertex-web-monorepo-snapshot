import { usePrimaryChainId } from '@vertex-protocol/react-client';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import { getSubaccountKey } from 'client/modules/subaccounts/utils/getSubaccountKey';
import { useCallback } from 'react';

export function useSavedSubaccountSettings() {
  const {
    savedUserSettings: {
      selectedSubaccountNameByChainId,
      profileBySubaccountKey,
    },
    setSavedUserSettings,
    didLoadPersistedValue,
  } = useSavedUserSettings();

  const primaryChainId = usePrimaryChainId();

  const selectedSubaccountName =
    selectedSubaccountNameByChainId[primaryChainId];

  const saveSelectedSubaccountName = useCallback(
    (name: string) =>
      setSavedUserSettings((prev) => {
        prev.selectedSubaccountNameByChainId[primaryChainId] = name;
        return prev;
      }),
    [primaryChainId, setSavedUserSettings],
  );

  const saveSubaccountProfile = useCallback(
    (subaccountName: string, data: SubaccountProfile) => {
      const key = getSubaccountKey(primaryChainId, subaccountName);
      const { username, avatar } = data;

      setSavedUserSettings((prev) => {
        prev.profileBySubaccountKey[key] = { username, avatar };
        return prev;
      });
    },
    [setSavedUserSettings, primaryChainId],
  );

  const getSavedSubaccountProfile = useCallback(
    (subaccountName: string) => {
      const key = getSubaccountKey(primaryChainId, subaccountName);
      return profileBySubaccountKey[key];
    },
    [primaryChainId, profileBySubaccountKey],
  );

  return {
    selectedSubaccountName,
    saveSelectedSubaccountName,
    getSavedSubaccountProfile,
    saveSubaccountProfile,
    didLoadPersistedValue,
  };
}
