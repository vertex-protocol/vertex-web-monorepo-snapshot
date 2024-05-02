import { createToastId } from 'client/utils/createToastId';
import toast from 'react-hot-toast';

import { LiquidationNotification } from '../components/risk/LiquidationNotification';
import { LiquidationNotificationData } from '../types';

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
