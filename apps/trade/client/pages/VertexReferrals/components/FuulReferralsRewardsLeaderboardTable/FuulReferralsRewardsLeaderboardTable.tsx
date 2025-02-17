'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { truncateAddress } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import {
  FuulReferralsRewardsLeaderboardTableItem,
  useFuulReferralsRewardsLeaderboardTable,
} from 'client/pages/VertexReferrals/components/FuulReferralsRewardsLeaderboardTable/useFuulReferralsRewardsLeaderboardTable';
import { useMemo } from 'react';

const columnHelper =
  createColumnHelper<FuulReferralsRewardsLeaderboardTableItem>();

export function FuulReferralsRewardsLeaderboardTable() {
  const { data, isLoading, paginationState, setPaginationState, pageCount } =
    useFuulReferralsRewardsLeaderboardTable();
  const { payoutToken, volumeAmountSymbol } = useFuulReferralsContext();

  const columns: ColumnDef<FuulReferralsRewardsLeaderboardTableItem, any>[] =
    useMemo(() => {
      return [
        columnHelper.accessor('rank', {
          header: ({ header }) => <HeaderCell header={header}>Rank</HeaderCell>,
          cell: (context) => {
            return <TableCell>{context.getValue()}</TableCell>;
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
            return <TableCell>{truncateAddress(context.getValue())}</TableCell>;
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.accessor('totalEarnedUsdc', {
          header: ({ header }) => (
            <HeaderCell header={header}>Earnings</HeaderCell>
          ),
          cell: (context) => {
            return (
              <AmountWithSymbolCell
                amount={context.getValue()}
                formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
                symbol={payoutToken.symbol}
              />
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-36',
          },
        }),
        columnHelper.accessor('numReferredUsers', {
          header: ({ header }) => (
            <HeaderCell header={header}>Sign Ups</HeaderCell>
          ),
          cell: (context) => {
            return <TableCell>{context.getValue()}</TableCell>;
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-32',
          },
        }),
        columnHelper.accessor('referredVolumeUsdc', {
          header: ({ header }) => (
            <HeaderCell
              definitionTooltipId="fuulReferralsTotalReferredTakerVolume"
              header={header}
            >
              Total Taker Volume
            </HeaderCell>
          ),
          cell: (context) => {
            return (
              <AmountWithSymbolCell
                amount={context.getValue()}
                formatSpecifier={
                  CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
                }
                symbol={volumeAmountSymbol}
              />
            );
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-40',
          },
        }),
        columnHelper.accessor('tier', {
          header: ({ header }) => <HeaderCell header={header}>Tier</HeaderCell>,
          cell: (context) => {
            return <TableCell>{context.getValue()}</TableCell>;
          },
          enableSorting: false,
          meta: {
            cellContainerClassName: 'w-40',
          },
        }),
      ];
    }, [payoutToken.symbol, volumeAmountSymbol]);

  return (
    <SeparatedRowDataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
      pageCount={pageCount}
    />
  );
}
