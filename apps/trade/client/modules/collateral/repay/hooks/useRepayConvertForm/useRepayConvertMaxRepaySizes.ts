import { BigDecimal } from '@vertex-protocol/utils';
import { useMemo } from 'react';
import { UseMaxOrderSizeParams } from 'client/hooks/query/subaccount/useMaxOrderSize';
import { useMaxOrderSizeEstimation } from 'client/hooks/subaccount/useMaxOrderSizeEstimation';
import { RepayConvertProductSelectValue } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';
import { roundToDecimalPlaces } from 'client/utils/rounding';

interface Params {
  executionConversionPrice: BigDecimal | undefined;
  isSellOrder: boolean;
  marketProductId: number | undefined;
  selectedRepayProduct: RepayConvertProductSelectValue | undefined;
  allowAnyOrderSizeIncrement: boolean;
  roundAmount: (
    amount: BigDecimal,
    roundingMode?: BigDecimal.RoundingMode,
  ) => BigDecimal;
}

export function useRepayConvertMaxRepaySizes({
  executionConversionPrice,
  isSellOrder,
  marketProductId,
  selectedRepayProduct,
  allowAnyOrderSizeIncrement,
  roundAmount,
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
      const convertedMaxAssetOrderSize = maxAssetOrderSize.multipliedBy(
        executionConversionPrice,
      );

      return allowAnyOrderSizeIncrement
        ? convertedMaxAssetOrderSize
        : roundAmount(convertedMaxAssetOrderSize);
    }

    return allowAnyOrderSizeIncrement
      ? maxAssetOrderSize
      : roundAmount(maxAssetOrderSize);
  }, [
    executionConversionPrice,
    isSellOrder,
    maxAssetOrderSize,
    allowAnyOrderSizeIncrement,
    roundAmount,
  ]);

  // The max repay size is the minimum of the amount borrowed & the max order size
  const maxRepaySize = useMemo(() => {
    if (!selectedRepayProduct) {
      return maxRepaySizeIgnoringAmountBorrowed;
    }

    if (!maxRepaySizeIgnoringAmountBorrowed) {
      return;
    }

    // Never exceed max order size.
    const roundedMaxRepaySizeIgnoringAmountBorrowed = allowAnyOrderSizeIncrement
      ? roundToDecimalPlaces(
          maxRepaySizeIgnoringAmountBorrowed,
          6,
          BigDecimal.ROUND_DOWN,
        )
      : roundAmount(maxRepaySizeIgnoringAmountBorrowed);

    // Ensure fully repaying the amount borrowed.
    const roundedAmountBorrowed = allowAnyOrderSizeIncrement
      ? roundToDecimalPlaces(
          selectedRepayProduct.amountBorrowed,
          6,
          BigDecimal.ROUND_UP,
        )
      : roundAmount(selectedRepayProduct.amountBorrowed, BigDecimal.ROUND_UP);

    return BigDecimal.min(
      roundedMaxRepaySizeIgnoringAmountBorrowed,
      roundedAmountBorrowed,
    );
  }, [
    maxRepaySizeIgnoringAmountBorrowed,
    roundAmount,
    allowAnyOrderSizeIncrement,
    selectedRepayProduct,
  ]);

  return {
    maxRepaySizeIgnoringAmountBorrowed,
    maxRepaySize,
  };
}
