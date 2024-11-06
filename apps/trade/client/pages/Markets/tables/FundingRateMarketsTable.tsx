import { ColumnDef, createColumnHelper, Row } from '@tanstack/react-table';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import { getKeyedBigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { FavoriteToggleCell } from 'client/modules/tables/cells/FavoriteToggleCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { FavoriteHeaderCell } from 'client/pages/Markets/components/FavoriteHeaderCell';
import { FundingRateCell } from 'client/pages/Markets/components/FundingRateCell';
import { FundingRateCountdown } from 'client/pages/Markets/components/FundingRateCountdown';
import { FundingRatePeriodSelect } from 'client/pages/Markets/components/FundingRatePeriodSelect';
import {
  FundingRateTableItem,
  useFundingRateMarketsTable,
} from 'client/pages/Markets/hooks/useFundingRateMarketsTable';
import { favoriteSortFn } from 'client/pages/Markets/utils/sortingFns';
import { FundingRateTimespan } from 'client/utils/calcs/funding';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<FundingRateTableItem>();
// Always sort funding rates by hourly rate as order is equivalent regardless of display rate (e.g. daily/yearly)
const FUNDING_PERIOD_SORT_KEY: FundingRateTimespan = 'hourly';

export function FundingRateMarketsTable({ query }: { query: string }) {
  const {
    isLoading,
    fundingRateData,
    disableFavoriteButton,
    toggleIsFavoritedMarket,
  } = useFundingRateMarketsTable({ query });
  const pushTradePage = usePushTradePage();

  const columns: ColumnDef<FundingRateTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('isFavorited', {
        header: ({ header }) => (
          <FavoriteHeaderCell
            header={header}
            disableFavoriteButton={disableFavoriteButton}
            favoriteButtonSize={12}
          />
        ),
        cell: (context) => {
          return (
            <FavoriteToggleCell
              isFavorited={context.getValue()}
              disabled={disableFavoriteButton}
              toggleIsFavorited={toggleIsFavoritedMarket}
              productId={context.row.original.productId}
              favoriteButtonSize={15}
            />
          );
        },
        sortingFn: favoriteSortFn,
        meta: {
          cellContainerClassName: 'w-14',
          withLeftPadding: true,
        },
      }),
      columnHelper.accessor('metadata', {
        header: ({ header }) => <HeaderCell header={header}>Market</HeaderCell>,
        cell: (context) => {
          const value = context.getValue<FundingRateTableItem['metadata']>();
          return (
            <MarketProductInfoCell
              symbol={value.marketName}
              iconSrc={value.icon.asset}
              isNewMarket={context.row.original.isNewMarket}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-52',
        },
      }),
      columnHelper.accessor('markPrice', {
        header: ({ header }) => (
          <HeaderCell header={header}>Mark Price</HeaderCell>
        ),
        cell: (context) => {
          return (
            <NumberCell
              value={context.getValue()}
              formatSpecifier={context.row.original.marketPriceFormatSpecifier}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('indexPrice', {
        header: ({ header }) => (
          <HeaderCell header={header}>Index Price</HeaderCell>
        ),
        cell: (context) => {
          return (
            <NumberCell
              value={context.getValue()}
              formatSpecifier={context.row.original.marketPriceFormatSpecifier}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('predictedHourly', {
        header: ({ header }) => (
          <HeaderCell
            header={header}
            definitionTooltipId="fundingRateMarketsPredictedHourlyFunding"
          >
            Predicted
          </HeaderCell>
        ),
        cell: (context) => <FundingRateCell value={context.getValue()} />,
        sortingFn: getKeyedBigDecimalSortFn(FUNDING_PERIOD_SORT_KEY),
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('dailyAvg', {
        header: ({ header }) => (
          <HeaderCell header={header}>24h Avg.</HeaderCell>
        ),
        cell: (context) => <FundingRateCell value={context.getValue()} />,
        sortingFn: getKeyedBigDecimalSortFn(FUNDING_PERIOD_SORT_KEY),
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('threeDayAvg', {
        header: ({ header }) => (
          <HeaderCell header={header}>3d Avg.</HeaderCell>
        ),
        cell: (context) => <FundingRateCell value={context.getValue()} />,
        sortingFn: getKeyedBigDecimalSortFn(FUNDING_PERIOD_SORT_KEY),
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('weeklyAvg', {
        header: ({ header }) => (
          <HeaderCell header={header}>7d Avg.</HeaderCell>
        ),
        cell: (context) => <FundingRateCell value={context.getValue()} />,
        sortingFn: getKeyedBigDecimalSortFn(FUNDING_PERIOD_SORT_KEY),
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('monthlyAvg', {
        header: ({ header }) => (
          <HeaderCell header={header}>30d Avg.</HeaderCell>
        ),
        cell: (context) => <FundingRateCell value={context.getValue()} />,
        sortingFn: getKeyedBigDecimalSortFn(FUNDING_PERIOD_SORT_KEY),
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
    ];
  }, [disableFavoriteButton, toggleIsFavoritedMarket]);

  const onRowClicked = (row: Row<FundingRateTableItem>) => {
    pushTradePage({
      productId: row.original.productId,
    });
  };

  return (
    <>
      <div className="text-stroke-tertiary flex items-center justify-between gap-x-4 pl-3 text-xs">
        <div className="flex items-center gap-x-1.5">
          <span>Show</span>
          <FundingRatePeriodSelect />
        </div>
        <FundingRateCountdown />
      </div>
      <SeparatedRowDataTable
        isLoading={isLoading}
        columns={columns}
        data={fundingRateData}
        onRowClicked={onRowClicked}
        emptyState={query && <EmptyTablePlaceholder type="no_search_results" />}
      />
    </>
  );
}
