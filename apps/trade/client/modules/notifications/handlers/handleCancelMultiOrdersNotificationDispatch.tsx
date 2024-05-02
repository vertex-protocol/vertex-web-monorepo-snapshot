import { DEFAULT_TOAST_TTL } from 'client/components/Toast/consts';
import { SignaturePendingNotification } from 'client/modules/notifications/components/SignaturePendingNotification';
import { asyncResult } from '@vertex-protocol/web-common';
import { createToastId } from 'client/utils/createToastId';
import { isUserDeniedError } from 'client/utils/errors/isUserDeniedError';
import { getExecuteErrorMessage } from 'client/utils/errors/getExecuteErrorMessage';
import toast from 'react-hot-toast';
import {
  CancelMultiOrdersNotificationData,
  NotificationDispatchContext,
} from '../types';
import { CancelMultiOrdersSuccessNotification } from 'client/modules/notifications/components/orders/CancelMultiOrdersSuccessNotification';
import { CancelMultiOrdersErrorNotification } from 'client/modules/notifications/components/orders/CancelMultiOrdersErrorNotification';

export async function handleCancelMultiOrdersNotificationDispatch(
  { serverExecutionResult, numOrders }: CancelMultiOrdersNotificationData,
  context: NotificationDispatchContext,
) {
  const toastId = createToastId('cancelMultiOrders');

  if (!context.isSingleSignature) {
    toast.custom(
      (t) => {
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
      (t) => {
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
      (t) => {
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
