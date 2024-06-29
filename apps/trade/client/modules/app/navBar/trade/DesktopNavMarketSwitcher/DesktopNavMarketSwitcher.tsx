import { joinClassNames } from '@vertex-protocol/web-common';
import { NavCardButton } from '@vertex-protocol/web-ui';
import { useDebounceFn } from 'ahooks';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { SearchBar } from 'client/components/SearchBar';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { ROUTES } from 'client/modules/app/consts/routes';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { DesktopNavCustomPopover } from 'client/modules/app/navBar/components/DesktopNavCustomPopover';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { useNavMarketSwitcher } from 'client/modules/app/navBar/hooks/useNavMarketSwitcher';
import { NavMarketSwitcherTable } from 'client/modules/app/navBar/trade/DesktopNavMarketSwitcher/NavMarketSwitcherTable';
import { TRADE_NAV_ITEMS } from 'client/modules/app/navBar/trade/tradeNavItems';

export function DesktopNavMarketSwitcher() {
  const { trackEvent } = useAnalyticsContext();
  const {
    displayedMarkets,
    toggleIsFavoritedMarket,
    selectedMarketTypeFilter,
    setSelectedMarketTypeFilter,
    open,
    setOpen,
    query,
    setQuery,
    disableFavoriteButton,
  } = useNavMarketSwitcher();

  const {
    run: debouncedSetSelectedMarketFilter,
    cancel: cancelSetSelectedMarketFilter,
  } = useDebounceFn(setSelectedMarketTypeFilter, {
    wait: 150,
  });

  const getIsActiveRoute = useGetIsActiveRoute();
  const popoverTriggerIsActive =
    open || getIsActiveRoute(ROUTES.spotTrading, ROUTES.perpTrading);

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
      popoverClassName="h-[360px] w-[600px] flex gap-x-2"
      popoverContent={
        <>
          <div className="flex flex-col gap-y-1.5">
            {TRADE_NAV_ITEMS.map(({ description, marketType, title }) => (
              <NavCardButton
                key={title}
                title={title}
                description={description}
                contentClassName="pr-2"
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
            <SearchBar sizeVariant="xs" query={query} setQuery={setQuery} />
            <NavMarketSwitcherTable
              disableFavoriteButton={disableFavoriteButton}
              toggleIsFavoritedMarket={toggleIsFavoritedMarket}
              markets={displayedMarkets}
              onRowClick={() => {
                trackEvent({
                  type: 'market_entrypoint_clicked',
                  data: {
                    entrypoint: 'nav_popover',
                  },
                });
                setOpen(false);
              }}
            />
          </div>
        </>
      }
    />
  );
}
