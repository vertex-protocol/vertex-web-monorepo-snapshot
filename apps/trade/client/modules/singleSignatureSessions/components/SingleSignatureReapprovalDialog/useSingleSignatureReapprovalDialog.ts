import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useExecuteUpdateLinkedSigner } from 'client/hooks/execute/useExecuteUpdateLinkedSigner';
import { asyncResult } from '@vertex-protocol/web-common';
import { useCallback, useEffect, useState } from 'react';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

interface UseSingleSignatureReapprovalDialog {
  rememberMe: boolean;

  buttonState: 'loading' | 'enabled' | 'success';

  setRememberMe(rememberMe: boolean): void;

  onSubmit(): Promise<void>;
}

export function useSingleSignatureReapprovalDialog(): UseSingleSignatureReapprovalDialog {
  const { dispatchNotification } = useNotificationManagerContext();

  // This execute will skip the engine API call if the derived wallet matches backend
  const executeUpdateLinkedSigner = useExecuteUpdateLinkedSigner();
  const { signingPreference } = useSubaccountContext();
  const [rememberMe, setRememberMe] = useState(false);
  const { hide } = useDialog();

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
        errorNotificationTitle: 'Save Settings Failed',
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

  const buttonState: UseSingleSignatureReapprovalDialog['buttonState'] =
    (() => {
      switch (executeUpdateLinkedSigner.status) {
        case 'success':
          return 'success';
        case 'pending':
          return 'loading';
        default:
          return 'enabled';
      }
    })();

  return {
    rememberMe,
    setRememberMe,
    buttonState,
    onSubmit,
  };
}
