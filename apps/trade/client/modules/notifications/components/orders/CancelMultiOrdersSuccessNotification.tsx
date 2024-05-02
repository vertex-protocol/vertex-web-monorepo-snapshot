import { ROUTES } from 'client/modules/app/consts/routes';
import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { ToastProps } from 'client/components/Toast/types';
import { CancelMultiOrdersNotificationData } from 'client/modules/notifications/types';
import { Toast } from 'client/components/Toast/Toast';

interface CancelMultiOrdersNotificationProps extends ToastProps {
  numOrders: CancelMultiOrdersNotificationData['numOrders'];
}

export function CancelMultiOrdersSuccessNotification({
  numOrders,
  visible,
  ttl,
  onDismiss,
}: CancelMultiOrdersNotificationProps) {
  const ordersCount = numOrders > 1 ? `${numOrders} orders` : '1 order';

  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.TextHeader variant="success" onDismiss={onDismiss}>
        Orders Cancelled
      </ActionToast.TextHeader>
      <ActionToast.Separator variant="success" ttl={ttl} />
      <ActionToast.Body variant="success" className="flex flex-col gap-y-2">
        <p>You have successfully cancelled {ordersCount}.</p>
        <Toast.FooterLink href={ROUTES.portfolio.orders}>
          View Open Orders
        </Toast.FooterLink>
      </ActionToast.Body>
    </ActionToast.Container>
  );
}
