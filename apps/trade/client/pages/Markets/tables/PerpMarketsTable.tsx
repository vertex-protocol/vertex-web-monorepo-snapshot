import { ColumnDef, createColumnHelper, Row } from '@tanstack/react-table';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { LinkButton } from 'client/components/LinkButton';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { FavoriteToggleCell } from 'client/modules/markets/components/FavoriteToggleCell';
import { MarketProductInfoCell } from 'client/modules/markets/components/MarketProductInfoCell';
import { PercentageChangeCell } from 'client/modules/markets/components/PercentageChangeCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import { FavoriteHeaderCell } from 'client/pages/Markets/components/FavoriteHeaderCell';
import { MarketsPageTable } from 'client/pages/Markets/components/MarketsPageTable';
import { favoriteSortFn } from 'client/pages/Markets/utils/sortingFns';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { useMemo } from 'react';
import { FundingRateCell } from '../components/FundingRateCell';
import { FundingRatePeriodSelect } from '../components/FundingRatePeriodSelect';
import { FundingRatePeriodID } from '../hooks/useFundingRatePeriodSelect';
import {
  PerpMarketTableItem,
  usePerpMarketsTable,
} from '../hooks/usePerpMarketsTable';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

const columnHelper = createColumnHelper<PerpMarketTableItem>();
const FUNDING_PERIOD_SORT_KEY: FundingRatePeriodID = 'hourly';

export function PerpMarketsTable() {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { perpProducts, disableFavoriteButton, toggleIsFavoritedMarket } =
    usePerpMarketsTable();
  const pushTradePage = usePushTradePage();
  const { show } = useDialog();

  const columns: ColumnDef<PerpMarketTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('isFavorited', {
        header: ({ header }) => (
          <FavoriteHeaderCell
            header={header}
            disableFavoriteButton={disableFavoriteButton}
          />
        ),
        cell: (context) => {
          return (
            <FavoriteToggleCell
              isFavorited={context.getValue()}
              disabled={disableFavoriteButton}
              toggleIsFavorited={toggleIsFavoritedMarket}
              productId={context.row.original.productId}
            />
          );
        },
        sortingFn: favoriteSortFn,
        meta: {
          cellContainerClassName: 'w-10',
        },
      }),
      columnHelper.accessor('metadata', {
        header: ({ header }) => <HeaderCell header={header}>Market</HeaderCell>,
        cell: (context) => {
          const value = context.getValue();
          return (
            <MarketProductInfoCell
              name={value.name}
              subtitle={value.marketDetails.subtitle}
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
                color="white"
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
    <MarketsPageTable
      columns={columns}
      data={perpProducts}
      onRowClicked={onRowClicked}
    />
  );
}
