import { ColumnDef, createColumnHelper, Row } from '@tanstack/react-table';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { PercentageCell } from 'client/modules/tables/cells/PercentageCell';
import { SpotActionButtonCell } from 'client/modules/tables/cells/SpotActionButtonCell';
import { StackedAmountValueCell } from 'client/modules/tables/cells/StackedAmountValueCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import {
  SpotBalanceTableItem,
  useSpotBalancesTable,
} from 'client/modules/tables/hooks/useSpotBalancesTable';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

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
  const isConnected = useIsConnected();

  const columns: ColumnDef<SpotBalanceTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('metadata', {
        header: ({ header }) => <HeaderCell header={header}>Asset</HeaderCell>,
        cell: ({ getValue, row }) => {
          const metadata = getValue<SpotBalanceTableItem['metadata']>();

          // If rendering gets more complex than this, we should extract into a separate cell function
          const endElement = row.original.showBlastNativeYieldInfo && (
            <BlastNativeYieldTooltip />
          );

          return (
            <MarketProductInfoCell
              symbol={metadata.token.symbol}
              iconSrc={metadata.token.icon.asset}
              endElement={endElement}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-44',
          withLeftPadding: true,
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
              valueUsd={valueUsd}
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
          cellContainerClassName: 'w-32 grow',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => null,
        cell: (context) => (
          <SpotActionButtonCell
            symbol={context.row.original.metadata.token.symbol}
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

function BlastNativeYieldTooltip() {
  return (
    <DefinitionTooltip definitionId="spotBalancesBlastNativeYield" asChild>
      {/*Stopping propagation allows the tooltip to open on mobile on-click instead of navigating to the market*/}
      <div
        onClick={(e) => e.stopPropagation()}
        // Enable pointer events to override the pointer-events-none for table cell
        className="bg-accent-blast/10 text-accent-blast decoration-accent-blast pointer-events-auto px-1 py-0.5"
      >
        Native Yield
      </div>
    </DefinitionTooltip>
  );
}
