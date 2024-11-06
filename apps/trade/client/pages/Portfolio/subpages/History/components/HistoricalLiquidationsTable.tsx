import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { LiquidationAmountInfoCell } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/LiquidationAmountInfoCell';
import { LiquidationBalanceChangesCell } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationBalanceChangesCell';
import { LiquidationOraclePriceCell } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationOraclePriceCell';
import { LiquidationTypeCell } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationTypeCell';
import {
  HistoricalLiquidationsTableItem,
  useHistoricalLiquidationsTable,
} from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<HistoricalLiquidationsTableItem>();

export function HistoricalLiquidationsTable() {
  const { show } = useDialog();
  const {
    mappedData,
    isLoading,
    pageCount,
    paginationState,
    setPaginationState,
  } = useHistoricalLiquidationsTable();

  const columns: ColumnDef<HistoricalLiquidationsTableItem, any>[] =
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
        columnHelper.accessor('liquidatedBalanceTypes', {
          header: ({ header }) => (
            <HeaderCell header={header}>
              <DefinitionTooltip definitionId="historicalLiquidationType">
                Type
              </DefinitionTooltip>
            </HeaderCell>
          ),
          cell: (context) => {
            const liquidatedBalanceTypes = context.getValue();
            return (
              <LiquidationTypeCell
                liquidatedBalanceTypes={liquidatedBalanceTypes}
              />
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.display({
          id: 'liquidationDetails',
          header: ({ header }) => (
            <HeaderCell header={header}>
              <DefinitionTooltip definitionId="historicalLiquidationAffectedPositions">
                Liquidation
              </DefinitionTooltip>
            </HeaderCell>
          ),
          cell: (context) => (
            <LiquidationAmountInfoCell
              spot={context.row.original.spot}
              perp={context.row.original.perp}
              decomposedLps={context.row.original.decomposedLps}
            />
          ),
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-72',
          },
        }),
        columnHelper.display({
          id: 'tradingOraclePrice',
          header: ({ header }) => (
            <HeaderCell
              header={header}
              definitionTooltipId="historicalLiquidationOraclePrice"
            >
              Oracle Price
            </HeaderCell>
          ),
          cell: (context) => (
            <LiquidationOraclePriceCell
              decomposedLps={context.row.original.decomposedLps}
              spot={context.row.original.spot}
              perp={context.row.original.perp}
            />
          ),
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-28',
          },
        }),
        columnHelper.display({
          id: 'balanceChanges',
          header: ({ header }) => (
            <HeaderCell
              header={header}
              definitionTooltipId="historicalLiquidationPositionChanges"
            >
              Position Changes
            </HeaderCell>
          ),
          cell: (context) => (
            <LiquidationBalanceChangesCell
              decomposedLps={context.row.original.decomposedLps}
              spot={context.row.original.spot}
              perp={context.row.original.perp}
            />
          ),
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-40 grow',
          },
        }),
        columnHelper.display({
          id: 'actions',
          header: () => null,
          cell: (context) => {
            return (
              <TableCell className="pointer-events-auto pr-4">
                <TextButton
                  onClick={getTableButtonOnClickHandler(() => {
                    show({
                      type: 'pre_liquidation_details',
                      params: {
                        liquidationTimestampMillis:
                          context.row.original.timestampMillis,
                      },
                    });
                  })}
                >
                  <Icons.MagnifyingGlass size={20} />
                </TextButton>
              </TableCell>
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-max',
          },
        }),
      ];
    }, [show]);

  return (
    <DataTable
      columns={columns}
      data={mappedData}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="liquidations_history" />}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
      pageCount={pageCount}
      fitDataRowHeight
      hasBackground
    />
  );
}
