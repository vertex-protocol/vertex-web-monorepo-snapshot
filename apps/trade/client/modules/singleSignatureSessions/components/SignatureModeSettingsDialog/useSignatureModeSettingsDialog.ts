import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useExecuteUpdateLinkedSigner } from 'client/hooks/execute/useExecuteUpdateLinkedSigner';
import { useSubaccountLinkedSigner } from 'client/hooks/query/subaccount/useSubaccountLinkedSigner';
import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { SubaccountSigningPreferenceType } from 'client/modules/singleSignatureSessions/types';
import { asyncResult } from '@vertex-protocol/web-common';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export type SignatureModeSettingsButtonState =
  | 'requires_deposit'
  | 'requires_select' // No change in configured option
  | 'enabled'
  | 'loading'
  | 'success'
  | 'out_of_switches';

export type SignatureModeSettingsUserStateError =
  // Hit rate limit for enabling single signature
  | 'out_of_switches'
  // 5 USDC of account value required to enable single signature
  | 'below_minimum_value';

export type SignatureModeSettingsUserStateWarning =
  // When user selects "Sign always", open orders will be cancelled
  | 'will_cancel_orders'
  // Users are rate limited for configuring single signatures, we warn on the last switch
  | 'last_allowed_switch';

interface UseSignatureModeSettingsDialog {
  // "Form" state
  selectedMode: SubaccountSigningPreferenceType;
  rememberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
  showRememberMeToggle: boolean;
  numSwitchesRemaining?: number;
  totalTxLimit?: number;
  // Blocking
  userStateError: SignatureModeSettingsUserStateError | undefined;
  // Not blocking
  userStateWarning: SignatureModeSettingsUserStateWarning | undefined;
  buttonState: SignatureModeSettingsButtonState;
  hasChangedMode: boolean;
  disableInputs: boolean;

  setSelectedMode(mode: SubaccountSigningPreferenceType): void;

  onSubmit(): Promise<void>;
}

export function useSignatureModeSettingsDialog(): UseSignatureModeSettingsDialog {
  const { dispatchNotification } = useNotificationManagerContext();
  const { signingPreference } = useSubaccountContext();
  const executeUpdateLinkedSigner = useExecuteUpdateLinkedSigner();
  const { hide } = useDialog();

  useRunWithDelayOnCondition({
    condition: executeUpdateLinkedSigner.isSuccess,
    fn: hide,
    // Adding a shorter delay since it's a high-usage dialog
    delay: 1000,
  });

  const { data: currentServerLinkedSigner } = useSubaccountLinkedSigner();
  const { data: derivedSubaccountOverview } = useDerivedSubaccountOverview();

  // Form state
  const [selectedMode, setSelectedMode] =
    useState<SubaccountSigningPreferenceType>('sign_always');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const currentLocalSigningPreference = signingPreference.current;
  const numSwitchesRemaining =
    currentServerLinkedSigner?.remainingTxs.toNumber();

  const hasChangedMode = selectedMode !== currentLocalSigningPreference?.type;
  // This also accounts for switching the "Remember Me" setting
  const hasChangedSettings = (() => {
    if (hasChangedMode) {
      return true;
    }
    return (
      currentLocalSigningPreference?.type === 'sign_once' &&
      currentLocalSigningPreference.rememberMe !== rememberMe
    );
  })();

  // Sync with saved preference
  useEffect(() => {
    if (!currentLocalSigningPreference) {
      return;
    }
    setSelectedMode(currentLocalSigningPreference.type);
    if (currentLocalSigningPreference.type === 'sign_once') {
      setRememberMe(currentLocalSigningPreference.rememberMe);
    }
  }, [currentLocalSigningPreference, signingPreference]);

  const userStateError = useMemo(():
    | SignatureModeSettingsUserStateError
    | undefined => {
    if (!hasChangedMode) {
      return;
    }
    // When user is out of switches, they can't enable single signature
    // If user is currently in "sign always" mode, and has selected "sign once"
    // Display the error, and disable the button
    if (
      numSwitchesRemaining === 0 &&
      currentLocalSigningPreference?.type === 'sign_always'
    ) {
      return 'out_of_switches';
    }
    // Technically it's 5 USDC, but use USD here
    if (
      selectedMode === 'sign_once' &&
      derivedSubaccountOverview?.portfolioValueUsd.lt(5)
    ) {
      return 'below_minimum_value';
    }
  }, [
    derivedSubaccountOverview?.portfolioValueUsd,
    currentLocalSigningPreference?.type,
    hasChangedMode,
    numSwitchesRemaining,
    selectedMode,
  ]);

  const userStateWarning = useMemo(():
    | SignatureModeSettingsUserStateWarning
    | undefined => {
    if (
      currentLocalSigningPreference &&
      hasChangedMode &&
      selectedMode === 'sign_always'
    ) {
      return 'will_cancel_orders';
    }
    // When user is out of switches, they can still enable sign always
    // Display warning if currently in sign once mode, before they select sign always
    if (
      numSwitchesRemaining === 0 &&
      currentLocalSigningPreference?.type === 'sign_once' &&
      !hasChangedMode
    ) {
      return 'last_allowed_switch';
    }
  }, [
    currentLocalSigningPreference,
    hasChangedMode,
    numSwitchesRemaining,
    selectedMode,
  ]);

  const buttonState = useMemo((): SignatureModeSettingsButtonState => {
    if (executeUpdateLinkedSigner.isSuccess) {
      return 'success';
    }
    if (!hasChangedSettings) {
      return 'requires_select';
    }
    if (userStateError === 'below_minimum_value') {
      return 'requires_deposit';
    }
    if (userStateError === 'out_of_switches') {
      return 'out_of_switches';
    }
    // Check for mutation loading
    if (executeUpdateLinkedSigner.isPending) {
      return 'loading';
    }
    return 'enabled';
  }, [
    executeUpdateLinkedSigner.isPending,
    executeUpdateLinkedSigner.isSuccess,
    hasChangedSettings,
    userStateError,
  ]);

  const onSubmit = useCallback(async () => {
    if (buttonState !== 'enabled') {
      return;
    }

    const mutationResultPromise = executeUpdateLinkedSigner.mutateAsync({
      revoke: selectedMode === 'sign_always',
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
    const [linkedSignerWallet, executeError] = await asyncResult(
      mutationResultPromise,
    );

    // Only update state if success
    if (executeError) {
      return;
    }

    if (selectedMode === 'sign_always') {
      signingPreference.update({
        type: 'sign_always',
      });
    } else if (selectedMode === 'sign_once' && linkedSignerWallet) {
      signingPreference.update({
        type: 'sign_once',
        authorizedWallet: linkedSignerWallet,
        rememberMe: rememberMe,
      });
    } else {
      console.error(
        '[useSignatureModeSettingsDialog] Invalid state in onSubmit',
      );
    }
  }, [
    buttonState,
    dispatchNotification,
    executeUpdateLinkedSigner,
    rememberMe,
    selectedMode,
    signingPreference,
  ]);

  return {
    selectedMode,
    rememberMe,
    setRememberMe,
    showRememberMeToggle: !userStateError && selectedMode === 'sign_once',
    userStateError,
    numSwitchesRemaining,
    totalTxLimit: currentServerLinkedSigner?.totalTxLimit.toNumber(),
    userStateWarning,
    buttonState,
    hasChangedMode,
    disableInputs: buttonState === 'loading' || buttonState === 'success',
    setSelectedMode,
    onSubmit,
  };
}
