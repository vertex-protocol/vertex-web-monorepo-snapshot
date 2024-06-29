import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SearchBar } from 'client/components/SearchBar';
import { MarketWatchlistTabID } from 'client/modules/localstorage/userState/types/userMarketWatchlistTypes';
import { MarketWatchlistItem } from 'client/modules/trading/marketWatchlist/components/MarketWatchlistTabs/MarketWatchlistItem';
import { MarketWatchlistItemData } from 'client/modules/trading/marketWatchlist/types';

interface Props extends WithClassnames {
  items: MarketWatchlistItemData[];
  query: string;
  setQuery: (query: string) => void;
  toggleIsFavoritedMarket: (marketId: number) => void;
  disableFavoriteButton: boolean;
  selectedTabId: MarketWatchlistTabID;
  isEmptyWatchlist: boolean;
}

export function MarketWatchlistItems({
  className,
  query,
  setQuery,
  items,
  toggleIsFavoritedMarket,
  disableFavoriteButton,
  isEmptyWatchlist,
  selectedTabId,
}: Props) {
  if (isEmptyWatchlist) {
    return (
      <NoWatchlistItems className={joinClassNames('px-1.5 pt-2', className)} />
    );
  }

  const showToggleOnHover = selectedTabId === 'watchlist';

  return (
    <div className={joinClassNames('flex flex-col gap-y-2.5', className)}>
      <div className="flex flex-col gap-y-2.5 pl-1">
        <SearchBar sizeVariant="xs" query={query} setQuery={setQuery} />
        <Header />
      </div>
      <div className="no-scrollbar flex-1 overflow-y-auto">
        <div className="flex flex-col gap-y-1">
          {items.map((item) => {
            return (
              <MarketWatchlistItem
                key={item.marketData.metadata.marketName}
                itemData={item}
                toggleIsFavoritedMarket={toggleIsFavoritedMarket}
                disableFavoriteButton={disableFavoriteButton}
                showToggleOnHover={showToggleOnHover}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Header({ className }: WithClassnames) {
  return (
    <div
      className={joinClassNames(
        'text-text-secondary grid grid-cols-2 gap-x-3 text-xs',
        className,
      )}
    >
      <span>Market / Volume</span>
      <span>Price</span>
    </div>
  );
}

function NoWatchlistItems({ className }: WithClassnames) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-2.5', className)}>
      <span>Navigate through your favorite markets quickly</span>
      <p className="text-text-tertiary text-xs">
        Click on the star to add markets to your watchlist.
      </p>
    </div>
  );
}
