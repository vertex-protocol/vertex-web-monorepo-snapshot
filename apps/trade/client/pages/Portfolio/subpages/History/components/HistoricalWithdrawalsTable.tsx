import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { ProductInfoCell } from 'client/modules/tables/cells/ProductInfoCell';

import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { useMemo } from 'react';
import {
  HistoricalCollateralItem,
  useHistoricalCollateralEventsTable,
} from '../hooks/useHistoricalCollateralEventsTable';
import { WithdrawalStatusCell } from './cells/WithdrawalStatusCell';

const columnHelper = createColumnHelper<HistoricalCollateralItem>();

export function HistoricalWithdrawalsTable() {
  const {
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
    isLoading,
  } = useHistoricalCollateralEventsTable({
    eventTypes: ['withdraw_collateral'],
  });

  const columns: ColumnDef<HistoricalCollateralItem, any>[] = useMemo(() => {
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
        header: ({ header }) => <HeaderCell header={header}>Asset</HeaderCell>,
        cell: (context) => {
          const metadata =
            context.getValue<HistoricalCollateralItem['metadata']>();
          return (
            <ProductInfoCell
              symbol={metadata.symbol}
              iconSrc={metadata.icon.asset}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('size', {
        header: ({ header }) => <HeaderCell header={header}>Amount</HeaderCell>,
        cell: (context) => (
          <AmountWithSymbolCell
            amount={context.getValue()}
            symbol={context.row.original.metadata.symbol}
            formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('valueUsd', {
        header: ({ header }) => <HeaderCell header={header}>Value</HeaderCell>,
        cell: (context) => <CurrencyCell value={context.getValue()} />,
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('isPending', {
        header: ({ header }) => (
          <HeaderCell
            header={header}
            className="gap-x-1"
            definitionTooltipId="historicalWithdrawalsStatus"
          >
            Status
          </HeaderCell>
        ),
        cell: (context) => {
          const isPending =
            context.getValue<HistoricalCollateralItem['isPending']>();
          return <WithdrawalStatusCell isPending={isPending} />;
        },
        meta: {
          cellContainerClassName: 'w-36 grow',
        },
      }),
    ];
  }, []);

  return (
    <DataTable
      columns={columns}
      data={mappedData}
      isLoading={isLoading}
      paginationState={paginationState}
      emptyState={<EmptyTablePlaceholder type="withdrawals_history" />}
      setPaginationState={setPaginationState}
      pageCount={pageCount}
      hasBackground
    />
  );
}
