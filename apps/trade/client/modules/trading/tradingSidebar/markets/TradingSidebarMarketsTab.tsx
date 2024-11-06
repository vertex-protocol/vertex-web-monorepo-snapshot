import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  formatNumber,
  getMarketPriceFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SearchBar } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { FixedHeaderDataTable } from 'client/components/FixedHeaderDataTable';
import { MarketCategoryFilter } from 'client/components/MarketCategoryFilter/MarketCategoryFilter';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { FavoriteToggleCell } from 'client/modules/tables/cells/FavoriteToggleCell';
import { TradingSidebarMarketData } from 'client/modules/trading/tradingSidebar/markets/types';
import { useTradingSidebarMarketsTab } from 'client/modules/trading/tradingSidebar/markets/useTradingSidebarMarketsTab';
import { FavoriteHeaderCell } from 'client/pages/Markets/components/FavoriteHeaderCell';
import { favoriteSortFn } from 'client/pages/Markets/utils/sortingFns';
import { signDependentValue } from 'client/utils/signDependentValue';
import Image from 'next/image';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<TradingSidebarMarketData>();

export function TradingSidebarMarketsTab({ className }: WithClassnames) {
  const {
    query,
    disableFavoriteButton,
    isWatchlistTabSelected,
    marketInfoItems,
    isLoading,
    marketCategory,
    setQuery,
    setMarketCategory,
  } = useTradingSidebarMarketsTab();
  const { toggleIsFavoritedMarket } = useFavoritedMarkets();
  const { trackEvent } = useAnalyticsContext();

  const columns: ColumnDef<TradingSidebarMarketData, any>[] = useMemo(
    () => [
      columnHelper.accessor('pastDayVolumeInPrimaryQuote', {
        id: 'marketNameAndVolume',
        header: ({ header }) => (
          <HeaderCell header={header}>Market / Volume</HeaderCell>
        ),
        cell: (context) => {
          const { marketName, icon } = context.row.original.sharedMetadata;

          return (
            <TableCell className="gap-x-2.5">
              <Image src={icon.asset} className="h-auto w-6" alt={marketName} />
              <div className="flex flex-col text-xs">
                <span className="text-text-primary">{marketName}</span>
                <span className="text-text-tertiary text-2xs">
                  {formatNumber(context.getValue(), {
                    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
                  })}
                </span>
              </div>
            </TableCell>
          );
        },
        enableSorting: true,
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-44',
        },
      }),
      columnHelper.accessor('pastDayPriceChangeFrac', {
        header: ({ header }) => <HeaderCell header={header}>Price</HeaderCell>,
        cell: (context) => {
          const { currentPrice, pastDayPriceChangeFrac, priceIncrement } =
            context.row.original;

          const changeFracColor = signDependentValue(pastDayPriceChangeFrac, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-disabled',
          });

          return (
            <TableCell className="flex-col items-start">
              <span className="text-text-primary">
                {formatNumber(currentPrice, {
                  formatSpecifier:
                    getMarketPriceFormatSpecifier(priceIncrement),
                })}
              </span>
              <span className={joinClassNames('text-2xs', changeFracColor)}>
                {formatNumber(pastDayPriceChangeFrac, {
                  formatSpecifier:
                    PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
                })}
              </span>
            </TableCell>
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-16',
        },
      }),
      columnHelper.accessor('isFavorited', {
        header: ({ header }) =>
          isWatchlistTabSelected ? null : (
            <FavoriteHeaderCell
              header={header}
              favoriteButtonSize={12}
              favoriteButtonClassName="pl-4 pr-0 justify-end"
              disableFavoriteButton={disableFavoriteButton}
            />
          ),
        cell: (context) => (
          <FavoriteToggleCell
            favoriteButtonSize={14}
            favoriteButtonClassName={joinClassNames(
              'pl-3.5 pr-0 justify-end',

              // when watchlist tab is selected, we want to show favorite button
              // only when the row is hovered to avoid cluttering the UI
              // `group` is set on the row container
              isWatchlistTabSelected ? 'hidden group-hover:block' : '',
            )}
            isFavorited={context.getValue<
              TradingSidebarMarketData['isFavorited']
            >()}
            disabled={disableFavoriteButton}
            toggleIsFavorited={toggleIsFavoritedMarket}
            productId={context.row.original.productId}
          />
        ),
        sortingFn: favoriteSortFn,
        meta: {
          cellContainerClassName: 'w-8',
        },
      }),
    ],
    [isWatchlistTabSelected, disableFavoriteButton, toggleIsFavoritedMarket],
  );

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-3 px-1.5',
        // Overflow hidden here to allow the content to scroll.
        'overflow-hidden',
        className,
      )}
    >
      <div className="flex flex-col gap-y-2 pl-1">
        <SearchBar sizeVariant="xs" query={query} setQuery={setQuery} />
        {!isWatchlistTabSelected && (
          <MarketCategoryFilter
            marketCategory={marketCategory}
            setMarketCategory={setMarketCategory}
          />
        )}
      </div>

      <FixedHeaderDataTable
        data={marketInfoItems}
        columns={columns}
        isLoading={isLoading}
        // in trading sidebar, it makes sense to sort by market volume by default:
        // 1) in watchlist, sorting by favorite does not make sense (they're all favs)
        // 2) all markets is for exploration (esp for sentiment/news) so sorting by volume
        //    is good for discovery, favs are directly accessible via Watchlist tab
        // 3) both tabs should have a consistent sorting order
        initialSortingState={[{ id: 'marketNameAndVolume', desc: true }]}
        emptyState={
          <p className="text-text-tertiary p-2 text-xs">No markets found.</p>
        }
        rowAsLinkHref={(row) => row.original.href}
        onRowClick={() => {
          trackEvent({
            type: 'market_entrypoint_clicked',
            data: {
              entrypoint: 'watchlist',
            },
          });
        }}
        headerClassName="px-1"
        rowClassName={joinClassNames(
          'py-1.5 px-1',

          // `group` needed here to so that we show filled star icon
          // only when the row is hovered to avoid cluttering the UI
          // when watchlist is selected (all rows would be filled stars)
          isWatchlistTabSelected ? 'group' : '',
        )}
      />
    </div>
  );
}
