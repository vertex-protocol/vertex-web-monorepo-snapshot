import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { useCallback } from 'react';
import { TradingConsolePosition } from 'client/modules/localstorage/userSettings/types/tradingSettings';

export function useTradingConsolePosition() {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();

  const setConsolePosition = useCallback(
    (newVal: TradingConsolePosition) => {
      setSavedUserSettings((prev) => {
        prev.trading.consolePosition = newVal;
        return prev;
      });
    },
    [setSavedUserSettings],
  );

  return {
    consolePosition: savedUserSettings.trading.consolePosition,
    setConsolePosition,
  };
}
