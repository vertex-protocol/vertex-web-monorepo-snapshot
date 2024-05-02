import { SubaccountTx } from '@vertex-protocol/engine-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { safeParseForData } from '@vertex-protocol/web-common';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { getMarketOrderExecutionPrice } from 'client/hooks/execute/util/getMarketOrderExecutionPrice';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import {
  RepayConvertErrorType,
  RepayConvertFormValues,
  UseRepayConvertForm,
} from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';
import { useRepayConvertMarketData } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertMarketData';
import { useRepayConvertMaxRepaySizes } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertMaxRepaySizes';
import { useRepayConvertOnChangeSideEffects } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertOnChangeSideEffects';
import { useRepayConvertProducts } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertProducts';
import { useRepayConvertSubmitHandler } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertSubmitHandler';
import { useOrderSlippageSettings } from 'client/modules/trading/hooks/useOrderSlippageSettings';
import { depositProductIdAtom } from 'client/store/collateralStore';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { BigDecimals } from 'client/utils/BigDecimals';
import { addDecimals } from 'client/utils/decimalAdjustment';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { roundToDecimalPlaces } from 'client/utils/rounding';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export function useRepayConvertForm(): UseRepayConvertForm {
  const [depositProductIdAtomValue] = useAtom(depositProductIdAtom);
  const {
    savedSettings: { market: marketSlippageFraction },
  } = useOrderSlippageSettings();
  const { hide } = useDialog();

  // Mutation
  const executePlaceOrder = useExecutePlaceOrder();
  useRunWithDelayOnCondition({
    condition: executePlaceOrder.isSuccess,
    fn: hide,
  });

  // Form state
  const form = useForm<RepayConvertFormValues>({
    defaultValues: {
      // Product being repaid
      repayProductId: depositProductIdAtomValue,
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

  const amountInputError: RepayConvertErrorType | undefined = watchFormError(
    form,
    'repayAmount',
  );

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

  const { marketProduct, market, isSellOrder } = useRepayConvertMarketData({
    selectedRepayProduct,
    selectedSourceProduct,
  });

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
    });

  // Side effects
  useRepayConvertOnChangeSideEffects({
    form,
    depositProductIdAtomValue,
    availableSourceProducts,
    repayProductIdInput,
  });

  // Validation for amount input, allow any large input beyond the currently borrowed
  const validateRepayAmount = useCallback(
    (amountInput: string | undefined): RepayConvertErrorType | undefined => {
      if (!amountInput) {
        return;
      }

      const amount = safeParseForData(positiveBigDecimalValidator, amountInput);
      if (!amount) {
        return 'invalid_input';
      }
      if (
        maxRepaySizeIgnoringAmountBorrowed &&
        amount.gt(maxRepaySizeIgnoringAmountBorrowed)
      ) {
        return 'max_exceeded';
      }
    },
    [maxRepaySizeIgnoringAmountBorrowed],
  );

  // Global form error state
  const formError: RepayConvertErrorType | undefined = useMemo(() => {
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

  const disableRepayAmountInput = !selectedSourceProduct;
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

  // Form submit handler
  const onSubmitForm = useRepayConvertSubmitHandler({
    form,
    executePlaceOrder,
    marketProduct,
    market,
    executionConversionPrice,
    isSellOrder,
  });

  return {
    form,
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
    disableRepayAmountInput,
    disableMaxRepayButton,
    maxRepaySize,

    oracleConversionPrice: market?.product.oraclePrice,
    isMaxRepayDismissibleOpen: maxRepaySize?.eq(repayAmountInput),
    buttonState,

    market,
    onMaxRepayClicked,
    onSubmit: form.handleSubmit(onSubmitForm),
  };
}
