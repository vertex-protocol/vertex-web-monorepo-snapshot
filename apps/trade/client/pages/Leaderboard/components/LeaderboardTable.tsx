import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { AddressCell } from 'client/modules/tables/cells/AddressCell';
import { CurrencyCell } from 'client/modules/tables/cells/CurrencyCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { PnlCell } from 'client/modules/tables/cells/PnlCell';
import { RankCell } from 'client/modules/tables/cells/RankCell';
import { LastTradesCell } from 'client/pages/Leaderboard/components/cells/LastTradesCell';
import { MarketsCell } from 'client/pages/Leaderboard/components/cells/MarketsCell';
import { WinRateCell } from 'client/pages/Leaderboard/components/cells/WinRateCell';
import {
  LeaderboardTableItem,
  useLeaderboardTable,
} from 'client/pages/Leaderboard/hooks/useLeaderboardTable';
import { PerpsAiServerLeaderboardTimespan } from 'client/pages/Leaderboard/types';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<LeaderboardTableItem>();

export function LeaderboardTable({
  timespan,
}: {
  timespan: PerpsAiServerLeaderboardTimespan;
}) {
  const { data, isLoading, paginationState, setPaginationState, pageCount } =
    useLeaderboardTable({ timespan });

  const columns: ColumnDef<LeaderboardTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('rankingData', {
        header: ({ header }) => <HeaderCell header={header}>Rank</HeaderCell>,
        cell: (context) => {
          const { rank, iconSrc } =
            context.getValue<LeaderboardTableItem['rankingData']>();
          return <RankCell rank={rank} iconSrc={iconSrc} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-24',
          withLeftPadding: true,
        },
      }),
      columnHelper.accessor('address', {
        header: ({ header }) => (
          <HeaderCell header={header}>Account</HeaderCell>
        ),
        cell: (context) => {
          return <AddressCell address={context.getValue()} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('realizedPnlUsd', {
        header: ({ header }) => (
          <HeaderCell header={header}>Realized PnL</HeaderCell>
        ),
        cell: (context) => {
          return <PnlCell value={context.getValue()} />;
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('numTrades', {
        header: ({ header }) => <HeaderCell header={header}>Trades</HeaderCell>,
        cell: (context) => (
          <NumberCell
            value={context.getValue()}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
          />
        ),
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-24',
        },
      }),
      columnHelper.accessor('volumeUsd', {
        header: ({ header }) => <HeaderCell header={header}>Volume</HeaderCell>,
        cell: (context) => <CurrencyCell value={context.getValue()} />,
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('winRateFrac', {
        header: ({ header }) => (
          <HeaderCell header={header}>Win Rate</HeaderCell>
        ),
        cell: (context) => {
          return <WinRateCell fraction={context.getValue()} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('tradedMarkets', {
        header: ({ header }) => (
          <HeaderCell header={header}>Markets</HeaderCell>
        ),
        cell: (context) => {
          return <MarketsCell markets={context.getValue()} />;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('numActiveTrades', {
        header: ({ header }) => (
          <HeaderCell header={header}>Active Positions</HeaderCell>
        ),
        cell: (context) => (
          <NumberCell
            value={context.getValue()}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
          />
        ),
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('unrealizedPnlUsd', {
        header: ({ header }) => (
          <HeaderCell header={header}>Unrealized PnL</HeaderCell>
        ),
        cell: (context) => <CurrencyCell value={context.getValue()} />,
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('lastTradesPnl', {
        header: ({ header }) => (
          <HeaderCell header={header}>Last Trades</HeaderCell>
        ),
        cell: (context) => (
          <LastTradesCell lastTradesPnl={context.getValue()} />
        ),
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
    ];
  }, []);

  return (
    <SeparatedRowDataTable
      isLoading={isLoading}
      columns={columns}
      data={data}
      pageCount={pageCount}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
    />
  );
}
