import { TriggerCriteriaPriceType } from '../types';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
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
