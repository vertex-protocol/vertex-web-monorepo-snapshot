import { calcLpTokenValue } from '@vertex-protocol/contracts';
import { addDecimals, removeDecimals } from '@vertex-protocol/utils';
import {
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useExecuteWithdrawLbaLiquidity } from 'client/hooks/execute/vrtxToken/useExecuteWithdrawLbaLiquidity';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountLbaState } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import { useOnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import {
  UseWithdrawLbaLiquidityForm,
  WithdrawLbaLiquidityErrorType,
  WithdrawLbaLiquidityFormValues,
} from 'client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/hooks/types';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { resolvePercentageAmountSubmitValue } from 'client/utils/form/resolvePercentageAmountSubmitValue';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { safeDiv } from 'client/utils/safeDiv';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export function useWithdrawLbaLiquidityForm(): UseWithdrawLbaLiquidityForm {
  const { primaryQuoteToken, protocolTokenMetadata } =
    useVertexMetadataContext();
  const { hide } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();
  const quotePriceUsd = usePrimaryQuotePriceUsd();

  const { data: accountLbaState } = useAccountLbaState();

  const { data: vrtxMarket } = useMarket({
    productId: protocolTokenMetadata.productId,
  });

  // Mutation
  const executeWithdrawLbaLiquidity = useExecuteWithdrawLbaLiquidity();

  const { isLoading: isTxLoading, isSuccess: isTxSuccessful } =
    useOnChainMutationStatus({
      mutationStatus: executeWithdrawLbaLiquidity.status,
      txResponse: executeWithdrawLbaLiquidity.data,
    });

  useRunWithDelayOnCondition({
    condition: isTxSuccessful,
    fn: hide,
  });

  /**
   * Market & account state
   */
  const marketState =
    useMemo((): UseWithdrawLbaLiquidityForm['marketState'] => {
      if (!vrtxMarket) {
        return;
      }
      const lpTokenValue = calcLpTokenValue(vrtxMarket.product);

      return {
        lpTokenValue,
      };
    }, [vrtxMarket]);

  const accountState =
    useMemo((): UseWithdrawLbaLiquidityForm['accountState'] => {
      if (!accountLbaState || !marketState) {
        return;
      }
      const lockedLpTokens = removeDecimals(accountLbaState.lockedLpBalance);
      const unlockedLpTokens = removeDecimals(
        accountLbaState.withdrawableLpBalance,
      );

      return {
        totalLiquidityUsd: lockedLpTokens
          .plus(unlockedLpTokens)
          .multipliedBy(marketState.lpTokenValue)
          .multipliedBy(quotePriceUsd),
        unlockedLiquidityUsd: unlockedLpTokens
          .multipliedBy(marketState.lpTokenValue)
          .multipliedBy(quotePriceUsd),
        unlockedLpTokens: unlockedLpTokens,
      };
    }, [accountLbaState, marketState, quotePriceUsd]);

  // Form
  const useWithdrawLbaLiquidityForm = useForm<WithdrawLbaLiquidityFormValues>({
    defaultValues: {
      amountSource: 'absolute',
      amount: '',
      percentageAmount: 0,
    },
    mode: 'onTouched',
  });

  const { setValue, handleSubmit, watch } = useWithdrawLbaLiquidityForm;

  // Watched inputs
  const amountInput = watch('amount');
  const percentageAmountInput = watch('percentageAmount');

  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, amountInput);
  }, [amountInput]);

  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  // Validation and errors
  const validateAmount = useCallback(
    (input: string): WithdrawLbaLiquidityErrorType | undefined => {
      if (!input) {
        return;
      }

      const validatedInput = safeParseForData(
        positiveBigDecimalValidator,
        input,
      );
      // Check valid input first
      if (!validatedInput) {
        return 'invalid_input';
      }
      // Then check max
      if (accountState && validatedInput.gt(accountState.unlockedLpTokens)) {
        return 'max_exceeded';
      }
    },
    [accountState],
  );

  const amountError: WithdrawLbaLiquidityErrorType | undefined = watchFormError(
    useWithdrawLbaLiquidityForm,
    'amount',
  );

  // Global form error
  const formError = amountError;

  // Linked inputs
  useLinkedPercentageAmountInputEffects({
    validAmount,
    validPercentageAmount,
    maxAmount: accountState?.unlockedLpTokens,
    form: useWithdrawLbaLiquidityForm,
  });

  // Estimated change amounts based on user input
  const estimatedReceiveAmounts =
    useMemo((): UseWithdrawLbaLiquidityForm['estimatedReceiveAmounts'] => {
      if (!vrtxMarket || !validAmount) {
        return;
      }
      const totalLpSupply = vrtxMarket.product.totalLpSupply;
      const totalDepositedVrtx = vrtxMarket.product.totalLpBaseAmount;
      const totalDepositedUsdc = vrtxMarket.product.totalLpQuoteAmount;
      const fracOfPool = safeDiv(validAmount, removeDecimals(totalLpSupply));

      const amountUsdc = removeDecimals(
        fracOfPool.multipliedBy(totalDepositedUsdc),
      );
      const amountVrtx = removeDecimals(
        fracOfPool.multipliedBy(totalDepositedVrtx),
      );

      return {
        usdc: amountUsdc,
        vrtx: amountVrtx,
        valueUsd: marketState?.lpTokenValue
          .multipliedBy(validAmount)
          .multipliedBy(quotePriceUsd),
        conversionRate: safeDiv(totalDepositedUsdc, totalDepositedVrtx),
      };
    }, [marketState?.lpTokenValue, quotePriceUsd, validAmount, vrtxMarket]);

  const onFractionSelected = useOnFractionSelectedHandler({
    setValue,
  });

  const buttonState = useMemo((): BaseActionButtonState => {
    if (isTxLoading) {
      return 'loading';
    }
    if (isTxSuccessful) {
      return 'success';
    }
    if (!validAmount || formError) {
      return 'disabled';
    }
    return 'idle';
  }, [formError, isTxLoading, isTxSuccessful, validAmount]);

  // Form submit handler
  const onSubmitForm = useCallback(
    (values: WithdrawLbaLiquidityFormValues) => {
      if (!accountState) {
        return;
      }

      const amountToWithdraw = resolvePercentageAmountSubmitValue(
        values,
        accountState?.unlockedLpTokens,
      );

      const txResponsePromise = executeWithdrawLbaLiquidity.mutateAsync(
        {
          amount: addDecimals(
            amountToWithdraw,
            protocolTokenMetadata.token.tokenDecimals,
          ).toFixed(),
        },
        {
          onSuccess: () => {
            useWithdrawLbaLiquidityForm.resetField('amount');
            useWithdrawLbaLiquidityForm.setValue('percentageAmount', 0);
          },
        },
      );

      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Withdraw LBA Liquidity Failed',
          executionData: { txResponsePromise },
        },
      });
    },
    [
      accountState,
      dispatchNotification,
      executeWithdrawLbaLiquidity,
      useWithdrawLbaLiquidityForm,
      protocolTokenMetadata.token.tokenDecimals,
    ],
  );

  return {
    form: useWithdrawLbaLiquidityForm,
    buttonState,
    validPercentageAmount,
    formError,
    onFractionSelected,
    validateAmount,
    onSubmit: handleSubmit(onSubmitForm),
    accountState,
    marketState,
    estimatedReceiveAmounts,
    pairMetadata: {
      base: protocolTokenMetadata.token,
      quote: primaryQuoteToken,
    },
    priceIncrement: vrtxMarket?.priceIncrement,
  };
}
