import { createColumnHelper, Row } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { WithClassnames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LpActionsCell } from 'client/modules/pools/components/LpActionsCell';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { PercentageCell } from 'client/modules/tables/cells/PercentageCell';
import { PnlCell } from 'client/modules/tables/cells/PnlCell';
import { StackedTokenPairCell } from 'client/modules/tables/cells/StackedTokenPairCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { useMemo } from 'react';
import { LpTableItem, useLpTable } from '../hooks/useLpTable';

const columnHelper = createColumnHelper<LpTableItem>();

export function LpBalancesTable({
  className,
  showZeroBalances,
}: WithClassnames<{ showZeroBalances?: boolean }>) {
  const { data: pools, isLoading } = useLpTable({ showZeroBalances });

  const { show } = useDialog();
  const { connectionStatus } = useEVMContext();
  const isDesktop = useIsDesktop();
  const isConnected = connectionStatus.type === 'connected';

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
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('valueUsd', {
        header: ({ header }) => (
          <HeaderCell header={header}>Liquidity Provided</HeaderCell>
        ),
        cell: (context) => {
          return (
            <CurrencyCell value={context.getValue<LpTableItem['valueUsd']>()} />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor((row) => row.amounts, {
        id: 'lpAmount',
        header: ({ header }) => (
          <HeaderCell header={header}>Position</HeaderCell>
        ),
        cell: (context) => {
          return (
            <AmountWithSymbolCell
              amount={context.getValue().lpAmount}
              symbol="LP Tokens"
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor((row) => row.amounts, {
        id: 'details',
        header: ({ header }) => (
          <HeaderCell
            header={header}
            definitionTooltipId="lpPositionComposition"
          >
            Composition
          </HeaderCell>
        ),
        cell: (context) => {
          const { baseAmount, quoteAmount } =
            context.getValue<LpTableItem['amounts']>();
          const metadata = context.row.original.metadata;
          return (
            <StackedTableCell
              top={
                <AmountWithSymbolCell
                  amount={baseAmount}
                  symbol={metadata.base.symbol}
                  formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
                  className="pl-0"
                />
              }
              bottom={
                <AmountWithSymbolCell
                  amount={quoteAmount}
                  symbol={metadata.quote.symbol}
                  formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
                  className="pl-0"
                />
              }
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-36',
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
          cellContainerClassName: 'w-28',
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
          cellContainerClassName: 'w-24 grow',
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
  }, []);

  const onRowClicked = (row: Row<LpTableItem>) => {
    if (isConnected && !isDesktop) {
      show({
        type: 'lp_balance_details',
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
      onRowClicked={onRowClicked}
    />
  );
}
