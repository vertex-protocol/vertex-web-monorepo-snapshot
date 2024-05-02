import { BigDecimal } from '@vertex-protocol/utils';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { LatestMarketPrice } from 'client/hooks/query/markets/types';
import { BaseOrderFormValues } from 'client/modules/trading/types';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { roundToIncrement } from 'client/utils/rounding';
import { useCallback, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Params {
  form: UseFormReturn<BaseOrderFormValues>;
  currentMarket: StaticMarketData | undefined;
  latestMarketPrices: LatestMarketPrice | undefined;
}

export function useOrderFormProductData({
  form,
  currentMarket,
  latestMarketPrices,
}: Params) {
  const orderSide = form.watch('side');
  const priceType = form.watch('priceType');

  const priceIncrement = currentMarket?.priceIncrement;

  const sizeIncrement = useMemo(() => {
    return removeDecimals(currentMarket?.sizeIncrement);
  }, [currentMarket?.sizeIncrement]);

  const roundPrice = useCallback(
    (price: BigDecimal) => {
      if (!priceIncrement) {
        return price;
      }
      return roundToIncrement(price, priceIncrement);
    },
    [priceIncrement],
  );

  const roundAmount = useCallback(
    (size: BigDecimal) => {
      if (!sizeIncrement) {
        return size;
      }
      return roundToIncrement(size, sizeIncrement, BigDecimal.ROUND_DOWN);
    },
    [sizeIncrement],
  );

  const { firstExecutionPrice, topOfBookPrice } = useMemo(() => {
    if (latestMarketPrices == null) {
      return {};
    }
    const firstExecutionPrice =
      orderSide === 'long'
        ? latestMarketPrices.safeAsk
        : latestMarketPrices.safeBid;
    const topOfBookPrice =
      orderSide === 'long'
        ? latestMarketPrices.safeBid
        : latestMarketPrices.safeAsk;

    return {
      firstExecutionPrice: firstExecutionPrice
        ? roundPrice(firstExecutionPrice)
        : undefined,
      topOfBookPrice: topOfBookPrice ? roundPrice(topOfBookPrice) : undefined,
    };
  }, [latestMarketPrices, orderSide, roundPrice]);

  const minAssetOrderSize = useMemo(() => {
    const minBookSize = removeDecimals(currentMarket?.minSize);
    // Stop orders are market orders, so only use minBookSize when limit
    return priceType === 'limit' ? minBookSize : sizeIncrement;
  }, [currentMarket?.minSize, priceType, sizeIncrement]);

  return {
    // Price of the first book offer that will be hit by the order, if this is a buy, then this is the lowest ask
    firstExecutionPrice,
    // Price of the top of the relevant side of book, if this is a buy, then this is the highest bid
    topOfBookPrice,
    priceIncrement,
    sizeIncrement,
    minAssetOrderSize,
    roundPrice,
    roundAmount,
  };
}
