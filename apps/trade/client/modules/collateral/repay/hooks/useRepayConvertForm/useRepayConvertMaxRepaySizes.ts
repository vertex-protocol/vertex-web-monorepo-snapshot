import { BigDecimal } from '@vertex-protocol/utils';
import { useMemo } from 'react';
import { UseMaxOrderSizeParams } from 'client/hooks/query/subaccount/useMaxOrderSize';
import { useMaxOrderSizeEstimation } from 'client/hooks/subaccount/useMaxOrderSizeEstimation';
import { RepayConvertProduct } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';
import { roundToDecimalPlaces } from 'client/utils/rounding';

interface Params {
  executionConversionPrice: BigDecimal | undefined;
  isSellOrder: boolean;
  marketProductId: number | undefined;
  selectedRepayProduct: RepayConvertProduct | undefined;
}

export function useRepayConvertMaxRepaySizes({
  executionConversionPrice,
  isSellOrder,
  marketProductId,
  selectedRepayProduct,
}: Params) {
  const maxOrderSizeParams = useMemo((): UseMaxOrderSizeParams | undefined => {
    if (!executionConversionPrice || !marketProductId) {
      return;
    }

    return {
      price: executionConversionPrice,
      side: isSellOrder ? 'short' : 'long',
      productId: marketProductId,
      spotLeverage: false,
    };
  }, [executionConversionPrice, isSellOrder, marketProductId]);

  // The order size can apply to either the source or repay product, depending on the order type, but we're
  // interested in the max size of the repay product
  const { data: maxAssetOrderSize } =
    useMaxOrderSizeEstimation(maxOrderSizeParams);

  const maxRepaySizeIgnoringAmountBorrowed = useMemo(() => {
    if (!executionConversionPrice || !maxAssetOrderSize) {
      return;
    }
    if (isSellOrder) {
      // This means we're repaying quote, so we need to convert asset -> quote
      return maxAssetOrderSize.multipliedBy(executionConversionPrice);
    }
    return maxAssetOrderSize;
  }, [executionConversionPrice, isSellOrder, maxAssetOrderSize]);

  // The max repay size is the minimum of the amount borrowed & the max order size
  const maxRepaySize = useMemo(() => {
    if (!selectedRepayProduct) {
      return maxRepaySizeIgnoringAmountBorrowed;
    }
    if (!maxRepaySizeIgnoringAmountBorrowed) {
      return;
    }
    return BigDecimal.min(
      // Never exceed max order size
      roundToDecimalPlaces(
        maxRepaySizeIgnoringAmountBorrowed,
        6,
        BigDecimal.ROUND_DOWN,
      ),
      // Ensure fully repaying the amount borrowed
      roundToDecimalPlaces(
        selectedRepayProduct.amountBorrowed,
        6,
        BigDecimal.ROUND_UP,
      ),
    );
  }, [maxRepaySizeIgnoringAmountBorrowed, selectedRepayProduct]);

  return {
    maxRepaySizeIgnoringAmountBorrowed,
    maxRepaySize,
  };
}
