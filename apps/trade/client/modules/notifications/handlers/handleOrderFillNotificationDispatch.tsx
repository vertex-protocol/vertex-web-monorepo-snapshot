import { DEFAULT_TOAST_TTL } from 'client/components/Toast/consts';
import { OrderFillNotification } from 'client/modules/notifications/components/orders/OrderFillNotification/OrderFillNotification';
import { OrderFillNotificationData } from 'client/modules/notifications/types';
import { toast } from 'react-hot-toast';

export function handleOrderFillNotificationDispatch(
  data: OrderFillNotificationData,
) {
  // Enforce one toast per order
  const toastId = `order-${data.digest}`;

  toast.custom(
    (t) => {
      return (
        <OrderFillNotification
          visible={t.visible}
          data={data}
          ttl={DEFAULT_TOAST_TTL}
          onDismiss={() => {
            toast.dismiss(t.id);
          }}
        />
      );
    },
    { id: toastId, duration: DEFAULT_TOAST_TTL },
  );
}
