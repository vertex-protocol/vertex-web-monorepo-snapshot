import {
  addDecimals,
  QUOTE_PRODUCT_ID,
  removeDecimals,
} from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import {
  InputValidatorFn,
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useDebounce } from 'ahooks';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAllDepositableTokenBalances } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useFormTokenAllowance } from 'client/hooks/ui/form/useFormTokenAllowance';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import { useOnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { SkateVaultFormErrorType } from 'client/modules/vaults/dialogs/types';
import { useExecuteMintSkateVaultShares } from 'client/modules/vaults/hooks/execute/useExecuteMintSkateVaultShares';
import { useSkateVaultEstimatedSharesReceived } from 'client/modules/vaults/hooks/query/useSkateVaultEstimatedSharesReceived';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { OnChainActionButtonStateWithApproval } from 'client/types/OnChainActionButtonStateWithApproval';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { get } from 'lodash';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Address } from 'viem';

export function useSkateVaultDepositDialog({
  vaultAddress,
}: {
  vaultAddress: Address;
}) {
  const { data: depositableTokenBalances } = useAllDepositableTokenBalances();
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { dispatchNotification } = useNotificationManagerContext();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const quoteDecimals = primaryQuoteToken.tokenDecimals;

  const useSkateDepositForm = useForm<LinkedPercentageAmountFormValues>({
    defaultValues: {
      amount: '',
      amountSource: 'absolute',
      percentageAmount: 0,
    },
    mode: 'onTouched',
  });

  // Amount in wallet
  const decimalAdjustedWalletBalance = useMemo(() => {
    return removeDecimals(
      get(depositableTokenBalances, QUOTE_PRODUCT_ID, undefined),
      quoteDecimals,
    );
  }, [depositableTokenBalances, quoteDecimals]);

  // Watched inputs
  const percentageAmountInput = useSkateDepositForm.watch('percentageAmount');
  const depositAmountInput = useSkateDepositForm.watch('amount');

  // Parsed Amounts
  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, depositAmountInput);
  }, [depositAmountInput]);

  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  // Change effects
  useLinkedPercentageAmountInputEffects({
    validAmount,
    validPercentageAmount,
    maxAmount: decimalAdjustedWalletBalance,
    form: useSkateDepositForm,
  });

  const validAmountWithAddedDecimals = useMemo(() => {
    return addDecimals(validAmount, quoteDecimals);
  }, [validAmount, quoteDecimals]);

  // Execute
  const executeMintSkateVaultShares = useExecuteMintSkateVaultShares();
  const { approve, approvalButtonState, requiresApproval } =
    useFormTokenAllowance({
      amountWithDecimals: validAmountWithAddedDecimals,
      spenderAddress: vaultAddress,
      tokenAddress: primaryQuoteToken.address,
    });

  // Deposit mutation status fns
  const { isLoading: isDepositTxLoading, isSuccess: isDepositTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: executeMintSkateVaultShares.status,
      txHash: executeMintSkateVaultShares.data,
    });

  useRunWithDelayOnCondition({
    condition: isDepositTxSuccess,
    fn: executeMintSkateVaultShares.reset,
  });

  // Validator
  const validateAmount = useCallback<
    InputValidatorFn<string, SkateVaultFormErrorType>
  >(
    (depositAmount) => {
      if (!depositAmount) {
        return;
      }

      // Check valid input first
      const parsedAmount = positiveBigDecimalValidator.safeParse(depositAmount);

      if (!parsedAmount.success) {
        return 'invalid_input';
      }

      if (decimalAdjustedWalletBalance?.lt(parsedAmount.data)) {
        return 'max_exceeded';
      }
    },
    [decimalAdjustedWalletBalance],
  );

  // Error Handling
  const amountInputError: SkateVaultFormErrorType | undefined = watchFormError(
    useSkateDepositForm,
    'amount',
  );

  // Action button state
  const buttonState = useMemo((): OnChainActionButtonStateWithApproval => {
    if (isDepositTxLoading) {
      return 'loading';
    }
    if (isDepositTxSuccess) {
      return 'success';
    }
    if (!validAmount || !!amountInputError) {
      return 'disabled';
    }
    if (approvalButtonState) {
      return approvalButtonState;
    }
    return 'idle';
  }, [
    isDepositTxLoading,
    isDepositTxSuccess,
    approvalButtonState,
    validAmount,
    amountInputError,
  ]);

  const debouncedAmountWithDecimals = useDebounce(validAmountWithAddedDecimals);

  // Estimate shares received
  const { data: estimatedSharesReceived } =
    useSkateVaultEstimatedSharesReceived({
      quoteAmount: debouncedAmountWithDecimals,
      vaultAddress,
    });

  // Handlers
  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: useSkateDepositForm.setValue,
  });

  const onSubmitForm = () => {
    if (!validAmountWithAddedDecimals) {
      return;
    }

    if (requiresApproval) {
      approve(validAmountWithAddedDecimals);
    } else {
      const txHashPromise = executeMintSkateVaultShares.mutateAsync(
        {
          quoteAmount: validAmountWithAddedDecimals,
          vaultAddress: vaultAddress,
        },
        {
          onSuccess: () => {
            useSkateDepositForm.resetField('amount');
            useSkateDepositForm.setValue('percentageAmount', 0);
          },
        },
      );

      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Deposit Failed',
          executionData: { txHashPromise },
        },
      });
    }
  };

  return {
    form: useSkateDepositForm,
    buttonState,
    amountInputError,
    validAmount,
    percentageAmountInput,
    validPercentageAmount,
    decimalAdjustedWalletBalance,
    estimatedSharesReceived: removeDecimals(estimatedSharesReceived),
    estimatedInputValueUsd:
      validAmount && primaryQuotePriceUsd.multipliedBy(validAmount),
    primaryQuoteToken,
    onFractionSelected,
    validateAmount,
    onSubmit: useSkateDepositForm.handleSubmit(onSubmitForm),
    onMaxAmountSelected: () => onFractionSelected(1),
  };
}
