import { asyncResult } from '@vertex-protocol/utils';
import { DEFAULT_TOAST_TTL } from 'client/components/Toast/consts';
import { CancelMultiOrdersErrorNotification } from 'client/modules/notifications/components/orders/CancelMultiOrdersErrorNotification';
import { CancelMultiOrdersSuccessNotification } from 'client/modules/notifications/components/orders/CancelMultiOrdersSuccessNotification';
import { SignaturePendingNotification } from 'client/modules/notifications/components/SignaturePendingNotification';
import {
  CancelMultiOrdersNotificationData,
  NotificationDispatchContext,
} from 'client/modules/notifications/types';
import { createToastId } from 'client/utils/createToastId';
import { getExecuteErrorMessage } from 'client/utils/errors/getExecuteErrorMessage';
import { isUserDeniedError } from 'client/utils/errors/isUserDeniedError';
import toast, { Toast } from 'react-hot-toast';

export async function handleCancelMultiOrdersNotificationDispatch(
  { serverExecutionResult, numOrders }: CancelMultiOrdersNotificationData,
  context: NotificationDispatchContext,
) {
  const toastId = createToastId('cancelMultiOrders');

  if (!context.isSingleSignature) {
    toast.custom(
      (t: Toast['message']) => {
        return (
          <SignaturePendingNotification
            action="cancel_multi_orders"
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

  const [, serverStatusError] = await asyncResult(serverExecutionResult);
  toast.dismiss(toastId);

  if (!serverStatusError) {
    toast.custom(
      (t: Toast['message']) => {
        return (
          <CancelMultiOrdersSuccessNotification
            numOrders={numOrders}
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
      (t: Toast['message']) => {
        return (
          <CancelMultiOrdersErrorNotification
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
