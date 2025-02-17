'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { TitleHeaderCell } from 'client/modules/tables/cells/TitleHeaderCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { CalculatorIconHeaderCell } from 'client/pages/Portfolio/subpages/MarginManager/tables/cells/CalculatorIconHeaderCell';
import { MarginManagerActionsCell } from 'client/pages/Portfolio/subpages/MarginManager/tables/cells/MarginManagerActionsCell';
import { MarginWeightCell } from 'client/pages/Portfolio/subpages/MarginManager/tables/cells/MarginWeightCell';
import { MarginWeightHeaderCell } from 'client/pages/Portfolio/subpages/MarginManager/tables/cells/MarginWeightHeaderCell';
import {
  MarginManagerSpreadTableItem,
  useMarginManagerSpreadsTable,
} from 'client/pages/Portfolio/subpages/MarginManager/tables/hooks/useMarginManagerSpreadsTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<MarginManagerSpreadTableItem>();

export function MarginManagerSpreadsTable({ className }: WithClassnames) {
  const { data: pools, isLoading } = useMarginManagerSpreadsTable();

  const columns: ColumnDef<MarginManagerSpreadTableItem, any>[] =
    useMemo(() => {
      return [
        columnHelper.accessor('productMetadata', {
          header: ({ header }) => (
            <TitleHeaderCell header={header}>Spreads</TitleHeaderCell>
          ),
          cell: ({ getValue }) => {
            const spotMetadata =
              getValue<MarginManagerSpreadTableItem['productMetadata']>();
            return (
              <MarketProductInfoCell
                symbol={spotMetadata.symbol}
                iconSrc={spotMetadata.icon.asset}
              />
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-36',
            withLeftPadding: true,
          },
        }),
        columnHelper.accessor('spreadSize', {
          header: ({ header }) => (
            <HeaderCell
              definitionTooltipId="marginManagerSizeOfSpread"
              header={header}
            >
              Size of Spread
            </HeaderCell>
          ),
          cell: (context) => {
            const symbol = context.row.original.productMetadata.symbol;

            return (
              <AmountWithSymbolCell
                formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
                amount={context.getValue()}
                symbol={symbol}
              />
            );
          },
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-36',
          },
        }),
        columnHelper.accessor('spotSpreadAmount', {
          header: ({ header }) => (
            <HeaderCell
              definitionTooltipId="marginManagerSpotPortionOfSpread"
              header={header}
            >
              Spot Portion
            </HeaderCell>
          ),
          cell: (context) => {
            const { symbol } = context.row.original.productMetadata;

            return (
              <AmountWithSymbolCell
                amount={context.getValue()}
                symbol={symbol}
                formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              />
            );
          },
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.accessor('perpSpreadAmount', {
          header: ({ header }) => (
            <HeaderCell
              definitionTooltipId="marginManagerPerpPortionOfSpread"
              header={header}
            >
              Perp Portion
            </HeaderCell>
          ),
          cell: (context) => {
            const { symbol } = context.row.original.productMetadata;

            return (
              <AmountWithSymbolCell
                amount={context.getValue()}
                symbol={symbol}
                formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              />
            );
          },
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-32 grow',
          },
        }),
        columnHelper.accessor('initialHealthBenefit', {
          header: ({ header }) => (
            <MarginWeightHeaderCell
              isInitial
              header={header}
              marginLabel="Benefit"
            />
          ),
          cell: ({ getValue }) => {
            return <MarginWeightCell marginWeightMetrics={getValue()} />;
          },
          sortingFn: getKeyedBigDecimalSortFn('marginUsd'),
          meta: {
            cellContainerClassName: 'w-44',
          },
        }),
        columnHelper.accessor('maintenanceHealthBenefit', {
          header: ({ header }) => (
            <MarginWeightHeaderCell
              isInitial={false}
              header={header}
              marginLabel="Benefit"
            />
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
              definitionTooltipId="marginManagerSpreadMarginCalc"
              header={header}
            />
          ),
          cell: (context) => {
            const { spotProductId, perpProductId } = context.row.original;

            return (
              <MarginManagerActionsCell
                actions={[
                  {
                    type: 'trade_spot',
                    label: 'Trade spot',
                    productId: spotProductId,
                  },
                  {
                    type: 'trade_perp',
                    label: 'Trade perp',
                    productId: perpProductId,
                  },
                ]}
              />
            );
          },
          meta: {
            // Adding widths to align weight/margin cols and breakpointing to address gap between them and actions cell on mobile
            cellContainerClassName: 'w-16 sm:w-32',
          },
        }),
      ];
    }, []);

  return (
    <DataTable
      columns={columns}
      data={pools}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="spreads" />}
      hasBackground
      tableContainerClassName={className}
    />
  );
}
