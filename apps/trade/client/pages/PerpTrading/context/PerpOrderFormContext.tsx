import {
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { safeParseForData, WithChildren } from '@vertex-protocol/web-common';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { PerpStaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useLatestMarketPrice } from 'client/hooks/markets/useLatestMarketPrice';
import {
  UserStateError,
  useUserStateError,
} from 'client/hooks/subaccount/useUserStateError';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { useOrderFormConversionPrices } from 'client/modules/trading/hooks/orderFormContext/useOrderFormConversionPrices';
import { useOrderFormEnableMaxSizeLogic } from 'client/modules/trading/hooks/orderFormContext/useOrderFormEnableMaxSizeLogic';
import { useOrderFormError } from 'client/modules/trading/hooks/orderFormContext/useOrderFormError';
import { useOrderFormMarketSelection } from 'client/modules/trading/hooks/orderFormContext/useOrderFormMarketSelection';
import { useOrderFormMaxOrderSizes } from 'client/modules/trading/hooks/orderFormContext/useOrderFormMaxOrderSizes';
import { useOrderFormOnChangeSideEffects } from 'client/modules/trading/hooks/orderFormContext/useOrderFormOnChangeSideEffects';
import { useOrderFormProductData } from 'client/modules/trading/hooks/orderFormContext/useOrderFormProductData';
import { useOrderFormSubmitHandler } from 'client/modules/trading/hooks/orderFormContext/useOrderFormSubmitHandler';
import { useOrderFormValidators } from 'client/modules/trading/hooks/orderFormContext/useOrderFormValidators';
import {
  OrderFormError,
  OrderFormValidators,
} from 'client/modules/trading/types';
import { usePerpOrderFormEstimateStateTxs } from 'client/pages/PerpTrading/context/hooks/usePerpOrderFormEstimateStateTxs';
import { usePerpOrderFormOnChangeSideEffects } from 'client/pages/PerpTrading/context/hooks/usePerpOrderFormOnChangeSideEffects';
import { PerpOrderFormValues } from 'client/pages/PerpTrading/context/types';
import { useSelectedPerpLeverage } from 'client/pages/PerpTrading/hooks/useSelectedPerpLeverage';
import { perpPriceInputAtom } from 'client/store/trading/perpTradingStore';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { mapValues } from 'lodash';
import { createContext, useContext, useMemo } from 'react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import {
  OrderFormPerpTradingAccountMetrics,
  usePerpOrderFormTradingAccountMetrics,
} from './hooks/usePerpOrderFormTradingAccountMetrics';

export interface PerpOrderFormContextData {
  // Market selection
  currentMarket: PerpStaticMarketData | undefined;
  /**
   * RHF instance to pass to `<Form />`
   */
  form: UseFormReturn<PerpOrderFormValues>;
  /**
   * Validators for the form
   */
  validators: OrderFormValidators;
  /**
   * Errors associated with the current state of the user
   */
  userStateError: UserStateError | undefined;
  /**
   * Errors associated with the form fields
   */
  formError: OrderFormError | undefined;
  /**
   * State of the submit button
   */
  buttonState: BaseActionButtonState;
  /**
   * Conversion price from base to quote without slippage, used to convert between asset and quote amounts
   */
  inputConversionPrice: BigDecimal | undefined;
  /**
   * Minimum order size, in terms of the asset, for the currently selected market
   */
  minAssetOrderSize: BigDecimal | undefined;
  /**
   * A validated order amount input, in terms of the base asset of the market
   */
  validatedAssetAmountInput: BigDecimal | undefined;
  /**
   * Conversion price from base to quote with slippage included
   */
  executionConversionPrice: BigDecimal | undefined;
  /**
   * Configured slippage for the current order type
   */
  slippageFraction: number;
  /**
   * Allowed increments for the input fields
   */
  inputIncrements: {
    price: BigDecimal | undefined;
    size: BigDecimal | undefined;
  };
  /**
   * Estimated account status changes corresponding to the current order form input
   */
  tradingAccountMetrics: OrderFormPerpTradingAccountMetrics;
  /**
   * Form submit handler
   */
  onSubmit: () => void;
}

const PerpOrderFormContext = createContext<PerpOrderFormContextData>(
  {} as PerpOrderFormContextData,
);

// Hook to consume context
export const usePerpOrderFormContext = () => useContext(PerpOrderFormContext);

export function PerpOrderFormContextProvider({ children }: WithChildren) {
  const { currentMarket } = useOrderFormMarketSelection(ProductEngineType.PERP);
  const { data: latestMarketPrices } = useLatestMarketPrice({
    productId: currentMarket?.productId,
  });
  const usePerpForm = useForm<PerpOrderFormValues>({
    mode: 'onTouched',
    defaultValues: {
      side: 'long',
      priceType: 'market',
      amountSource: 'asset',
      assetAmount: '',
      quoteAmount: '',
      price: '',
      percentageAmount: 0,
      timeInForceType: 'good_until',
      timeInForceInDays: '',
      postOnly: false,
      reduceOnly: false,
    },
  });
  const productId = currentMarket?.productId;

  const {
    firstExecutionPrice,
    topOfBookPrice,
    priceIncrement,
    sizeIncrement,
    minAssetOrderSize,
    roundPrice,
    roundAmount,
  } = useOrderFormProductData({
    form: usePerpForm,
    currentMarket,
    latestMarketPrices,
  });

  const { selectedLeverage } = useSelectedPerpLeverage(productId);

  const executePlaceOrder = useExecutePlaceOrder();

  useRunWithDelayOnCondition({
    condition: executePlaceOrder.isSuccess,
    fn: executePlaceOrder.reset,
    delay: 2000,
  });

  // Watched fields
  const priceInput = usePerpForm.watch('price');
  const assetAmountInput = usePerpForm.watch('assetAmount');
  const priceType = usePerpForm.watch('priceType');
  const orderSide = usePerpForm.watch('side');

  /**
   * Validate fields
   */
  const validatedPriceInput = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, priceInput);
  }, [priceInput]);
  const validatedAssetAmountInput = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, assetAmountInput);
  }, [assetAmountInput]);

  /**
   * Derive conversion prices
   */
  const {
    inputConversionPriceRef,
    inputConversionPrice,
    executionConversionPrice,
    executionConversionPriceRef,
    slippageFraction,
  } = useOrderFormConversionPrices({
    priceType,
    topOfBookPrice,
    firstExecutionPrice,
    roundPrice,
    orderSide,
    validatedPriceInput,
  });

  /**
   * Max order sizes
   */
  const maxOrderSizes = useOrderFormMaxOrderSizes({
    inputConversionPrice,
    executionConversionPrice,
    orderSide,
    productId,
    roundAmount,
    allowAnyOrderSizeIncrement: false,
  });
  const maxOrderSizesWithLeverage = useMemo(() => {
    if (!maxOrderSizes || !currentMarket) {
      return;
    }
    // Leverage ONLY impacts max order size, given by (true max order size) * leverage / max leverage
    return mapValues(maxOrderSizes, (val) =>
      val.multipliedBy(selectedLeverage).dividedBy(currentMarket.maxLeverage),
    );
  }, [currentMarket, maxOrderSizes, selectedLeverage]);
  // Max order size changes frequently, so use a ref for certain dependency arrays
  const maxAssetOrderSize = maxOrderSizesWithLeverage?.asset;
  const maxAssetOrderSizeRef = useSyncedRef(maxAssetOrderSize);
  const enableMaxSizeLogic = useOrderFormEnableMaxSizeLogic({ priceType });

  /**
   * Input validation
   */
  const inputValidators = useOrderFormValidators({
    inputConversionPriceRef,
    maxAssetOrderSizeRef,
    priceIncrement,
    sizeIncrement,
    minAssetOrderSize,
    enableMaxSizeLogic,
    allowAnyOrderSizeIncrement: false,
  });

  /**
   * Onchange side effects
   */
  useOrderFormOnChangeSideEffects({
    form: usePerpForm,
    productId,
    priceInputAtom: perpPriceInputAtom,
    maxAssetOrderSize,
    inputConversionPrice,
    roundPrice,
    roundAmount,
  });
  usePerpOrderFormOnChangeSideEffects({
    form: usePerpForm,
    selectedLeverage,
  });

  /**
   * Form error states
   */

  const userStateError = useUserStateError();

  const formError = useOrderFormError({
    form: usePerpForm,
    enableMaxSizeLogic,
    userStateError,
  });

  /**
   * Subaccount state estimation
   */
  const estimateStateTxs = usePerpOrderFormEstimateStateTxs({
    orderSide,
    productId,
    validatedAssetAmountInput,
    executionConversionPrice,
    maxAssetOrderSize,
    enableMaxSizeLogic,
  });

  /**
   * Perp Trading Account Metrics
   */
  const tradingAccountMetrics = usePerpOrderFormTradingAccountMetrics({
    currentMarket,
    estimateStateTxs,
  });

  /**
   * On submit handler
   */
  const submitHandler = useOrderFormSubmitHandler({
    executionConversionPriceRef,
    inputConversionPriceRef,
    currentMarket,
    mutateAsync: executePlaceOrder.mutateAsync,
    allowAnyOrderSizeIncrement: false,
    // Multi-quote not supported for perps
    quoteProductId: QUOTE_PRODUCT_ID,
  });

  /**
   * Submit button state
   */
  const buttonState = useMemo((): BaseActionButtonState => {
    if (executePlaceOrder.isSuccess) {
      return 'success';
    }
    if (executePlaceOrder.isPending) {
      return 'loading';
    }

    const hasRequiredInputs =
      validatedAssetAmountInput && executionConversionPrice;
    if (!hasRequiredInputs || userStateError || formError) {
      return 'disabled';
    }

    return 'idle';
  }, [
    executionConversionPrice,
    formError,
    executePlaceOrder.isSuccess,
    executePlaceOrder.isPending,
    userStateError,
    validatedAssetAmountInput,
  ]);

  const value = useMemo((): PerpOrderFormContextData => {
    return {
      currentMarket,
      inputIncrements: {
        price: priceIncrement,
        size: sizeIncrement,
      },
      minAssetOrderSize,
      inputConversionPrice,
      executionConversionPrice,
      slippageFraction,
      validatedAssetAmountInput,
      form: usePerpForm,
      onSubmit: usePerpForm.handleSubmit(submitHandler),
      validators: inputValidators,
      formError,
      userStateError,
      buttonState,
      tradingAccountMetrics,
    };
  }, [
    buttonState,
    currentMarket,
    executionConversionPrice,
    formError,
    inputConversionPrice,
    inputValidators,
    minAssetOrderSize,
    priceIncrement,
    sizeIncrement,
    slippageFraction,
    submitHandler,
    tradingAccountMetrics,
    usePerpForm,
    userStateError,
    validatedAssetAmountInput,
  ]);

  return (
    <PerpOrderFormContext.Provider value={value}>
      <FormProvider {...usePerpForm}>{children}</FormProvider>
    </PerpOrderFormContext.Provider>
  );
}
