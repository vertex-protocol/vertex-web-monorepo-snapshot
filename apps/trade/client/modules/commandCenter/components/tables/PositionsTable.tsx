import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { WithClassnames } from '@vertex-protocol/web-common';
import { getKeyedBigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { PerpStackedPnlCell } from 'client/modules/tables/cells/PerpStackedPnlCell';
import { StackedAmountValueCell } from 'client/modules/tables/cells/StackedAmountValueCell';
import { ActionName } from 'client/modules/commandCenter/components/cells/ActionName';
import { PositionsTableItem } from 'client/modules/commandCenter/hooks/useCommandCenterPositionItems';
import { BaseTable } from 'client/modules/commandCenter/components/tables/BaseTable/BaseTable';
import { useMemo } from 'react';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';

interface Props extends WithClassnames {
  positions: PositionsTableItem[] | undefined;
}

const columnHelper = createColumnHelper<PositionsTableItem>();

export function PositionsTable({ positions }: Props) {
  const columns: ColumnDef<PositionsTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('marketInfo', {
        header: ({ header }) => <HeaderCell header={header}>Market</HeaderCell>,
        cell: (context) => (
          <MarketInfoWithSideCell
            marketInfo={context.getValue()}
            alwaysShowOrderDirection={false}
          />
        ),
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40 lg:w-56',
        },
      }),
      columnHelper.accessor('amountInfo', {
        header: ({ header }) => <HeaderCell header={header}>Size</HeaderCell>,
        cell: (context) => {
          const { position, notionalValueUsd, symbol } =
            context.getValue<PositionsTableItem['amountInfo']>();
          return (
            <StackedAmountValueCell
              symbol={symbol}
              size={position}
              sizeFormatSpecifier={context.row.original.sizeFormatSpecifier}
              valueUsd={notionalValueUsd}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('notionalValueUsd'),
        meta: {
          cellContainerClassName: 'w-36 hidden lg:flex',
        },
      }),
      columnHelper.accessor('pnlInfo', {
        header: ({ header }) => (
          <HeaderCell
            definitionTooltipId="estimatedPositionPnL"
            header={header}
          >
            PnL
          </HeaderCell>
        ),
        cell: (context) => {
          const { estimatedPnlUsd, estimatedPnlFrac } =
            context.getValue<PositionsTableItem['pnlInfo']>();
          return (
            <PerpStackedPnlCell
              pnlFrac={estimatedPnlFrac}
              pnl={estimatedPnlUsd}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('estimatedPnlUsd'),
        meta: {
          cellContainerClassName: 'w-24 lg:w-28',
        },
      }),
      columnHelper.display({
        id: 'actionText',
        header: () => null,
        cell: (context) => {
          return <ActionName>{context.row.original.actionText}</ActionName>;
        },
        meta: {
          cellContainerClassName: 'ml-auto',
        },
      }),
    ];
  }, []);

  return (
    <BaseTable
      id="positions"
      columns={columns}
      data={positions}
      onSelect={(row) => row.original.action()}
    />
  );
}
