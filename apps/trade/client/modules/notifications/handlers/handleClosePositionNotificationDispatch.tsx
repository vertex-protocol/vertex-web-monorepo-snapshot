import { asyncResult } from '@vertex-protocol/utils';
import { DEFAULT_TOAST_TTL } from 'client/components/Toast/consts';
import { ClosePositionErrorNotification } from 'client/modules/notifications/components/positions/ClosePositionErrorNotification';
import { ClosePositionSuccessNotification } from 'client/modules/notifications/components/positions/ClosePositionSuccessNotification';
import { SignaturePendingNotification } from 'client/modules/notifications/components/SignaturePendingNotification';
import {
  ClosePositionNotificationData,
  NotificationDispatchContext,
} from 'client/modules/notifications/types';
import { createToastId } from 'client/utils/createToastId';
import { getExecuteErrorMessage } from 'client/utils/errors/getExecuteErrorMessage';
import { isUserDeniedError } from 'client/utils/errors/isUserDeniedError';
import toast, { Toast } from 'react-hot-toast';

export async function handleClosePositionNotificationDispatch(
  closePositionNotificationData: ClosePositionNotificationData,
  context: NotificationDispatchContext,
) {
  const toastId = createToastId('closePosition');
  const { closePositionParams } = closePositionNotificationData;

  if (!context.isSingleSignature) {
    toast.custom(
      (t: Toast['message']) => {
        return (
          <SignaturePendingNotification
            action="close_position"
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

  const verifyOrderActionResult = async () => {
    await closePositionNotificationData.executeResult;
  };

  const [, orderActionError] = await asyncResult(verifyOrderActionResult());
  toast.dismiss(toastId);

  if (!orderActionError) {
    toast.custom(
      (t: Toast['message']) => {
        return (
          <ClosePositionSuccessNotification
            data={closePositionParams}
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
  } else if (!isUserDeniedError(orderActionError)) {
    toast.custom(
      (t: Toast['message']) => {
        return (
          <ClosePositionErrorNotification
            ttl={DEFAULT_TOAST_TTL}
            visible={t.visible}
            error={getExecuteErrorMessage(orderActionError)}
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
