import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { PendingActionToastProps } from 'client/components/Toast/ActionToast/types';
import { NotificationType } from 'client/modules/notifications/types';

interface Props extends PendingActionToastProps {
  action: Extract<
    NotificationType,
    | 'place_order'
    | 'close_position'
    | 'cancel_order'
    | 'cancel_multi_orders'
    | 'provide_liquidity'
    | 'withdraw_liquidity'
  >;
}

export function SignaturePendingNotification({
  action,
  visible,
  onDismiss,
}: Props) {
  const headerText = {
    place_order: 'Placing Order',
    close_position: 'Placing Market Close Order',
    cancel_order: 'Cancelling Order',
    cancel_multi_orders: 'Cancelling Orders',
    provide_liquidity: 'Providing Liquidity',
    withdraw_liquidity: 'Withdrawing Liquidity',
  }[action];

  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.TextHeader variant="pending" onDismiss={onDismiss}>
        {headerText}
      </ActionToast.TextHeader>
      <ActionToast.Separator variant="pending" />
      <ActionToast.Body variant="pending">
        Please sign transaction in your wallet...
      </ActionToast.Body>
    </ActionToast.Container>
  );
}
