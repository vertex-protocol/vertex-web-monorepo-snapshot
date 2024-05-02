import { ColumnDef, Row } from '@tanstack/table-core';
import { joinClassNames } from '@vertex-protocol/web-common';
import { CARD_CLASSNAMES } from '@vertex-protocol/web-ui';
import { DataTable } from 'client/components/DataTable/DataTable';

interface MarketTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[] | undefined;
  onRowClicked?: (row: Row<TData>) => void;
  dataRowClassName?: string;
}

export function MarketsPageTable<TData>({
  columns,
  data,
  onRowClicked,
  dataRowClassName,
}: MarketTableProps<TData>) {
  return (
    <DataTable
      columns={columns}
      data={data}
      onRowClicked={onRowClicked}
      // Removing the border from `headerRowClassName` and `dataRowClassName` to match the design
      headerRowClassName="border-b-0"
      dataRowClassName={joinClassNames(
        CARD_CLASSNAMES,
        'ring-inset border-t-0',
        dataRowClassName,
      )}
      dataRowContainerClassName="flex flex-col gap-y-1.5"
    />
  );
}
