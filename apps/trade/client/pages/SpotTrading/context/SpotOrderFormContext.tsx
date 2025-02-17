import { ProductEngineType } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { safeParseForData, WithChildren } from '@vertex-protocol/web-common';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import {
  SpotStaticMarketData,
  StaticMarketQuoteData,
} from 'client/hooks/markets/marketsStaticData/types';

import { useLatestMarketPrice } from 'client/hooks/markets/useLatestMarketPrice';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { useOrderFormConversionPrices } from 'client/modules/trading/hooks/orderFormContext/useOrderFormConversionPrices';
import { useOrderFormEnableMaxSizeLogic } from 'client/modules/trading/hooks/orderFormContext/useOrderFormEnableMaxSizeLogic';
import { useOrderFormError } from 'client/modules/trading/hooks/orderFormContext/useOrderFormError';
import { useOrderFormMarketSelection } from 'client/modules/trading/hooks/orderFormContext/useOrderFormMarketSelection';
import {
  OrderFormMaxOrderSizes,
  useOrderFormMaxOrderSizes,
} from 'client/modules/trading/hooks/orderFormContext/useOrderFormMaxOrderSizes';
import { useOrderFormOnChangeSideEffects } from 'client/modules/trading/hooks/orderFormContext/useOrderFormOnChangeSideEffects';
import { useOrderFormProductData } from 'client/modules/trading/hooks/orderFormContext/useOrderFormProductData';
import { useOrderFormSubmitHandler } from 'client/modules/trading/hooks/orderFormContext/useOrderFormSubmitHandler';
import { useOrderFormValidators } from 'client/modules/trading/hooks/orderFormContext/useOrderFormValidators';
import { useSpotLeverageEnabled } from 'client/modules/trading/hooks/useSpotLeverageEnabled';
import {
  OrderFormError,
  OrderFormValidators,
} from 'client/modules/trading/types';
import { useSpotOrderFormOnChangeSideEffects } from 'client/pages/SpotTrading/context/hooks/useSpotOrderFormOnChangeSideEffects';
import { useSpotOrderFormUserStateError } from 'client/pages/SpotTrading/context/hooks/useSpotOrderFormUserStateError';
import {
  SpotOrderFormUserStateError,
  SpotOrderFormValues,
} from 'client/pages/SpotTrading/context/types';
import { spotPriceInputAtom } from 'client/store/trading/spotTradingStore';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { createContext, use, useMemo } from 'react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';

export interface SpotOrderFormContextData {
  // Market selection
  currentMarket: SpotStaticMarketData | undefined;
  /**
   * RHF instance to pass to `<Form />`
   */
  form: UseFormReturn<SpotOrderFormValues>;
  /**
   * Validators for the form
   */
  validators: OrderFormValidators;
  /**
   * Errors associated with the current state of the user
   */
  userStateError: SpotOrderFormUserStateError | undefined;
  /**
   * Errors associated with the form
   */
  formError: OrderFormError | undefined;
  /**
   * State of the submit button
   */
  buttonState: BaseActionButtonState;
  /**
   * Metadata for the quote of the currently selected market
   */
  quoteMetadata: StaticMarketQuoteData | undefined;
  /**
   * Query result for max order sizes
   */
  maxOrderSizes: OrderFormMaxOrderSizes | undefined;
  /**
   * Minimum order size, in terms of the asset, for the currently selected market
   */
  minAssetOrderSize: BigDecimal | undefined;
  /**
   * Whether the current state of the market + form allows any arbitrary order size to be submitted. Usually, only sizes adhering to the sizeIncrement of the market are allowed.
   * However, spot markets with a corresponding LP pool can execute any arbitrary order size
   */
  allowAnyOrderSizeIncrement: boolean;
  /**
   * Conversion price from base -> quote with slippage included
   */
  executionConversionPrice: BigDecimal | undefined;
  /**
   * Configured slippage for the current order type
   */
  slippageFraction: number;
  /**
   * A validated order amount input, in terms of the base asset of the market
   */
  validatedAssetAmountInput: BigDecimal | undefined;
  /**
   * Conversion price from base -> quote without slippage, this is used to convert between asset and quote amounts
   */
  inputConversionPrice: BigDecimal | undefined;
  /**
   * Allowed increments for the input fields
   */
  inputIncrements: {
    price: BigDecimal | undefined;
    size: BigDecimal | undefined;
  };
  /**
   * Maximum order size, in terms of the asset, for the currently selected market
   */
  maxAssetOrderSize: BigDecimal | undefined;
  /**
   Whether to enable max size logic
   */
  enableMaxSizeLogic: boolean;
  /**
   * Form submit handler
   */
  onSubmit: () => void;
}

const SpotOrderFormContext = createContext<SpotOrderFormContextData>(
  {} as SpotOrderFormContextData,
);

// Hook to consume context
export const useSpotOrderFormContext = () => use(SpotOrderFormContext);

export function SpotOrderFormContextProvider({ children }: WithChildren) {
  const { currentMarket, quoteMetadata } = useOrderFormMarketSelection(
    ProductEngineType.SPOT,
  );
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
    // Used for allowAnyOrderSizeIncrement check
    // totalLpSupply,
  } = useOrderFormProductData({
    form: useSpotForm,
    latestMarketPrices,
    currentMarket,
    productId,
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

  // Trades for any size are only allowed for market orders in markets where a LP pool is available
  // We currently don't have enough LP liquidity anywhere to support this
  const allowAnyOrderSizeIncrement = false;
  // const allowAnyOrderSizeIncrement = Boolean(
  //   priceType === 'market' && totalLpSupply?.gt(0),
  // );

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
  const enableMaxSizeLogic = useOrderFormEnableMaxSizeLogic({
    priceType,
    marginMode: null,
  });

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
   * On submit handler
   */
  const submitHandler = useOrderFormSubmitHandler({
    executionConversionPriceRef,
    inputConversionPriceRef,
    currentMarket,
    mutateAsync: executePlaceOrder.mutateAsync,
    spotLeverageEnabled,
    allowAnyOrderSizeIncrement,
    quoteProductId: quoteMetadata?.productId,
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
      enableMaxSizeLogic,
      minAssetOrderSize,
      maxAssetOrderSize,
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
      inputConversionPrice,
      quoteMetadata,
    };
  }, [
    currentMarket,
    priceIncrement,
    sizeIncrement,
    maxOrderSizes,
    enableMaxSizeLogic,
    minAssetOrderSize,
    maxAssetOrderSize,
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
    inputConversionPrice,
    quoteMetadata,
  ]);

  return (
    <SpotOrderFormContext value={value}>
      <FormProvider {...useSpotForm}>{children}</FormProvider>
    </SpotOrderFormContext>
  );
}
