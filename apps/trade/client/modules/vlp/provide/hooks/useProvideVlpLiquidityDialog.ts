import { toIntegerString, VLP_PRODUCT_ID } from '@vertex-protocol/client';
import {
  AnnotatedSpotMarket,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import {
  addDecimals,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import {
  percentageValidator,
  safeDiv,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { SEQUENCER_FEE_AMOUNT_USDC } from 'client/consts/sequencerFee';
import { useExecuteMintVlp } from 'client/hooks/execute/useExecuteMintVlp';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useMaxMintVlpAmount } from 'client/hooks/query/subaccount/useMaxMintVlpAmount';
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

export type ProvideVlpLiquidityFormErrorType =
  | 'invalid_input'
  | 'max_exceeded'
  | 'below_min';

export type ProvideVlpLiquidityActionButtonState = BaseActionButtonState;

export interface ProvideVlpLiquidityFormValues
  extends LinkedPercentageAmountFormValues {
  enableBorrows: boolean;
}

export function useProvideVlpLiquidityDialog() {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { dispatchNotification } = useNotificationManagerContext();
  const { data: vlpMarket } = useMarket<AnnotatedSpotMarket>({
    productId: VLP_PRODUCT_ID,
  });

  // Form state
  const form = useForm<ProvideVlpLiquidityFormValues>({
    defaultValues: {
      amount: '',
      amountSource: 'absolute',
      percentageAmount: 0,
      enableBorrows: false,
    },
    mode: 'onTouched',
  });

  // Watched & derived state
  const amountInput = form.watch('amount');
  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, amountInput);
  }, [amountInput]);
  // Use oracle price to estimate the amount of VLP minted
  const estimatedVlpAmount = useMemo(() => {
    if (!validAmount || !vlpMarket) {
      return;
    }
    if (validAmount.lte(SEQUENCER_FEE_AMOUNT_USDC)) {
      return BigDecimals.ZERO;
    }

    return safeDiv(
      validAmount.minus(SEQUENCER_FEE_AMOUNT_USDC),
      vlpMarket.product.oraclePrice,
    );
  }, [validAmount, vlpMarket]);

  const amountInputError: ProvideVlpLiquidityFormErrorType | undefined =
    watchFormError(form, 'amount');

  const percentageAmountInput = form.watch('percentageAmount');
  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  const enableBorrows = form.watch('enableBorrows');

  // Max amounts
  const { data: maxMintVlpAmount } = useMaxMintVlpAmount({
    spotLeverage: enableBorrows,
  });

  // Max amount excludes the sequencer fee, but input should include the fee
  const decimalAdjustedMaxQuoteAmountWithFee = useMemo(() => {
    if (!maxMintVlpAmount) {
      return;
    }
    if (maxMintVlpAmount.isZero()) {
      return BigDecimals.ZERO;
    }

    return removeDecimals(maxMintVlpAmount).plus(SEQUENCER_FEE_AMOUNT_USDC);
  }, [maxMintVlpAmount]);

  // Linked percentage / amount inputs
  useLinkedPercentageAmountInputEffects({
    validPercentageAmount,
    validAmount,
    maxAmount: decimalAdjustedMaxQuoteAmountWithFee,
    form,
  });

  // Validation for inputs
  const validateAmount = useCallback(
    (input: string): ProvideVlpLiquidityFormErrorType | undefined => {
      if (!input) {
        return;
      }

      const parsedInput = safeParseForData(positiveBigDecimalValidator, input);
      if (!parsedInput) {
        return 'invalid_input';
      }
      if (parsedInput.lte(SEQUENCER_FEE_AMOUNT_USDC)) {
        return 'below_min';
      }
      if (
        decimalAdjustedMaxQuoteAmountWithFee &&
        parsedInput.gt(decimalAdjustedMaxQuoteAmountWithFee)
      ) {
        return 'max_exceeded';
      }
    },
    [decimalAdjustedMaxQuoteAmountWithFee],
  );

  // Handlers
  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: form.setValue,
  });
  const onEnableBorrowsChange = (enabled: boolean) => {
    form.setValue('enableBorrows', enabled);
  };

  // Mint mutation
  const executeMintVlp = useExecuteMintVlp();
  const mutateMintVlpAsync = executeMintVlp.mutateAsync;

  useRunWithDelayOnCondition({
    condition: executeMintVlp.isSuccess,
    fn: executeMintVlp.reset,
  });

  const onSubmitForm = useCallback(
    (values: ProvideVlpLiquidityFormValues) => {
      const amount = resolvePercentageAmountSubmitValue(
        values,
        decimalAdjustedMaxQuoteAmountWithFee,
      );

      const amountWithoutFee = amount.minus(SEQUENCER_FEE_AMOUNT_USDC);

      if (amountWithoutFee.lte(0)) {
        console.warn(
          '[useProvideVlpLiquidityDialog] Invalid quote amount',
          amountWithoutFee.toString(),
        );
        return;
      }

      const amountWithDecimals = toIntegerString(addDecimals(amountWithoutFee));

      const serverExecutionResult = mutateMintVlpAsync(
        {
          quoteAmount: amountWithDecimals,
          spotLeverage: values.enableBorrows,
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
          errorNotificationTitle: 'Provide VLP Failed',
          executionData: { serverExecutionResult },
        },
      });
    },
    [
      decimalAdjustedMaxQuoteAmountWithFee,
      mutateMintVlpAsync,
      dispatchNotification,
      form,
    ],
  );

  // Global form error state
  const formError: ProvideVlpLiquidityFormErrorType | undefined =
    amountInputError;

  // Action button state
  const buttonState = useMemo((): ProvideVlpLiquidityActionButtonState => {
    if (executeMintVlp.isPending) {
      return 'loading';
    }
    if (executeMintVlp.isSuccess) {
      return 'success';
    }
    if (!amountInput || formError) {
      return 'disabled';
    }
    return 'idle';
  }, [
    executeMintVlp.isPending,
    executeMintVlp.isSuccess,
    amountInput,
    formError,
  ]);

  return {
    buttonState,
    estimatedVlpAmount,
    form,
    formError,
    onEnableBorrowsChange,
    onFractionSelected,
    onSubmit: form.handleSubmit(onSubmitForm),
    primaryQuoteToken,
    validPercentageAmount,
    validateAmount,
    enableBorrows,
    decimalAdjustedMaxQuoteAmountWithFee,
  };
}
