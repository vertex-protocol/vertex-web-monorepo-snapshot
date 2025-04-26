import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import {
  CustomNumberFormatSpecifier,
  useVertexMetadataContext,
  VLP_TOKEN_INFO,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Pill } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import {
  HistoricalVlpEventsTableItem,
  useHistoricalVlpEventsTable,
} from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalVlpEventsTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<HistoricalVlpEventsTableItem>();

export function HistoricalVlpEventsTable({ className }: WithClassnames) {
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();
  const {
    mappedData: pools,
    paginationState,
    pageCount,
    isLoading,
    setPaginationState,
  } = useHistoricalVlpEventsTable();

  const columns: ColumnDef<HistoricalVlpEventsTableItem, any>[] =
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
        columnHelper.accessor('action', {
          header: ({ header }) => (
            <HeaderCell header={header}>Action</HeaderCell>
          ),
          cell: (context) => {
            const action =
              context.getValue<HistoricalVlpEventsTableItem['action']>();
            return (
              <TableCell>
                <Pill
                  colorVariant="primary"
                  sizeVariant="xs"
                  className="capitalize"
                >
                  {action}
                </Pill>
              </TableCell>
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-30',
          },
        }),
        columnHelper.accessor('amountChanges', {
          header: ({ header }) => (
            <HeaderCell
              header={header}
              definitionTooltipId="historicalVlpChangeInBalances"
            >
              Change In Balances
            </HeaderCell>
          ),
          cell: (context) => {
            const { vlpAmount, primaryQuoteAmount } =
              context.getValue<HistoricalVlpEventsTableItem['amountChanges']>();

            return (
              <StackedTableCell
                top={
                  <AmountWithSymbolCell
                    amount={vlpAmount}
                    symbol={VLP_TOKEN_INFO.symbol}
                    formatSpecifier={
                      CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO
                    }
                  />
                }
                bottom={
                  <AmountWithSymbolCell
                    amount={primaryQuoteAmount}
                    symbol={primaryQuoteSymbol}
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
    }, [primaryQuoteSymbol]);

  return (
    <DataTable
      columns={columns}
      data={pools}
      isLoading={isLoading}
      tableContainerClassName={className}
      emptyState={<EmptyTablePlaceholder type="vlp_history" />}
      paginationState={paginationState}
      pageCount={pageCount}
      setPaginationState={setPaginationState}
      hasBackground
    />
  );
}
