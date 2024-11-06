import { createColumnHelper, Row } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LpActionsCell } from 'client/modules/pools/components/LpActionsCell';
import { LpTableItem, useLpTable } from 'client/modules/pools/hooks/useLpTable';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { PercentageCell } from 'client/modules/tables/cells/PercentageCell';
import { PnlCell } from 'client/modules/tables/cells/PnlCell';
import { StackedTokenPairCell } from 'client/modules/tables/cells/StackedTokenPairCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<LpTableItem>();

export function LpMarketsTable({ className }: WithClassnames) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { data: pools, isLoading } = useLpTable({
    showZeroBalances: true,
  });

  const { show } = useDialog();
  const isDesktop = useIsDesktop();
  const isConnected = useIsConnected();

  const columns: ColumnDef<LpTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('metadata', {
        header: ({ header }) => <HeaderCell header={header}>Pool</HeaderCell>,
        cell: ({ getValue }) => {
          const metadata = getValue<LpTableItem['metadata']>();
          return <StackedTokenPairCell metadata={metadata} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-36',
          withLeftPadding: true,
        },
      }),
      columnHelper.accessor('yieldFraction', {
        header: ({ header }) => (
          <HeaderCell header={header} definitionTooltipId="lpPoolAPR">
            APR
          </HeaderCell>
        ),
        cell: (context) => {
          return <PercentageCell fraction={context.getValue()} />;
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-20',
        },
      }),
      columnHelper.accessor('tvlUsd', {
        header: ({ header }) => (
          <HeaderCell header={header} definitionTooltipId="lpTVL">
            TVL
          </HeaderCell>
        ),
        cell: (context) => {
          return <CurrencyCell value={context.getValue()} />;
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('volume', {
        header: ({ header }) => (
          <HeaderCell header={header} definitionTooltipId="lpMarkets24hVolume">
            24h Volume{' '}
            <span className="text-text-tertiary">
              {primaryQuoteToken.symbol}
            </span>
          </HeaderCell>
        ),
        cell: (context) => {
          return (
            <CurrencyCell
              value={context.getValue()}
              formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      // Border column
      columnHelper.display({
        id: 'border',
        header: () => <Divider vertical />,
        cell: () => <Divider vertical />,
        meta: {
          cellContainerClassName: 'px-4 py-3',
        },
      }),
      columnHelper.accessor('valueUsd', {
        header: ({ header }) => (
          <HeaderCell header={header}>My Liquidity</HeaderCell>
        ),
        cell: (context) => {
          const valueUsd = context.getValue<LpTableItem['valueUsd']>();
          return <CurrencyCell value={valueUsd} />;
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('amounts', {
        header: ({ header }) => (
          <HeaderCell header={header}>Position</HeaderCell>
        ),
        cell: (context) => {
          const { lpAmount } = context.getValue<LpTableItem['amounts']>();
          return (
            <AmountWithSymbolCell
              amount={lpAmount}
              symbol="LP Tokens"
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            />
          );
        },
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('unrealizedPnl', {
        header: ({ header }) => (
          <HeaderCell header={header} definitionTooltipId="lpPositionPnL">
            PnL
          </HeaderCell>
        ),
        cell: (context) => {
          const value = context.getValue<LpTableItem['unrealizedPnl']>();
          return <PnlCell value={value} />;
        },
        meta: {
          cellContainerClassName: 'w-36 grow',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => null,
        cell: LpActionsCell,
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-52',
        },
      }),
    ];
  }, [primaryQuoteToken.symbol]);

  const onRowClicked = (row: Row<LpTableItem>) => {
    if (isConnected && !isDesktop) {
      show({
        type: 'lp_market_details',
        params: row.original,
      });
    }
  };

  return (
    <DataTable
      hasBackground
      columns={columns}
      data={pools}
      isLoading={isLoading}
      tableContainerClassName={className}
      emptyState={<EmptyTablePlaceholder type="pool_positions" />}
      dataRowClassName="h-20"
      onRowClicked={onRowClicked}
    />
  );
}
