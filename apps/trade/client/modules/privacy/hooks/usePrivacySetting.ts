import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { PrivacySettingKey } from 'client/modules/privacy/types';
import { useCallback } from 'react';

export function usePrivacySetting(privacyKey: PrivacySettingKey) {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();
  const { trackEvent } = useAnalyticsContext();

  const isPrivate = savedUserSettings.privacy[privacyKey];

  const setIsPrivate = useCallback(
    (val: boolean) => {
      trackEvent({
        type: 'privacy_clicked',
        data: {},
      });
      setSavedUserSettings((prev) => {
        prev.privacy[privacyKey] = val;
        return prev;
      });
    },
    [privacyKey, setSavedUserSettings, trackEvent],
  );

  return [isPrivate, setIsPrivate] as const;
}
