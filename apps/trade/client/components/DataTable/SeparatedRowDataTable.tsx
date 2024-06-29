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
      // Removing the border from `headerRowClassName` and `dataRowClassName` to match the design
      headerRowClassName={joinClassNames('border-b-0', headerRowClassName)}
      dataRowClassName={joinClassNames(
        CARD_CLASSNAMES,
        'ring-inset border-t-0',
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
