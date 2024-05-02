import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { useCallback } from 'react';

export function useEnableTradingOrderLines() {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();

  const setEnableTradingOrderLines = useCallback(
    (newVal: boolean) => {
      setSavedUserSettings((prev) => {
        prev.trading.enableTradingOrderLines = newVal;
        return prev;
      });
    },
    [setSavedUserSettings],
  );

  return {
    enableTradingOrderLines: savedUserSettings.trading.enableTradingOrderLines,
    setEnableTradingOrderLines,
  };
}
