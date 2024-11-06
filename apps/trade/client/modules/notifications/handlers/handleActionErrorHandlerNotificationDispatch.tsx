import { asyncResult } from '@vertex-protocol/utils';
import { DEFAULT_TOAST_TTL } from 'client/components/Toast/consts';
import { ActionErrorNotification } from 'client/modules/notifications/components/collateral/ActionErrorNotification';
import {
  ActionErrorHandlerNotificationData,
  NotificationDispatchContext,
} from 'client/modules/notifications/types';
import { createToastId } from 'client/utils/createToastId';
import { getExecuteErrorMessage } from 'client/utils/errors/getExecuteErrorMessage';
import { isUserDeniedError } from 'client/utils/errors/isUserDeniedError';
import toast from 'react-hot-toast';

export async function handleActionErrorHandlerNotificationDispatch(
  data: ActionErrorHandlerNotificationData,
  { getConfirmedTxPromise }: NotificationDispatchContext,
) {
  const toastId = createToastId('action_error_handler');
  const executionData = data.executionData;

  let error: unknown | undefined;
  if ('serverExecutionResult' in executionData) {
    const [, serverError] = await asyncResult(
      executionData.serverExecutionResult,
    );
    error = serverError;
  } else {
    const [, txStatusError] = await asyncResult(
      getConfirmedTxPromise(executionData.txResponsePromise),
    );
    error = txStatusError;
  }

  if (error && !isUserDeniedError(error)) {
    toast.custom(
      (t) => {
        return (
          <ActionErrorNotification
            title={data.errorNotificationTitle}
            bodyContent={getExecuteErrorMessage(error)}
            visible={t.visible}
            ttl={DEFAULT_TOAST_TTL}
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
