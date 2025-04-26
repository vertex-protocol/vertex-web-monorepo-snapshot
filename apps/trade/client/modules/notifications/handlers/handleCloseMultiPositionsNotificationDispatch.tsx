import { asyncResult } from '@vertex-protocol/utils';
import { DEFAULT_TOAST_TTL } from 'client/components/Toast/consts';
import { ActionErrorNotification } from 'client/modules/notifications/components/collateral/ActionErrorNotification';
import { CloseMultiPositionsErrorNotification } from 'client/modules/notifications/components/positions/CloseMultiPositionsErrorNotification';
import { CloseMultiPositionsNotificationData } from 'client/modules/notifications/types';
import { createToastId } from 'client/utils/createToastId';
import { getExecuteErrorMessage } from 'client/utils/errors/getExecuteErrorMessage';
import { isUserDeniedError } from 'client/utils/errors/isUserDeniedError';
import { toast } from 'react-hot-toast';

export async function handleCloseMultiPositionsNotificationDispatch({
  executeResult,
}: CloseMultiPositionsNotificationData) {
  const toastId = createToastId('closeMultiPositions');
  const [result, error] = await asyncResult(executeResult);

  if (result?.numFailed) {
    toast.custom(
      (t) => {
        return (
          <CloseMultiPositionsErrorNotification
            numFailed={result.numFailed}
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
  } else if (error && !isUserDeniedError(error)) {
    toast.custom(
      (t) => {
        return (
          <ActionErrorNotification
            title="Positions Failed to Close"
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
