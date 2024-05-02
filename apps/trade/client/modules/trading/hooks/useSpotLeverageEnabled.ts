import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { useCallback } from 'react';

export function useSpotLeverageEnabled() {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();
  const setSpotLeverageEnabled = useCallback(
    (val: boolean) => {
      setSavedUserSettings((prev) => {
        prev.trading.spotLeverageEnabled = val;
        return prev;
      });
    },
    [setSavedUserSettings],
  );

  return {
    spotLeverageEnabled: savedUserSettings.trading.spotLeverageEnabled,
    setSpotLeverageEnabled,
  };
}
