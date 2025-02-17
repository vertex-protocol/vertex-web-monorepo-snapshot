'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { AddressCell } from 'client/modules/tables/cells/AddressCell';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { RankCell } from 'client/modules/tables/cells/RankCell';
import {
  BlitzPointsLeaderboardTableItem,
  useBlitzPointsLeaderboardTable,
} from 'client/pages/BlitzRewards/components/leaderboard/BlitzPointsLeaderboardTable/useBlitzPointsLeaderboardTable';
import { useCurrentBlitzPointsEpoch } from 'client/pages/BlitzRewards/hooks/useCurrentBlitzPointsEpoch';

import { useMemo } from 'react';

const columnHelper = createColumnHelper<BlitzPointsLeaderboardTableItem>();

export function BlitzPointsLeaderboardTable() {
  const currentEpoch = useCurrentBlitzPointsEpoch();

  const { data, isLoading, paginationState, setPaginationState, pageCount } =
    useBlitzPointsLeaderboardTable({
      epoch: currentEpoch?.epoch,
    });

  const columns: ColumnDef<BlitzPointsLeaderboardTableItem, any>[] =
    useMemo(() => {
      return [
        columnHelper.accessor('rankingData', {
          header: ({ header }) => <HeaderCell header={header}>Rank</HeaderCell>,
          cell: (context) => {
            const { rank, iconSrc } =
              context.getValue<
                BlitzPointsLeaderboardTableItem['rankingData']
              >();
            return <RankCell rank={rank} iconSrc={iconSrc} />;
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-32',
            withLeftPadding: true,
          },
        }),
        columnHelper.accessor('address', {
          header: ({ header }) => (
            <HeaderCell header={header}>Address</HeaderCell>
          ),
          cell: (context) => {
            return <AddressCell address={context.getValue()} />;
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-36',
          },
        }),
        columnHelper.accessor('totalVolume', {
          header: ({ header }) => (
            <HeaderCell header={header}>Total Trade Volume</HeaderCell>
          ),
          cell: (context) => {
            return (
              <AmountWithSymbolCell
                amount={context.getValue()}
                formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
                symbol="USDB"
              />
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-40',
          },
        }),
        columnHelper.accessor('totalBlitzPoints', {
          header: ({ header }) => (
            <HeaderCell header={header}>Blitz Points</HeaderCell>
          ),
          cell: (context) => {
            return (
              <NumberCell
                value={context.getValue()}
                formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
              />
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-32 grow',
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
