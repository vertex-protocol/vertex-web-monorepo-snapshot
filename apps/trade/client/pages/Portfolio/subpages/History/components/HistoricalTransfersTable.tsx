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
import {
  HistoricalCollateralEventsTableItem,
  useHistoricalCollateralEventsTable,
} from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalCollateralEventsTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<HistoricalCollateralEventsTableItem>();

export function HistoricalTransfersTable() {
  const {
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
    isLoading,
  } = useHistoricalCollateralEventsTable({
    eventTypes: ['transfer_quote'],
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
        columnHelper.accessor('metadata', {
          header: ({ header }) => (
            <HeaderCell header={header}>Asset</HeaderCell>
          ),
          cell: (context) => {
            const metadata =
              context.getValue<
                HistoricalCollateralEventsTableItem['metadata']
              >();
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
        columnHelper.accessor('amount', {
          header: ({ header }) => (
            <HeaderCell header={header}>Balance Change</HeaderCell>
          ),
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
          header: ({ header }) => (
            <HeaderCell header={header}>Value</HeaderCell>
          ),
          cell: (context) => <CurrencyCell value={context.getValue()} />,
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
      paginationState={paginationState}
      emptyState={<EmptyTablePlaceholder type="transfers_history" />}
      setPaginationState={setPaginationState}
      pageCount={pageCount}
      hasBackground
    />
  );
}
