import { asyncResult } from '@vertex-protocol/utils';
import { DEFAULT_TOAST_TTL } from 'client/components/Toast/consts';
import { CancelOrderErrorNotification } from 'client/modules/notifications/components/orders/CancelOrderErrorNotification';
import { CancelOrderSuccessNotification } from 'client/modules/notifications/components/orders/CancelOrderSuccessNotification';
import { SignaturePendingNotification } from 'client/modules/notifications/components/SignaturePendingNotification';
import {
  CancelOrderNotificationData,
  NotificationDispatchContext,
} from 'client/modules/notifications/types';
import { createToastId } from 'client/utils/createToastId';
import { getExecuteErrorMessage } from 'client/utils/errors/getExecuteErrorMessage';
import { isUserDeniedError } from 'client/utils/errors/isUserDeniedError';
import { toast } from 'react-hot-toast';

export async function handleCancelOrderNotificationDispatch(
  cancelOrderNotificationData: CancelOrderNotificationData,
  context: NotificationDispatchContext,
) {
  const toastId = createToastId('cancelOrder');
  const { cancelOrderParams } = cancelOrderNotificationData;

  if (!context.isSingleSignature) {
    toast.custom(
      (t) => {
        return (
          <SignaturePendingNotification
            action="cancel_order"
            visible={t.visible}
            onDismiss={() => {
              toast.dismiss(t.id);
            }}
          />
        );
      },
      { id: toastId, duration: Infinity },
    );
  }

  const [, serverStatusError] = await asyncResult(
    cancelOrderNotificationData.serverExecutionResult,
  );
  toast.dismiss(toastId);

  if (!serverStatusError) {
    toast.custom(
      (t) => {
        return (
          <CancelOrderSuccessNotification
            data={cancelOrderParams}
            ttl={DEFAULT_TOAST_TTL}
            visible={t.visible}
            onDismiss={() => {
              toast.dismiss(t.id);
            }}
          />
        );
      },
      { id: toastId, duration: DEFAULT_TOAST_TTL },
    );
  } else if (!isUserDeniedError(serverStatusError)) {
    toast.custom(
      (t) => {
        return (
          <CancelOrderErrorNotification
            ttl={DEFAULT_TOAST_TTL}
            visible={t.visible}
            error={getExecuteErrorMessage(serverStatusError)}
            onDismiss={() => {
              toast.dismiss(t.id);
            }}
          />
        );
      },
      { id: toastId, duration: DEFAULT_TOAST_TTL },
    );
  }
}
