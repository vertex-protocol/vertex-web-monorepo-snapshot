import { BigDecimal } from '@vertex-protocol/client';
import { getMarketSizeFormatSpecifier } from '@vertex-protocol/react-client';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { UseTpSlPlaceOrderForm } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { useTpSlPlaceOrderForm } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderForm';
import { useTpSlPositionData } from 'client/modules/trading/tpsl/tpslDialog/hooks/useTpSlPositionData';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

export interface UseTpSlDialogOrderForm
  extends Omit<UseTpSlPlaceOrderForm, 'executePlaceOrder'> {
  marketName: string | undefined;
  positionSize: BigDecimal | undefined;
  sizeFormatSpecifier: string;
  buttonState: BaseActionButtonState;
}

interface Params {
  productId: number;
  isTakeProfit: boolean;
}

export function useTpSlDialogOrderForm({
  productId,
  isTakeProfit,
}: Params): UseTpSlDialogOrderForm {
  const tpSlPositionData = useTpSlPositionData({ productId });
  const marketName = tpSlPositionData?.metadata?.marketName;
  const priceIncrement = tpSlPositionData?.priceIncrement;
  const lastPrice = tpSlPositionData?.lastPrice;
  const oraclePrice = tpSlPositionData?.fastOraclePrice;
  const positionSize = tpSlPositionData?.amount.abs();
  const longWeightInitial = tpSlPositionData?.longWeightInitial;
  const sizeFormatSpecifier = getMarketSizeFormatSpecifier(
    tpSlPositionData?.sizeIncrement,
  );

  const { executePlaceOrder, ...tpSlPlaceOrderform } = useTpSlPlaceOrderForm({
    priceIncrement,
    lastPrice,
    oraclePrice,
    productId,
    isTakeProfit,
    longWeightInitial,
  });

  useRunWithDelayOnCondition({
    condition: executePlaceOrder.isSuccess,
    fn: executePlaceOrder.reset,
  });

  const buttonState = useMemo((): BaseActionButtonState => {
    const { formError, validTriggerPrice, referencePrice } = tpSlPlaceOrderform;

    if (executePlaceOrder.isPending) {
      return 'loading';
    } else if (executePlaceOrder.isSuccess) {
      return 'success';
    } else if (formError || !validTriggerPrice || !referencePrice) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [executePlaceOrder, tpSlPlaceOrderform]);

  return {
    ...tpSlPlaceOrderform,
    marketName,
    positionSize,
    sizeFormatSpecifier,
    buttonState,
  };
}
