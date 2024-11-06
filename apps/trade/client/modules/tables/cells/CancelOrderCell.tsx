import { joinClassNames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { CancellableOrderWithNotificationInfo } from 'client/hooks/execute/cancelOrder/types';
import { useExecuteCancelOrdersWithNotification } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrdersWithNotification';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';

interface Props extends TableCellProps {
  order: CancellableOrderWithNotificationInfo;
}

export function CancelOrderCell({ order, className }: Props) {
  const { cancelOrdersWithNotification, status } =
    useExecuteCancelOrdersWithNotification();
  const userActionState = useUserActionState();

  const isCancelling = status === 'pending';
  // Users should be able to cancel orders even if a deposit is required
  const isDisabled = userActionState === 'block_all';

  const message = (() => {
    switch (status) {
      case 'success':
        return <ButtonStateContent.Success message="Order Cancelled" />;
      case 'pending':
        return 'Canceling';
      case 'idle':
      case 'error':
        return 'Cancel';
    }
  })();

  return (
    <TableCell
      className={joinClassNames('pointer-events-auto px-3', className)}
    >
      <SecondaryButton
        destructive
        className="flex-1"
        size="sm"
        title="Cancel Order"
        disabled={isDisabled}
        isLoading={isCancelling}
        onClick={getTableButtonOnClickHandler(() => {
          cancelOrdersWithNotification({
            orders: [order],
          });
        })}
      >
        {message}
      </SecondaryButton>
    </TableCell>
  );
}
