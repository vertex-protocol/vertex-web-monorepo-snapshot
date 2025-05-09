'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Divider, IconButton, Icons } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { FavoriteHeaderCell } from 'client/modules/tables/cells/FavoriteHeaderCell';
import { FavoriteToggleCell } from 'client/modules/tables/cells/FavoriteToggleCell';
import { PercentageCell } from 'client/modules/tables/cells/PercentageCell';
import { StackedAmountValueCell } from 'client/modules/tables/cells/StackedAmountValueCell';
import {
  MoneyMarketsTableItem,
  useMoneyMarketsTable,
} from 'client/modules/tables/hooks/useMoneyMarketsTable';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import { favoriteSortFn } from 'client/pages/Markets/utils/sortingFns';
import { MoneyMarketActionsCell } from 'client/pages/MoneyMarkets/components/MoneyMarketActionsCell';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<MoneyMarketsTableItem>();

export function MoneyMarketsTable() {
  const {
    moneyMarkets,
    toggleIsFavoritedMarket,
    disableFavoriteButton,
    isLoading,
  } = useMoneyMarketsTable();
  const { show } = useDialog();

  const columns: ColumnDef<MoneyMarketsTableItem, any>[] = useMemo(() => {
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
          const isFavorited =
            context.getValue<MoneyMarketsTableItem['isFavorited']>();
          return (
            <FavoriteToggleCell
              isFavorited={isFavorited}
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
          const metadata =
            context.getValue<MoneyMarketsTableItem['metadata']>();
          return (
            <MarketProductInfoCell
              symbol={metadata.token.symbol}
              iconSrc={metadata.token.icon.asset}
              isNewMarket={context.row.original.isNewMarket}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-44',
        },
      }),
      columnHelper.accessor('spotBalance', {
        header: ({ header }) => (
          <HeaderCell header={header}>Your Balance</HeaderCell>
        ),
        cell: (context) => {
          const { amount, valueUsd } =
            context.getValue<MoneyMarketsTableItem['spotBalance']>();
          return (
            <StackedAmountValueCell
              size={amount}
              valueUsd={valueUsd}
              symbol={context.row.original.metadata.token.symbol}
              sizeFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('amount'),
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.display({
        id: 'overview_actions',
        header: () => null,
        cell: ({ row }) => (
          <TableCell>
            <IconButton
              className="pointer-events-auto"
              size="xs"
              icon={Icons.CaretCircleRight}
              onClick={getTableButtonOnClickHandler(() =>
                show({
                  type: 'spot_money_market_details',
                  params: {
                    productId: row.original.productId,
                    metadata: row.original.metadata,
                  },
                }),
              )}
            />
          </TableCell>
        ),
        meta: {
          cellContainerClassName: 'w-12',
        },
      }),
      columnHelper.display({
        id: 'border',
        header: () => <Divider vertical />,
        cell: () => <Divider vertical />,
        meta: {
          cellContainerClassName: 'flex p-4',
        },
      }),
      columnHelper.accessor('depositAPR', {
        header: ({ header }) => (
          <HeaderCell header={header} definitionTooltipId="depositAPR">
            Deposit APR
          </HeaderCell>
        ),
        cell: (context) => {
          const depositAPR =
            context.getValue<MoneyMarketsTableItem['depositAPR']>();
          return <PercentageCell fraction={depositAPR} />;
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
        cell: (context) => {
          const borrowAPR =
            context.getValue<MoneyMarketsTableItem['borrowAPR']>();
          return <PercentageCell fraction={borrowAPR} />;
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('totalDeposited', {
        header: ({ header }) => (
          <HeaderCell header={header}>Total Deposited</HeaderCell>
        ),
        cell: (context) => {
          const { amount, valueUsd } =
            context.getValue<MoneyMarketsTableItem['totalDeposited']>();
          return (
            <StackedAmountValueCell
              size={amount}
              valueUsd={valueUsd}
              symbol={context.row.original.metadata.token.symbol}
              sizeFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
              valueFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_INT}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('amount'),
        meta: {
          cellContainerClassName: 'w-48',
        },
      }),
      columnHelper.accessor('totalBorrowed', {
        header: ({ header }) => (
          <HeaderCell header={header}>Total Borrowed</HeaderCell>
        ),
        cell: (context) => {
          const { amount, valueUsd } =
            context.getValue<MoneyMarketsTableItem['totalBorrowed']>();
          return (
            <StackedAmountValueCell
              size={amount}
              valueUsd={valueUsd}
              symbol={context.row.original.metadata.token.symbol}
              sizeFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
              valueFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_INT}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('amount'),
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('utilizationRatioFrac', {
        header: ({ header }) => (
          <HeaderCell
            definitionTooltipId="moneyMarketsUtilizationRatio"
            header={header}
          >
            Utilization Ratio
          </HeaderCell>
        ),
        cell: (context) => {
          return <PercentageCell fraction={context.getValue()} />;
        },
        meta: {
          cellContainerClassName: 'w-36 grow',
        },
        sortingFn: bigDecimalSortFn,
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
  }, [disableFavoriteButton, show, toggleIsFavoritedMarket]);

  return (
    <SeparatedRowDataTable
      isLoading={isLoading}
      columns={columns}
      data={moneyMarkets}
    />
  );
}
