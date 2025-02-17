import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { asyncResult, removeDecimals } from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useExecuteSlowModeUpdateLinkedSigner } from 'client/hooks/execute/useExecuteSlowModeUpdateLinkedSigner';
import { useAllDepositableTokenBalances } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useSubaccountLinkedSigner } from 'client/hooks/query/subaccount/useSubaccountLinkedSigner';
import { useOnChainTransactionState } from 'client/hooks/query/useOnChainTransactionState';
import {
  SLOW_MODE_FEE_AMOUNT_USDC,
  useSlowModeFeeAllowance,
} from 'client/hooks/subaccount/useSlowModeFeeAllowance';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import {
  SignatureModeSlowModeSettingsAction,
  SignatureModeSlowModeSettingsActionButtonState,
  SignatureModeSlowModeSettingsFormErrorType,
  SignatureModeSlowModeSettingsFormValues,
  UseSignatureModeSlowModeSettingsDialog,
} from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/types';
import { watchFormError } from 'client/utils/form/watchFormError';
import { Wallet } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { isHex, zeroAddress } from 'viem';

export function useSignatureModeSlowModeSettingsDialog(): UseSignatureModeSlowModeSettingsDialog {
  const { dispatchNotification } = useNotificationManagerContext();
  const { data: currentServerLinkedSigner } = useSubaccountLinkedSigner();
  const { signingPreference } = useSubaccountContext();
  const { data: depositableTokenBalances } = useAllDepositableTokenBalances();
  const {
    primaryQuoteToken: { tokenDecimals: primaryQuoteTokenDecimals },
  } = useVertexMetadataContext();

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
    txHash: executeSlowModeUpdateLinkedSigner?.data,
  });

  // When currently enabled, populate the current private key so users can see it
  const defaultPrivateKeyValue = (() => {
    const { current } = signingPreference;
    if (current?.type !== 'sign_once') {
      return '';
    }

    return current.authorizedWallet?.privateKey ?? '';
  })();
  const form = useForm<SignatureModeSlowModeSettingsFormValues>({
    defaultValues: {
      selectedMode: 'sign_once',
      privateKey: defaultPrivateKeyValue,
    },
    mode: 'onTouched',
  });

  const selectedMode = form.watch('selectedMode');
  const privateKey = form.watch('privateKey');
  const privateKeyInputError:
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
  const userAction = useMemo(():
    | SignatureModeSlowModeSettingsAction
    | undefined => {
    const serverLinkedSignerAddress =
      currentServerLinkedSigner?.signer.toLowerCase();
    const localStorageLinkedSignerAddress = (() => {
      if (signingPreference.current?.type === 'sign_once') {
        return signingPreference.current.authorizedWallet?.address.toLowerCase();
      }
      return zeroAddress;
    })();

    // Case when user wants to turn off 1CT
    if (selectedMode === 'sign_always') {
      if (serverLinkedSignerAddress === zeroAddress) {
        // For the first case: server is already configured but local state is not
        return localStorageLinkedSignerAddress !== zeroAddress
          ? 'save_without_tx'
          : undefined;
      }
      return 'execute_slow_mode';
    }

    // Case when user wants to turn on 1CT
    if (!validSingleSignatureWallet) {
      return;
    }
    const singleSignatureWalletAddress =
      validSingleSignatureWallet.address.toLowerCase();
    if (serverLinkedSignerAddress !== singleSignatureWalletAddress) {
      return requiresApproval ? 'requires_fee_approval' : 'execute_slow_mode';
    }
    if (localStorageLinkedSignerAddress !== singleSignatureWalletAddress) {
      return 'save_without_tx';
    }
  }, [
    currentServerLinkedSigner?.signer,
    requiresApproval,
    selectedMode,
    signingPreference,
    validSingleSignatureWallet,
  ]);

  const formError = useMemo(():
    | SignatureModeSlowModeSettingsFormErrorType
    | undefined => {
    if (selectedMode === 'sign_once' && privateKeyInputError) {
      return privateKeyInputError;
    }
    if (
      userAction === 'execute_slow_mode' &&
      removeDecimals(
        depositableTokenBalances?.[QUOTE_PRODUCT_ID],
        primaryQuoteTokenDecimals,
      )?.lt(SLOW_MODE_FEE_AMOUNT_USDC)
    ) {
      return 'insufficient_balance_for_fee';
    }
  }, [
    depositableTokenBalances,
    primaryQuoteTokenDecimals,
    privateKeyInputError,
    selectedMode,
    userAction,
  ]);

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
      } else if (formError || !hasRequiredFormData || !userAction) {
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
      if (userAction === 'requires_fee_approval') {
        const txHashPromise = approveFeeAllowance();
        dispatchNotification({
          type: 'action_error_handler',
          data: {
            errorNotificationTitle: 'Approve Fee Failed',
            executionData: {
              txHashPromise,
            },
          },
        });
        return;
      }

      // This is just an alternative to try/catch - creating `new Wallet` throws if private key is invalid (which also occurs if it's empty for switching to sign-always)
      const [linkedSignerWallet] = await asyncResult(
        new Promise<Wallet | undefined>((resolve) => {
          if (values.selectedMode === 'sign_always') {
            resolve(undefined);
            return;
          }
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
              txHashPromise: new Promise((_, reject) => {
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
    privateKeyInputError,
    validatePrivateKey,
    setRandomPrivateKey,
    userAction,
    buttonState,
    onEnableSingleSignatureChange,
    onSubmit: form.handleSubmit(onSubmitForm),
  };
}

function isValidPrivateKey(input: string): boolean {
  return isHex(input) && input.length === 66;
}
