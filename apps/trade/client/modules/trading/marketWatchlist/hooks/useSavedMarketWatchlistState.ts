import { MarketWatchlistTabID } from 'client/modules/localstorage/userState/types/userMarketWatchlistTypes';
import { useSavedUserState } from 'client/modules/localstorage/userState/useSavedUserState';
import { useCallback } from 'react';

export function useSavedMarketWatchlistState() {
  const { savedUserState, setSavedUserState, didLoadPersistedValue } =
    useSavedUserState();

  const toggleMarketWatchlistIsOpen = useCallback(() => {
    setSavedUserState((prev) => {
      prev.marketWatchlist.isOpen = !savedUserState.marketWatchlist.isOpen;

      return prev;
    });
  }, [setSavedUserState, savedUserState.marketWatchlist.isOpen]);

  const setMarketWatchlistTabId = useCallback(
    (tabID: MarketWatchlistTabID) => {
      setSavedUserState((prev) => {
        prev.marketWatchlist.selectedTabId = tabID;
        return prev;
      });
    },
    [setSavedUserState],
  );

  return {
    marketWatchlistState: savedUserState.marketWatchlist,
    toggleMarketWatchlistIsOpen,
    setMarketWatchlistTabId,
    didLoadPersistedValue,
  };
}
