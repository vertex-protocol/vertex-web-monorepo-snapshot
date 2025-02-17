import { joinClassNames } from '@vertex-protocol/web-common';
import { CancelOrderButton } from 'client/components/ActionButtons/CancelOrderButton';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { CancellableOrderWithNotificationInfo } from 'client/hooks/execute/cancelOrder/types';

interface Props extends TableCellProps {
  order: CancellableOrderWithNotificationInfo;
}

export function CancelOrderCell({ order, className }: Props) {
  return (
    <TableCell
      className={joinClassNames('pointer-events-auto px-3', className)}
    >
      <CancelOrderButton order={order} />
    </TableCell>
  );
}
