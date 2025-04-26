import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { MarginMode } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { useCallback, useMemo } from 'react';

export function useSelectedPerpMarginMode(productId: number | undefined) {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();
  const { data: allMarketsData } = useAllMarkets();
  const leverageByProductId = savedUserSettings.trading.leverageByProductId;
  const marginModeSettings = savedUserSettings.trading.marginMode;

  const market = productId ? allMarketsData?.perpMarkets[productId] : undefined;
  const maxLeverage = market?.maxLeverage ?? 1;

  /**
   * Legacy cross-margin settings
   */

  const persistedCrossMarginLeverageSelection = productId
    ? leverageByProductId[productId]
    : undefined;

  const selectedCrossMarginLeverage = useMemo(() => {
    if (!persistedCrossMarginLeverageSelection) {
      return maxLeverage;
    }

    return Math.min(maxLeverage, persistedCrossMarginLeverageSelection);
  }, [maxLeverage, persistedCrossMarginLeverageSelection]);

  const setSelectedCrossMarginLeverage = useCallback(
    (selectedValue: number) => {
      if (!productId) {
        return;
      }

      setSavedUserSettings((prev) => {
        prev.trading.leverageByProductId[productId] = Math.min(
          maxLeverage,
          selectedValue,
        );
        return prev;
      });
    },
    [maxLeverage, productId, setSavedUserSettings],
  );

  /**
   * New Iso / Cross margin settings
   */
  const savedMarginModeForProduct = productId
    ? marginModeSettings.lastSelected[productId]
    : undefined;

  const selectedMarginMode = useMemo((): MarginMode => {
    if (!savedMarginModeForProduct) {
      switch (marginModeSettings.default) {
        case 'isolated':
          return {
            mode: 'isolated',
            leverage: maxLeverage,
            enableBorrows: true,
          };
        case 'cross':
          return {
            mode: 'cross',
            leverage: maxLeverage,
          };
      }
    }

    // Perform a sanity check on the saved leverage selection
    return {
      ...savedMarginModeForProduct,
      leverage: Math.min(maxLeverage, savedMarginModeForProduct.leverage),
    };
  }, [marginModeSettings.default, maxLeverage, savedMarginModeForProduct]);

  const setSelectedMarginMode = useCallback(
    (newValue: MarginMode) => {
      if (!productId) {
        return;
      }

      setSavedUserSettings((prev) => {
        prev.trading.marginMode.lastSelected[productId] = {
          ...newValue,
          leverage: Math.min(maxLeverage, newValue.leverage),
        };
        return prev;
      });
    },
    [maxLeverage, productId, setSavedUserSettings],
  );

  return {
    selectedCrossMarginLeverage,
    setSelectedCrossMarginLeverage,
    selectedMarginMode,
    setSelectedMarginMode,
  };
}
