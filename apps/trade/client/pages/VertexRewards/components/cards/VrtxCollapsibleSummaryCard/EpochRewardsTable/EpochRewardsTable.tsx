import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  useVertexMetadataContext,
  VRTX_TOKEN_INFO,
} from '@vertex-protocol/react-client';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { VrtxRewardEpoch } from 'client/modules/rewards/types';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { EpochNameCell } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/cells/EpochNameCell';
import { EpochRewardsLiquidClaimActionCell } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/cells/EpochRewardsLiquidClaimActionCell';
import { EpochRewardsPoolCell } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/cells/EpochRewardsPoolCell';
import { EpochRewardsTimeSpanCell } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/cells/EpochRewardsTimeSpanCell';
import {
  EpochRewardsTableData,
  useEpochRewardsTable,
} from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/useEpochRewardsTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<EpochRewardsTableData>();

export function EpochRewardsTable({
  isOnProtocolTokenChainEnv,
}: {
  isOnProtocolTokenChainEnv: boolean;
}) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { data, pageCount, paginationState, setPaginationState, isLoading } =
    useEpochRewardsTable();

  const columns: ColumnDef<EpochRewardsTableData, any>[] = useMemo(() => {
    // These are only available where we have on-chain actions / data
    const protocolChainColumns = [
      columnHelper.accessor('rewardsUnclaimed', {
        header: ({ header }) => (
          <HeaderCell header={header}>Unclaimed</HeaderCell>
        ),
        cell: (context) => {
          return (
            <AmountWithSymbolCell
              amount={context.getValue()}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              symbol={VRTX_TOKEN_INFO.symbol}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-40 grow',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => null,
        cell: (context) => {
          return (
            <EpochRewardsLiquidClaimActionCell
              className="pr-1"
              rewardsUnclaimed={context.row.original.rewardsUnclaimed}
              rewardsEarned={context.row.original.rewardsEarned}
              isPreLbaAirdropEpoch={context.row.original.isPreLbaAirdropEpoch}
              isCurrent={context.row.original.isCurrent}
              epochNumber={context.row.original.epochNumber}
            />
          );
        },
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
    ];

    return [
      columnHelper.accessor('epochNumber', {
        header: ({ header }) => (
          <HeaderCell header={header} className="pl-1">
            Epoch / Phase
          </HeaderCell>
        ),
        cell: (context) => {
          return (
            <EpochNameCell
              isCurrent={context.row.original.isCurrent}
              isInitialPhase={context.row.original.isInitialPhase}
              epochNumber={context.getValue()}
              className="pl-1"
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-24',
        },
      }),
      columnHelper.accessor('epochIntervalMillis', {
        header: ({ header }) => (
          <HeaderCell header={header}>Start / End Date</HeaderCell>
        ),
        cell: (context) => {
          const { from, to } =
            context.getValue<VrtxRewardEpoch['epochIntervalMillis']>();

          return <EpochRewardsTimeSpanCell start={from} end={to} />;
        },
        // Note: Omitting sorting here as it's an object of key -> numbers, so we don't yet have a sorting fn defined for it.
        // If it doesn't sort well, we can add a custom sorting fn later on.
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-52',
        },
      }),
      columnHelper.accessor('subaccountFees', {
        header: ({ header }) => (
          <HeaderCell
            header={header}
            definitionTooltipId="rewardsTradingFeesPaid"
          >
            Trading Fees
          </HeaderCell>
        ),
        cell: (context) => {
          return (
            <AmountWithSymbolCell
              amount={context.getValue<
                EpochRewardsTableData['subaccountFees']
              >()}
              symbol={primaryQuoteToken.symbol}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('rewardsPool', {
        header: ({ header }) => (
          <HeaderCell
            definitionTooltipId="rewardsShareOfRewardsPool"
            header={header}
          >
            Pool Size / Share
          </HeaderCell>
        ),
        cell: (context) => {
          const { totalRewards, subaccountShareFrac } =
            context.getValue<EpochRewardsTableData['rewardsPool']>();
          return (
            <EpochRewardsPoolCell
              subaccountShareFrac={subaccountShareFrac}
              totalRewards={totalRewards}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('totalRewards'),
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('rewardsEarned', {
        header: ({ header }) => (
          <HeaderCell header={header}>Rewards Earned</HeaderCell>
        ),
        cell: (context) => {
          const rewardsEarned =
            context.getValue<EpochRewardsTableData['rewardsEarned']>();

          return (
            <AmountWithSymbolCell
              amount={rewardsEarned}
              symbol={VRTX_TOKEN_INFO.symbol}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
      ...(isOnProtocolTokenChainEnv ? protocolChainColumns : []),
    ];
  }, [isOnProtocolTokenChainEnv, primaryQuoteToken.symbol]);

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      pageCount={pageCount}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
      emptyState={
        <EmptyTablePlaceholder
          type="rewards_history"
          className="bg-transparent"
        />
      }
      headerRowClassName="bg-transparent"
      tableClassName="bg-transparent border-none"
      dataRowContainerClassName="bg-transparent"
      dataRowClassName="bg-transparent"
    />
  );
}
