import { MarginUsageWarningNotification } from 'client/modules/notifications/components/risk/MarginUsageWarningNotification';
import { Toast, toast } from 'react-hot-toast';

export const MARGIN_USAGE_WARNING_TOAST_ID = 'marginUsageWarning';

export function handleMarginUsageWarningNotificationDispatch() {
  toast.custom(
    (t: Toast['message']) => {
      return (
        <MarginUsageWarningNotification
          visible={t.visible}
          onDismiss={() => {
            toast.dismiss(t.id);
          }}
        />
      );
    },
    {
      id: MARGIN_USAGE_WARNING_TOAST_ID,
      duration: Infinity,
    },
  );
}
