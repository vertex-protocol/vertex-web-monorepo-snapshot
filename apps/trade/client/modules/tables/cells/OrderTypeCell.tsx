import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { OrderType } from 'client/modules/trading/types';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';

interface Props extends TableCellProps {
  value: OrderType;
}

export function OrderTypeCell({ value, className }: WithClassnames<Props>) {
  const textColorClass = (() => {
    switch (value) {
      case 'stop_loss':
        return 'text-negative';
      case 'take_profit':
        return 'text-positive';
      default:
        return 'text-text-tertiary';
    }
  })();

  return (
    <TableCell
      className={joinClassNames(
        'whitespace-normal text-xs uppercase',
        textColorClass,
        className,
      )}
    >
      {getOrderTypeLabel(value)}
    </TableCell>
  );
}
