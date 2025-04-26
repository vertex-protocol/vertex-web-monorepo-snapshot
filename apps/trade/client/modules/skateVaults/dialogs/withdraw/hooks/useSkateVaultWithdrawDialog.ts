import { addDecimals, removeDecimals } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import {
  InputValidatorFn,
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useDebounce } from 'ahooks';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import { useOnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { SkateVaultFormErrorType } from 'client/modules/skateVaults/dialogs/types';
import { useExecuteBurnSkateVaultShares } from 'client/modules/skateVaults/hooks/execute/useExecuteBurnSkateVaultShares';
import { useSkateVaultEstimatedQuoteReceived } from 'client/modules/skateVaults/hooks/query/useSkateVaultEstimatedQuoteReceived';
import { useSkateVaultState } from 'client/modules/skateVaults/hooks/query/useSkateVaultState';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Address } from 'viem';

export function useSkateVaultWithdrawDialog({
  vaultAddress,
}: {
  vaultAddress: Address;
}) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { data: skateVaultState } = useSkateVaultState({ vaultAddress });
  const { dispatchNotification } = useNotificationManagerContext();

  const quoteDecimals = primaryQuoteToken.tokenDecimals;

  const useSkateWithdrawForm = useForm<LinkedPercentageAmountFormValues>({
    defaultValues: {
      amount: '',
      amountSource: 'absolute',
      percentageAmount: 0,
    },
    mode: 'onTouched',
  });

  // Watched inputs
  const percentageAmountInput = useSkateWithdrawForm.watch('percentageAmount');
  const withdrawAmountInput = useSkateWithdrawForm.watch('amount');

  // Parsed Amounts
  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, withdrawAmountInput);
  }, [withdrawAmountInput]);

  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  const decimalAdjustedUserShares = useMemo(
    () => removeDecimals(skateVaultState?.userShares),
    [skateVaultState?.userShares],
  );

  // Change effects
  useLinkedPercentageAmountInputEffects({
    validAmount,
    validPercentageAmount,
    maxAmount: decimalAdjustedUserShares,
    form: useSkateWithdrawForm,
  });

  // Executes
  const executeBurnSkateVaultShares = useExecuteBurnSkateVaultShares();

  // Withdrawal mutation status fns
  const { isLoading: isWithdrawTxLoading, isSuccess: isWithdrawTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: executeBurnSkateVaultShares.status,
      txHash: executeBurnSkateVaultShares.data,
    });

  useRunWithDelayOnCondition({
    condition: isWithdrawTxSuccess,
    fn: executeBurnSkateVaultShares.reset,
  });

  // Validator
  const validateAmount = useCallback<
    InputValidatorFn<string, SkateVaultFormErrorType>
  >(
    (withdrawAmount) => {
      if (!withdrawAmount) {
        return;
      }

      // Check valid input first
      const parsedAmount =
        positiveBigDecimalValidator.safeParse(withdrawAmount);

      if (!parsedAmount.success) {
        return 'invalid_input';
      }

      if (decimalAdjustedUserShares?.lt(parsedAmount.data)) {
        return 'max_exceeded';
      }
    },
    [decimalAdjustedUserShares],
  );

  // Error Handling
  const amountInputError: SkateVaultFormErrorType | undefined = watchFormError(
    useSkateWithdrawForm,
    'amount',
  );

  // Action button state
  const buttonState = useMemo((): BaseActionButtonState => {
    if (isWithdrawTxLoading) {
      return 'loading';
    }
    if (isWithdrawTxSuccess) {
      return 'success';
    }
    if (!validAmount || !!amountInputError) {
      return 'disabled';
    }
    return 'idle';
  }, [isWithdrawTxLoading, isWithdrawTxSuccess, validAmount, amountInputError]);

  // Handlers
  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: useSkateWithdrawForm.setValue,
  });

  const validAmountWithAddedDecimals = useMemo(() => {
    return addDecimals(validAmount);
  }, [validAmount]);

  const debouncedAmountWithDecimals = useDebounce(validAmountWithAddedDecimals);

  // Estimate quote amount received given an amount of shares
  const { data: estimatedQuoteAmountReceived } =
    useSkateVaultEstimatedQuoteReceived({
      vaultAddress,
      numShares: debouncedAmountWithDecimals,
    });

  const onSubmitForm = () => {
    if (!validAmountWithAddedDecimals) {
      return;
    }

    const txHashPromise = executeBurnSkateVaultShares.mutateAsync(
      {
        numShares: validAmountWithAddedDecimals,
        vaultAddress,
      },
      {
        onSuccess: () => {
          useSkateWithdrawForm.resetField('amount');
          useSkateWithdrawForm.setValue('percentageAmount', 0);
        },
      },
    );

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Withdrawal Failed',
        executionData: { txHashPromise },
      },
    });
  };

  return {
    form: useSkateWithdrawForm,
    buttonState,
    validAmount,
    validPercentageAmount,
    percentageAmountInput,
    decimalAdjustedUserShares,
    decimalAdjustedEstimatedQuoteReceived: removeDecimals(
      estimatedQuoteAmountReceived,
      quoteDecimals,
    ),
    amountInputError,
    primaryQuoteToken,
    onFractionSelected,
    validateAmount,
    onSubmit: useSkateWithdrawForm.handleSubmit(onSubmitForm),
    onMaxAmountSelected: () => onFractionSelected(1),
  };
}
