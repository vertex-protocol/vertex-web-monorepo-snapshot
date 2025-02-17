import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { OrderTypeCell } from 'client/modules/tables/cells/OrderTypeCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { useHistoricalTradesTable } from 'client/modules/tables/hooks/useHistoricalTradesTable';
import { HistoricalTradesTableItem } from 'client/modules/tables/types/HistoricalTradesTableItem';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

interface Props {
  marketFilter?: MarketFilter;
  pageSize: number;
  showPagination?: boolean;
  hasBackground?: boolean;
}

const columnHelper = createColumnHelper<HistoricalTradesTableItem>();

export function PaginatedHistoricalTradesTable({
  pageSize,
  showPagination,
  hasBackground,
  marketFilter,
}: Props) {
  const {
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
    isLoading,
  } = useHistoricalTradesTable({
    pageSize,
    enablePagination: !!showPagination,
    marketFilter,
  });

  const columns: ColumnDef<HistoricalTradesTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('timestampMillis', {
        header: ({ header }) => <HeaderCell header={header}>Time</HeaderCell>,
        cell: (context) => (
          <DateTimeCell timestampMillis={context.getValue()} />
        ),
        sortingFn: 'basic',
        meta: {
          cellContainerClassName: 'w-32',
          withLeftPadding: true,
        },
      }),
      columnHelper.accessor('marketInfo', {
        header: ({ header }) => (
          <HeaderCell header={header}>Market / Action</HeaderCell>
        ),
        cell: (context) => (
          <MarketInfoWithSideCell
            alwaysShowOrderDirection
            marketInfo={context.getValue()}
          />
        ),
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('orderType', {
        header: ({ header }) => <HeaderCell header={header}>Type</HeaderCell>,
        cell: (context) => (
          <OrderTypeCell
            orderType={context.getValue()}
            marginModeType={context.row.original.marginModeType}
          />
        ),
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('filledPrice', {
        header: ({ header }) => (
          <HeaderCell header={header}>Avg. Price</HeaderCell>
        ),
        cell: (context) => (
          <NumberCell
            value={context.getValue()}
            formatSpecifier={context.row.original.marketPriceFormatSpecifier}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('filledAmountAbs', {
        header: ({ header }) => <HeaderCell header={header}>Amount</HeaderCell>,
        cell: (context) => (
          <AmountWithSymbolCell
            amount={context.getValue()}
            symbol={context.row.original.marketInfo.symbol}
            formatSpecifier={context.row.original.marketSizeFormatSpecifier}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('tradeTotalCost', {
        header: ({ header }) => <HeaderCell header={header}>Total</HeaderCell>,
        cell: (context) => (
          <AmountWithSymbolCell
            amount={context.getValue()}
            symbol={context.row.original.marketInfo.quoteSymbol}
            formatSpecifier={context.row.original.quoteSizeFormatSpecifier}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('tradeFeeQuote', {
        header: ({ header }) => (
          <HeaderCell header={header}>Trade Fee</HeaderCell>
        ),
        cell: (context) => (
          <AmountWithSymbolCell
            amount={context.getValue()}
            symbol={context.row.original.marketInfo.quoteSymbol}
            formatSpecifier={context.row.original.quoteSizeFormatSpecifier}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32 grow',
        },
      }),
    ];
  }, []);

  return (
    <DataTable
      columns={columns}
      data={mappedData}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="trades_history" />}
      paginationState={showPagination ? paginationState : undefined}
      setPaginationState={showPagination ? setPaginationState : undefined}
      pageCount={showPagination ? pageCount : 1}
      hasBackground={hasBackground}
    />
  );
}
