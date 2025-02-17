import * as Popover from '@radix-ui/react-popover';
import { MarketCategory } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { DropdownUi, SearchBar } from '@vertex-protocol/web-ui';
import { MarketCategoryFilter } from 'client/components/MarketCategoryFilter/MarketCategoryFilter';
import { useIsMobile } from 'client/hooks/ui/breakpoints';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { TradingMarketSwitcherPopoverTrigger } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcherPopoverTrigger';
import { TradingMarketSwitcherTable } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcherTable';
import { useTradingMarketSwitcher } from 'client/modules/trading/hooks/useTradingMarketSwitcher';
import { MarketSwitcherProps } from 'client/modules/trading/layout/types';

interface TradingMarketSwitcherProps extends MarketSwitcherProps {
  productId: number | undefined;
  defaultMarketCategory: MarketCategory;
}

export function TradingMarketSwitcher({
  productId,
  defaultMarketCategory,
  triggerClassName,
}: TradingMarketSwitcherProps) {
  const { trackEvent } = useAnalyticsContext();

  const {
    selectedMarket,
    displayedMarkets,
    isLoading,
    disableMarketSwitcherButton,
    selectedMarketCategory,
    setSelectedMarketCategory,
    toggleIsFavoritedMarket,
    isMarketSwitcherOpen,
    setIsMarketSwitcherOpen,
    query,
    setQuery,
    disableFavoriteButton,
  } = useTradingMarketSwitcher(productId, defaultMarketCategory);

  const isMobile = useIsMobile();

  return (
    <Popover.Root
      open={isMarketSwitcherOpen}
      onOpenChange={setIsMarketSwitcherOpen}
      // Ensures appropriate body styles are applied so we don't get funky scroll behavior on iOS.
      modal={isMobile}
    >
      <TradingMarketSwitcherPopoverTrigger
        disabled={disableMarketSwitcherButton}
        open={isMarketSwitcherOpen}
        selectedMarket={selectedMarket}
        className={triggerClassName}
      />
      <Popover.Content
        // Render it flush against the trigger on mobile to save some room.
        sideOffset={isMobile ? 0 : 6}
        asChild
      >
        <DropdownUi.Content
          className={joinClassNames(
            'bg-surface-card p-1 shadow-xl shadow-black',
            // See: https://www.radix-ui.com/primitives/docs/components/popover
            // Subtracting "8px" from available height to have a little padding from the screen's edge
            'h-[calc(var(--radix-popover-content-available-height)-8px)] w-[var(--radix-popover-trigger-width)]',
            // On mobile it's flush against the bottom of the trigger, which has 0 radius corners.
            'rounded-t-none sm:rounded-t-lg',
          )}
        >
          <div className="flex flex-col gap-y-2 px-2">
            <SearchBar
              sizeVariant="xs"
              placeholder="Search"
              query={query}
              setQuery={setQuery}
            />
            <MarketCategoryFilter
              marketCategory={selectedMarketCategory}
              setMarketCategory={setSelectedMarketCategory}
            />
          </div>
          <TradingMarketSwitcherTable
            // Remount the table on category change so we reset the scroll shadow
            // class rather than keeping the one used for the previous category.
            key={selectedMarketCategory}
            disableFavoriteButton={disableFavoriteButton}
            toggleIsFavoritedMarket={toggleIsFavoritedMarket}
            markets={displayedMarkets}
            isLoading={isLoading}
            onRowClick={() => {
              trackEvent({
                type: 'market_entrypoint_clicked',
                data: {
                  entrypoint: 'trade_dropdown',
                },
              });
              setIsMarketSwitcherOpen(false);
            }}
          />
        </DropdownUi.Content>
      </Popover.Content>
    </Popover.Root>
  );
}
