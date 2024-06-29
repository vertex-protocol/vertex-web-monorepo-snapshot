import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ColumnDef, Row, TableOptions } from '@tanstack/table-core';
import { TableHeaderGroup } from 'client/modules/commandCenter/components/tables/BaseTable/TableHeaderGroup';
import { TableRow } from 'client/modules/commandCenter/components/tables/BaseTable/TableRow';
import { useMemo, useState } from 'react';

export type BaseTableProps<TData> = {
  /** A unique id for distinguishing the table, helpful for creating unique row ids across tables. */
  id: string;
  columns: ColumnDef<TData, any>[];
  data: TData[] | undefined;
  initialSortingState?: SortingState;
  onSelect: (row: Row<TData>) => void;
};

export function BaseTable<TData>({
  id,
  columns,
  data,
  initialSortingState,
  onSelect,
}: BaseTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>(
    initialSortingState ?? [],
  );

  const tableOptions = useMemo((): TableOptions<TData> => {
    return {
      data: data ?? [],
      columns,
      state: { sorting },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    };
  }, [columns, data, sorting]);

  const table = useReactTable<TData>(tableOptions);

  return (
    <div className="flex flex-col">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableHeaderGroup headerGroup={headerGroup} key={headerGroup.id} />
      ))}

      {table.getRowModel().rows.map((row) => (
        <TableRow row={row} key={row.id} onSelect={onSelect} tableId={id} />
      ))}
    </div>
  );
}
