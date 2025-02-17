import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { getMarketQuoteSizeFormatSpecifier } from '@vertex-protocol/react-client';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import {
  HistoricalSettlementsTableItem,
  useHistoricalSettlementsTable,
} from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalSettlementsTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<HistoricalSettlementsTableItem>();

export function HistoricalSettlementsTable() {
  const {
    mappedData,
    isLoading,
    paginationState,
    setPaginationState,
    pageCount,
  } = useHistoricalSettlementsTable();

  const columns: ColumnDef<HistoricalSettlementsTableItem, any>[] =
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
        columnHelper.accessor('marketInfo', {
          header: ({ header }) => (
            <HeaderCell header={header}>Market</HeaderCell>
          ),
          cell: (context) => (
            <MarketInfoWithSideCell
              alwaysShowOrderDirection={false}
              marketInfo={context.getValue()}
            />
          ),
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-40',
          },
        }),
        columnHelper.accessor('settlementQuoteAmount', {
          header: ({ header }) => (
            <HeaderCell header={header}>
              <DefinitionTooltip definitionId="historicalSettlement">
                Settlement
              </DefinitionTooltip>
            </HeaderCell>
          ),
          cell: (context) => (
            <AmountWithSymbolCell
              amount={context.getValue()}
              symbol={context.row.original.marketInfo.quoteSymbol}
              formatSpecifier={getMarketQuoteSizeFormatSpecifier(
                context.row.original.marketInfo.isPrimaryQuote,
                true,
              )}
            />
          ),
          sortingFn: bigDecimalSortFn,
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
      emptyState={<EmptyTablePlaceholder type="settlements_history" />}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
      pageCount={pageCount}
      hasBackground
    />
  );
}
