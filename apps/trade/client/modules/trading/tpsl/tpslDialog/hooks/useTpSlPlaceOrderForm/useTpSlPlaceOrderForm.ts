import {
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { useReduceOnlyTriggerOrders } from 'client/hooks/subaccount/useReduceOnlyTriggerOrders';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { watchFormError } from 'client/utils/form/watchFormError';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { getMarketSizeFormatSpecifier } from '@vertex-protocol/react-client';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { TriggerCriteriaPriceType } from '../../types';
import { useSavedTpSlTriggerPriceType } from '../useSavedTpSlTriggerPriceType';
import { useTpSlPositionData } from '../useTpSlPositionData';
import {
  TpSlPlaceOrderErrorType,
  TpSlPlaceOrderFormValues,
  UseTpSlPlaceOrderForm,
} from './types';
import { useTpSlPlaceOrderFormEstimatedState } from './useTpSlPlaceOrderFormEstimatedState';
import { useTpSlPlaceOrderFormOnChangeSideEffects } from './useTpSlPlaceOrderFormOnChangeSideEffects';
import { useTpSlPlaceOrderFormSubmitHandler } from './useTpSlPlaceOrderFormSubmitHandler';
import { useTpSlTriggerPriceValidator } from './useTpSlTriggerPriceValidator';

interface Params {
  productId: number;
  isTakeProfit: boolean;
}

export function useTpSlPlaceOrderForm({
  productId,
  isTakeProfit,
}: Params): UseTpSlPlaceOrderForm {
  const { data: reduceOnlyOrderData } = useReduceOnlyTriggerOrders();
  const { data: indexerSnapshot } = useSubaccountIndexerSnapshot();
  const { savedTpSlTriggerPriceType, setSavedTpSlTriggerPriceType } =
    useSavedTpSlTriggerPriceType();

  const tpSlPositionData = useTpSlPositionData({ productId });

  const executePlaceOrder = useExecutePlaceOrder();

  const useTpSlPlaceOrderForm = useForm<TpSlPlaceOrderFormValues>({
    defaultValues: {
      pnlFrac: 0,
      triggerCriteriaPriceType: savedTpSlTriggerPriceType,
      triggerPrice: '',
      priceSource: 'absolute',
    },
    mode: 'onTouched',
  });

  useRunWithDelayOnCondition({
    condition: executePlaceOrder.isSuccess,
    fn: executePlaceOrder.reset,
  });

  /* Watched fields */
  const triggerCriteriaPriceType = useTpSlPlaceOrderForm.watch(
    'triggerCriteriaPriceType',
  );
  const triggerPrice = useTpSlPlaceOrderForm.watch('triggerPrice');
  const pnlFrac = useTpSlPlaceOrderForm.watch('pnlFrac');
  const priceSource = useTpSlPlaceOrderForm.watch('priceSource');

  /* Watched errors */
  const triggerPriceInputError: TpSlPlaceOrderErrorType | undefined =
    watchFormError(useTpSlPlaceOrderForm, 'triggerPrice');

  /* Validated fields */
  const validTriggerPrice = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, triggerPrice);
  }, [triggerPrice]);

  const validPnlFrac = useMemo(() => {
    return safeParseForData(percentageValidator, pnlFrac);
  }, [pnlFrac]);

  /* Derived data */
  const relevantOrder = isTakeProfit
    ? reduceOnlyOrderData?.[productId]?.takeProfitOrder
    : reduceOnlyOrderData?.[productId]?.stopLossOrder;

  const indexerSnapshotBalance = useMemo(
    () =>
      indexerSnapshot?.balances.find((indexerBalance) => {
        return indexerBalance.productId === productId;
      }),
    [indexerSnapshot?.balances, productId],
  );

  const priceFormatSpecifier = getMarketPriceFormatSpecifier(
    tpSlPositionData?.priceIncrement,
  );

  const sizeFormatSpecifier = getMarketSizeFormatSpecifier(
    tpSlPositionData?.sizeIncrement,
  );

  const referencePrice =
    triggerCriteriaPriceType === 'last_price'
      ? tpSlPositionData?.lastPrice
      : tpSlPositionData?.fastOraclePrice;

  const isTriggerPriceAbove = tpSlPositionData?.amount.isPositive()
    ? isTakeProfit
    : !isTakeProfit;

  // Validators
  const validateTriggerPrice = useTpSlTriggerPriceValidator({
    isTakeProfit,
    tpSlPositionData,
    referencePrice,
  });

  const formError = triggerPriceInputError;

  useTpSlPlaceOrderFormOnChangeSideEffects({
    useTpSlPlaceOrderForm,
    savedTpSlTriggerPriceType,
    indexerSnapshotBalance,
    tpSlPositionData,
    isTakeProfit,
    priceSource,
    validTriggerPrice,
    validPnlFrac,
  });

  // Form estimated state
  const estimatedState = useTpSlPlaceOrderFormEstimatedState({
    validTriggerPrice,
    indexerSnapshotBalance,
  });

  // Submit handler
  const submitHandler = useTpSlPlaceOrderFormSubmitHandler({
    isTakeProfit,
    tpSlPositionData,
    useTpSlPlaceOrderForm,
    productId,
    isTriggerPriceAbove,
    setSavedTpSlTriggerPriceType,
    mutateAsync: executePlaceOrder.mutateAsync,
  });

  // Action Button State
  const buttonState = useMemo((): BaseActionButtonState => {
    if (executePlaceOrder.isPending) {
      return 'loading';
    } else if (executePlaceOrder.isSuccess) {
      return 'success';
    } else if (
      formError ||
      !validTriggerPrice ||
      !referencePrice ||
      !tpSlPositionData
    ) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [
    executePlaceOrder.isPending,
    executePlaceOrder.isSuccess,
    formError,
    referencePrice,
    tpSlPositionData,
    validTriggerPrice,
  ]);

  const setPnlFrac = (pnlFrac: number) => {
    if (priceSource !== 'percentage') {
      useTpSlPlaceOrderForm.setValue('priceSource', 'percentage');
    }
    useTpSlPlaceOrderForm.setValue('pnlFrac', pnlFrac);
  };

  const setTriggerCriteriaPriceType = (
    triggerCriteriaPriceType: TriggerCriteriaPriceType,
  ) => {
    useTpSlPlaceOrderForm.setValue(
      'triggerCriteriaPriceType',
      triggerCriteriaPriceType,
    );
  };

  return {
    form: useTpSlPlaceOrderForm,
    formError,
    onSubmit: useTpSlPlaceOrderForm.handleSubmit(submitHandler),
    validateTriggerPrice,
    pnlFrac: validPnlFrac,
    setPnlFrac,
    triggerPrice: validTriggerPrice,
    triggerCriteriaPriceType,
    setTriggerCriteriaPriceType,
    referencePrice,
    isTriggerPriceAbove,
    estimatedPnlUsd: estimatedState?.unrealizedPnlUsd,
    priceFormatSpecifier,
    sizeFormatSpecifier,
    relevantOrder,
    buttonState,
    priceIncrement: tpSlPositionData?.priceIncrement,
    marketName: tpSlPositionData?.metadata?.marketName,
    positionSize: tpSlPositionData?.amount?.abs(),
  };
}
