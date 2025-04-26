import { asyncResult } from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useExecuteUpdateLinkedSigner } from 'client/hooks/execute/useExecuteUpdateLinkedSigner';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useSignatureModeRememberMe() {
  const { dispatchNotification } = useNotificationManagerContext();
  // This execute will skip the engine API call if the derived wallet matches backend
  const executeUpdateLinkedSigner = useExecuteUpdateLinkedSigner();
  const { signingPreference } = useSubaccountContext();
  const [rememberMe, setRememberMe] = useState(false);

  // Sync remember me state
  useEffect(() => {
    if (signingPreference.current?.type !== 'sign_once') {
      return;
    }
    setRememberMe(signingPreference.current?.rememberMe ?? false);
  }, [signingPreference]);

  // Show button if settings have changed from initial state
  const showSaveRememberMeButton = useMemo(() => {
    if (signingPreference.current?.type !== 'sign_once') {
      return false;
    }
    return signingPreference.current?.rememberMe !== rememberMe;
  }, [rememberMe, signingPreference]);

  const onSubmit = useCallback(async () => {
    const mutationResultPromise = executeUpdateLinkedSigner.mutateAsync({
      revoke: false,
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Save Remember Me Failed',
        executionData: {
          serverExecutionResult: mutationResultPromise,
        },
      },
    });

    // In this case, we actually care about the returned data, so await the result
    const [linkedSigner] = await asyncResult(mutationResultPromise);
    if (linkedSigner) {
      signingPreference.update({
        type: 'sign_once',
        linkedSigner,
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
    showSaveRememberMeButton,
  };
}
