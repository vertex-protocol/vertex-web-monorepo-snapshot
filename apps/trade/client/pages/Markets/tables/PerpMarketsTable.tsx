import { ColumnDef, createColumnHelper, Row } from '@tanstack/react-table';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { FavoriteToggleCell } from 'client/modules/tables/cells/FavoriteToggleCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { PercentageChangeCell } from 'client/modules/tables/cells/PercentageChangeCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { FavoriteHeaderCell } from 'client/pages/Markets/components/FavoriteHeaderCell';
import { FundingRateCell } from 'client/pages/Markets/components/FundingRateCell';
import { FundingRatePeriodSelect } from 'client/pages/Markets/components/FundingRatePeriodSelect';
import {
  PerpMarketTableItem,
  usePerpMarketsTable,
} from 'client/pages/Markets/hooks/usePerpMarketsTable';
import { favoriteSortFn } from 'client/pages/Markets/utils/sortingFns';
import { FundingRateTimespan } from 'client/utils/calcs/funding';
import { useMemo } from 'react';
import { LinkButton } from '@vertex-protocol/web-ui';

const columnHelper = createColumnHelper<PerpMarketTableItem>();
const FUNDING_PERIOD_SORT_KEY: FundingRateTimespan = 'hourly';

export function PerpMarketsTable({ query }: { query: string }) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const {
    isLoading,
    perpProducts,
    disableFavoriteButton,
    toggleIsFavoritedMarket,
  } = usePerpMarketsTable({ query });
  const pushTradePage = usePushTradePage();
  const { show } = useDialog();

  const columns: ColumnDef<PerpMarketTableItem, any>[] = useMemo(() => {
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
          const value = context.getValue<PerpMarketTableItem['metadata']>();
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
      columnHelper.accessor('currentPrice', {
        header: ({ header }) => <HeaderCell header={header}>Price</HeaderCell>,
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
      columnHelper.accessor('priceChangeFrac24hr', {
        header: ({ header }) => (
          <HeaderCell header={header}>24h Change</HeaderCell>
        ),
        cell: (context) => <PercentageChangeCell value={context.getValue()} />,
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('volume24h', {
        header: ({ header }) => (
          <HeaderCell header={header}>
            24h Vol.{' '}
            <span className="text-text-tertiary">
              {primaryQuoteToken.symbol}
            </span>
          </HeaderCell>
        ),
        cell: (context) => (
          <NumberCell
            value={context.getValue()}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('oraclePrice', {
        header: ({ header }) => (
          <HeaderCell header={header}>Oracle Price</HeaderCell>
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
          <HeaderCell header={header}>Spot Index Price</HeaderCell>
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
      columnHelper.accessor('openInterestQuote', {
        header: ({ header }) => (
          <HeaderCell header={header}>
            Open Int.{' '}
            <span className="text-text-tertiary">
              {primaryQuoteToken.symbol}
            </span>
          </HeaderCell>
        ),
        cell: (context) => (
          <NumberCell
            value={context.getValue()}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('fundingRates', {
        header: ({ header }) => (
          <HeaderCell header={header}>
            <div className="flex items-center gap-x-1.5">
              <DefinitionTooltip definitionId="fundingRatePerpsPredictedHourlyFunding">
                Funding
              </DefinitionTooltip>
              <FundingRatePeriodSelect />
            </div>
          </HeaderCell>
        ),
        cell: (context) => <FundingRateCell value={context.getValue()} />,
        sortingFn: getKeyedBigDecimalSortFn(FUNDING_PERIOD_SORT_KEY),
        meta: {
          cellContainerClassName: 'w-52 grow',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => null,
        cell: (context) => {
          const productId = context.row.original.productId;

          return (
            <TableCell>
              <LinkButton
                colorVariant="primary"
                className="pointer-events-auto"
                onClick={getTableButtonOnClickHandler(() => {
                  show({ type: 'market_details', params: { productId } });
                })}
              >
                More Details
              </LinkButton>
            </TableCell>
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
    ];
  }, [
    show,
    disableFavoriteButton,
    toggleIsFavoritedMarket,
    primaryQuoteToken.symbol,
  ]);

  const onRowClicked = (row: Row<PerpMarketTableItem>) => {
    pushTradePage({
      productId: row.original.productId,
    });
  };

  return (
    <SeparatedRowDataTable
      isLoading={isLoading}
      columns={columns}
      data={perpProducts}
      onRowClicked={onRowClicked}
      emptyState={query && <EmptyTablePlaceholder type="no_search_results" />}
    />
  );
}
