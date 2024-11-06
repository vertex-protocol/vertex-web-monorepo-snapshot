import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { TriggerOrderStatus } from '@vertex-protocol/trigger-client/src/types/clientTypes';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { TriggerOrderAmountWithSymbolCell } from 'client/modules/tables/cells/TriggerOrderAmountWithSymbolCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { HistoricalTriggerOrderStatusDetailsCell } from 'client/pages/Portfolio/subpages/History/components/cells/HistoricalTriggerOrderStatusDetailsCell';
import {
  HistoricalTriggerOrdersTableItem,
  useHistoricalTriggerOrdersTable,
} from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalTriggerOrdersTable';
import { startCase } from 'lodash';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<HistoricalTriggerOrdersTableItem>();

export function HistoricalTriggerOrdersTable() {
  const {
    mappedData,
    isLoading,
    paginationState,
    setPaginationState,
    pageCount,
  } = useHistoricalTriggerOrdersTable();

  const columns: ColumnDef<HistoricalTriggerOrdersTableItem, any>[] =
    useMemo(() => {
      return [
        columnHelper.accessor('timestampMillis', {
          header: ({ header }) => (
            <HeaderCell header={header}>Update Time</HeaderCell>
          ),
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
        columnHelper.accessor('price', {
          header: ({ header }) => (
            <HeaderCell definitionTooltipId="triggerPrice" header={header}>
              Trigger Price
            </HeaderCell>
          ),
          cell: (context) => (
            <NumberCell
              value={context.getValue()}
              formatSpecifier={getMarketPriceFormatSpecifier(
                context.row.original.marketInfo.priceIncrement,
              )}
            />
          ),
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.accessor('totalSize', {
          header: ({ header }) => (
            <HeaderCell header={header}>Amount</HeaderCell>
          ),
          cell: (context) => (
            <TriggerOrderAmountWithSymbolCell
              amount={context.getValue()}
              symbol={context.row.original.marketInfo.symbol}
              formatSpecifier={getMarketSizeFormatSpecifier(
                context.row.original.marketInfo.sizeIncrement,
              )}
            />
          ),
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.accessor('status', {
          id: 'statusType',
          header: ({ header }) => (
            <HeaderCell header={header}>Status</HeaderCell>
          ),
          cell: (context) => (
            <TableCell className="text-xs">
              {startCase(context.getValue<TriggerOrderStatus>().type)}
            </TableCell>
          ),
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-28',
          },
        }),
        columnHelper.accessor('status', {
          id: 'statusDetails',
          header: ({ header }) => (
            <HeaderCell header={header}>Details</HeaderCell>
          ),
          cell: (context) => (
            <HistoricalTriggerOrderStatusDetailsCell
              status={context.getValue()}
              className="pr-4"
            />
          ),
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-80 grow',
          },
        }),
      ];
    }, []);

  return (
    <DataTable
      columns={columns}
      data={mappedData}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="trigger_orders_history" />}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
      pageCount={pageCount}
      hasBackground
    />
  );
}
