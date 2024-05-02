import { DEFAULT_TOAST_TTL } from 'client/components/Toast/consts';
import { ActionErrorNotification } from 'client/modules/notifications/components/collateral/ActionErrorNotification';
import { asyncResult } from '@vertex-protocol/web-common';
import { createToastId } from 'client/utils/createToastId';
import { isUserDeniedError } from 'client/utils/errors/isUserDeniedError';
import { getExecuteErrorMessage } from 'client/utils/errors/getExecuteErrorMessage';
import toast from 'react-hot-toast';
import { ActionErrorHandlerNotificationData } from '../types';
import { getConfirmedTxPromise } from 'client/utils/getConfirmedTxPromise';

export async function handleActionErrorHandlerNotificationDispatch(
  data: ActionErrorHandlerNotificationData,
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
