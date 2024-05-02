import * as Popover from '@radix-ui/react-popover';
import { ProductEngineType } from '@vertex-protocol/contracts';
import { joinClassNames } from '@vertex-protocol/web-common';
import { SearchBar } from 'client/components/SearchBar';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { MarketSwitcherPopoverTrigger } from 'client/modules/trading/components/TradingMarketSwitcher/MarketSwitcherPopoverTrigger';
import { useTradingMarketSwitcher } from 'client/modules/trading/hooks/useTradingMarketSwitcher';
import { TradingCard } from 'client/modules/trading/layout/TradingCard';
import { MarketSwitcherProps } from 'client/modules/trading/layout/types';
import { get } from 'lodash';
import { MarketSwitcherHeader } from './MarketSwitcherHeader';
import { MarketSwitcherItem } from './MarketSwitcherItem';
import { ProductFilterTabs } from './ProductFilterTabs';

interface TradingMarketSwitcherProps extends MarketSwitcherProps {
  productId: number | undefined;
  defaultMarketType: ProductEngineType;
}

export function TradingMarketSwitcher({
  productId,
  defaultMarketType,
  triggerClassName,
}: TradingMarketSwitcherProps) {
  const productTradingLinks = useProductTradingLinks();

  const {
    selectedMarket,
    displayedMarkets,
    disableMarketSwitcherButton,
    selectedMarketTypeFilter,
    setSelectedMarketTypeFilter,
    toggleIsFavoritedMarket,
    sortByFavorites,
    setSortByFavorites,
    isMarketSwitcherOpen,
    setIsMarketSwitcherOpen,
    query,
    setQuery,
    disableFavoriteButton,
  } = useTradingMarketSwitcher(productId, defaultMarketType);

  return (
    <Popover.Root
      open={isMarketSwitcherOpen}
      onOpenChange={setIsMarketSwitcherOpen}
    >
      <MarketSwitcherPopoverTrigger
        disabled={disableMarketSwitcherButton}
        open={isMarketSwitcherOpen}
        selectedMarket={selectedMarket}
        className={triggerClassName}
      />
      <Popover.Content
        // Prevent autofocus of search bar on open
        onOpenAutoFocus={(e) => e.preventDefault()}
        sideOffset={6}
        asChild
      >
        <TradingCard
          className={joinClassNames(
            'flex flex-col gap-y-1.5 overflow-y-auto p-1',
            // See: https://www.radix-ui.com/primitives/docs/components/popover
            // Subtracting "8px" from available height to have a little padding from the screen's edge
            'h-[calc(var(--radix-popover-content-available-height)-8px)] w-[var(--radix-popover-trigger-width)]',
          )}
        >
          <div className="flex flex-col gap-y-3 px-2 py-1">
            <SearchBar
              inputClassName="py-2"
              placeholder="Search"
              iconSize={18}
              query={query}
              setQuery={setQuery}
            />
            <ProductFilterTabs
              marketType={selectedMarketTypeFilter}
              setMarketType={setSelectedMarketTypeFilter}
            />
          </div>
          <MarketSwitcherHeader
            // Only adding right padding here to align with the market items in the body
            // Internally, `FavoriteButton` has padding baked in for clickable area so no left padding is necessary
            className="pr-3"
            disableFavoriteButton={disableFavoriteButton}
            sortByFavorites={sortByFavorites}
            setSortByFavorites={setSortByFavorites}
          />
          <div className="no-scrollbar overflow-y-auto">
            {displayedMarkets.map((item) => {
              return (
                <MarketSwitcherItem
                  key={item.market.name}
                  // Only applying right padding here to compensate for the left padding applied to the favorite button.
                  // We lose clickable space on the item's button if this padding is applied via the container
                  className="pr-3"
                  product={item}
                  disableFavoriteButton={disableFavoriteButton}
                  isFavorited={item.isFavorited}
                  toggleIsFavoritedMarket={toggleIsFavoritedMarket}
                  onRowClick={() => {
                    setIsMarketSwitcherOpen(false);
                  }}
                  href={
                    get(productTradingLinks, item.market.productId, undefined)
                      ?.link ?? ''
                  }
                />
              );
            })}
          </div>
        </TradingCard>
      </Popover.Content>
    </Popover.Root>
  );
}
