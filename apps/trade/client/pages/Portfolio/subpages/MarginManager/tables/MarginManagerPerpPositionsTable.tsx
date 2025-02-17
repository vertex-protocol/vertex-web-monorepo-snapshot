'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import {
  getMarketSizeFormatSpecifier,
  PresetNumberFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { PnlCell } from 'client/modules/tables/cells/PnlCell';
import { TitleHeaderCell } from 'client/modules/tables/cells/TitleHeaderCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import { CalculatorIconHeaderCell } from 'client/pages/Portfolio/subpages/MarginManager/tables/cells/CalculatorIconHeaderCell';
import { MarginWeightCell } from 'client/pages/Portfolio/subpages/MarginManager/tables/cells/MarginWeightCell';
import { MarginWeightHeaderCell } from 'client/pages/Portfolio/subpages/MarginManager/tables/cells/MarginWeightHeaderCell';
import {
  MarginManagerPerpPositionsTableItem,
  useMarginManagerPerpPositionsTable,
} from 'client/pages/Portfolio/subpages/MarginManager/tables/hooks/useMarginManagerPerpPositionsTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<MarginManagerPerpPositionsTableItem>();

export function MarginManagerPerpPositionsTable({ className }: WithClassnames) {
  const { show } = useDialog();
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { positions, isLoading } = useMarginManagerPerpPositionsTable();

  const isConnected = useIsConnected();

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
            cellContainerClassName: 'w-36',
            withLeftPadding: true,
          },
        }),
        columnHelper.accessor('positionAmount', {
          header: ({ header }) => (
            <HeaderCell header={header}>Position</HeaderCell>
          ),
          cell: (context) => {
            const { sizeIncrement, symbol } = context.row.original.marketInfo;

            return (
              <AmountWithSymbolCell
                amount={context.getValue()}
                formatSpecifier={getMarketSizeFormatSpecifier(sizeIncrement)}
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
                  size="xs"
                  title="Close Position"
                  onClick={getTableButtonOnClickHandler(() => {
                    show({
                      type: 'close_position',
                      params: {
                        productId,
                        // Margin manager only shows cross positions
                        isoSubaccountName: undefined,
                      },
                    });
                  })}
                  disabled={!isConnected}
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
    }, [primaryQuoteToken.symbol, isConnected, show]);

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
