import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { WithClassnames } from '@vertex-protocol/web-common';
import { DataTable } from 'client/components/DataTable/DataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { StackedTokenPairCell } from 'client/modules/tables/cells/StackedTokenPairCell';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { useMemo } from 'react';
import {
  HistoricalLpEvent,
  useHistoricalLpEventsTable,
} from '../hooks/useHistoricalLpEventsTable';
import { LpEventTypeCell } from './cells/LpEventTypeCell';

const columnHelper = createColumnHelper<HistoricalLpEvent>();

export function HistoricalLpEventsTable({ className }: WithClassnames) {
  const {
    mappedData: pools,
    paginationState,
    pageCount,
    isLoading,
    setPaginationState,
  } = useHistoricalLpEventsTable();

  const columns: ColumnDef<HistoricalLpEvent, any>[] = useMemo(() => {
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
      columnHelper.accessor('metadata', {
        header: ({ header }) => <HeaderCell header={header}>Pool</HeaderCell>,
        cell: (context) => {
          return <StackedTokenPairCell metadata={context.getValue()} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor((row) => row.lpAmount, {
        id: 'actionType',
        header: ({ header }) => <HeaderCell header={header}>Action</HeaderCell>,
        cell: (context) => {
          return <LpEventTypeCell amount={context.getValue()} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-24',
        },
      }),
      columnHelper.accessor('lpValueUsd', {
        header: ({ header }) => <HeaderCell header={header}>Value</HeaderCell>,
        cell: (context) => {
          return <CurrencyCell value={context.getValue()} />;
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('lpSize', {
        header: ({ header }) => <HeaderCell header={header}>Amount</HeaderCell>,
        cell: (context) => {
          return (
            <AmountWithSymbolCell
              amount={context.getValue()}
              symbol="LP Tokens"
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('amountChanges', {
        header: ({ header }) => (
          <HeaderCell
            header={header}
            definitionTooltipId="historicalLpChangeInBalances"
          >
            Change In Balances
          </HeaderCell>
        ),
        cell: (context) => {
          const { baseAmount, quoteAmount } =
            context.getValue<HistoricalLpEvent['amountChanges']>();
          const metadata = context.row.original.metadata;
          return (
            <StackedTableCell
              top={
                <AmountWithSymbolCell
                  amount={baseAmount}
                  symbol={metadata.base.symbol}
                  formatSpecifier={
                    CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO
                  }
                />
              }
              bottom={
                <AmountWithSymbolCell
                  amount={quoteAmount}
                  symbol={metadata.quote.symbol}
                  formatSpecifier={
                    CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO
                  }
                />
              }
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-36 grow',
        },
      }),
    ];
  }, []);
  return (
    <DataTable
      columns={columns}
      data={pools}
      isLoading={isLoading}
      tableContainerClassName={className}
      emptyState={<EmptyTablePlaceholder type="pools_history" />}
      paginationState={paginationState}
      pageCount={pageCount}
      setPaginationState={setPaginationState}
      dataRowClassName="h-20"
      hasBackground
    />
  );
}
