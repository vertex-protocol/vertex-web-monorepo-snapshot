import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { DataTable } from 'client/components/DataTable/DataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { PnlCell } from 'client/modules/tables/cells/PnlCell';
import { TitleHeaderCell } from 'client/modules/tables/cells/TitleHeaderCell';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { useMemo } from 'react';
import { CalculatorIconHeaderCell } from './cells/CalculatorIconHeaderCell';
import { MarginWeightCell } from './cells/MarginWeightCell';
import { MarginWeightHeaderCell } from './cells/MarginWeightHeaderCell';
import {
  MarginManagerPerpPositionsTableItem,
  useMarginManagerPerpPositionsTable,
} from './hooks/useMarginManagerPerpPositionsTable';

const columnHelper = createColumnHelper<MarginManagerPerpPositionsTableItem>();

export function MarginManagerPerpPositionsTable({ className }: WithClassnames) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { positions, isLoading } = useMarginManagerPerpPositionsTable();

  const { show } = useDialog();

  const userActionState = useUserActionState();
  const disableClosePosition = userActionState !== 'allow_all';

  const columns: ColumnDef<MarginManagerPerpPositionsTableItem, any>[] =
    useMemo(() => {
      return [
        columnHelper.accessor('marketInfo', {
          header: ({ header }) => (
            <TitleHeaderCell header={header}>Perps</TitleHeaderCell>
          ),
          cell: (context) => (
            <MarketInfoWithSideCell
              marketInfo={context.getValue()}
              alwaysShowOrderDirection={false}
            />
          ),
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.accessor('positionAmount', {
          header: ({ header }) => (
            <HeaderCell header={header}>Position</HeaderCell>
          ),
          cell: (context) => {
            const { priceIncrement, symbol } = context.row.original.marketInfo;

            return (
              <AmountWithSymbolCell
                amount={context.getValue()}
                formatSpecifier={getMarketPriceFormatSpecifier(priceIncrement)}
                symbol={symbol}
              />
            );
          },
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-36',
          },
        }),
        columnHelper.accessor('notionalValueUsd', {
          header: ({ header }) => (
            <HeaderCell header={header}>Notional</HeaderCell>
          ),
          cell: (context) => {
            return (
              <CurrencyCell
                value={context.getValue()}
                formatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
              />
            );
          },
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.accessor('estimatedPnlUsd', {
          header: ({ header }) => (
            <HeaderCell
              definitionTooltipId="estimatedPositionPnL"
              header={header}
            >
              Est. PnL
            </HeaderCell>
          ),
          cell: (context) => {
            return <PnlCell value={context.getValue()} />;
          },
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.accessor('unsettledQuoteAmount', {
          header: ({ header }) => (
            <HeaderCell
              header={header}
              definitionTooltipId="marginManagerPerpPositionsUnsettledQuoteInfo"
            >
              Unsettled
            </HeaderCell>
          ),
          cell: ({ getValue }) => {
            return (
              <AmountWithSymbolCell
                amount={getValue()}
                formatSpecifier={PresetNumberFormatSpecifier.SIGNED_NUMBER_2DP}
                symbol={primaryQuoteToken.symbol}
              />
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-32 grow',
          },
        }),
        columnHelper.accessor('initialHealth', {
          header: ({ header }) => (
            <MarginWeightHeaderCell isInitial header={header} />
          ),
          cell: ({ getValue }) => {
            return <MarginWeightCell marginWeightMetrics={getValue()} />;
          },
          sortingFn: getKeyedBigDecimalSortFn('marginUsd'),
          meta: {
            cellContainerClassName: 'w-44',
          },
        }),
        columnHelper.accessor('maintenanceHealth', {
          header: ({ header }) => (
            <MarginWeightHeaderCell isInitial={false} header={header} />
          ),
          cell: ({ getValue }) => {
            return <MarginWeightCell marginWeightMetrics={getValue()} />;
          },
          sortingFn: getKeyedBigDecimalSortFn('marginUsd'),
          meta: {
            cellContainerClassName: 'w-44',
          },
        }),
        columnHelper.display({
          id: 'actions',
          header: ({ header }) => (
            <CalculatorIconHeaderCell
              definitionTooltipId="marginManagerPerpMarginCalc"
              header={header}
            />
          ),
          cell: (context) => {
            const { productId } = context.row.original;
            return (
              <TableCell className="pointer-events-auto px-4">
                <SecondaryButton
                  className="w-full"
                  destructive
                  size="sm"
                  title="Close Position"
                  onClick={getTableButtonOnClickHandler(() => {
                    show({
                      type: 'close_position',
                      params: {
                        productId,
                      },
                    });
                  })}
                  disabled={disableClosePosition}
                >
                  Close
                </SecondaryButton>
              </TableCell>
            );
          },
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
      ];
    }, [disableClosePosition, show, primaryQuoteToken.symbol]);

  return (
    <DataTable
      columns={columns}
      data={positions}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="perp_positions" />}
      hasBackground
      tableContainerClassName={className}
    />
  );
}
