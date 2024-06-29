import { TriggerOrderInfo } from '@vertex-protocol/client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { useExecuteCancelOrdersWithNotification } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrdersWithNotification';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { getTriggerOrderType } from 'client/modules/trading/utils/getTriggerOrderType';
import { removeDecimals } from '@vertex-protocol/utils';

interface Props {
  order: TriggerOrderInfo;
}

export function TpSlCancelOrderButton({ order }: Props) {
  const { cancelOrdersWithNotification, status } =
    useExecuteCancelOrdersWithNotification();
  const userActionState = useUserActionState();

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
    <SecondaryButton
      size="sm"
      destructive
      title="Cancel"
      disabled={userActionState === 'block_all'}
      isLoading={status === 'pending'}
      onClick={() => {
        cancelOrdersWithNotification({
          orders: [
            {
              productId: order.order.productId,
              digest: order.order.digest,
              totalAmount: removeDecimals(order.order.amount),
              orderType: getTriggerOrderType(order),
              isTrigger: true,
            },
          ],
        });
      }}
    >
      {message}
    </SecondaryButton>
  );
}
