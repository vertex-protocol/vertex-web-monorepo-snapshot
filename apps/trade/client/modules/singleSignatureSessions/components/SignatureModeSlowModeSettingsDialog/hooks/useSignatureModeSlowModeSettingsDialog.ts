import { useForm } from 'react-hook-form';
import {
  SignatureModeSlowModeSettingsAction,
  SignatureModeSlowModeSettingsActionButtonState,
  SignatureModeSlowModeSettingsFormErrorType,
  SignatureModeSlowModeSettingsFormValues,
  UseSignatureModeSlowModeSettingsDialog,
} from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/types';
import { useSlowModeFeeAllowance } from 'client/hooks/subaccount/useSlowModeFeeAllowance';
import { watchFormError } from 'client/utils/form/watchFormError';
import { useCallback, useMemo } from 'react';
import { isHexString, Wallet, ZeroAddress } from 'ethers';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useSubaccountLinkedSigner } from 'client/hooks/query/subaccount/useSubaccountLinkedSigner';
import { useExecuteSlowModeUpdateLinkedSigner } from 'client/hooks/execute/useExecuteSlowModeUpdateLinkedSigner';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { asyncResult } from '@vertex-protocol/web-common';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useOnChainTransactionState } from 'client/hooks/query/useOnChainTransactionState';

export function useSignatureModeSlowModeSettingsDialog(): UseSignatureModeSlowModeSettingsDialog {
  const { dispatchNotification } = useNotificationManagerContext();
  const { data: currentServerLinkedSigner } = useSubaccountLinkedSigner();
  const { signingPreference } = useSubaccountContext();

  const {
    approvalTxState,
    approveFeeAllowance,
    executeApproveAllowance,
    requiresApproval,
  } = useSlowModeFeeAllowance();
  useRunWithDelayOnCondition({
    condition: approvalTxState.type === 'confirmed',
    fn: executeApproveAllowance.reset,
  });

  const executeSlowModeUpdateLinkedSigner =
    useExecuteSlowModeUpdateLinkedSigner();
  // Note: we're explicitly not resetting this mutation on success because we want to keep the success state
  // It's unlikely that the user will want to change the linked signer again after a successful update
  // And the success state is setup to show relevant instructions after a slow-mode tx is executed
  const slowModeTxState = useOnChainTransactionState({
    txResponse: executeSlowModeUpdateLinkedSigner?.data,
  });

  const form = useForm<SignatureModeSlowModeSettingsFormValues>({
    defaultValues: {
      selectedMode: 'sign_once',
      privateKey: '',
    },
    mode: 'onTouched',
  });

  const selectedMode = form.watch('selectedMode');
  const privateKey = form.watch('privateKey');
  const privateKeyError:
    | SignatureModeSlowModeSettingsFormErrorType
    | undefined = watchFormError(form, 'privateKey');

  // Validation for private key
  const validatePrivateKey = useCallback(
    (input: string): SignatureModeSlowModeSettingsFormErrorType | undefined => {
      if (!input) {
        return;
      }
      return isValidPrivateKey(input) ? undefined : 'invalid_private_key';
    },
    [],
  );
  const validSingleSignatureWallet = useMemo(() => {
    if (isValidPrivateKey(privateKey)) {
      return new Wallet(privateKey);
    }
  }, [privateKey]);

  // Handler for setting a random private key
  const setRandomPrivateKey = useCallback(() => {
    form.setValue('privateKey', Wallet.createRandom().privateKey, {
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [form]);

  // Handler for enable 1CT switch
  const onEnableSingleSignatureChange = useCallback(
    (value: boolean) => {
      form.setValue('selectedMode', value ? 'sign_once' : 'sign_always');
      // Reset the private key input
      form.resetField('privateKey');
    },
    [form],
  );

  // From available data & input, derive the current user action
  const userAction = useMemo((): SignatureModeSlowModeSettingsAction => {
    const serverLinkedSignerAddress =
      currentServerLinkedSigner?.signer.toLowerCase();
    const localStorageLinkedSignerAddress = (() => {
      if (signingPreference.current?.type === 'sign_once') {
        return signingPreference.current.authorizedWallet?.address.toLowerCase();
      }
      return ZeroAddress;
    })();

    const isChangingModes = (() => {
      if (
        selectedMode === 'sign_always' &&
        serverLinkedSignerAddress === ZeroAddress
      ) {
        return false;
      } else if (
        selectedMode === 'sign_once' &&
        validSingleSignatureWallet &&
        serverLinkedSignerAddress ===
          validSingleSignatureWallet.address.toLowerCase()
      ) {
        return false;
      }

      return true;
    })();

    if (isChangingModes && requiresApproval) {
      return 'approve';
    } else if (isChangingModes) {
      return 'execute_slow_mode';
    }

    // No need to change modes because the linked signer is already configured, determine if saving locally is needed
    return localStorageLinkedSignerAddress === serverLinkedSignerAddress
      ? 'no_action_required'
      : 'save_locally';
  }, [
    currentServerLinkedSigner?.signer,
    requiresApproval,
    selectedMode,
    signingPreference,
    validSingleSignatureWallet,
  ]);

  const formError = useMemo(() => {
    if (selectedMode === 'sign_once' && privateKeyError) {
      return privateKeyError;
    }
  }, [privateKeyError, selectedMode]);

  const buttonState =
    useMemo((): SignatureModeSlowModeSettingsActionButtonState => {
      // If sign once, then we need a valid private key, if sign always, then form is always valid
      const hasRequiredFormData =
        selectedMode === 'sign_always' || !!validSingleSignatureWallet;

      // Not executing slow mode tx is a heuristic that we're just saving and not executing
      const isSaveSuccess =
        slowModeTxState.type !== 'pending' &&
        executeSlowModeUpdateLinkedSigner.isSuccess;
      const isSlowModeTxSuccess = slowModeTxState.type === 'confirmed';

      if (
        executeApproveAllowance.isPending ||
        approvalTxState.type === 'pending' ||
        executeSlowModeUpdateLinkedSigner.isPending ||
        slowModeTxState.type === 'pending'
      ) {
        return 'loading';
      } else if (approvalTxState.type === 'confirmed') {
        return 'approve_success';
      } else if (isSaveSuccess || isSlowModeTxSuccess) {
        return 'success';
      } else if (
        formError ||
        !hasRequiredFormData ||
        userAction === 'no_action_required'
      ) {
        return 'disabled';
      }

      return 'idle';
    }, [
      approvalTxState.type,
      executeApproveAllowance.isPending,
      executeSlowModeUpdateLinkedSigner.isPending,
      executeSlowModeUpdateLinkedSigner.isSuccess,
      formError,
      selectedMode,
      slowModeTxState.type,
      userAction,
      validSingleSignatureWallet,
    ]);

  const onSubmitForm = useCallback(
    async (values: SignatureModeSlowModeSettingsFormValues) => {
      if (userAction === 'approve') {
        const txResponsePromise = approveFeeAllowance();
        dispatchNotification({
          type: 'action_error_handler',
          data: {
            errorNotificationTitle: 'Approve Fee Failed',
            executionData: {
              txResponsePromise,
            },
          },
        });
        return;
      }

      // This is just an alternative to try/catch - creating `new Wallet` throws if private key is invalid (which also occurs if it's empty for switching to sign-always)
      const [linkedSignerWallet] = await asyncResult(
        new Promise<Wallet>((resolve) => {
          resolve(new Wallet(values.privateKey));
        }),
      );
      if (values.selectedMode === 'sign_once' && !linkedSignerWallet) {
        console.warn(
          "[useSignatureModeSlowModeSettingsDialog] Couldn't derive linked signer wallet from private key input",
        );
        return;
      }

      const updateResult = executeSlowModeUpdateLinkedSigner.mutateAsync({
        wallet: linkedSignerWallet ?? null,
      });

      const [, mutationError] = await asyncResult(updateResult);

      if (mutationError) {
        dispatchNotification({
          type: 'action_error_handler',
          data: {
            errorNotificationTitle: 'Update Linked Signer Failed',
            executionData: {
              // We need to create a custom promise here because txReceiptIfExecuted is optionally a tx receipt
              txResponsePromise: new Promise((_, reject) => {
                reject(mutationError);
              }),
            },
          },
        });
        return;
      }

      // Now update local state
      if (values.selectedMode === 'sign_once' && linkedSignerWallet) {
        signingPreference.update({
          type: 'sign_once',
          authorizedWallet: linkedSignerWallet,
          // Always remember for now - otherwise this feature gets super annoying
          rememberMe: true,
        });
      } else if (values.selectedMode === 'sign_always') {
        signingPreference.update({
          type: 'sign_always',
        });
      }
    },
    [
      approveFeeAllowance,
      dispatchNotification,
      executeSlowModeUpdateLinkedSigner,
      signingPreference,
      userAction,
    ],
  );

  return {
    form,
    formError,
    validatePrivateKey,
    setRandomPrivateKey,
    userAction,
    buttonState,
    onEnableSingleSignatureChange,
    onSubmit: form.handleSubmit(onSubmitForm),
  };
}

function isValidPrivateKey(input: string): boolean {
  // https://github.com/ethers-io/ethers.js/discussions/2939#discussioncomment-2651396
  return isHexString(input, 32);
}
