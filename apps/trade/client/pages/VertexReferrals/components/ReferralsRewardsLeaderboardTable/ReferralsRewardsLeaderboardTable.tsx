import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { getTruncatedAddress } from 'client/utils/getTruncatedAddress';
import { Token } from 'common/productMetadata/types';
import { useMemo } from 'react';
import {
  ReferralsRewardsLeaderboardTableItem,
  useReferralsRewardsLeaderboardTable,
} from './hooks/useReferralsRewardsLeaderboardTable';

const columnHelper = createColumnHelper<ReferralsRewardsLeaderboardTableItem>();

export function ReferralsRewardsLeaderboardTable({
  payoutToken,
  volumeAmountSymbol,
}: {
  payoutToken: Token;
  volumeAmountSymbol: string;
}) {
  const { data, isLoading, paginationState, setPaginationState, pageCount } =
    useReferralsRewardsLeaderboardTable({});

  const columns: ColumnDef<ReferralsRewardsLeaderboardTableItem, any>[] =
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
            return (
              <TableCell>
                {getTruncatedAddress(context.getValue(), 4)}
              </TableCell>
            );
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
              definitionTooltipId="referralsReferredTakerVolume"
              header={header}
            >
              Taker Volume
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
