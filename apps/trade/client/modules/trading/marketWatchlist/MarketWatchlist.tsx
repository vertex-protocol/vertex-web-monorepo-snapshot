import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { MarketWatchlistSelectedMarketCard } from 'client/modules/trading/marketWatchlist/components/MarketWatchlistSelectedMarketCard';
import { MarketWatchlistTabs } from 'client/modules/trading/marketWatchlist/components/MarketWatchlistTabs/MarketWatchlistTabs';
import { useMarketWatchlist } from 'client/modules/trading/marketWatchlist/hooks/useMarketWatchlist/useMarketWatchlist';

interface Props extends WithClassnames {
  flexDirectionByConsolePosition: 'flex-row' | 'flex-row-reverse';
  productId: number | undefined;
}

export function MarketWatchlist({
  flexDirectionByConsolePosition,
  productId,
  className,
}: Props) {
  const {
    didLoadWatchlistState,
    isEmptyWatchlist,
    disableFavoriteButton,
    marketWatchlistItems,
    marketWatchlistState,
    query,
    selectedMarket,
    setMarketWatchlistTabId,
    setQuery,
    toggleIsFavoritedMarket,
    toggleMarketWatchlistIsOpen,
  } = useMarketWatchlist(productId);

  const isMarketWatchlistOpen =
    didLoadWatchlistState && marketWatchlistState.isOpen;
  const isBorderOnRight = flexDirectionByConsolePosition === 'flex-row';

  return (
    <div
      className={joinClassNames(
        'flex',
        isMarketWatchlistOpen ? 'w-trade-sidebar' : '',
        flexDirectionByConsolePosition,
        className,
      )}
    >
      <div
        className={joinClassNames(
          'divide-overlay-divider/5 border-overlay-divider/5 flex flex-1 flex-col divide-y overflow-hidden',
          isBorderOnRight ? 'border-r' : 'border-l',
          isMarketWatchlistOpen ? '' : 'hidden',
          className,
        )}
      >
        <MarketWatchlistTabs
          className="flex-1"
          selectedTabId={marketWatchlistState.selectedTabId}
          setTabId={setMarketWatchlistTabId}
          displayedItems={marketWatchlistItems}
          isEmptyWatchlist={isEmptyWatchlist}
          disableFavoriteButton={disableFavoriteButton}
          toggleIsFavoritedMarket={toggleIsFavoritedMarket}
          query={query}
          setQuery={setQuery}
        />
        <MarketWatchlistSelectedMarketCard
          className="px-3 py-4"
          selectedMarket={selectedMarket}
          toggleIsFavoritedMarket={toggleIsFavoritedMarket}
          disableFavoriteButton={disableFavoriteButton}
        />
      </div>
      <div className="flex flex-col items-center">
        <TextButton
          className="p-2"
          endIcon={<Icons.TbListSearch size={20} />}
          onClick={toggleMarketWatchlistIsOpen}
        />
      </div>
    </div>
  );
}
