import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { WithClassnames } from '@vertex-protocol/web-common';
import { DataTable } from 'client/components/DataTable/DataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { TitleHeaderCell } from 'client/modules/tables/cells/TitleHeaderCell';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { signDependentValue } from 'client/utils/signDependentValue';
import { useMemo } from 'react';
import { CalculatorIconHeaderCell } from './cells/CalculatorIconHeaderCell';
import { MarginManagerActionsCell } from './cells/MarginManagerActionsCell';
import { MarginWeightCell } from './cells/MarginWeightCell';
import { MarginWeightHeaderCell } from './cells/MarginWeightHeaderCell';
import { SpotBalanceInfoCell } from './cells/SpotBalanceInfoCell';
import { MarginManagerPopoverAction } from './components/MarginManagerTableActionsPopover';
import {
  MarginManagerSpotBalanceTableItem,
  useMarginManagerSpotBalancesTable,
} from './hooks/useMarginManagerSpotBalancesTable';

const columnHelper = createColumnHelper<MarginManagerSpotBalanceTableItem>();

export function MarginManagerSpotBalancesTable({ className }: WithClassnames) {
  const { balances, isLoading } = useMarginManagerSpotBalancesTable();

  const columns: ColumnDef<MarginManagerSpotBalanceTableItem, any>[] =
    useMemo(() => {
      return [
        columnHelper.accessor('metadata', {
          header: ({ header }) => (
            <TitleHeaderCell header={header}>Balances</TitleHeaderCell>
          ),
          cell: (context) => {
            const metadata =
              context.getValue<MarginManagerSpotBalanceTableItem['metadata']>();

            return (
              <SpotBalanceInfoCell
                symbol={metadata.token.symbol}
                iconSrc={metadata.token.icon.asset}
                amount={context.row.original.balanceAmount}
              />
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.accessor('balanceAmount', {
          header: ({ header }) => (
            <HeaderCell
              definitionTooltipId="marginManagerSpotAssetBalance"
              header={header}
            >
              Balance
            </HeaderCell>
          ),
          cell: (context) => {
            return (
              <AmountWithSymbolCell
                amount={context.getValue()}
                symbol={context.row.original.metadata.token.symbol}
                formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
              />
            );
          },
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-36',
          },
        }),
        columnHelper.accessor('balanceValueUsd', {
          header: ({ header }) => (
            <HeaderCell
              definitionTooltipId="marginManagerSpotBalanceValue"
              header={header}
            >
              Value
            </HeaderCell>
          ),
          cell: ({ getValue }) => {
            return <CurrencyCell value={getValue()} />;
          },
          sortingFn: bigDecimalSortFn,
          meta: {
            cellContainerClassName: 'w-36 grow',
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
              definitionTooltipId="marginManagerBalancesMarginCalc"
              header={header}
            />
          ),
          cell: (context) => {
            const { productId, balanceAmount } = context.row.original;

            const actions: MarginManagerPopoverAction[] = signDependentValue(
              balanceAmount,
              {
                positive: [
                  { type: 'deposit', label: 'Deposit', productId },
                  { type: 'withdraw', label: 'Withdraw', productId },
                  { type: 'borrow', label: 'Borrow', productId },
                ],
                negative: [
                  { type: 'repay', label: 'Repay', productId },
                  { type: 'deposit', label: 'Deposit', productId },
                  { type: 'borrow', label: 'Borrow', productId },
                ],
                zero: [
                  { type: 'deposit', label: 'Deposit', productId },
                  { type: 'borrow', label: 'Borrow', productId },
                ],
              },
            );
            return <MarginManagerActionsCell actions={actions} />;
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
      hasBackground
      columns={columns}
      data={balances}
      isLoading={isLoading}
      tableContainerClassName={className}
      emptyState={<EmptyTablePlaceholder type="deposits_and_borrows" />}
    />
  );
}
