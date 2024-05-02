import { useCallback } from 'react';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';

export function useShowOrderbookTotalInQuote() {
  const {
    savedUserSettings: {
      trading: { showOrderbookTotalInQuote },
    },
    setSavedUserSettings,
  } = useSavedUserSettings();

  const setShowOrderbookTotalInQuote = useCallback(
    (selectedValue: boolean) => {
      setSavedUserSettings((prev) => {
        prev.trading.showOrderbookTotalInQuote = selectedValue;

        return prev;
      });
    },
    [setSavedUserSettings],
  );

  return {
    setShowOrderbookTotalInQuote,
    showOrderbookTotalInQuote,
  };
}
