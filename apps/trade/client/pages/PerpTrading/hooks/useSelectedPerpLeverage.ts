import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useCallback, useMemo } from 'react';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';

export function useSelectedPerpLeverage(productId?: number) {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();
  const { data: allMarketsData } = useAllMarkets();
  const leverageByProductId = savedUserSettings.trading.leverageByProductId;

  const market = productId ? allMarketsData?.perpMarkets[productId] : undefined;
  const persistedLeverageSelection = productId
    ? leverageByProductId[productId]
    : undefined;

  const selectedLeverage = useMemo(() => {
    if (!market || !persistedLeverageSelection) {
      // Default to max leverage if market data is found, otherwise, use a default of 1
      return market?.maxLeverage ?? 1;
    }

    return Math.min(market.maxLeverage, persistedLeverageSelection);
  }, [market, persistedLeverageSelection]);

  const setSelectedLeverage = useCallback(
    (selectedValue: number) => {
      if (!market) {
        console.warn('Market not found, skipping saving leverage');
        return;
      }

      setSavedUserSettings((prev) => {
        prev.trading.leverageByProductId[market.productId] = Math.min(
          market.maxLeverage,
          selectedValue,
        );
        return prev;
      });
    },
    [market, setSavedUserSettings],
  );

  return {
    selectedLeverage,
    setSelectedLeverage,
  };
}
