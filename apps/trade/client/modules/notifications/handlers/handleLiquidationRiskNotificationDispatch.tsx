import { LiquidationRiskNotification } from 'client/modules/notifications/components/risk/LiquidationRiskNotification';
import { LiquidationRiskNotificationData } from 'client/modules/notifications/types';
import { createToastId } from 'client/utils/createToastId';
import { toast } from 'react-hot-toast';

export function handleLiquidationRiskNotificationDispatch(
  liquidationRiskNotificationData: LiquidationRiskNotificationData,
) {
  const toastId = createToastId('liquidationRiskWarning');

  toast.custom(
    (t) => {
      return (
        <LiquidationRiskNotification
          data={liquidationRiskNotificationData}
          visible={t.visible}
          onDismiss={() => {
            toast.dismiss(t.id);
          }}
        />
      );
    },
    {
      id: toastId,
      duration: Infinity,
    },
  );
}
