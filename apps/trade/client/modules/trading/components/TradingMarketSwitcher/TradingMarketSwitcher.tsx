import * as Popover from '@radix-ui/react-popover';
import { ProductEngineType } from '@vertex-protocol/contracts';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { ProductFilterTabs } from 'client/components/ProductFilterTabs';
import { SearchBar } from 'client/components/SearchBar';
import { useIsMobile } from 'client/hooks/ui/breakpoints';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { TradingMarketSwitcherPopoverTrigger } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcherPopoverTrigger';
import { useTradingMarketSwitcher } from 'client/modules/trading/hooks/useTradingMarketSwitcher';
import { MarketSwitcherProps } from 'client/modules/trading/layout/types';
import { TradingMarketSwitcherTable } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcherTable';

interface TradingMarketSwitcherProps extends MarketSwitcherProps {
  productId: number | undefined;
  defaultMarketType: ProductEngineType;
}

export function TradingMarketSwitcher({
  productId,
  defaultMarketType,
  triggerClassName,
}: TradingMarketSwitcherProps) {
  const { trackEvent } = useAnalyticsContext();

  const {
    selectedMarket,
    displayedMarkets,
    disableMarketSwitcherButton,
    selectedMarketTypeFilter,
    setSelectedMarketTypeFilter,
    toggleIsFavoritedMarket,
    isMarketSwitcherOpen,
    setIsMarketSwitcherOpen,
    query,
    setQuery,
    disableFavoriteButton,
  } = useTradingMarketSwitcher(productId, defaultMarketType);

  const isMobile = useIsMobile();

  return (
    <Popover.Root
      open={isMarketSwitcherOpen}
      onOpenChange={setIsMarketSwitcherOpen}
      // Ensures appropriate body styles are applied so we don't get funky scroll behavior on iOS.
      modal
    >
      <TradingMarketSwitcherPopoverTrigger
        disabled={disableMarketSwitcherButton}
        open={isMarketSwitcherOpen}
        selectedMarket={selectedMarket}
        className={triggerClassName}
      />
      <Popover.Content
        className="z-20"
        // Render it flush against the trigger on mobile to save some room.
        sideOffset={isMobile ? 0 : 6}
        asChild
      >
        <Card
          className={joinClassNames(
            'flex flex-col overflow-y-auto p-1 shadow-xl shadow-black',
            // See: https://www.radix-ui.com/primitives/docs/components/popover
            // Subtracting "8px" from available height to have a little padding from the screen's edge
            'h-[calc(var(--radix-popover-content-available-height)-8px)] w-[var(--radix-popover-trigger-width)]',
            // On mobile it's flush against the bottom of the trigger, which has 0 radius corners.
            'rounded-t-none sm:rounded-t-lg',
          )}
        >
          <div className="flex flex-col gap-y-1.5 px-2 lg:gap-y-3 lg:py-1">
            <SearchBar
              sizeVariant="xs"
              placeholder="Search"
              query={query}
              setQuery={setQuery}
            />
            <ProductFilterTabs
              marketType={selectedMarketTypeFilter}
              setMarketType={setSelectedMarketTypeFilter}
            />
          </div>
          <TradingMarketSwitcherTable
            disableFavoriteButton={disableFavoriteButton}
            toggleIsFavoritedMarket={toggleIsFavoritedMarket}
            markets={displayedMarkets}
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
        </Card>
      </Popover.Content>
    </Popover.Root>
  );
}
