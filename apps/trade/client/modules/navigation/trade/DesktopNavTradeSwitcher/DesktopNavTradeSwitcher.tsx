import { joinClassNames } from '@vertex-protocol/web-common';
import { NavCardButton } from '@vertex-protocol/web-ui';
import { useDebounceFn } from 'ahooks';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { SearchBar } from 'client/components/SearchBar';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { ROUTES } from 'client/modules/app/consts/routes';
import { AppNavItemButton } from 'client/modules/navigation/components/AppNavItemButton';
import { DesktopNavCustomPopover } from 'client/modules/navigation/components/DesktopNavCustomPopover';
import { useGetIsActiveRoute } from 'client/modules/navigation/hooks/useGetIsActiveRoute';
import { useNavTradeSwitcher } from 'client/modules/navigation/hooks/useNavTradeSwitcher';
import { TRADE_NAV_ITEMS } from 'client/modules/navigation/trade/tradeNavItems';
import { get } from 'lodash';
import { NavTradeHeader } from './NavTradeHeader';
import { NavTradeRowItem } from './NavTradeRowItem';

export function DesktopNavTradeSwitcher() {
  const {
    displayedMarkets,
    toggleIsFavoritedMarket,
    selectedMarketTypeFilter,
    setSelectedMarketTypeFilter,
    sortByFavorites,
    setSortByFavorites,
    open,
    setOpen,
    query,
    setQuery,
    disableFavoriteButton,
  } = useNavTradeSwitcher();

  const productTradingLinks = useProductTradingLinks();
  const {
    run: debouncedSetSelectedMarketFilter,
    cancel: cancelSetSelectedMarketFilter,
  } = useDebounceFn(setSelectedMarketTypeFilter, {
    wait: 150,
  });
  const getIsActiveRoute = useGetIsActiveRoute();
  const popoverTriggerIsActive =
    open ||
    getIsActiveRoute(ROUTES.spotTrading) ||
    getIsActiveRoute(ROUTES.perpTrading);

  const marketsTable = (() => {
    if (displayedMarkets.length > 0) {
      return (
        <div className="flex flex-col overflow-y-hidden">
          <NavTradeHeader
            // Only adding right padding here to align with the market items in the body
            // Internally, `FavoriteButton` has padding baked in for clickable area so no left padding is necessary
            className="pr-3"
            disableFavoriteButton={disableFavoriteButton}
            sortByFavorites={sortByFavorites}
            setSortByFavorites={setSortByFavorites}
          />
          <div className="no-scrollbar flex flex-col overflow-y-auto">
            <div className="flex flex-col gap-y-1.5">
              {displayedMarkets.map((item) => {
                return (
                  <NavTradeRowItem
                    // Only applying right padding here to compensate for the left padding applied to the favorite button.
                    // We lose clickable space on the item's button if this padding is applied via the container
                    className="pr-3"
                    key={item.market.productId}
                    market={item}
                    disableFavoriteButton={disableFavoriteButton}
                    onRowClick={() => {
                      setOpen(false);
                    }}
                    href={
                      get(productTradingLinks, item.market.productId, undefined)
                        ?.link ?? ''
                    }
                    toggleIsFavoritedMarket={toggleIsFavoritedMarket}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <p className="text-text-tertiary text-xs">
        No search results found. Please ensure that you have typed the search
        term correctly.
      </p>
    );
  })();

  return (
    <DesktopNavCustomPopover
      open={open}
      setOpen={setOpen}
      triggerContent={
        <AppNavItemButton
          active={popoverTriggerIsActive}
          endIcon={<UpDownChevronIcon open={open} />}
        >
          Trade
        </AppNavItemButton>
      }
      popoverClassName="h-[350px] w-[600px] flex gap-x-2"
      popoverContent={
        <>
          <div className="flex w-1/3 flex-col gap-y-1.5">
            {TRADE_NAV_ITEMS.map(({ description, marketType, title }) => (
              <NavCardButton
                key={title}
                title={title}
                description={description}
                active={marketType === selectedMarketTypeFilter}
                onClick={() => setSelectedMarketTypeFilter(marketType)}
                onMouseEnter={() =>
                  debouncedSetSelectedMarketFilter(marketType)
                }
                onMouseLeave={cancelSetSelectedMarketFilter}
              />
            ))}
          </div>
          <div
            className={joinClassNames(
              'bg-overlay-hover/5 flex flex-1 flex-col rounded-md',
              'gap-y-3.5 p-1.5',
            )}
          >
            <SearchBar
              className="px-1"
              inputClassName="py-2.5"
              placeholder="Search"
              iconSize={18}
              query={query}
              setQuery={setQuery}
            />
            {marketsTable}
          </div>
        </>
      }
    />
  );
}
