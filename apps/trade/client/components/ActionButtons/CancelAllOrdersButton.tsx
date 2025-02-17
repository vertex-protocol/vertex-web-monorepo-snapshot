import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import {
  OrdersFilter,
  useExecuteCancelAllOrders,
} from 'client/hooks/execute/cancelOrder/useExecuteCancelAllOrders';

interface Props {
  ordersFilter: OrdersFilter;
}

export function CancelAllOrdersButton({ ordersFilter }: Props) {
  const { cancelAllOrders, canCancel, status } =
    useExecuteCancelAllOrders(ordersFilter);

  const message = (() => {
    switch (status) {
      case 'success':
        return <ButtonStateContent.Success message="Orders Cancelled" />;
      case 'pending':
        return 'Cancelling';
      case 'idle':
      case 'error':
        return 'Cancel all orders';
    }
  })();

  return (
    <SecondaryButton
      destructive
      size="xs"
      disabled={!canCancel}
      isLoading={status === 'pending'}
      onClick={cancelAllOrders}
    >
      {message}
    </SecondaryButton>
  );
}
