import { Header } from '@tanstack/react-table';
import { CancelAllOrdersButton } from 'client/components/ActionButtons/CancelAllOrdersButton';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { OrdersFilter } from 'client/hooks/execute/cancelOrder/useExecuteCancelAllOrders';

export function CancelAllOrdersHeaderCell<T>({
  ordersFilter,
  header,
}: {
  header: Header<T, any>;
  ordersFilter: OrdersFilter;
}) {
  return (
    <HeaderCell header={header} className="flex justify-end px-3">
      <CancelAllOrdersButton ordersFilter={ordersFilter} />
    </HeaderCell>
  );
}
