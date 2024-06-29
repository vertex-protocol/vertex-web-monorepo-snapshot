import { Root as TabsRoot, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import { MarketWatchlistTabID } from 'client/modules/localstorage/userState/types/userMarketWatchlistTypes';
import { MarketWatchlistItems } from 'client/modules/trading/marketWatchlist/components/MarketWatchlistTabs/MarketWatchlistItems';
import { MarketWatchlistItemData } from 'client/modules/trading/marketWatchlist/types';

interface Props extends WithClassnames {
  disableFavoriteButton: boolean;
  displayedItems: MarketWatchlistItemData[];
  isEmptyWatchlist: boolean;
  query: string;
  selectedTabId: MarketWatchlistTabID;
  setQuery: (query: string) => void;
  setTabId: (tabId: MarketWatchlistTabID) => void;
  toggleIsFavoritedMarket: (marketId: number) => void;
}

const TABS: { id: MarketWatchlistTabID; label: string }[] = [
  {
    id: 'watchlist',
    label: 'Watchlist',
  },
  {
    id: 'all_markets',
    label: 'All Markets',
  },
];

export function MarketWatchlistTabs({
  selectedTabId,
  setTabId,
  displayedItems,
  isEmptyWatchlist,
  toggleIsFavoritedMarket,
  disableFavoriteButton,
  query,
  setQuery,
  className,
}: Props) {
  return (
    // Adding `TabsRoot` for arrow key navigation - filtering logic is done hook-side so we can share a single content component
    <TabsRoot
      className={joinClassNames(
        // Overflow hidden required to have scrolling in MarketWatchlistItems
        'flex flex-col gap-y-2.5 overflow-hidden',
        'px-1.5 pt-2',
        className,
      )}
      value={selectedTabId}
      onValueChange={(value) => {
        setTabId(value as MarketWatchlistTabID);
      }}
    >
      {/*Tab buttons*/}
      <TabsList asChild>
        <SegmentedControl.Container>
          {TABS.map(({ id, label }) => {
            const isSelected = id === selectedTabId;

            return (
              <TabsTrigger value={id} key={id} asChild>
                <SegmentedControl.Button
                  size="xs"
                  active={isSelected}
                  className="flex-1"
                >
                  {label}
                </SegmentedControl.Button>
              </TabsTrigger>
            );
          })}
        </SegmentedControl.Container>
      </TabsList>
      {/*Tab content */}
      <MarketWatchlistItems
        // Overflow hidden required to have scrolling in MarketWatchlistItems
        className="flex-1 overflow-hidden"
        isEmptyWatchlist={isEmptyWatchlist}
        query={query}
        setQuery={setQuery}
        items={displayedItems}
        toggleIsFavoritedMarket={toggleIsFavoritedMarket}
        disableFavoriteButton={disableFavoriteButton}
        selectedTabId={selectedTabId}
      />
    </TabsRoot>
  );
}
