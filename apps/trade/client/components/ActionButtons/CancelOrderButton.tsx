import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { CancellableOrderWithNotificationInfo } from 'client/hooks/execute/cancelOrder/types';
import { useExecuteCancelOrdersWithNotification } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrdersWithNotification';
import { useCanUserExecute } from 'client/hooks/subaccount/useCanUserExecute';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';

interface Props {
  order: CancellableOrderWithNotificationInfo;
}

export function CancelOrderButton({ order }: Props) {
  const { cancelOrdersWithNotification, status } =
    useExecuteCancelOrdersWithNotification();
  const canUserExecute = useCanUserExecute();

  const isCancelling = status === 'pending';
  // Users should be able to cancel orders even if a deposit is required
  const isDisabled = !canUserExecute || isCancelling;

  const message = (() => {
    switch (status) {
      case 'success':
        return <ButtonStateContent.Success message="Order Cancelled" />;
      case 'pending':
        return 'Cancelling';
      case 'idle':
      case 'error':
        return 'Cancel';
    }
  })();

  return (
    <SecondaryButton
      destructive
      className="flex-1"
      size="xs"
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
  );
}
