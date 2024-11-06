import { asyncResult } from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useExecuteUpdateLinkedSigner } from 'client/hooks/execute/useExecuteUpdateLinkedSigner';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useEffect, useState } from 'react';

export function useSingleSignatureReapprovalDialog() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { hide } = useDialog();
  // This execute will skip the engine API call if the derived wallet matches backend
  const executeUpdateLinkedSigner = useExecuteUpdateLinkedSigner();
  const { signingPreference } = useSubaccountContext();
  const [rememberMe, setRememberMe] = useState(false);

  useRunWithDelayOnCondition({
    condition: executeUpdateLinkedSigner.isSuccess,
    fn: hide,
    // Adding a shorter delay since it's a high-usage dialog
    delay: 1000,
  });

  // Sync remember me state
  useEffect(() => {
    if (signingPreference.current?.type !== 'sign_once') {
      return;
    }
    setRememberMe(signingPreference.current?.rememberMe ?? false);
  }, [signingPreference]);

  const onSubmit = useCallback(async () => {
    const mutationResultPromise = executeUpdateLinkedSigner.mutateAsync({
      revoke: false,
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Approve Failed',
        executionData: {
          serverExecutionResult: mutationResultPromise,
        },
      },
    });

    // In this case, we actually care about the returned data, so await the result
    const [linkedSignerWallet] = await asyncResult(mutationResultPromise);
    if (linkedSignerWallet) {
      signingPreference.update({
        type: 'sign_once',
        authorizedWallet: linkedSignerWallet,
        rememberMe,
      });
    }
  }, [
    dispatchNotification,
    executeUpdateLinkedSigner,
    rememberMe,
    signingPreference,
  ]);

  const buttonState: BaseActionButtonState = (() => {
    switch (executeUpdateLinkedSigner.status) {
      case 'success':
        return 'success';
      case 'pending':
        return 'loading';
      default:
        return 'idle';
    }
  })();

  return {
    rememberMe,
    setRememberMe,
    buttonState,
    onSubmit,
  };
}
