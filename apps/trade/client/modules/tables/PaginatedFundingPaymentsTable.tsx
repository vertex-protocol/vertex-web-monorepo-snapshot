import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import {
  CustomNumberFormatSpecifier,
  getMarketSizeFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { PercentageCell } from 'client/modules/tables/cells/PercentageCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import {
  FundingPaymentsTableItem,
  useFundingPaymentsTable,
} from 'client/modules/tables/hooks/useFundingPaymentsTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<FundingPaymentsTableItem>();

export const PaginatedFundingPaymentsTable = ({
  className,
}: WithClassnames) => {
  const {
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
    isLoading,
  } = useFundingPaymentsTable({
    pageSize: 10,
    enablePagination: true,
  });

  const columns: ColumnDef<FundingPaymentsTableItem, any>[] = useMemo(() => {
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
          <HeaderCell header={header}>Market / Side</HeaderCell>
        ),
        cell: ({ getValue }) => {
          const marketInfo = getValue<FundingPaymentsTableItem['marketInfo']>();
          return (
            <MarketInfoWithSideCell
              alwaysShowOrderDirection={false}
              marketInfo={marketInfo}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('positionSize', {
        header: ({ header }) => (
          <HeaderCell header={header}>Position</HeaderCell>
        ),
        cell: (context) => {
          const positionSize =
            context.getValue<FundingPaymentsTableItem['positionSize']>();
          const symbol = context.row.original.marketInfo.symbol;
          return (
            <AmountWithSymbolCell
              amount={positionSize}
              symbol={symbol}
              formatSpecifier={getMarketSizeFormatSpecifier(
                context.row.original.marketInfo.sizeIncrement,
              )}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('notionalValueUsd', {
        header: ({ header }) => (
          <HeaderCell header={header}>Notional</HeaderCell>
        ),
        cell: (context) => {
          const notionalValue =
            context.getValue<FundingPaymentsTableItem['notionalValueUsd']>();
          return <CurrencyCell value={notionalValue} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('fundingRateFrac', {
        header: ({ header }) => (
          <HeaderCell header={header}>Funding Rate</HeaderCell>
        ),
        cell: (context) => {
          const fundingRateFrac =
            context.getValue<FundingPaymentsTableItem['fundingRateFrac']>();
          return (
            <PercentageCell
              fraction={fundingRateFrac}
              formatSpecifier={
                PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_4DP
              }
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('fundingPaymentQuote', {
        header: ({ header }) => (
          <HeaderCell header={header}>Funding Payment</HeaderCell>
        ),
        cell: (context) => {
          const fundingPaymentQuote =
            context.getValue<FundingPaymentsTableItem['fundingPaymentQuote']>();
          return (
            <AmountWithSymbolCell
              amount={fundingPaymentQuote}
              symbol={context.row.original.marketInfo.quoteSymbol}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-36',
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
      emptyState={<EmptyTablePlaceholder type="funding_payments" />}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
      pageCount={pageCount}
      hasBackground
    />
  );
};
