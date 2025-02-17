import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import { BalanceSide, ProductEngineType } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { safeParseForData, WithChildren } from '@vertex-protocol/web-common';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { PerpStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';

import { useLatestMarketPrice } from 'client/hooks/markets/useLatestMarketPrice';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import {
  UserStateError,
  useUserStateError,
} from 'client/hooks/subaccount/useUserStateError';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { MarginMode } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { useOrderFormConversionPrices } from 'client/modules/trading/hooks/orderFormContext/useOrderFormConversionPrices';
import { useOrderFormEnableMaxSizeLogic } from 'client/modules/trading/hooks/orderFormContext/useOrderFormEnableMaxSizeLogic';
import { useOrderFormError } from 'client/modules/trading/hooks/orderFormContext/useOrderFormError';
import { useOrderFormMarketSelection } from 'client/modules/trading/hooks/orderFormContext/useOrderFormMarketSelection';
import { useOrderFormOnChangeSideEffects } from 'client/modules/trading/hooks/orderFormContext/useOrderFormOnChangeSideEffects';
import { useOrderFormProductData } from 'client/modules/trading/hooks/orderFormContext/useOrderFormProductData';
import {
  OrderFormSubmitHandlerIsoParams,
  useOrderFormSubmitHandler,
} from 'client/modules/trading/hooks/orderFormContext/useOrderFormSubmitHandler';
import { useOrderFormValidators } from 'client/modules/trading/hooks/orderFormContext/useOrderFormValidators';
import {
  TradeEntryEstimate,
  useEstimateTradeEntry,
} from 'client/modules/trading/hooks/useEstimateTradeEntry';
import { UseTpSlPlaceOrderForm } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import {
  OrderFormError,
  OrderFormValidators,
  PlaceOrderPriceType,
} from 'client/modules/trading/types';
import { usePerpOrderFormMaxOrderSizes } from 'client/pages/PerpTrading/context/hooks/usePerpOrderFormMaxOrderSizes';
import { usePerpOrderFormOnChangeSideEffects } from 'client/pages/PerpTrading/context/hooks/usePerpOrderFormOnChangeSideEffects';
import { PerpOrderFormValues } from 'client/pages/PerpTrading/context/types';
import { usePerpTpSlOrderForm } from 'client/pages/PerpTrading/hooks/usePerpTpSlOrderForm';
import { useSelectedPerpMarginMode } from 'client/pages/PerpTrading/hooks/useSelectedPerpMarginMode';
import { perpPriceInputAtom } from 'client/store/trading/perpTradingStore';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { createContext, use, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export interface PerpOrderFormContextData {
  /**
   * Currently selected market
   */
  currentMarket: PerpStaticMarketData | undefined;
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
   * The estimated entry given the current form values. Note this excludes any existing position's net entry.
   */
  estimatedTradeEntry: TradeEntryEstimate | undefined;
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
   * The current selected side of the order.
   */
  orderSide: BalanceSide;
  /**
   * The current selected type of order.
   */
  priceType: PlaceOrderPriceType;
  /**
   * The current margin mode.
   */
  marginMode: MarginMode;
  /**
   * Whether there is already a position open for the current market.
   */
  hasExistingPosition: boolean;
  /**
   * Maximum order size, in terms of the asset, for the currently selected market
   */
  maxAssetOrderSize: BigDecimal | undefined;
  /**
   * Whether to enable max size logic
   */
  enableMaxSizeLogic: boolean;
  /**
   * Form submit handler
   */
  onSubmit: () => void;
  /**
   * Whether the TP/SL checkbox is checked.
   */
  isTpSlCheckboxChecked: boolean;
  /**
   * Setter for `isTpSlCheckboxChecked`.
   */
  setIsTpSlCheckboxChecked: (isChecked: boolean) => void;
  /**
   * Whether the TP/Sl checkbox is disabled, e.g. when 1CT is not configured.
   */
  isTpSlCheckboxDisabled: boolean;
  /**
   * True when `isTpSlCheckboxChecked` is true and `priceType` is `'market'`.
   * Used to determine if certain TP/SL-related logic should run.
   */
  takeProfitOrderForm: UseTpSlPlaceOrderForm;
  /**
   * TpSl form utils for Stop Loss inputs.
   */
  stopLossOrderForm: UseTpSlPlaceOrderForm;
  /**
   * Whether the current market has an existing TP/SL.
   */
  hasExistingTriggerOrder: boolean;
  /**
   * Whether the user is reducing an isolated position.
   */
  isReducingIsoPosition: boolean;
}

const PerpOrderFormContext = createContext<PerpOrderFormContextData>(
  {} as PerpOrderFormContextData,
);

// Hook to consume context
export const usePerpOrderFormContext = () => use(PerpOrderFormContext);

export function PerpOrderFormContextProvider({ children }: WithChildren) {
  const { currentMarket } = useOrderFormMarketSelection(ProductEngineType.PERP);
  const { data: latestMarketPrices } = useLatestMarketPrice({
    productId: currentMarket?.productId,
  });
  const userStateError = useUserStateError();

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

  const { selectedMarginMode: marginMode } =
    useSelectedPerpMarginMode(productId);

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
    productId,
  });

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
   * Derive current position data
   */
  const { data: perpPositions } = usePerpPositions();
  const currentPosition = useMemo(() => {
    return perpPositions?.find((pos) => {
      const matchesProductId = pos.productId === productId;
      const matchesMarginMode = !!pos.iso === (marginMode.mode === 'isolated');

      return matchesMarginMode && matchesProductId;
    });
  }, [marginMode.mode, perpPositions, productId]);

  const isCreatingIsoPosition =
    marginMode.mode === 'isolated' && !currentPosition;
  const isReducingIsoPosition = (() => {
    if (
      marginMode.mode !== 'isolated' ||
      !currentPosition ||
      currentPosition.amount.isZero()
    ) {
      return false;
    }

    const isReducingLong =
      currentPosition.amount.isPositive() && orderSide === 'short';
    const isReducingShort =
      currentPosition.amount.isNegative() && orderSide === 'long';
    return isReducingLong || isReducingShort;
  })();

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
  const maxOrderSizes = usePerpOrderFormMaxOrderSizes({
    inputConversionPrice,
    executionConversionPrice,
    orderSide,
    productId,
    roundAmount,
    marginMode,
    currentMarket,
    isReducingIsoPosition,
    currentPosition,
  });
  // Max order size changes frequently, so use a ref for certain dependency arrays
  const maxAssetOrderSize = maxOrderSizes?.asset;
  const maxAssetOrderSizeRef = useSyncedRef(maxAssetOrderSize);
  const enableMaxSizeLogic = useOrderFormEnableMaxSizeLogic({
    priceType,
    marginMode,
  });

  /**
   * Get estimated trade entry.
   */
  const estimatedTradeEntry = useEstimateTradeEntry({
    amountInput: validatedAssetAmountInput,
    executionLimitPrice: executionConversionPrice,
    productId,
    orderSide,
  });

  /**
   * TP/SL
   */
  const tpslIsoSubaccountName = (() => {
    if (!currentPosition) {
      return;
    }
    // Null here indicates that the position is not isolated, whereas undefined means no data
    return currentPosition.iso?.subaccountName ?? null;
  })();
  const {
    isTpSlCheckboxChecked,
    setIsTpSlCheckboxChecked,
    isTpSlCheckboxDisabled,
    isTpSlEnabled,
    takeProfitOrderForm,
    stopLossOrderForm,
    hasExistingTriggerOrder,
    hasTpSlOrderFormError,
    hasExistingPosition,
  } = usePerpTpSlOrderForm({
    isoSubaccountName: tpslIsoSubaccountName,
    productId: currentMarket?.productId,
    longWeightInitial: currentMarket?.longWeightInitial,
    estimatedTradeEntry,
    priceIncrement,
    validatedAssetAmountInput,
    orderSide,
    priceType,
    isCreatingIsoPosition,
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
    marginMode,
    isTpSlCheckboxDisabled,
    setIsTpSlCheckboxChecked,
    orderSide,
    takeProfitOrderFormResetField: takeProfitOrderForm.form.resetField,
    stopLossOrderFormResetField: stopLossOrderForm.form.resetField,
    priceType,
  });

  /**
   * Form error states
   */

  const formError = useOrderFormError({
    form: usePerpForm,
    enableMaxSizeLogic,
    userStateError,
  });

  /**
   * On submit handler
   */
  const submitHandlerTpSlParam = useMemo(
    () => ({
      isTpSlEnabled,
      takeProfitOrderFormOnSubmit: takeProfitOrderForm.onSubmit,
      stopLossOrderFormOnSubmit: stopLossOrderForm.onSubmit,
    }),
    [isTpSlEnabled, takeProfitOrderForm, stopLossOrderForm],
  );
  const submitHandlerIsoParam = useMemo(():
    | OrderFormSubmitHandlerIsoParams
    | undefined => {
    return marginMode.mode === 'isolated'
      ? {
          subaccountName: currentPosition?.iso?.subaccountName,
          isReducingIsoPosition,
        }
      : undefined;
  }, [
    currentPosition?.iso?.subaccountName,
    isReducingIsoPosition,
    marginMode.mode,
  ]);
  const submitHandler = useOrderFormSubmitHandler({
    executionConversionPriceRef,
    inputConversionPriceRef,
    currentMarket,
    mutateAsync: executePlaceOrder.mutateAsync,
    quoteProductId: QUOTE_PRODUCT_ID,
    tpsl: submitHandlerTpSlParam,
    iso: submitHandlerIsoParam,
    marginMode,
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
    if (
      !hasRequiredInputs ||
      userStateError ||
      formError ||
      (isTpSlEnabled && hasTpSlOrderFormError)
    ) {
      return 'disabled';
    }

    return 'idle';
  }, [
    executePlaceOrder.isSuccess,
    executePlaceOrder.isPending,
    validatedAssetAmountInput,
    executionConversionPrice,
    userStateError,
    formError,
    isTpSlEnabled,
    hasTpSlOrderFormError,
  ]);

  const value = useMemo((): PerpOrderFormContextData => {
    return {
      currentMarket,
      inputIncrements: {
        price: priceIncrement,
        size: sizeIncrement,
      },
      enableMaxSizeLogic,
      minAssetOrderSize,
      maxAssetOrderSize,
      inputConversionPrice,
      executionConversionPrice,
      estimatedTradeEntry,
      slippageFraction,
      validatedAssetAmountInput,
      onSubmit: usePerpForm.handleSubmit(submitHandler),
      validators: inputValidators,
      formError,
      userStateError,
      buttonState,
      orderSide,
      priceType,
      hasExistingPosition,
      isTpSlCheckboxChecked,
      setIsTpSlCheckboxChecked,
      isTpSlCheckboxDisabled,
      takeProfitOrderForm,
      stopLossOrderForm,
      hasExistingTriggerOrder,
      isReducingIsoPosition,
      marginMode,
    };
  }, [
    currentMarket,
    priceIncrement,
    sizeIncrement,
    enableMaxSizeLogic,
    minAssetOrderSize,
    maxAssetOrderSize,
    inputConversionPrice,
    executionConversionPrice,
    estimatedTradeEntry,
    slippageFraction,
    validatedAssetAmountInput,
    usePerpForm,
    submitHandler,
    inputValidators,
    formError,
    userStateError,
    buttonState,
    orderSide,
    priceType,
    hasExistingPosition,
    isTpSlCheckboxChecked,
    setIsTpSlCheckboxChecked,
    isTpSlCheckboxDisabled,
    takeProfitOrderForm,
    stopLossOrderForm,
    hasExistingTriggerOrder,
    isReducingIsoPosition,
    marginMode,
  ]);

  return (
    <PerpOrderFormContext value={value}>
      <FormProvider {...usePerpForm}>{children}</FormProvider>
    </PerpOrderFormContext>
  );
}
