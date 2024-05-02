import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { useCallback } from 'react';

export function useEnableTradingNotifications() {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();

  const setEnableTradingNotifications = useCallback(
    (newVal: boolean) => {
      setSavedUserSettings((prev) => {
        prev.trading.enableTradingNotifications = newVal;
        return prev;
      });
    },
    [setSavedUserSettings],
  );

  return {
    enableTradingNotifications:
      savedUserSettings.trading.enableTradingNotifications,
    setEnableTradingNotifications,
  };
}
