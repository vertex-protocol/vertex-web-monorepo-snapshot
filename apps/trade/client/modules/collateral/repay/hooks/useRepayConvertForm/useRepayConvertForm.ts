import { SubaccountTx } from '@vertex-protocol/engine-client';
import { addDecimals, BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import { safeParseForData } from '@vertex-protocol/web-common';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { getMarketOrderExecutionPrice } from 'client/hooks/execute/util/getMarketOrderExecutionPrice';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import {
  RepayConvertAmountInputErrorType,
  RepayConvertFormErrorType,
  RepayConvertFormValues,
  UseRepayConvertForm,
} from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';
import { useRepayConvertMarketData } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertMarketData';
import { useRepayConvertMaxRepaySizes } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertMaxRepaySizes';
import { useRepayConvertOnChangeSideEffects } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertOnChangeSideEffects';
import { useRepayConvertProducts } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertProducts';
import { useRepayConvertSubmitHandler } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertSubmitHandler';
import { useOrderSlippageSettings } from 'client/modules/trading/hooks/useOrderSlippageSettings';
import { incrementValidator } from 'client/modules/trading/utils/incrementValidator';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { roundToDecimalPlaces, roundToString } from 'client/utils/rounding';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Contains form logic for repay convert feature. Currently, only spot products with the quote as the primary quote (ex. USDC)
 * is supported. This is because LP's are disabled for markets with alternative quotes, which would prevent users from trading below
 * the size increment (and therefore not being able to repay arbitrary borrowed amounts)
 */
export function useRepayConvertForm({
  initialProductId,
}: {
  initialProductId: number | undefined;
}): UseRepayConvertForm {
  const {
    savedSettings: { market: marketSlippageFraction },
  } = useOrderSlippageSettings();

  // Mutation
  const executePlaceOrder = useExecutePlaceOrder();
  useRunWithDelayOnCondition({
    condition: executePlaceOrder.isSuccess,
    fn: executePlaceOrder.reset,
  });

  // Form state
  const form = useForm<RepayConvertFormValues>({
    defaultValues: {
      // Product being repaid
      repayProductId: initialProductId,
      // Amount of repayProduct to repay
      repayAmount: '',
      // Source is the product being sold to repay
      sourceProductId: undefined,
    },
    mode: 'onTouched',
  });

  // Watched form state
  const repayAmountInput = form.watch('repayAmount');
  const repayProductIdInput = form.watch('repayProductId');
  const sourceProductIdInput = form.watch('sourceProductId');

  const amountInputError: RepayConvertAmountInputErrorType | undefined =
    watchFormError(form, 'repayAmount');

  const validRepayAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, repayAmountInput);
  }, [repayAmountInput]);

  // Data
  const {
    availableRepayProducts,
    availableSourceProducts,
    selectedSourceProduct,
    selectedRepayProduct,
  } = useRepayConvertProducts({
    sourceProductIdInput,
    repayProductIdInput,
  });

  const { marketProduct, market, isSellOrder, sizeIncrement, roundAmount } =
    useRepayConvertMarketData({
      selectedRepayProduct,
      selectedSourceProduct,
    });

  // Allow orders of any size only if there is an available LP pool with liquidity.
  // We currently don't have enough LP liquidity anywhere to support this
  const allowAnyOrderSizeIncrement = false;
  // const allowAnyOrderSizeIncrement = !!market?.product.totalLpSupply.gt(0);

  const executionConversionPrice = useMemo(() => {
    if (!marketProduct || !marketProduct.marketPrices) {
      return;
    }

    return getMarketOrderExecutionPrice({
      isSell: isSellOrder,
      marketSlippageFraction,
      latestMarketPrices: marketProduct.marketPrices,
    });
  }, [isSellOrder, marketProduct, marketSlippageFraction]);

  const { maxRepaySize, maxRepaySizeIgnoringAmountBorrowed } =
    useRepayConvertMaxRepaySizes({
      executionConversionPrice,
      isSellOrder,
      marketProductId: marketProduct?.productId,
      selectedRepayProduct,
      roundAmount,
      allowAnyOrderSizeIncrement,
    });

  // Side effects
  useRepayConvertOnChangeSideEffects({
    form,
    availableSourceProducts,
    repayProductIdInput,
  });

  // Validation for amount input, allow any large input beyond the currently borrowed
  const validateRepayAmount = useCallback(
    (
      amountInput: string | undefined,
    ): RepayConvertFormErrorType | undefined => {
      if (!amountInput) {
        return;
      }

      const amount = safeParseForData(positiveBigDecimalValidator, amountInput);
      if (!amount) {
        return 'invalid_input';
      }

      if (
        sizeIncrement &&
        !allowAnyOrderSizeIncrement &&
        !incrementValidator(amount, sizeIncrement)
      ) {
        return 'invalid_size_increment';
      }

      if (
        maxRepaySizeIgnoringAmountBorrowed &&
        amount.gt(maxRepaySizeIgnoringAmountBorrowed)
      ) {
        return 'max_exceeded';
      }
    },
    [
      sizeIncrement,
      allowAnyOrderSizeIncrement,
      maxRepaySizeIgnoringAmountBorrowed,
    ],
  );

  // Global form error state
  const formError: RepayConvertFormErrorType | undefined = useMemo(() => {
    if (selectedRepayProduct?.decimalAdjustedVertexBalance.isPositive()) {
      return 'not_borrowing';
    } else if (selectedRepayProduct && availableSourceProducts.length === 0) {
      // Leaving this zero available error state because it prompts users to deposit
      return 'no_available_source';
    }

    return amountInputError;
  }, [selectedRepayProduct, availableSourceProducts.length, amountInputError]);

  // Action button state
  const buttonState = useMemo((): BaseActionButtonState => {
    if (executePlaceOrder.isPending) {
      return 'loading';
    } else if (executePlaceOrder.isSuccess) {
      return 'success';
    } else if (
      !validRepayAmount ||
      !selectedRepayProduct ||
      !selectedSourceProduct ||
      formError
    ) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [
    executePlaceOrder.isPending,
    executePlaceOrder.isSuccess,
    formError,
    selectedRepayProduct,
    selectedSourceProduct,
    validRepayAmount,
  ]);

  // Calculate estimated amount of source product required
  const sourceAmount = useMemo(() => {
    if (!validRepayAmount || !executionConversionPrice) {
      return;
    }
    const convertedAmount = isSellOrder
      ? validRepayAmount.div(executionConversionPrice)
      : validRepayAmount.multipliedBy(executionConversionPrice);
    return roundToDecimalPlaces(convertedAmount, 6, BigDecimal.ROUND_UP);
  }, [executionConversionPrice, isSellOrder, validRepayAmount]);

  // Formatted deltas for the selected product
  const estimateStateTxs = useMemo((): SubaccountTx[] => {
    if (
      !selectedRepayProduct ||
      !selectedSourceProduct ||
      !validRepayAmount ||
      !sourceAmount
    ) {
      return [];
    }
    return [
      {
        type: 'apply_delta',
        tx: {
          productId: selectedRepayProduct.productId,
          amountDelta: addDecimals(validRepayAmount),
          vQuoteDelta: BigDecimals.ZERO,
        },
      },
      {
        type: 'apply_delta',
        tx: {
          productId: selectedSourceProduct.productId,
          // We always lose source in exchange to the repay amount
          amountDelta: addDecimals(sourceAmount.negated()),
          vQuoteDelta: BigDecimals.ZERO,
        },
      },
    ];
  }, [
    sourceAmount,
    selectedRepayProduct,
    selectedSourceProduct,
    validRepayAmount,
  ]);

  const disableMaxRepayButton = !maxRepaySize || !selectedSourceProduct;

  const onMaxRepayClicked = useCallback(() => {
    if (disableMaxRepayButton) {
      return;
    }
    form.setValue('repayAmount', maxRepaySize.toString(), {
      shouldValidate: true,
      shouldTouch: true,
    });
  }, [disableMaxRepayButton, form, maxRepaySize]);

  const onAmountBorrowingClicked = useCallback(() => {
    if (!selectedRepayProduct) {
      return;
    }
    form.setValue(
      'repayAmount',
      roundToString(
        selectedRepayProduct.amountBorrowed,
        8,
        BigDecimal.ROUND_UP,
      ),
      {
        shouldValidate: true,
        shouldTouch: true,
      },
    );
  }, [form, selectedRepayProduct]);

  // Form submit handler
  const onSubmitForm = useRepayConvertSubmitHandler({
    form,
    executePlaceOrder,
    marketProduct,
    market,
    executionConversionPrice,
    isSellOrder,
    allowAnyOrderSizeIncrement,
  });

  return {
    form,
    amountInputError,
    formError,
    validateRepayAmount,
    availableRepayProducts,
    availableSourceProducts,
    selectedRepayProduct,
    selectedSourceProduct,
    estimateStateTxs,
    sourceAmount,
    sourceAmountValueUsd:
      selectedSourceProduct &&
      sourceAmount?.multipliedBy(selectedSourceProduct.oraclePriceUsd),
    repayAmountValueUsd:
      selectedRepayProduct &&
      validRepayAmount?.multipliedBy(selectedRepayProduct.oraclePriceUsd),
    disableMaxRepayButton,
    maxRepaySize,
    sizeIncrement,

    oracleConversionPrice: market?.product.oraclePrice,
    isMaxRepayDismissibleOpen: maxRepaySize?.eq(repayAmountInput),
    buttonState,

    market,
    onMaxRepayClicked,
    onAmountBorrowingClicked,
    onSubmit: form.handleSubmit(onSubmitForm),
  };
}
