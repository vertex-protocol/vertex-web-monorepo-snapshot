import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { xor } from 'lodash';
import { useCallback, useMemo } from 'react';

interface UseFavoritedMarkets {
  favoritedMarketIds: Set<number>;
  toggleIsFavoritedMarket: (marketId: number) => void;
}

export function useFavoritedMarkets(): UseFavoritedMarkets {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();

  const toggleIsFavoritedMarket = useCallback(
    (marketId: number) => {
      setSavedUserSettings((prev) => {
        // Toggle marketId from array.
        prev.favoriteMarketIds = xor(prev.favoriteMarketIds, [marketId]);

        return prev;
      });
    },
    [setSavedUserSettings],
  );

  const favoritedMarketIds = useMemo(() => {
    return new Set(savedUserSettings.favoriteMarketIds);
  }, [savedUserSettings.favoriteMarketIds]);

  return {
    favoritedMarketIds,
    toggleIsFavoritedMarket,
  };
}
