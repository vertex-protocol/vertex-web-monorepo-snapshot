import { joinClassNames } from '@vertex-protocol/web-common';
import { CARD_CLASSNAMES } from '@vertex-protocol/web-ui';
import {
  DataTable,
  DataTableProps,
} from 'client/components/DataTable/DataTable';

export function SeparatedRowDataTable<TData>({
  dataRowClassName,
  headerRowClassName,
  dataRowContainerClassName,
  ...rest
}: DataTableProps<TData>) {
  return (
    <DataTable
      // Removing the border from `headerRowClassName` to match the design
      headerRowClassName={joinClassNames('border-b-0', headerRowClassName)}
      dataRowClassName={joinClassNames(
        // Applying this here to override the standard "first:border-t-0" in `DataTableRowGroup`
        'first:border-t-1',
        CARD_CLASSNAMES,
        dataRowClassName,
      )}
      dataRowContainerClassName={joinClassNames(
        'flex flex-col gap-y-1.5',
        dataRowContainerClassName,
      )}
      {...rest}
    />
  );
}
