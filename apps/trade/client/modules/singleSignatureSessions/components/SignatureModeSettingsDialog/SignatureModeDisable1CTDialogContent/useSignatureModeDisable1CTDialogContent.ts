import { asyncResult } from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useExecuteUpdateLinkedSigner } from 'client/hooks/execute/useExecuteUpdateLinkedSigner';
import { useSubaccountLinkedSigner } from 'client/hooks/query/subaccount/useSubaccountLinkedSigner';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useMemo } from 'react';

export type SignatureModeSettingsUserStateWarning =
  // When user switches to "Sign always", open orders will be cancelled
  | 'will_cancel_orders'
  // Users are rate limited for configuring single signatures, we warn on the last switch
  | 'last_allowed_switch';

interface Params {
  onDisableSuccess(): void;
}

export function useSignatureModeDisable1CTDialogContent({
  onDisableSuccess,
}: Params) {
  const { dispatchNotification } = useNotificationManagerContext();
  const { signingPreference } = useSubaccountContext();
  const executeUpdateLinkedSigner = useExecuteUpdateLinkedSigner();

  useRunWithDelayOnCondition({
    condition: executeUpdateLinkedSigner.isSuccess,
    fn: () => {
      executeUpdateLinkedSigner.reset();
      onDisableSuccess();
    },
    delay: 2000,
  });

  const { data: currentServerLinkedSigner } = useSubaccountLinkedSigner();

  const numSwitchesRemaining =
    currentServerLinkedSigner?.remainingTxs.toNumber();

  const userStateWarning = useMemo(():
    | SignatureModeSettingsUserStateWarning
    | undefined => {
    // When user is out of switches, we show warning about it.
    if (numSwitchesRemaining === 0) {
      return 'last_allowed_switch';
    }
    return 'will_cancel_orders';
  }, [numSwitchesRemaining]);

  const buttonState = useMemo((): BaseActionButtonState => {
    if (executeUpdateLinkedSigner.isSuccess) {
      return 'success';
    }
    // Check for mutation loading
    if (executeUpdateLinkedSigner.isPending) {
      return 'loading';
    }
    return 'idle';
  }, [
    executeUpdateLinkedSigner.isPending,
    executeUpdateLinkedSigner.isSuccess,
  ]);

  const onSubmit = useCallback(async () => {
    const mutationResultPromise = executeUpdateLinkedSigner.mutateAsync({
      revoke: true,
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Disable 1CT Failed',
        executionData: {
          serverExecutionResult: mutationResultPromise,
        },
      },
    });

    const [, executeError] = await asyncResult(mutationResultPromise);

    // Only update state if success
    if (executeError) {
      return;
    }

    signingPreference.update({
      type: 'sign_always',
    });
  }, [dispatchNotification, executeUpdateLinkedSigner, signingPreference]);

  return {
    numSwitchesRemaining,
    totalTxLimit: currentServerLinkedSigner?.totalTxLimit.toNumber(),
    userStateWarning,
    buttonState,
    onSubmit,
  };
}
