import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { WithClassnames } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import { AddressCell } from 'client/modules/tables/cells/AddressCell';
import { PercentageChangeCell } from 'client/modules/tables/cells/PercentageChangeCell';
import { PnlCell } from 'client/modules/tables/cells/PnlCell';
import { RankCell } from 'client/modules/tables/cells/RankCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import {
  TradingCompetitionTableItem,
  useTradingCompetitionTable,
} from 'client/pages/TradingCompetition/hooks/useTradingCompetitionTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<TradingCompetitionTableItem>();

interface Props extends WithClassnames {
  period: number;
}

export function TradingCompetitionTable({ className, period }: Props) {
  const {
    participants,
    isLoading,
    pageCount,
    paginationState,
    setPaginationState,
  } = useTradingCompetitionTable({ period });

  const columns: ColumnDef<TradingCompetitionTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('rankingData', {
        header: ({ header }) => <HeaderCell header={header}>Rank</HeaderCell>,
        cell: (context) => {
          const { rank, iconSrc } =
            context.getValue<TradingCompetitionTableItem['rankingData']>();

          return <RankCell rank={rank} iconSrc={iconSrc} />;
        },
        meta: {
          cellContainerClassName: 'w-24',
          withLeftPadding: true,
        },
        enableSorting: false,
      }),
      columnHelper.accessor('subaccountOwner', {
        header: ({ header }) => (
          <HeaderCell header={header}>Account</HeaderCell>
        ),
        cell: (context) => (
          <AddressCell
            address={context.getValue<
              TradingCompetitionTableItem['subaccountOwner']
            >()}
          />
        ),
        meta: {
          cellContainerClassName: 'w-32',
        },
        enableSorting: false,
      }),
      columnHelper.accessor('percentRoi', {
        header: ({ header }) => <HeaderCell header={header}>% PnL</HeaderCell>,
        cell: (context) => (
          <PercentageChangeCell
            value={context.getValue<
              TradingCompetitionTableItem['percentRoi']
            >()}
          />
        ),
        meta: {
          cellContainerClassName: 'w-32',
        },
        enableSorting: false,
      }),
      columnHelper.accessor('pnlUsd', {
        header: ({ header }) => <HeaderCell header={header}>PnL</HeaderCell>,
        cell: (context) => (
          <PnlCell
            value={context.getValue<TradingCompetitionTableItem['pnlUsd']>()}
          />
        ),
        meta: {
          cellContainerClassName: 'w-32',
        },
        enableSorting: false,
      }),
      columnHelper.accessor('prize', {
        header: ({ header }) => (
          <HeaderCell header={header}>💰 Prize</HeaderCell>
        ),
        cell: (context) => {
          const prize =
            context.getValue<TradingCompetitionTableItem['prize']>();

          if (!prize) return null;

          // Extra padding so there's space between the cell and table's edge on small screens.
          return <TableCell className="pr-5">{prize}</TableCell>;
        },
        enableSorting: false,
      }),
    ];
  }, []);

  return (
    <SeparatedRowDataTable
      columns={columns}
      data={participants}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="trading_competition" />}
      tableContainerClassName={className}
      pageCount={pageCount}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
    />
  );
}
