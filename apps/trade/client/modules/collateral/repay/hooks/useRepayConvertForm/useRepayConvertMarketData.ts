import { BigDecimal, removeDecimals } from '@vertex-protocol/client';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { AnnotatedSpotMarket } from '@vertex-protocol/react-client';
import { useMarket } from 'client/hooks/markets/useMarket';
import { RepayConvertProductSelectValue } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';
import { roundToIncrement } from 'client/utils/rounding';
import { useCallback, useMemo } from 'react';

interface Params {
  selectedSourceProduct: RepayConvertProductSelectValue | undefined;
  selectedRepayProduct: RepayConvertProductSelectValue | undefined;
}

// The market product is the product, either repay or source, with an associated market
export function useRepayConvertMarketData({
  selectedRepayProduct,
  selectedSourceProduct,
}: Params) {
  // If the repay product is quote, then the market product is the source product
  // If the repay product is NOT quote, then this is the market asset
  const { marketProduct, isSellOrder } = (() => {
    const isSellOrder = selectedRepayProduct?.productId === QUOTE_PRODUCT_ID;

    if (!selectedRepayProduct || !selectedSourceProduct) {
      return {
        isSellOrder,
        marketProduct: undefined,
      };
    }

    return {
      isSellOrder,
      marketProduct: isSellOrder ? selectedSourceProduct : selectedRepayProduct,
    };
  })();

  const { data: market } = useMarket<AnnotatedSpotMarket>({
    productId: marketProduct?.productId,
  });

  const sizeIncrement = useMemo(() => {
    return removeDecimals(market?.sizeIncrement);
  }, [market?.sizeIncrement]);

  const roundAmount = useCallback(
    (size: BigDecimal, roundingMode?: BigDecimal.RoundingMode) => {
      if (!sizeIncrement) {
        return size;
      }

      return roundToIncrement(
        size,
        sizeIncrement,
        roundingMode ?? BigDecimal.ROUND_DOWN,
      );
    },
    [sizeIncrement],
  );

  return {
    marketProduct,
    market,
    isSellOrder,
    sizeIncrement,
    roundAmount,
  };
}
