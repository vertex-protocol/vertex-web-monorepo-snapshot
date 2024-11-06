import { MarketCategory } from '@vertex-protocol/metadata';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  COMMON_TRANSPARENCY_COLORS,
  NavCardButton,
  SearchBar,
} from '@vertex-protocol/web-ui';
import { useDebounceFn } from 'ahooks';
import { NewPill } from 'client/components/NewPill';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { ROUTES } from 'client/modules/app/consts/routes';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { DesktopNavCustomPopover } from 'client/modules/app/navBar/components/DesktopNavCustomPopover';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { NavMarketSwitcherTable } from 'client/modules/app/navBar/trade/DesktopNavMarketSwitcher/NavMarketSwitcherTable';
import { useNavTradeMarketCategories } from 'client/modules/app/navBar/trade/useNavTradeMarketCategories';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';
import { useMarketSwitcher } from 'client/modules/trading/hooks/useMarketSwitcher/useMarketSwitcher';
import { useEffect, useRef } from 'react';

export function DesktopNavMarketSwitcher() {
  const {
    displayedMarkets,
    isLoading,
    toggleIsFavoritedMarket,
    selectedMarketCategory,
    setSelectedMarketCategory,
    query,
    setQuery,
    disableFavoriteButton,
  } = useMarketSwitcher('perp');
  const marketCategories = useNavTradeMarketCategories();
  const { isElectionMarketsEnabled } = useEnabledFeatures();

  const {
    run: debouncedSetSelectedMarketFilter,
    cancel: cancelSetSelectedMarketFilter,
  } = useDebounceFn(setSelectedMarketCategory, {
    wait: 150,
  });

  const getIsActiveRoute = useGetIsActiveRoute();
  const popoverTriggerIsActive = getIsActiveRoute(
    ROUTES.spotTrading,
    ROUTES.perpTrading,
  );

  return (
    <DesktopNavCustomPopover
      triggerContent={
        <AppNavItemButton active={popoverTriggerIsActive} withCaret>
          Trade
          {isElectionMarketsEnabled && <NewPill />}
        </AppNavItemButton>
      }
      popoverClassName={joinClassNames(
        'h-[360px] flex gap-x-2',
        // If election markets are enabled, we need additional width
        isElectionMarketsEnabled ? 'w-[700px]' : 'w-[600px]',
      )}
      popoverContent={
        <>
          <div className="flex flex-col gap-y-1.5">
            {marketCategories.map(
              ({ description, marketCategory, title }, index) => (
                <NavCardButton
                  key={index}
                  title={title}
                  description={description}
                  contentClassName="pr-2"
                  active={marketCategory === selectedMarketCategory}
                  onClick={() => setSelectedMarketCategory(marketCategory)}
                  onMouseEnter={() =>
                    debouncedSetSelectedMarketFilter(marketCategory)
                  }
                  onMouseLeave={cancelSetSelectedMarketFilter}
                />
              ),
            )}
          </div>
          {/* Purposefully its own component so that we can delay attempting to focus */}
          {/* its search input until it mounts, allowing us to easily focus when opened */}
          {/* and then on every subsequent filter category change. */}
          <NavMarketSearch
            className="flex-1"
            query={query}
            setQuery={setQuery}
            selectedMarketCategory={selectedMarketCategory}
            disableFavoriteButton={disableFavoriteButton}
            toggleIsFavoritedMarket={toggleIsFavoritedMarket}
            displayedMarkets={displayedMarkets}
            isLoading={isLoading}
          />
        </>
      }
    />
  );
}

interface NavMarketSearchProps extends WithClassnames {
  query: string;
  setQuery: (query: string) => void;
  selectedMarketCategory: MarketCategory | undefined;
  disableFavoriteButton: boolean;
  toggleIsFavoritedMarket: (marketId: number) => void;
  displayedMarkets: MarketSwitcherItem[];
  isLoading: boolean;
}

function NavMarketSearch({
  query,
  setQuery,
  selectedMarketCategory,
  disableFavoriteButton,
  toggleIsFavoritedMarket,
  displayedMarkets,
  isLoading,
  className,
}: NavMarketSearchProps) {
  const { trackEvent } = useAnalyticsContext();

  // Focus the search input on every category change.
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchInputRef.current?.focus();
  }, [selectedMarketCategory]);

  return (
    <div
      className={joinClassNames(
        COMMON_TRANSPARENCY_COLORS.bgOverlayHover,
        'flex flex-col rounded-md',
        'gap-y-3.5 p-1.5',
        className,
      )}
    >
      <SearchBar
        sizeVariant="xs"
        query={query}
        setQuery={setQuery}
        ref={searchInputRef}
      />
      <NavMarketSwitcherTable
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
              entrypoint: 'nav_popover',
            },
          });
        }}
      />
    </div>
  );
}
