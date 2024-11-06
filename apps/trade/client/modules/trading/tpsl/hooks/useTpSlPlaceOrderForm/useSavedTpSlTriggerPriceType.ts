import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';
import { useCallback } from 'react';

export function useSavedTpSlTriggerPriceType() {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();

  const setSavedTpSlTriggerPriceType = useCallback(
    (tpSlTriggerPriceType: TriggerCriteriaPriceType) => {
      setSavedUserSettings((prev) => {
        prev.trading.tpSlTriggerPriceType = tpSlTriggerPriceType;
        return prev;
      });
    },
    [setSavedUserSettings],
  );

  return {
    savedTpSlTriggerPriceType: savedUserSettings.trading.tpSlTriggerPriceType,
    setSavedTpSlTriggerPriceType,
  };
}
