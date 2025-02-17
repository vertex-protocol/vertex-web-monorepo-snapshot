'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { DataTable } from 'client/components/DataTable/DataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { TitleHeaderCell } from 'client/modules/tables/cells/TitleHeaderCell';
import { CalculatorIconHeaderCell } from 'client/pages/Portfolio/subpages/MarginManager/tables//cells/CalculatorIconHeaderCell';
import { MarginManagerActionsCell } from 'client/pages/Portfolio/subpages/MarginManager/tables//cells/MarginManagerActionsCell';
import { MarginWeightCell } from 'client/pages/Portfolio/subpages/MarginManager/tables//cells/MarginWeightCell';
import { MarginWeightHeaderCell } from 'client/pages/Portfolio/subpages/MarginManager/tables//cells/MarginWeightHeaderCell';
import { MarginManagerDropdownAction } from 'client/pages/Portfolio/subpages/MarginManager/tables//components/MarginManagerTableActionsDropdown';
import {
  MarginManagerQuoteBalanceTableItem,
  useMarginManagerQuoteBalanceTable,
} from 'client/pages/Portfolio/subpages/MarginManager/tables//hooks/useMarginManagerQuoteBalanceTable';
import { signDependentValue } from '@vertex-protocol/react-client';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<MarginManagerQuoteBalanceTableItem>();

export function MarginManagerQuoteBalanceTable({ className }: WithClassnames) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { balances, isLoading } = useMarginManagerQuoteBalanceTable();

  const columns: ColumnDef<MarginManagerQuoteBalanceTableItem, any>[] =
    useMemo(() => {
      return [
        columnHelper.accessor('metadata', {
          header: ({ header }) => (
            <TitleHeaderCell header={header}>
              {primaryQuoteToken.symbol} Balance
            </TitleHeaderCell>
          ),
          cell: ({ getValue }) => {
            const metadata =
              getValue<MarginManagerQuoteBalanceTableItem['metadata']>();
            return (
              <MarketProductInfoCell
                symbol={metadata.token.symbol}
                iconSrc={metadata.token.icon.asset}
              />
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-36',
            withLeftPadding: true,
          },
        }),
        columnHelper.accessor('balanceValueUsd', {
          header: ({ header }) => (
            <HeaderCell
              definitionTooltipId="marginManagerSpotQuoteBalance"
              header={header}
            >
              Cash Balance
            </HeaderCell>
          ),
          cell: ({ getValue }) => {
            return <CurrencyCell value={getValue()} />;
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-36',
          },
        }),
        columnHelper.accessor('unsettledQuoteUsd', {
          header: ({ header }) => (
            <HeaderCell
              definitionTooltipId="marginManagerUnsettledQuoteBalance"
              header={header}
            >
              Unsettled PnL
            </HeaderCell>
          ),
          cell: ({ getValue }) => {
            return <CurrencyCell value={getValue()} />;
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.accessor('netBalanceUsd', {
          header: ({ header }) => (
            <HeaderCell
              definitionTooltipId="marginManagerQuoteNetBalance"
              header={header}
            >
              Net Balance
            </HeaderCell>
          ),
          cell: ({ getValue }) => {
            return <CurrencyCell value={getValue()} />;
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
          enableSorting: false,
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
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-44',
          },
        }),
        columnHelper.display({
          id: 'actions',
          header: ({ header }) => (
            <CalculatorIconHeaderCell
              definitionTooltipId="marginManagerQuoteMarginCalc"
              header={header}
            />
          ),
          cell: (context) => {
            const { productId, balanceAmount } = context.row.original;

            const actions: MarginManagerDropdownAction[] = signDependentValue(
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
    }, [primaryQuoteToken.symbol]);

  return (
    <DataTable
      columns={columns}
      data={balances}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="quote_balance" />}
      hasBackground
      tableContainerClassName={className}
    />
  );
}
