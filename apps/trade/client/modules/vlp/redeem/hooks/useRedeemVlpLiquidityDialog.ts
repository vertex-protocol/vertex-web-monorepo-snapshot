import { toIntegerString, VLP_PRODUCT_ID } from '@vertex-protocol/client';
import {
  AnnotatedSpotMarket,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { addDecimals, BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import {
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { SEQUENCER_FEE_AMOUNT_USDC } from 'client/consts/sequencerFee';
import { useExecuteBurnVlp } from 'client/hooks/execute/useExecuteBurnVlp';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import { useOnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { resolvePercentageAmountSubmitValue } from 'client/utils/form/resolvePercentageAmountSubmitValue';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export type RedeemVlpLiquidityFormErrorType = 'invalid_input' | 'max_exceeded';

export type RedeemVlpLiquidityActionButtonState = BaseActionButtonState;

export type RedeemVlpLiquidityFormValues = LinkedPercentageAmountFormValues;

export function useRedeemVlpLiquidityDialog() {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { dispatchNotification } = useNotificationManagerContext();
  const { data: vlpMarket } = useMarket<AnnotatedSpotMarket>({
    productId: VLP_PRODUCT_ID,
  });
  const { balances } = useSpotBalances();

  const vlpBalance = useMemo(() => {
    return balances?.find((balance) => balance.productId === VLP_PRODUCT_ID);
  }, [balances]);
  const vlpBalanceAmount = vlpBalance?.amount;

  // Form state
  const form = useForm<RedeemVlpLiquidityFormValues>({
    defaultValues: {
      amount: '',
      amountSource: 'absolute',
      percentageAmount: 0,
    },
    mode: 'onTouched',
  });

  // Watched & derived state
  const amountInput = form.watch('amount');
  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, amountInput);
  }, [amountInput]);

  // Estimate fee from the input. There is a base sequencer fee and an additional VLP fee.
  // The VLP fee is calculated as:
  // quote_amount = vlp_to_burn * oracle_price
  // fee = min(quote_amount, max(1 USDC, quote_amount * 10 bps))
  const primaryQuoteFeeAmount = useMemo(() => {
    if (!validAmount || !vlpMarket) {
      return SEQUENCER_FEE_AMOUNT_USDC;
    }

    const quoteAmount = validAmount.multipliedBy(vlpMarket.product.oraclePrice);
    const vlpFee = BigDecimal.min(
      quoteAmount,
      BigDecimal.max(BigDecimals.ONE, quoteAmount.multipliedBy(0.001)),
    );

    return vlpFee.plus(SEQUENCER_FEE_AMOUNT_USDC);
  }, [validAmount, vlpMarket]);

  // Use oracle price to estimate the amount of USDC returned
  const estimatedPrimaryQuoteAmount = useMemo(() => {
    if (!validAmount || !vlpMarket) {
      return;
    }

    return validAmount
      .multipliedBy(vlpMarket.product.oraclePrice)
      .minus(primaryQuoteFeeAmount);
  }, [primaryQuoteFeeAmount, validAmount, vlpMarket]);

  const amountInputError: RedeemVlpLiquidityFormErrorType | undefined =
    watchFormError(form, 'amount');

  const percentageAmountInput = form.watch('percentageAmount');
  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  // Linked percentage / amount inputs
  useLinkedPercentageAmountInputEffects({
    validPercentageAmount,
    validAmount,
    maxAmount: vlpBalanceAmount,
    form,
  });

  // Validation for inputs
  const validateAmount = useCallback(
    (input: string): RedeemVlpLiquidityFormErrorType | undefined => {
      if (!input) {
        return;
      }

      const parsedInput = safeParseForData(positiveBigDecimalValidator, input);
      if (!parsedInput) {
        return 'invalid_input';
      }
      if (vlpBalanceAmount && parsedInput.gt(vlpBalanceAmount)) {
        return 'max_exceeded';
      }
    },
    [vlpBalanceAmount],
  );

  // Handlers
  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: form.setValue,
  });

  // Burn mutation
  const executeBurnVlp = useExecuteBurnVlp();
  const mutateBurnVlpAsync = executeBurnVlp.mutateAsync;

  useRunWithDelayOnCondition({
    condition: executeBurnVlp.isSuccess,
    fn: executeBurnVlp.reset,
  });

  const onSubmitForm = useCallback(
    (values: RedeemVlpLiquidityFormValues) => {
      const amount = resolvePercentageAmountSubmitValue(
        values,
        vlpBalanceAmount,
      );

      if (amount.isZero()) {
        console.warn('[useRedeemVlpLiquidityDialog] Amount input is zero');
        return;
      }

      const amountWithDecimals = toIntegerString(addDecimals(amount));

      const serverExecutionResult = mutateBurnVlpAsync(
        {
          vlpAmount: amountWithDecimals,
        },
        {
          onSuccess: () => {
            form.resetField('amount');
            form.setValue('percentageAmount', 0);
          },
        },
      );

      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Redeem VLP Failed',
          executionData: { serverExecutionResult },
        },
      });
    },
    [vlpBalanceAmount, mutateBurnVlpAsync, dispatchNotification, form],
  );

  // Global form error state
  const formError: RedeemVlpLiquidityFormErrorType | undefined =
    amountInputError;

  // Action button state
  const buttonState = useMemo((): RedeemVlpLiquidityActionButtonState => {
    if (executeBurnVlp.isPending) {
      return 'loading';
    }
    if (executeBurnVlp.isSuccess) {
      return 'success';
    }
    if (!amountInput || formError) {
      return 'disabled';
    }
    return 'idle';
  }, [
    executeBurnVlp.isPending,
    executeBurnVlp.isSuccess,
    amountInput,
    formError,
  ]);

  return {
    buttonState,
    estimatedPrimaryQuoteAmount,
    primaryQuoteFeeAmount,
    form,
    formError,
    onFractionSelected,
    onSubmit: form.handleSubmit(onSubmitForm),
    primaryQuoteToken,
    validPercentageAmount,
    validateAmount,
    vlpBalanceAmount,
  };
}
