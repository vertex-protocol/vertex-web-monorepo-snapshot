'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  PresetNumberFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { AddressCell } from 'client/modules/tables/cells/AddressCell';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { RankCell } from 'client/modules/tables/cells/RankCell';
import {
  SonicPointsLeaderboardItem,
  useSonicPointsLeaderboardTable,
} from 'client/pages/SonicPoints/components/leaderboard/useSonicPointsLeaderboardTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<SonicPointsLeaderboardItem>();

export function SonicPointsLeaderboardTable() {
  const { data, isLoading, pageCount, paginationState, setPaginationState } =
    useSonicPointsLeaderboardTable();
  const {
    primaryQuoteToken: { symbol: quoteSymbol },
  } = useVertexMetadataContext();

  const columns: ColumnDef<SonicPointsLeaderboardItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('rankingData', {
        header: ({ header }) => <HeaderCell header={header}>Rank</HeaderCell>,
        cell: (context) => {
          const { rank, iconSrc } =
            context.getValue<SonicPointsLeaderboardItem['rankingData']>();
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
              symbol={quoteSymbol}
              formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),

      columnHelper.accessor('creditsEarned', {
        header: ({ header }) => (
          <HeaderCell header={header}>Credits Earned</HeaderCell>
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
          cellContainerClassName: 'w-40 grow',
        },
      }),
    ];
  }, [quoteSymbol]);

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
