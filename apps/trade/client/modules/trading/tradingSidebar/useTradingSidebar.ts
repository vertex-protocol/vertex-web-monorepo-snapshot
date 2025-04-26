import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import {
  TradingSidebarTabID,
  TradingSidebarWatchlistTabID,
} from 'client/modules/localstorage/userState/types/userTradingSidebarTypes';
import { useSavedUserState } from 'client/modules/localstorage/userState/useSavedUserState';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { get } from 'lodash';
import { useCallback, useMemo } from 'react';

export function useTradingSidebar() {
  const { savedUserState, setSavedUserState, didLoadPersistedValue } =
    useSavedUserState();
  const { favoritedMarketIds, didLoadPersistedValue: didLoadFavoritedMarkets } =
    useFavoritedMarkets();
  const { data: allMarketsStaticData, isLoading } = useAllMarketsStaticData();
  const productTradingLinks = useProductTradingLinks();

  const isTradingSidebarOpen =
    didLoadPersistedValue && savedUserState.tradingSidebar.isOpen;

  const setIsTradingSidebarOpen = useCallback(
    (isOpen: boolean) => {
      setSavedUserState((prev) => {
        prev.tradingSidebar.isOpen = isOpen;

        return prev;
      });
    },
    [setSavedUserState],
  );

  const selectedWatchlistTabId =
    savedUserState.tradingSidebar.selectedWatchlistTabId;

  const setSelectedWatchlistTabId = useCallback(
    (tabId: TradingSidebarWatchlistTabID) => {
      setSavedUserState((prev) => {
        prev.tradingSidebar.selectedWatchlistTabId = tabId;

        return prev;
      });
    },
    [setSavedUserState],
  );

  const selectedSidebarTabId = savedUserState.tradingSidebar.selectedTabId;
  const setSelectedSidebarTabId = useCallback(
    (tabId: TradingSidebarTabID) => {
      setSavedUserState((prev) => {
        prev.tradingSidebar.selectedTabId = tabId;

        return prev;
      });
    },
    [setSavedUserState],
  );

  const onTabClick = useCallback(
    (tabId: TradingSidebarTabID) => {
      if (selectedSidebarTabId === tabId) {
        // toggle sidebar open/close if active tab button is clicked
        setIsTradingSidebarOpen(!isTradingSidebarOpen);
      } else {
        // otherwise, open sidebar
        setIsTradingSidebarOpen(true);
      }
      setSelectedSidebarTabId(tabId);
    },
    [
      selectedSidebarTabId,
      isTradingSidebarOpen,
      setIsTradingSidebarOpen,
      setSelectedSidebarTabId,
    ],
  );

  const isWatchlistTabSelected = selectedWatchlistTabId === 'watchlist';

  const relevantMarkets = useMemo(() => {
    return Object.values(allMarketsStaticData?.allMarkets ?? [])
      .filter(
        (market) =>
          !isWatchlistTabSelected || favoritedMarketIds.has(market.productId),
      )
      .map((marketStaticData) => {
        return {
          productId: marketStaticData.productId,
          marketData: marketStaticData,
          sharedMetadata: getSharedProductMetadata(marketStaticData.metadata),
          href:
            get(productTradingLinks, marketStaticData.productId, undefined)
              ?.link ?? '',
          isFavorited: favoritedMarketIds.has(marketStaticData.productId),
        };
      });
  }, [
    allMarketsStaticData,
    favoritedMarketIds,
    isWatchlistTabSelected,
    productTradingLinks,
  ]);

  return {
    isTradingSidebarOpen,
    selectedSidebarTabId,
    selectedWatchlistTabId,
    setIsTradingSidebarOpen,
    setSelectedSidebarTabId,
    setSelectedWatchlistTabId,
    onTabClick,
    isWatchlistTabSelected,
    isEmptyWatchlist: didLoadFavoritedMarkets && favoritedMarketIds.size === 0,
    relevantMarkets,
    isLoading,
  };
}
