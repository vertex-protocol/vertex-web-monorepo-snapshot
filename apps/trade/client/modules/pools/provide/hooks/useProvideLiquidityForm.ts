import {
  addDecimals,
  BigDecimal,
  BigDecimals,
  removeDecimals,
  toBigDecimal,
} from '@vertex-protocol/utils';
import {
  InputValidatorFn,
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useExecuteMintLp } from 'client/hooks/execute/useExecuteMintLp';
import { useLpYields } from 'client/hooks/markets/useLpYields';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useMaxMintLpAmount } from 'client/hooks/query/subaccount/useMaxMintLpAmount';
import {
  LpBalanceItem,
  useLpBalances,
} from 'client/hooks/subaccount/useLpBalances';
import { usePrimaryQuoteBalance } from 'client/hooks/subaccount/usePrimaryQuoteBalance';
import { OnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useProvideLiquidityValidators } from 'client/modules/pools/provide/hooks/useProvideLiquidityValidators';
import {
  PairMetadata,
  ProvideLiquidityErrorType,
} from 'client/modules/pools/types';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { toSafeFormPercentage } from 'client/utils/form/toSafeFormPercentage';
import { watchFormError } from 'client/utils/form/watchFormError';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { roundToString } from 'client/utils/rounding';
import { safeDiv } from '@vertex-protocol/web-common';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

export interface ProvideLiquidityFormValues {
  baseAmount: string;
  quoteAmount: string;
  percentageAmount: number;
  amountSource: 'base' | 'quote' | 'percentage';
}

export interface UseProvideLiquidityForm {
  form: UseFormReturn<ProvideLiquidityFormValues>;
  underlyingBaseBalance: BigDecimal | undefined;
  underlyingQuoteBalance: BigDecimal | undefined;
  buttonState: BaseActionButtonState;
  validPercentageAmount: number | undefined;
  currentYield: BigDecimal;
  metadata: PairMetadata | undefined;
  estimatedChangeAmounts:
    | {
        base: BigDecimal;
        quote: BigDecimal;
        lpTokens: BigDecimal;
        baseValueUsd: BigDecimal;
        quoteValueUsd: BigDecimal;
        lpValueUsd: BigDecimal;
      }
    | undefined;
  formError: ProvideLiquidityErrorType | undefined;
  currentLpBalance: LpBalanceItem | undefined;
  onFractionSelected: OnFractionSelectedHandler;
  validateBaseAmount: InputValidatorFn<string, ProvideLiquidityErrorType>;
  validateQuoteAmount: InputValidatorFn<string, ProvideLiquidityErrorType>;

  onMaxSelected(): void;

  onSubmit(): void;
}

// Use user input as the "midpoint" of quote amount high & low
// quoteAmountHigh => this would usually be (1 + slippage) * (fair value of base = oracle price * base amount)
// quoteAmountLow => but this would usually be (1 - slippage) * (fair value of base = oracle price * base amount)
// so in our case, quote input = quote high amount is (1 + slippage) * (oracle price * base amount)
const SLIPPAGE = 0.01;

// Currently LPs are limited to no leverage spot
const spotLeverage = false;

export function useProvideLiquidityForm({
  productId,
}: {
  productId: number;
}): UseProvideLiquidityForm {
  const { dispatchNotification } = useNotificationManagerContext();

  const { data: marketData } = useMarket({ productId });
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { data: lpYields } = useLpYields();

  const { balances } = useLpBalances();
  const { data: primaryQuoteBalance } = usePrimaryQuoteBalance();

  const { data: maxMintLpAmount } = useMaxMintLpAmount({
    productId: productId ?? 0,
    spotLeverage,
  });

  // Mutation to mint LP tokens
  const executeMintLp = useExecuteMintLp();

  useRunWithDelayOnCondition({
    condition: executeMintLp.isSuccess,
    fn: executeMintLp.reset,
  });

  /**
   * Form state
   */
  const useProvideLiquidityForm = useForm<ProvideLiquidityFormValues>({
    defaultValues: {
      amountSource: 'base',
      baseAmount: '',
      quoteAmount: '',
      percentageAmount: 0,
    },
    mode: 'onTouched',
  });

  const { setValue, watch, resetField, handleSubmit } = useProvideLiquidityForm;

  // Watched inputs
  const percentageAmountInput = watch('percentageAmount');
  const baseAmountInput = watch('baseAmount');
  const quoteAmountInput = watch('quoteAmount');
  const amountSource = watch('amountSource');

  /**
   * Current LP pair information
   */

  // Current subaccount LP balance
  const currentLpBalance = useMemo(() => {
    return balances?.find((balance) => balance.productId === productId);
  }, [balances, productId]);

  // Current subaccount LP yield
  const currentYield = useMemo(() => {
    return lpYields?.[productId] ?? BigDecimals.ZERO;
  }, [productId, lpYields]);

  // Metadata for the current pair
  const pairMetadata = useMemo((): PairMetadata | undefined => {
    if (!currentLpBalance || !primaryQuoteBalance) {
      return undefined;
    }
    return {
      base: getSharedProductMetadata(currentLpBalance.product.metadata),
      quote: primaryQuoteBalance.metadata.token,
    };
  }, [currentLpBalance, primaryQuoteBalance]);

  // Decimal adjusted max amounts that can be added to the pool
  const decimalAdjustedMaxLpAmounts = useMemo(() => {
    if (!maxMintLpAmount) {
      return undefined;
    }

    return {
      base: removeDecimals(maxMintLpAmount.maxBaseAmount),
      quote: removeDecimals(maxMintLpAmount.maxQuoteAmount),
    };
  }, [maxMintLpAmount]);

  // Conversion ratio = amount quote : amount base, when minting LP, the ideal conversion ratio is the current oracle price
  const conversionRatio = useMemo(() => {
    if (!marketData) {
      return undefined;
    }

    // If max amounts are available, use it for conversion ratio to ensure that max size validators
    // are consistent with the linked inputs
    if (maxMintLpAmount?.maxBaseAmount.gt(0)) {
      return maxMintLpAmount.maxQuoteAmount.div(maxMintLpAmount.maxBaseAmount);
    }
    // Default to market oracle price
    return marketData.product.oraclePrice;
  }, [marketData, maxMintLpAmount]);

  /**
   * Error handling
   */
  const { validateBaseAmount, validateQuoteAmount } =
    useProvideLiquidityValidators({
      maxBaseLpAmount: decimalAdjustedMaxLpAmounts?.base,
      maxQuoteLpAmount: decimalAdjustedMaxLpAmounts?.quote,
    });

  // Watched input errors
  const baseAmountError: ProvideLiquidityErrorType | undefined = watchFormError(
    useProvideLiquidityForm,
    'baseAmount',
  );
  const quoteAmountError: ProvideLiquidityErrorType | undefined =
    watchFormError(useProvideLiquidityForm, 'quoteAmount');

  // Parsed amounts
  const validBaseAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, baseAmountInput);
  }, [baseAmountInput]);
  const validQuoteAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, quoteAmountInput);
  }, [quoteAmountInput]);
  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  // Validation for entire form
  const formError = useMemo((): ProvideLiquidityErrorType | undefined => {
    if (baseAmountError) {
      return baseAmountError;
    }
    if (quoteAmountError) {
      return quoteAmountError;
    }
  }, [baseAmountError, quoteAmountError]);

  // Action button state
  const buttonState = useMemo((): BaseActionButtonState => {
    if (executeMintLp.isPending) {
      return 'loading';
    }
    if (executeMintLp.isSuccess) {
      return 'success';
    }
    if (!validBaseAmount || !validQuoteAmount || formError) {
      return 'disabled';
    }
    return 'idle';
  }, [executeMintLp, formError, validBaseAmount, validQuoteAmount]);

  /**
   * Input handlers/triggers
   */

  // Triggered when the user changes the base amount input
  useEffect(
    () => {
      if (amountSource !== 'base') {
        return;
      }

      // Change quote amount
      if (validBaseAmount && conversionRatio) {
        setValue(
          'quoteAmount',
          toAssetInput(validBaseAmount.multipliedBy(conversionRatio)),
          {
            shouldValidate: true,
            shouldTouch: true,
          },
        );
      } else {
        resetField('quoteAmount');
      }
      // Change percentage amount
      setValue(
        'percentageAmount',
        toSafeFormPercentage(
          validBaseAmount,
          decimalAdjustedMaxLpAmounts?.base,
        ),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validBaseAmount],
  );

  // Triggered when the user changes the quote amount input
  useEffect(
    () => {
      if (amountSource !== 'quote') {
        return;
      }

      // Change base amount
      if (validQuoteAmount && conversionRatio) {
        setValue(
          'baseAmount',
          toAssetInput(validQuoteAmount.div(conversionRatio)),
          {
            shouldValidate: true,
            shouldTouch: true,
          },
        );
      } else {
        resetField('baseAmount');
      }
      // Change percentage amount
      setValue(
        'percentageAmount',
        toSafeFormPercentage(
          validQuoteAmount,
          decimalAdjustedMaxLpAmounts?.quote,
        ),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validQuoteAmount],
  );

  // Triggered when the user changes the percentage amount input
  useEffect(
    () => {
      if (amountSource !== 'percentage') {
        return;
      }
      if (validPercentageAmount != null && decimalAdjustedMaxLpAmounts) {
        const baseAmount = decimalAdjustedMaxLpAmounts.base.multipliedBy(
          validPercentageAmount,
        );
        const quoteAmount = decimalAdjustedMaxLpAmounts.quote.multipliedBy(
          validPercentageAmount,
        );
        // Set the base amount to the max amount * percentage
        setValue('baseAmount', toAssetInput(baseAmount), {
          shouldValidate: true,
          shouldTouch: true,
        });
        // Set the quote amount to the equivalent * percentage
        setValue('quoteAmount', toAssetInput(quoteAmount), {
          shouldValidate: true,
          shouldTouch: true,
        });
      } else {
        resetField('quoteAmount');
        resetField('baseAmount');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validPercentageAmount],
  );

  // Estimated change amounts based on user input
  const estimatedChangeAmounts = useMemo(() => {
    if (
      !validBaseAmount ||
      !validQuoteAmount ||
      !currentLpBalance ||
      !marketData ||
      !primaryQuoteBalance
    ) {
      return undefined;
    }
    const quoteValueUsd = validQuoteAmount.multipliedBy(primaryQuotePriceUsd);
    const baseValueUsd = validBaseAmount
      .multipliedBy(currentLpBalance.oraclePrice)
      .multipliedBy(primaryQuotePriceUsd);
    return {
      base: validBaseAmount,
      quote: validQuoteAmount,
      lpTokens: safeDiv(
        marketData.product.totalLpSupply.multipliedBy(validBaseAmount),
        marketData.product.totalLpBaseAmount,
      ),
      baseValueUsd,
      quoteValueUsd,
      lpValueUsd: quoteValueUsd.plus(quoteValueUsd),
    };
  }, [
    validBaseAmount,
    validQuoteAmount,
    currentLpBalance,
    marketData,
    primaryQuoteBalance,
    primaryQuotePriceUsd,
  ]);

  // Set the amount source to percentage when a fraction button is clicked
  // and set the percentage amount to the fraction.
  const onFractionSelected = useCallback(
    (fraction: number) => {
      setValue('amountSource', 'percentage');
      setValue('percentageAmount', fraction);
    },
    [setValue],
  );

  const onMaxSelected = useCallback(
    () => onFractionSelected(1),
    [onFractionSelected],
  );

  // Form submit handler
  const onSubmitForm = useCallback(
    (values: ProvideLiquidityFormValues) => {
      if (!marketData) {
        return;
      }

      const baseAmount = toBigDecimal(values.baseAmount);
      // Instead of using the quote amount from values, derive directly from the conversion price if available
      // this should be slightly more accurate because quoteAmount is truncated
      const quoteAmountMid = conversionRatio
        ? baseAmount.multipliedBy(conversionRatio)
        : toBigDecimal(values.quoteAmount);
      // The high amount must not exceed the user's max quote size after the slippage adjustment
      const quoteAmountHighWithSlippage = quoteAmountMid.multipliedBy(
        1 + SLIPPAGE,
      );
      const quoteAmountHigh = decimalAdjustedMaxLpAmounts
        ? BigDecimal.min(
            quoteAmountHighWithSlippage,
            decimalAdjustedMaxLpAmounts.quote,
          )
        : quoteAmountHighWithSlippage;
      const quoteAmountLow = quoteAmountMid.multipliedBy(1 - SLIPPAGE);

      const mintLpResult = executeMintLp.mutateAsync(
        {
          productId: marketData.productId,
          amountBase: roundToString(addDecimals(baseAmount), 0),
          quoteAmountLow: roundToString(addDecimals(quoteAmountLow), 0),
          quoteAmountHigh: roundToString(addDecimals(quoteAmountHigh), 0),
          spotLeverage,
        },
        {
          onSuccess: () => {
            resetField('baseAmount');
            resetField('quoteAmount');
            setValue('percentageAmount', 0);
            setValue('amountSource', 'base');
          },
        },
      );

      if (estimatedChangeAmounts) {
        dispatchNotification({
          type: 'action_error_handler',
          data: {
            errorNotificationTitle: 'Provide Liquidity Failed',
            executionData: {
              serverExecutionResult: mintLpResult,
            },
          },
        });
      }
    },
    [
      marketData,
      conversionRatio,
      decimalAdjustedMaxLpAmounts,
      executeMintLp,
      estimatedChangeAmounts,
      resetField,
      setValue,
      dispatchNotification,
    ],
  );

  return {
    form: useProvideLiquidityForm,
    metadata: pairMetadata,
    currentLpBalance,
    currentYield,
    underlyingBaseBalance: currentLpBalance?.underlyingAmount,
    underlyingQuoteBalance: primaryQuoteBalance?.amount,
    formError,
    buttonState,
    validPercentageAmount,
    estimatedChangeAmounts,
    onFractionSelected,
    onMaxSelected,
    validateBaseAmount,
    validateQuoteAmount,
    onSubmit: handleSubmit(onSubmitForm),
  };
}

function toAssetInput(value: BigDecimal) {
  return roundToString(value, 6, BigDecimal.ROUND_DOWN);
}
