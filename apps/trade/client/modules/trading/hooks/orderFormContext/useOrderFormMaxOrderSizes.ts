import { BalanceSide } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { UseMaxOrderSizeParams } from 'client/hooks/query/subaccount/useMaxOrderSize';
import { useDebounceFalsy } from 'client/hooks/util/useDebounceFalsy';
import { useMemo } from 'react';
import { useMaxOrderSizeEstimation } from 'client/hooks/subaccount/useMaxOrderSizeEstimation';

interface Params {
  // For conversion to max quote order size
  inputConversionPrice?: BigDecimal;
  // For the actual query itself
  executionConversionPrice?: BigDecimal;
  orderSide: BalanceSide;
  productId: number | undefined;
  spotLeverageEnabled?: boolean;
  allowAnyOrderSizeIncrement: boolean;
  roundAmount: (amount: BigDecimal) => BigDecimal;
}

export interface OrderFormMaxOrderSizes {
  asset: BigDecimal;
  quote: BigDecimal;
}

export function useOrderFormMaxOrderSizes({
  executionConversionPrice,
  inputConversionPrice,
  orderSide,
  productId,
  spotLeverageEnabled,
  roundAmount,
  allowAnyOrderSizeIncrement,
}: Params) {
  const maxOrderSizeParams = useMemo<UseMaxOrderSizeParams | undefined>(() => {
    if (!executionConversionPrice || !productId) {
      return;
    }

    return {
      price: executionConversionPrice,
      side: orderSide,
      productId: productId,
      spotLeverage: spotLeverageEnabled,
    };
  }, [executionConversionPrice, orderSide, productId, spotLeverageEnabled]);

  const { data: maxAssetOrderSize } =
    useMaxOrderSizeEstimation(maxOrderSizeParams);

  const maxSizes = useMemo((): OrderFormMaxOrderSizes | undefined => {
    if (!maxAssetOrderSize || !inputConversionPrice) {
      return;
    }

    // Round to size increment if needed
    const roundedMaxAssetSize = allowAnyOrderSizeIncrement
      ? maxAssetOrderSize
      : roundAmount(maxAssetOrderSize);

    const maxQuoteSize = roundedMaxAssetSize.times(inputConversionPrice);
    return {
      asset: roundedMaxAssetSize,
      quote: maxQuoteSize,
    };
  }, [
    maxAssetOrderSize,
    inputConversionPrice,
    allowAnyOrderSizeIncrement,
    roundAmount,
  ]);

  // Debounce the data here to prevent UI flickers on price changes, which will result in a brief time during which the query data is undefined
  return useDebounceFalsy(maxSizes);
}
