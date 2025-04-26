import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import {
  Divider,
  formatTimestamp,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { DataTable } from 'client/components/DataTable/DataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import {
  useVertexMetadataContext,
  VRTX_TOKEN_INFO,
} from '@vertex-protocol/react-client';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { LbaPositionActionCell } from 'client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionTable/LbaPositionActionCell';
import { LbaPositionUnlockTimeHeaderCell } from 'client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionTable/LbaPositionUnlockTimeHeaderCell';
import {
  LbaPositionTableItem,
  useLbaPositionTable,
} from 'client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionTable/useLbaPositionTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<LbaPositionTableItem>();

export function LbaPositionTable() {
  const { primaryQuoteToken: usdcToken } = useVertexMetadataContext();
  const { tableData, isLoading, tokenLaunchStage } = useLbaPositionTable();

  const columns: ColumnDef<LbaPositionTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('suppliedAmount', {
        header: ({ header }) => (
          <HeaderCell
            header={header}
            className="pl-1"
            definitionTooltipId="lbaPositionSuppliedToLba"
          >
            Supplied to LBA
          </HeaderCell>
        ),
        cell: (context) => {
          const { usdc, vrtx } =
            context.getValue<LbaPositionTableItem['suppliedAmount']>();
          return (
            <StackedTableCell
              className="pl-1"
              top={
                <AmountWithSymbol
                  formattedSize={formatNumber(usdc, {
                    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
                  })}
                  symbol={usdcToken.symbol}
                />
              }
              bottom={
                <AmountWithSymbol
                  formattedSize={formatNumber(vrtx, {
                    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
                  })}
                  symbol={VRTX_TOKEN_INFO.symbol}
                />
              }
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.display({
        id: 'border',
        header: () => <Divider vertical />,
        cell: () => <Divider vertical />,
        meta: {
          cellContainerClassName: 'flex px-2 py-3',
        },
      }),
      columnHelper.accessor('totalLpBalance', {
        header: ({ header }) => (
          <HeaderCell header={header}>Position Size</HeaderCell>
        ),
        cell: (context) => {
          return (
            <AmountWithSymbolCell
              amount={context.getValue<
                LbaPositionTableItem['totalLpBalance']
              >()}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              symbol="LP Tokens"
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('lpVestTimestampMillis', {
        header: ({ header }) => (
          <LbaPositionUnlockTimeHeaderCell
            header={header}
            tokenLaunchStage={tokenLaunchStage}
          />
        ),
        cell: (context) => {
          const lpVestTimestampMillis =
            context.getValue<LbaPositionTableItem['lpVestTimestampMillis']>();

          return (
            <TableCell>
              {formatTimestamp(lpVestTimestampMillis, {
                formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
              })}
            </TableCell>
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-48',
        },
      }),
      columnHelper.accessor('lpBalanceValuesUsd', {
        header: ({ header }) => (
          <HeaderCell
            header={header}
            definitionTooltipId="lbaPositionLiquidityStatus"
          >
            Locked / Unlocked Liq.
          </HeaderCell>
        ),
        cell: (context) => {
          const { locked, unlocked } =
            context.getValue<LbaPositionTableItem['lpBalanceValuesUsd']>();

          return (
            <TableCell>
              {formatNumber(locked, {
                formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
              })}{' '}
              /{' '}
              {formatNumber(unlocked, {
                formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
              })}
            </TableCell>
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-48',
        },
      }),
      columnHelper.accessor('lbaRewardsClaimed', {
        header: ({ header }) => (
          <HeaderCell header={header}>Rewards Claimed</HeaderCell>
        ),
        cell: (context) => {
          return (
            <AmountWithSymbolCell
              amount={context.getValue<
                LbaPositionTableItem['lbaRewardsClaimed']
              >()}
              symbol={VRTX_TOKEN_INFO.symbol}
              formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-36 grow',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => null,
        cell: (context) => {
          return (
            <LbaPositionActionCell
              className="pr-1"
              unlockedValueUsd={
                context.row.original.lpBalanceValuesUsd.unlocked
              }
            />
          );
        },
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
    ];
  }, [tokenLaunchStage, usdcToken.symbol]);

  return (
    <DataTable
      columns={columns}
      data={tableData}
      isLoading={isLoading}
      emptyState={
        <EmptyTablePlaceholder
          type="lba_positions"
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
