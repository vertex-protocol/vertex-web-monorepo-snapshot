import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { DataTable } from 'client/components/DataTable/DataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { StackedAmountValueCell } from 'client/modules/tables/cells/StackedAmountValueCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { PercentageCell } from 'client/modules/tables/cells/PercentageCell';
import {
  InterestPaymentsTableItem,
  useInterestPaymentsTable,
} from 'client/modules/tables/hooks/useInterestPaymentsTable';
import { useMemo } from 'react';
import { MarginModeTypeCell } from 'client/modules/tables/cells/MarginModeTypeCell';

const columnHelper = createColumnHelper<InterestPaymentsTableItem>();

export const PaginatedInterestPaymentsTable = ({
  className,
}: WithClassnames) => {
  const {
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
    isLoading,
  } = useInterestPaymentsTable({
    pageSize: 10,
    enablePagination: true,
  });

  const columns: ColumnDef<InterestPaymentsTableItem, any>[] = useMemo(() => {
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
        cell: ({ getValue }) => {
          const {
            token: { symbol, icon },
          } = getValue<InterestPaymentsTableItem['metadata']>();
          return <MarketProductInfoCell symbol={symbol} iconSrc={icon.asset} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('marginModeType', {
        header: ({ header }) => <HeaderCell header={header}>Type</HeaderCell>,
        cell: ({ getValue }) => {
          return <MarginModeTypeCell marginModeType={getValue()} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-20',
        },
      }),
      columnHelper.accessor('balanceAmount', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="assetBalance" header={header}>
            Balance
          </HeaderCell>
        ),
        cell: (context) => {
          const amount =
            context.getValue<InterestPaymentsTableItem['balanceAmount']>();
          const symbol = context.row.original.metadata.token.symbol;
          return (
            <AmountWithSymbolCell
              amount={amount}
              symbol={symbol}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('interestRateFrac', {
        header: ({ header }) => (
          <HeaderCell header={header}>Interest Rate</HeaderCell>
        ),
        cell: (context) => {
          const fraction =
            context.getValue<InterestPaymentsTableItem['interestRateFrac']>();
          return <PercentageCell fraction={fraction} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('interestPaidAmount', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="interestPayment" header={header}>
            Interest Payment
          </HeaderCell>
        ),
        cell: (context) => {
          const amount =
            context.getValue<InterestPaymentsTableItem['interestPaidAmount']>();
          const valueUsd = context.row.original.valueUsd;
          const symbol = context.row.original.metadata.token.symbol;
          return (
            <StackedAmountValueCell
              symbol={symbol}
              size={amount}
              valueUsd={valueUsd}
              sizeFormatSpecifier=",.5"
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
    ];
  }, []);

  return (
    <DataTable
      columns={columns}
      data={mappedData}
      isLoading={isLoading}
      tableContainerClassName={className}
      emptyState={<EmptyTablePlaceholder type="interest_payments" />}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
      pageCount={pageCount}
      hasBackground
    />
  );
};
