import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { WithdrawalStatusCell } from 'client/pages/Portfolio/subpages/History/components/cells/WithdrawalStatusCell';
import {
  HistoricalCollateralEventsTableItem,
  useHistoricalCollateralEventsTable,
} from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalCollateralEventsTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<HistoricalCollateralEventsTableItem>();

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

  const columns: ColumnDef<HistoricalCollateralEventsTableItem, any>[] =
    useMemo(() => {
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
        columnHelper.accessor('token', {
          header: ({ header }) => (
            <HeaderCell header={header}>Asset</HeaderCell>
          ),
          cell: (context) => {
            const metadata =
              context.getValue<HistoricalCollateralEventsTableItem['token']>();
            return (
              <MarketProductInfoCell
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
          header: ({ header }) => (
            <HeaderCell header={header}>Amount</HeaderCell>
          ),
          cell: (context) => (
            <AmountWithSymbolCell
              amount={context.getValue()}
              symbol={context.row.original.token.symbol}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
            />
          ),
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-40',
          },
        }),
        columnHelper.accessor('valueUsd', {
          header: ({ header }) => (
            <HeaderCell header={header}>Value</HeaderCell>
          ),
          cell: (context) => <CurrencyCell value={context.getValue()} />,
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-28',
          },
        }),
        columnHelper.accessor('isProcessing', {
          header: ({ header }) => (
            <HeaderCell header={header}>Status</HeaderCell>
          ),
          cell: (context) => {
            const isProcessing =
              context.getValue<
                HistoricalCollateralEventsTableItem['isProcessing']
              >();

            const {
              productId,
              submissionIndex,
              amount,
              hasWithdrawPoolLiquidity,
            } = context.row.original;
            return (
              <WithdrawalStatusCell
                isProcessing={isProcessing}
                hasWithdrawPoolLiquidity={hasWithdrawPoolLiquidity}
                productId={productId}
                submissionIndex={submissionIndex}
                amount={amount}
              />
            );
          },
          meta: {
            cellContainerClassName: 'w-64 grow',
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
