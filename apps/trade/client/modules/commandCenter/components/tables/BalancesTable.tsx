import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { ActionName } from 'client/modules/commandCenter/components/cells/ActionName';
import { BalanceTableItem } from 'client/modules/commandCenter/hooks/useCommandCenterBalanceItems';
import { BaseTable } from 'client/modules/commandCenter/components/tables/BaseTable/BaseTable';
import { useMemo } from 'react';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';

const columnHelper = createColumnHelper<BalanceTableItem>();

interface Props {
  balances: BalanceTableItem[] | undefined;
}

export function BalancesTable({ balances }: Props) {
  const columns: ColumnDef<BalanceTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('metadata', {
        header: ({ header }) => <HeaderCell header={header}>Asset</HeaderCell>,
        cell: ({ getValue }) => {
          const metadata = getValue<BalanceTableItem['metadata']>();
          return (
            <MarketProductInfoCell
              symbol={metadata.token.symbol}
              iconSrc={metadata.token.icon.asset}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-36 lg:w-56',
        },
      }),
      columnHelper.accessor('amount', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="assetBalance" header={header}>
            Balance
          </HeaderCell>
        ),
        cell: (context) => (
          <NumberCell
            value={context.getValue()}
            formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-24 lg:w-36',
        },
      }),
      columnHelper.accessor('walletAmount', {
        header: ({ header }) => (
          <HeaderCell header={header}>In wallet</HeaderCell>
        ),
        cell: (context) => {
          return (
            <NumberCell
              value={context.getValue()}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'hidden lg:flex w-28',
        },
      }),
      columnHelper.display({
        id: 'action',
        header: () => null,
        cell: (context) => (
          <ActionName>{context.row.original.actionText}</ActionName>
        ),
        meta: {
          cellContainerClassName: 'ml-auto',
        },
        enableSorting: false,
      }),
    ];
  }, []);

  return (
    <BaseTable
      id="balances"
      columns={columns}
      data={balances}
      onSelect={(row) => row.original.action()}
    />
  );
}
