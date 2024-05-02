import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTable } from 'client/components/DataTable/DataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import {
  HistoricalSettlementEvent,
  useHistoricalSettlementsTable,
} from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalSettlementsTable';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<HistoricalSettlementEvent>();

export function HistoricalSettlementsTable() {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const {
    mappedData,
    isLoading,
    paginationState,
    setPaginationState,
    pageCount,
  } = useHistoricalSettlementsTable();

  const columns: ColumnDef<HistoricalSettlementEvent, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('timestampMillis', {
        header: ({ header }) => <HeaderCell header={header}>Time</HeaderCell>,
        cell: (context) => (
          <DateTimeCell timestampMillis={context.getValue()} />
        ),
        sortingFn: 'basic',
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('marketInfo', {
        header: ({ header }) => <HeaderCell header={header}>Market</HeaderCell>,
        cell: (context) => (
          <MarketInfoWithSideCell
            alwaysShowOrderDirection={false}
            marketInfo={context.getValue()}
          />
        ),
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
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
            symbol={primaryQuoteToken.symbol}
            formatSpecifier={CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36 grow',
        },
      }),
    ];
  }, [primaryQuoteToken.symbol]);

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
