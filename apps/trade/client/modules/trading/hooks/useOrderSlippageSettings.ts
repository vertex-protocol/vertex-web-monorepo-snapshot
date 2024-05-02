import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { DEFAULT_ORDER_SLIPPAGE } from 'client/modules/trading/defaultOrderSlippage';
import {
  OrderSlippageSettings,
  OrderSlippageType,
} from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { useCallback } from 'react';

interface UseOrderSlippageSettings {
  savedSettings: OrderSlippageSettings;
  setSavedSettingsForType: (type: OrderSlippageType, value: number) => void;
  defaults: OrderSlippageSettings;
}

export function useOrderSlippageSettings(): UseOrderSlippageSettings {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();

  const savedSettings = savedUserSettings.trading.slippage;

  const setSavedSettingsForType = useCallback(
    (type: OrderSlippageType, value: number) => {
      setSavedUserSettings((prev) => {
        prev.trading.slippage[type] = value;
        return prev;
      });
    },
    [setSavedUserSettings],
  );

  return {
    savedSettings,
    setSavedSettingsForType,
    defaults: DEFAULT_ORDER_SLIPPAGE,
  };
}
