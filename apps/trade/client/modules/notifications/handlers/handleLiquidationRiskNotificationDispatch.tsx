import { LiquidationRiskNotification } from 'client/modules/notifications/components/risk/LiquidationRiskNotification';
import { LiquidationRiskNotificationData } from 'client/modules/notifications/types';
import { toast } from 'react-hot-toast';

export const LIQUIDATION_RISK_WARNING_TOAST_ID = 'liquidationRiskWarning';

export function handleLiquidationRiskNotificationDispatch(
  liquidationRiskNotificationData: LiquidationRiskNotificationData,
) {
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
      id: LIQUIDATION_RISK_WARNING_TOAST_ID,
      duration: Infinity,
    },
  );
}
