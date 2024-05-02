import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { FavoriteToggleCell } from 'client/modules/markets/components/FavoriteToggleCell';
import { MarketProductInfoCell } from 'client/modules/markets/components/MarketProductInfoCell';
import { MoneyMarketActionsCell } from 'client/modules/markets/components/MoneyMarketActionsCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { PercentageCell } from 'client/modules/tables/cells/PercentageCell';
import { FavoriteHeaderCell } from 'client/pages/Markets/components/FavoriteHeaderCell';
import { MarketsPageTable } from 'client/pages/Markets/components/MarketsPageTable';
import { favoriteSortFn } from 'client/pages/Markets/utils/sortingFns';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { useMemo } from 'react';
import {
  MoneyMarketsTableItem,
  useMoneyMarketsTable,
} from '../hooks/useMoneyMarketsTable';

const columnHelper = createColumnHelper<MoneyMarketsTableItem>();

export function MoneyMarketsTable() {
  const { moneyMarkets, toggleIsFavoritedMarket, disableFavoriteButton } =
    useMoneyMarketsTable();

  const columns: ColumnDef<MoneyMarketsTableItem, any>[] = useMemo(() => {
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
              name={value.token.symbol}
              subtitle={value.token.name}
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
      columnHelper.accessor('depositAPR', {
        header: ({ header }) => (
          <HeaderCell header={header} definitionTooltipId="depositAPR">
            Deposit APR
          </HeaderCell>
        ),
        cell: (context) => (
          <PercentageCell
            formatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
            fraction={context.getValue()}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('totalDepositedUsd', {
        header: ({ header }) => (
          <HeaderCell header={header}>Total Deposited</HeaderCell>
        ),
        cell: (context) => {
          return (
            <CurrencyCell
              formatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
              value={context.getValue()}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('borrowAPR', {
        header: ({ header }) => (
          <HeaderCell header={header} definitionTooltipId="borrowAPR">
            Borrow APR
          </HeaderCell>
        ),
        cell: (context) => (
          <PercentageCell
            formatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
            fraction={context.getValue()}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('totalBorrowedUsd', {
        header: ({ header }) => (
          <HeaderCell header={header}>Total Borrowed</HeaderCell>
        ),
        cell: (context) => {
          return (
            <CurrencyCell
              formatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
              value={context.getValue()}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36 grow',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => null,
        cell: (context) => {
          return (
            <MoneyMarketActionsCell
              productId={context.row.original.productId}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-52',
        },
      }),
    ];
  }, [disableFavoriteButton, toggleIsFavoritedMarket]);

  return <MarketsPageTable columns={columns} data={moneyMarkets} />;
}
