import { TriggerOrderInfo } from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { useExecuteCancelOrdersWithNotification } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrdersWithNotification';
import { useCanUserExecute } from 'client/hooks/subaccount/useCanUserExecute';
import { getTriggerOrderType } from 'client/modules/trading/utils/getTriggerOrderType';

interface Props {
  order: TriggerOrderInfo;
}

export function TpSlCancelOrderButton({ order }: Props) {
  const { cancelOrdersWithNotification, status } =
    useExecuteCancelOrdersWithNotification();
  const canUserExecute = useCanUserExecute();

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
      size="xs"
      destructive
      title="Cancel"
      disabled={!canUserExecute}
      isLoading={status === 'pending'}
      onClick={() => {
        cancelOrdersWithNotification({
          orders: [
            {
              productId: order.order.productId,
              digest: order.order.digest,
              decimalAdjustedTotalAmount: removeDecimals(order.order.amount),
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
