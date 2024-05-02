import { createColumnHelper, Row } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { WithClassnames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { PercentageCell } from 'client/modules/tables/cells/PercentageCell';
import { ProductInfoCell } from 'client/modules/tables/cells/ProductInfoCell';
import { SpotActionButtonCell } from 'client/modules/tables/cells/SpotActionButtonCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { MarketFilter } from 'client/types/MarketFilter';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { useMemo } from 'react';
import { StackedAmountValueCell } from './cells/StackedAmountValueCell';
import {
  SpotBalanceTableItem,
  useSpotBalancesTable,
} from './hooks/useSpotBalancesTable';

const columnHelper = createColumnHelper<SpotBalanceTableItem>();

interface Props {
  hasBackground?: boolean;
  marketFilter?: MarketFilter;
}

export function SpotBalancesTable({
  className,
  hasBackground,
  marketFilter,
}: WithClassnames<Props>) {
  const { show } = useDialog();
  const { balances, isLoading } = useSpotBalancesTable({ marketFilter });
  const pushTradePage = usePushTradePage();
  const isDesktop = useIsDesktop();
  const { connectionStatus } = useEVMContext();
  const isConnected = connectionStatus.type === 'connected';

  const columns: ColumnDef<SpotBalanceTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('metadata', {
        header: ({ header }) => <HeaderCell header={header}>Asset</HeaderCell>,
        cell: ({ getValue }) => {
          const metadata = getValue<SpotBalanceTableItem['metadata']>();
          return (
            <ProductInfoCell
              symbol={metadata.token.symbol}
              iconSrc={metadata.token.icon.asset}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('balanceInfo', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="assetBalance" header={header}>
            Balance
          </HeaderCell>
        ),
        cell: (context) => {
          const { amount, valueUsd, symbol } =
            context.getValue<SpotBalanceTableItem['balanceInfo']>();
          return (
            <StackedAmountValueCell
              symbol={symbol}
              size={amount}
              value={valueUsd}
              sizeFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('valueUsd'),
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      columnHelper.accessor('depositAPR', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="depositAPR" header={header}>
            Deposit APR
          </HeaderCell>
        ),
        cell: (context) => (
          <PercentageCell
            formatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
            fraction={context.getValue()}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('borrowAPR', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="borrowAPR" header={header}>
            Borrow APR
          </HeaderCell>
        ),
        cell: (context) => (
          <PercentageCell
            formatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
            fraction={context.getValue()}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-40 grow',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => null,
        cell: (context) => (
          <SpotActionButtonCell
            productId={context.row.original.productId}
            balanceAmount={context.row.original.amount}
          />
        ),
        meta: {
          cellContainerClassName: 'w-max',
        },
        enableSorting: false,
      }),
    ];
  }, []);

  const onRowClicked = (row: Row<SpotBalanceTableItem>) => {
    if (isDesktop || !isConnected) {
      pushTradePage({
        productId: row.original.productId,
      });
    } else {
      show({
        type: 'spot_balance_details',
        params: row.original,
      });
    }
  };

  return (
    <DataTable
      hasBackground={hasBackground}
      columns={columns}
      data={balances}
      isLoading={isLoading}
      tableContainerClassName={className}
      emptyState={<EmptyTablePlaceholder type="spot_balances" />}
      onRowClicked={onRowClicked}
    />
  );
}
