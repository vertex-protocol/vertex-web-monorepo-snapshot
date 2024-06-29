import {
  SortingState,
  ColumnDef,
  TableOptions,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { joinClassNames } from '@vertex-protocol/web-common';
import { MarketSwitcherTableHeaderGroup } from 'client/modules/trading/components/BaseMarketSwitcherTable/MarketSwitcherTableHeaderGroup';
import { MarketSwitcherTableRows } from 'client/modules/trading/components/BaseMarketSwitcherTable/MarketSwitcherTableRows';
import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';
import { useState, useMemo } from 'react';

// Only `pr-3` needed as each favorite button has its own left padding (increases hit area).
const SHARED_ROW_CLASSNAMES = 'flex pr-3';

interface Props {
  markets: MarketSwitcherItem[];
  onRowClick: () => void;
  columns: ColumnDef<MarketSwitcherItem, any>[];
  rowClassName?: string;
}

export function BaseMarketSwitcherTable({
  onRowClick,
  columns,
  markets,
  rowClassName,
}: Props) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'isFavorited', desc: false },
  ]);

  const tableOptions = useMemo(
    (): TableOptions<MarketSwitcherItem> => ({
      data: markets,
      columns,
      state: { sorting },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    }),
    [columns, markets, sorting],
  );

  const table = useReactTable(tableOptions);

  if (markets.length === 0) {
    return <p className="text-text-tertiary p-2 text-xs">No markets found</p>;
  }

  // We only have one header group, so just grab it directly.
  const headerGroup = table.getHeaderGroups()[0];

  return (
    <div className="flex flex-col overflow-y-hidden">
      <MarketSwitcherTableHeaderGroup
        headerGroup={headerGroup}
        className={SHARED_ROW_CLASSNAMES}
      />
      <MarketSwitcherTableRows
        className="gap-y-1.5"
        rowClassName={joinClassNames(SHARED_ROW_CLASSNAMES, rowClassName)}
        rows={table.getRowModel().rows}
        onRowClick={onRowClick}
      />
    </div>
  );
}
