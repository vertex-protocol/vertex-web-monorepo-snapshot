import { RowData, HeaderGroup, flexRender } from '@tanstack/react-table';

export function TableHeaderGroup<TData extends RowData>({
  headerGroup,
}: {
  headerGroup: HeaderGroup<TData>;
}) {
  return (
    <div className="flex px-1.5 py-2" key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <div
          key={header.id}
          className={header.column.columnDef.meta?.cellContainerClassName}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </div>
      ))}
    </div>
  );
}
