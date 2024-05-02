import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { useCallback } from 'react';
import { PrivacySettingKey } from '../types';

export function usePrivacySetting(privacyKey: PrivacySettingKey) {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();

  const isPrivate = savedUserSettings.privacy[privacyKey];

  const setIsPrivate = useCallback(
    (val: boolean) => {
      setSavedUserSettings((prev) => {
        prev.privacy[privacyKey] = val;
        return prev;
      });
    },
    [privacyKey, setSavedUserSettings],
  );

  return [isPrivate, setIsPrivate] as const;
}
