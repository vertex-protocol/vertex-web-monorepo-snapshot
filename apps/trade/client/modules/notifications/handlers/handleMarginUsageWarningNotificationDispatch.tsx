import { MarginUsageWarningNotification } from 'client/modules/notifications/components/risk/MarginUsageWarningNotification';
import { createToastId } from 'client/utils/createToastId';
import { toast } from 'react-hot-toast';

export function handleMarginUsageWarningNotificationDispatch() {
  const toastId = createToastId('marginUsageWarning');

  toast.custom(
    (t) => {
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
      id: toastId,
      duration: Infinity,
    },
  );
}
