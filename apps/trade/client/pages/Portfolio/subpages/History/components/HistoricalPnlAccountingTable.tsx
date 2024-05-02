import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { ProductEngineType } from '@vertex-protocol/client';
import { DataTable } from 'client/components/DataTable/DataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { PnlCell } from 'client/modules/tables/cells/PnlCell';
import { ProductInfoCell } from 'client/modules/tables/cells/ProductInfoCell';
import { getMarketSizeFormatSpecifier } from 'client/utils/formatNumber/getMarketSizeFormatSpecifier';
import { useMemo } from 'react';
import {
  HistoricalPnlAccountingItem,
  useHistoricalPnlAccountingTable,
} from '../hooks/useHistoricalPnlAccountingTable';

const columnHelper = createColumnHelper<HistoricalPnlAccountingItem>();

export function HistoricalPnlAccountingTable() {
  const {
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
    isLoading,
  } = useHistoricalPnlAccountingTable();

  const columns: ColumnDef<HistoricalPnlAccountingItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('timestampMillis', {
        header: ({ header }) => <HeaderCell header={header}>Time</HeaderCell>,
        cell: (context) => (
          <DateTimeCell timestampMillis={context.getValue()} />
        ),
        sortingFn: 'basic',
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('marketInfo', {
        header: ({ header }) => (
          <HeaderCell header={header}>Market / Action</HeaderCell>
        ),
        cell: (context) => {
          const marketInfo =
            context.getValue<HistoricalPnlAccountingItem['marketInfo']>();

          if (marketInfo.productType === ProductEngineType.PERP) {
            return (
              <MarketInfoWithSideCell
                marketInfo={marketInfo}
                alwaysShowOrderDirection={false}
              />
            );
          }
          return (
            <ProductInfoCell
              symbol={marketInfo.marketName}
              iconSrc={marketInfo.icon.asset}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('preEventBalanceAmount', {
        header: ({ header }) => (
          <HeaderCell header={header}>Pre Balance</HeaderCell>
        ),
        cell: (context) => {
          return (
            <AmountWithSymbolCell
              amount={context.getValue()}
              symbol={context.row.original.marketInfo.symbol}
              formatSpecifier={getMarketSizeFormatSpecifier(
                context.row.original.marketInfo.sizeIncrement,
              )}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('entryPrice', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="averageEntryPrice" header={header}>
            Entry Price
          </HeaderCell>
        ),
        cell: (context) => {
          return (
            <NumberCell
              value={context.getValue()}
              formatSpecifier={context.row.original.marketPriceFormatSpecifier}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('exitPrice', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="realizedPnl" header={header}>
            Exit Price
          </HeaderCell>
        ),
        cell: (context) => {
          return (
            <NumberCell
              value={context.getValue()}
              formatSpecifier={context.row.original.marketPriceFormatSpecifier}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('filledAmount', {
        header: ({ header }) => (
          <HeaderCell header={header}>Fill Amount</HeaderCell>
        ),
        cell: (context) => {
          return (
            <AmountWithSymbolCell
              amount={context.getValue()}
              symbol={context.row.original.marketInfo.symbol}
              formatSpecifier={getMarketSizeFormatSpecifier(
                context.row.original.marketInfo.sizeIncrement,
              )}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('realizedPnlUsd', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="realizedPnl" header={header}>
            PnL
          </HeaderCell>
        ),
        cell: (context) => {
          return <PnlCell value={context.getValue()} />;
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
    ];
  }, []);

  return (
    <DataTable
      columns={columns}
      data={mappedData}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="realized_pnl_history" />}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
      pageCount={pageCount}
      hasBackground
    />
  );
}
