import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { PrivacySettingKey } from 'client/modules/privacy/types';
import { useCallback } from 'react';

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
