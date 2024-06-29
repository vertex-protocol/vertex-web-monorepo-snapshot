import { Header } from '@tanstack/react-table';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import {
  OrdersFilter,
  useExecuteCancelAllOrders,
} from 'client/hooks/execute/cancelOrder/useExecuteCancelAllOrders';

export function CancelAllOrdersHeaderCell<T>({
  ordersFilter,
  header,
}: {
  header: Header<T, any>;
  ordersFilter: OrdersFilter;
}) {
  const { cancelAllOrders, canCancel, status } =
    useExecuteCancelAllOrders(ordersFilter);

  const message = (() => {
    switch (status) {
      case 'success':
        return <ButtonStateContent.Success message="Orders Cancelled" />;
      case 'pending':
        return 'Canceling';
      case 'idle':
      case 'error':
        return 'Cancel all orders';
    }
  })();

  return (
    <HeaderCell header={header} className="flex justify-end px-3">
      <SecondaryButton
        destructive
        size="xs"
        disabled={!canCancel}
        isLoading={status === 'pending'}
        onClick={cancelAllOrders}
      >
        {message}
      </SecondaryButton>
    </HeaderCell>
  );
}
