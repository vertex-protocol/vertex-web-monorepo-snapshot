import { ColumnDef, createColumnHelper, Row } from '@tanstack/react-table';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { FavoriteHeaderCell } from 'client/modules/tables/cells/FavoriteHeaderCell';
import { FavoriteToggleCell } from 'client/modules/tables/cells/FavoriteToggleCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { PercentageChangeCell } from 'client/modules/tables/cells/PercentageChangeCell';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import {
  SpotMarketTableItem,
  useSpotMarketsTable,
} from 'client/pages/Markets/hooks/useSpotMarketsTable';
import { favoriteSortFn } from 'client/pages/Markets/utils/sortingFns';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<SpotMarketTableItem>();

export function SpotMarketsTable() {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const {
    isLoading,
    spotProducts,
    toggleIsFavoritedMarket,
    disableFavoriteButton,
  } = useSpotMarketsTable();
  const { show } = useDialog();
  const pushTradePage = usePushTradePage();

  const columns: ColumnDef<SpotMarketTableItem, any>[] = useMemo(() => {
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
          const value = context.getValue<SpotMarketTableItem['metadata']>();
          return (
            <MarketProductInfoCell
              symbol={value.marketName}
              iconSrc={value.token.icon.asset}
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
            24h Volume {primaryQuoteToken.symbol}
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
          cellContainerClassName: 'w-36 grow',
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

  const onRowClicked = (row: Row<SpotMarketTableItem>) => {
    pushTradePage({
      productId: row.original.productId,
    });
  };

  return (
    <SeparatedRowDataTable
      isLoading={isLoading}
      columns={columns}
      data={spotProducts}
      onRowClicked={onRowClicked}
    />
  );
}
