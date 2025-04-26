import { LiquidationNotification } from 'client/modules/notifications/components/risk/LiquidationNotification';
import { LiquidationNotificationData } from 'client/modules/notifications/types';
import { createToastId } from 'client/utils/createToastId';
import { toast } from 'react-hot-toast';

export function handleLiquidationNotificationDispatch(
  liquidationNotificationData: LiquidationNotificationData,
) {
  const toastId = createToastId('liquidationWarning');

  toast.custom(
    (t) => {
      return (
        <LiquidationNotification
          data={liquidationNotificationData}
          visible={t.visible}
          ttl={10000}
          onDismiss={() => {
            toast.dismiss(t.id);
          }}
        />
      );
    },
    {
      id: toastId,
      duration: 10000,
    },
  );
}
