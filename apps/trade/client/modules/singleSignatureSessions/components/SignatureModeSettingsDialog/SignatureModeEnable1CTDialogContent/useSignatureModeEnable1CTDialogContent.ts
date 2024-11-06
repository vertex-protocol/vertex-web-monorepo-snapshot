import { asyncResult } from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useExecuteUpdateLinkedSigner } from 'client/hooks/execute/useExecuteUpdateLinkedSigner';
import { useSubaccountLinkedSigner } from 'client/hooks/query/subaccount/useSubaccountLinkedSigner';
import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useRequiresSingleSignatureSetup } from 'client/modules/singleSignatureSessions/hooks/useRequiresSingleSignatureSetup';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type SignatureModeSettingsUserStateError =
  // Hit rate limit for enabling single signature
  | 'out_of_switches'
  // 5 USDC of account value required to enable single signature
  | 'below_minimum_value';

interface Params {
  onEnableSuccess(): void;
}

export function useSignatureModeEnable1CTDialogContent({
  onEnableSuccess,
}: Params) {
  const { dispatchNotification } = useNotificationManagerContext();
  const { signingPreference } = useSubaccountContext();
  const executeUpdateLinkedSigner = useExecuteUpdateLinkedSigner();
  const requiresSingleSignatureSetup = useRequiresSingleSignatureSetup();

  useRunWithDelayOnCondition({
    condition: executeUpdateLinkedSigner.isSuccess,
    fn: () => {
      executeUpdateLinkedSigner.reset();
      onEnableSuccess();
    },
    delay: 2000,
  });

  const { data: currentServerLinkedSigner } = useSubaccountLinkedSigner();
  const { data: derivedSubaccountOverview } = useDerivedSubaccountOverview();

  // Form state
  const [rememberMe, setRememberMe] = useState(false);

  // Sync remember me state
  useEffect(() => {
    if (signingPreference.current?.type !== 'sign_once') {
      return;
    }
    setRememberMe(signingPreference.current?.rememberMe ?? false);
  }, [signingPreference]);

  const numSwitchesRemaining =
    currentServerLinkedSigner?.remainingTxs.toNumber();

  const userStateError = useMemo(():
    | SignatureModeSettingsUserStateError
    | undefined => {
    // When user is out of switches, they can't enable single signature
    // Display the error, and disable the button
    if (numSwitchesRemaining === 0) {
      return 'out_of_switches';
    }
    // Technically it's 5 USDC, but use USD here. There's also a backend rounding error for balances, so we check for just under 5
    if (derivedSubaccountOverview?.portfolioValueUsd.lt(4.99)) {
      return 'below_minimum_value';
    }
  }, [numSwitchesRemaining, derivedSubaccountOverview?.portfolioValueUsd]);

  const buttonState = useMemo((): BaseActionButtonState => {
    if (executeUpdateLinkedSigner.isSuccess) {
      return 'success';
    }
    // Disable in case of userStateError.
    if (!!userStateError) {
      return 'disabled';
    }
    // Check for mutation loading
    if (executeUpdateLinkedSigner.isPending) {
      return 'loading';
    }
    return 'idle';
  }, [
    executeUpdateLinkedSigner.isPending,
    executeUpdateLinkedSigner.isSuccess,
    userStateError,
  ]);

  const onSubmit = useCallback(async () => {
    const mutationResultPromise = executeUpdateLinkedSigner.mutateAsync({
      revoke: false,
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Enable 1CT Failed',
        executionData: {
          serverExecutionResult: mutationResultPromise,
        },
      },
    });

    // In this case, we actually care about the returned data, so await the result
    const [linkedSignerWallet, executeError] = await asyncResult(
      mutationResultPromise,
    );

    // Only update state if success
    if (executeError) {
      return;
    }

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

  const skipSignOnceSuggestion = useCallback(() => {
    signingPreference.update({
      type: 'sign_always',
    });
  }, [signingPreference]);

  return {
    rememberMe,
    setRememberMe,
    userStateError,
    buttonState,
    requiresSingleSignatureSetup,
    disableInputs: buttonState === 'loading' || buttonState === 'success',
    onSubmit,
    skipSignOnceSuggestion,
  };
}
