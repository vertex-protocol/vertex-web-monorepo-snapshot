import { BigDecimal } from '@vertex-protocol/utils';
import { safeParseForData, WithChildren } from '@vertex-protocol/web-common';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { SpotStaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useLatestMarketPrice } from 'client/hooks/markets/useLatestMarketPrice';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { useSpotLeverageEnabled } from 'client/modules/trading/hooks/useSpotLeverageEnabled';
import { useOrderFormConversionPrices } from 'client/modules/trading/orderPlacement/hooks/useOrderFormConversionPrices';
import { useOrderFormEnableMaxSizeLogic } from 'client/modules/trading/orderPlacement/hooks/useOrderFormEnableMaxSizeLogic';
import { useOrderFormError } from 'client/modules/trading/orderPlacement/hooks/useOrderFormError';
import {
  OrderFormMaxOrderSizes,
  useOrderFormMaxOrderSizes,
} from 'client/modules/trading/orderPlacement/hooks/useOrderFormMaxOrderSizes';
import { useOrderFormOnChangeSideEffects } from 'client/modules/trading/orderPlacement/hooks/useOrderFormOnChangeSideEffects';
import { useOrderFormProductData } from 'client/modules/trading/orderPlacement/hooks/useOrderFormProductData';
import { useOrderFormSubmitHandler } from 'client/modules/trading/orderPlacement/hooks/useOrderFormSubmitHandler';
import { useOrderFormValidators } from 'client/modules/trading/orderPlacement/hooks/useOrderFormValidators';
import {
  OrderFormError,
  OrderFormValidators,
} from 'client/modules/trading/types';
import {
  SpotOrderFormTradingAccountMetrics,
  useSpotOrderFormAccountMetrics,
} from 'client/pages/SpotTrading/context/hooks/useSpotOrderFormAccountMetrics';
import { useSpotOrderFormEstimateStateTxs } from 'client/pages/SpotTrading/context/hooks/useSpotOrderFormEstimateStateTxs';
import { useSpotOrderFormOnChangeSideEffects } from 'client/pages/SpotTrading/context/hooks/useSpotOrderFormOnChangeSideEffects';
import { useSpotOrderFormUserStateError } from 'client/pages/SpotTrading/context/hooks/useSpotOrderFormUserStateError';
import {
  SpotOrderFormUserStateError,
  SpotOrderFormValues,
} from 'client/pages/SpotTrading/context/types';
import { useSelectedSpotMarket } from 'client/pages/SpotTrading/hooks/useSelectedSpotMarket';
import { spotPriceInputAtom } from 'client/store/trading/spotTradingStore';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { createContext, useContext, useMemo } from 'react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';

export type SpotOrderFormContextData = {
  form: UseFormReturn<SpotOrderFormValues>;
  validators: OrderFormValidators;
  userStateError: SpotOrderFormUserStateError | undefined;
  formError: OrderFormError | undefined;
  buttonState: BaseActionButtonState;
  currentMarket: SpotStaticMarketData | undefined;
  maxOrderSizes: OrderFormMaxOrderSizes | undefined;
  minAssetOrderSize: BigDecimal | undefined;
  allowAnyOrderSizeIncrement: boolean;
  executionConversionPrice: BigDecimal | undefined;
  slippageFraction: number;
  validatedAssetAmountInput: BigDecimal | undefined;
  inputConversionPrice: BigDecimal | undefined;
  inputIncrements: {
    price: BigDecimal | undefined;
    size: BigDecimal | undefined;
  };
  tradingAccountMetrics: SpotOrderFormTradingAccountMetrics;
  onSubmit: () => void;
};

const SpotOrderFormContext = createContext<SpotOrderFormContextData>(
  {} as SpotOrderFormContextData,
);

// Hook to consume context
export const useSpotOrderFormContext = () => useContext(SpotOrderFormContext);

export function SpotOrderFormContextProvider({ children }: WithChildren) {
  const { currentMarket } = useSelectedSpotMarket();
  const { data: latestMarketPrices } = useLatestMarketPrice({
    productId: currentMarket?.productId,
  });
  const { spotLeverageEnabled } = useSpotLeverageEnabled();

  const productId = currentMarket?.productId;

  const useSpotForm = useForm<SpotOrderFormValues>({
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

  const {
    firstExecutionPrice,
    topOfBookPrice,
    priceIncrement,
    sizeIncrement,
    roundPrice,
    roundAmount,
    minAssetOrderSize,
  } = useOrderFormProductData({
    form: useSpotForm,
    latestMarketPrices,
    currentMarket,
  });

  const executePlaceOrder = useExecutePlaceOrder();

  useRunWithDelayOnCondition({
    condition: executePlaceOrder.isSuccess,
    fn: executePlaceOrder.reset,
    delay: 2000,
  });

  // Watched fields
  const priceInput = useSpotForm.watch('price');
  const assetAmountInput = useSpotForm.watch('assetAmount');
  const priceType = useSpotForm.watch('priceType');
  const orderSide = useSpotForm.watch('side');

  const allowAnyOrderSizeIncrement = priceType === 'market';

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
   * Max order size query
   */
  const maxOrderSizes = useOrderFormMaxOrderSizes({
    spotLeverageEnabled: spotLeverageEnabled,
    inputConversionPrice,
    executionConversionPrice,
    orderSide,
    productId,
    roundAmount,
    allowAnyOrderSizeIncrement,
  });
  // Max order size changes frequently, so use a ref for certain dependency arrays
  const maxAssetOrderSize = maxOrderSizes?.asset;
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
    allowAnyOrderSizeIncrement,
  });

  /**
   * Onchange side effects
   */
  useOrderFormOnChangeSideEffects({
    form: useSpotForm,
    productId,
    priceInputAtom: spotPriceInputAtom,
    maxAssetOrderSize,
    inputConversionPrice,
    roundPrice,
    roundAmount,
  });
  useSpotOrderFormOnChangeSideEffects({
    form: useSpotForm,
    spotLeverageEnabled,
  });

  /**
   * Form error states
   */
  const userStateError = useSpotOrderFormUserStateError({
    spotLeverageEnabled,
  });

  const formError = useOrderFormError({
    form: useSpotForm,
    enableMaxSizeLogic,
    userStateError,
  });

  /**
   * Subaccount state estimation
   */
  const estimateStateTxs = useSpotOrderFormEstimateStateTxs({
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
  const tradingAccountMetrics = useSpotOrderFormAccountMetrics({
    currentMarket,
    estimateStateTxs,
    orderSide,
  });

  /**
   * On submit handler
   */
  const submitHandler = useOrderFormSubmitHandler({
    executionConversionPriceRef,
    inputConversionPriceRef,
    currentMarket,
    mutateAsync: executePlaceOrder.mutateAsync,
    spotLeverageEnabled,
    allowAnyOrderSizeIncrement,
  });

  /**
   * Submit button state
   */
  const buttonState = useMemo((): BaseActionButtonState => {
    if (executePlaceOrder.isSuccess) {
      return 'success';
    } else if (executePlaceOrder.isPending) {
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
    executePlaceOrder.isPending,
    executePlaceOrder.isSuccess,
    userStateError,
    validatedAssetAmountInput,
  ]);

  const value = useMemo((): SpotOrderFormContextData => {
    return {
      currentMarket,
      inputIncrements: {
        price: priceIncrement,
        size: sizeIncrement,
      },
      maxOrderSizes,
      minAssetOrderSize,
      allowAnyOrderSizeIncrement,
      form: useSpotForm,
      onSubmit: useSpotForm.handleSubmit(submitHandler),
      validators: inputValidators,
      formError,
      userStateError,
      buttonState,
      executionConversionPrice,
      slippageFraction,
      validatedAssetAmountInput,
      tradingAccountMetrics,
      inputConversionPrice,
    };
  }, [
    currentMarket,
    priceIncrement,
    sizeIncrement,
    maxOrderSizes,
    minAssetOrderSize,
    allowAnyOrderSizeIncrement,
    useSpotForm,
    submitHandler,
    inputValidators,
    formError,
    userStateError,
    buttonState,
    executionConversionPrice,
    slippageFraction,
    validatedAssetAmountInput,
    tradingAccountMetrics,
    inputConversionPrice,
  ]);

  return (
    <SpotOrderFormContext.Provider value={value}>
      <FormProvider {...useSpotForm}>{children}</FormProvider>
    </SpotOrderFormContext.Provider>
  );
}
