import { BigDecimal } from '@vertex-protocol/client';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { safeParseForData } from '@vertex-protocol/web-common';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { useReduceOnlyTriggerOrders } from 'client/hooks/subaccount/useReduceOnlyTriggerOrders';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import {
  TpSlPlaceOrderErrorType,
  TpSlPlaceOrderFormPositionChanges,
  TpSlPlaceOrderFormValues,
  UseTpSlPlaceOrderForm,
} from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { useSavedTpSlTriggerPriceType } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useSavedTpSlTriggerPriceType';
import { useTpSlPlaceOrderFormEstimatedState } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderFormEstimatedState';
import { useTpSlPlaceOrderFormOnChangeSideEffects } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderFormOnChangeSideEffects';
import { useTpSlPlaceOrderFormSubmitHandler } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderFormSubmitHandler';
import { useTpSlTriggerPriceValidator } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlTriggerPriceValidator';
import { watchFormError } from 'client/utils/form/watchFormError';
import {
  finiteBigDecimalValidator,
  positiveBigDecimalValidator,
} from 'client/utils/inputValidators';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface Params {
  productId: number | undefined;
  /**
   * Defined for isolated positions, null indicates that this is not for an isolated position,
   * whereas undefined indicates that the value is not yet loaded.
   */
  isoSubaccountName: string | undefined | null;
  isTakeProfit: boolean;
  priceIncrement: BigDecimal | undefined;
  lastPrice: BigDecimal | undefined;
  oraclePrice: BigDecimal | undefined;
  longWeightInitial: BigDecimal | undefined;
  /**
   * Only used in the perp order form, contains the estimated changes
   * in position amount and entry given the form's current state.
   */
  positionChanges?: TpSlPlaceOrderFormPositionChanges;
}

export function useTpSlPlaceOrderForm({
  productId,
  isoSubaccountName,
  isTakeProfit,
  priceIncrement,
  lastPrice,
  oraclePrice,
  longWeightInitial,
  positionChanges,
}: Params): UseTpSlPlaceOrderForm {
  const { data: reduceOnlyOrderData } = useReduceOnlyTriggerOrders();
  const { data: indexerSnapshot } = useSubaccountIndexerSnapshot();
  const { savedTpSlTriggerPriceType, setSavedTpSlTriggerPriceType } =
    useSavedTpSlTriggerPriceType();

  const executePlaceOrder = useExecutePlaceOrder();

  const useTpSlPlaceOrderForm = useForm<TpSlPlaceOrderFormValues>({
    defaultValues: {
      gainOrLossPercentage: '',
      triggerCriteriaPriceType: savedTpSlTriggerPriceType,
      triggerPrice: '',
      priceSource: 'absolute',
    },
    mode: 'onTouched',
  });

  /* Watched fields */
  const triggerCriteriaPriceType = useTpSlPlaceOrderForm.watch(
    'triggerCriteriaPriceType',
  );
  const triggerPrice = useTpSlPlaceOrderForm.watch('triggerPrice');
  const gainOrLossPercentage = useTpSlPlaceOrderForm.watch(
    'gainOrLossPercentage',
  );
  const priceSource = useTpSlPlaceOrderForm.watch('priceSource');

  /* Watched errors */
  const triggerPriceInputError: TpSlPlaceOrderErrorType | undefined =
    watchFormError(useTpSlPlaceOrderForm, 'triggerPrice');

  /* Validated fields */
  const validTriggerPrice = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, triggerPrice);
  }, [triggerPrice]);

  const validGainOrLossPercentage = useMemo(() => {
    return safeParseForData(finiteBigDecimalValidator, gainOrLossPercentage);
  }, [gainOrLossPercentage]);

  /* Derived data */
  const existingTriggerOrder = (() => {
    if (!productId || isoSubaccountName === undefined) {
      return;
    }
    const tpSlOrders = !!isoSubaccountName
      ? reduceOnlyOrderData?.[productId]?.iso
      : reduceOnlyOrderData?.[productId]?.cross;
    return isTakeProfit
      ? tpSlOrders?.takeProfitOrder
      : tpSlOrders?.stopLossOrder;
  })();

  const indexerSnapshotBalance = useMemo(
    () =>
      indexerSnapshot?.balances.find((indexerBalance) => {
        const matchesMarginMode =
          !!isoSubaccountName === indexerBalance.isolated;
        return matchesMarginMode && indexerBalance.productId === productId;
      }),
    [indexerSnapshot?.balances, isoSubaccountName, productId],
  );

  const hasExistingPosition = indexerSnapshotBalance
    ? !indexerSnapshotBalance.state.postBalance.amount.isZero()
    : false;

  // Form estimated state
  const { positionAmount, positionNetEntry, estimatedPnlUsd, positionSide } =
    useTpSlPlaceOrderFormEstimatedState({
      validTriggerPrice,
      indexerSnapshotBalance,
      positionChanges,
    });

  const priceFormatSpecifier = getMarketPriceFormatSpecifier(priceIncrement);

  const referencePrice =
    triggerCriteriaPriceType === 'last_price' ? lastPrice : oraclePrice;

  const isTriggerPriceAbove =
    positionSide === 'long' ? isTakeProfit : !isTakeProfit;

  // Validators
  const validateTriggerPrice = useTpSlTriggerPriceValidator({
    isTakeProfit,
    positionSide,
    referencePrice,
  });

  const formError = triggerPriceInputError;

  useTpSlPlaceOrderFormOnChangeSideEffects({
    useTpSlPlaceOrderForm,
    savedTpSlTriggerPriceType,
    isTakeProfit,
    priceSource,
    validTriggerPrice,
    validGainOrLossPercentage,
    positionAmount,
    positionNetEntry,
    longWeightInitial,
    priceIncrement,
  });

  // Submit handler
  const submitHandler = useTpSlPlaceOrderFormSubmitHandler({
    isoSubaccountName,
    isTakeProfit,
    positionSide,
    existingTriggerOrder,
    productId,
    isTriggerPriceAbove,
    useTpSlPlaceOrderForm,
    setSavedTpSlTriggerPriceType,
    mutateAsync: executePlaceOrder.mutateAsync,
  });

  return {
    isTakeProfit,
    form: useTpSlPlaceOrderForm,
    formError,
    onSubmit: useTpSlPlaceOrderForm.handleSubmit(submitHandler),
    validateTriggerPrice,
    validTriggerPrice,
    triggerCriteriaPriceType,
    referencePrice,
    isTriggerPriceAbove,
    estimatedPnlUsd,
    priceIncrement,
    priceFormatSpecifier,
    existingTriggerOrder,
    hasExistingPosition,
    executePlaceOrder,
  };
}
