import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';

interface Props extends TableCellProps {
  marginModeType: MarginModeType;
}

export function MarginModeTypeCell({
  marginModeType,
  className,
}: WithClassnames<Props>) {
  return (
    <TableCell
      className={joinClassNames(
        'text-text-tertiary whitespace-normal text-xs capitalize',
        className,
      )}
    >
      {marginModeType}
    </TableCell>
  );
}
