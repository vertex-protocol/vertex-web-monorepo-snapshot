import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import {
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useLatestOrderFillsForProduct } from 'client/hooks/query/markets/useLatestOrderFillsForProduct';
import { useSetPriceInput } from 'client/modules/trading/hooks/useSetPriceInput';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

interface Params {
  productId?: number;
}

export interface MarketTradeRowItem {
  id: string;
  timestampMillis: number;
  price: BigDecimal;
  decimalAdjustedSize: BigDecimal;
  isSell: boolean;
}

interface Data {
  symbol: string;
  trades: MarketTradeRowItem[];
  maxTradeSize: BigDecimal;
  priceIncrement: BigDecimal;
  sizeIncrement: BigDecimal;
}

export function useLatestMarketTrades({ productId }: Params) {
  const { data: market, isLoading: loadingMarket } = useMarket({
    productId,
  });
  const { data: marketTradesData, isLoading: loadingMarketTrades } =
    useLatestOrderFillsForProduct({ productId });

  const baseSetPriceInput = useSetPriceInput();
  const setNewPriceInput = (price: BigDecimal) => {
    if (!productId) {
      return;
    }
    baseSetPriceInput(productId, price);
  };

  const mappedData = useMemo((): Data | undefined => {
    if (market == null || marketTradesData == null) {
      return;
    }

    const { symbol } = getBaseProductMetadata(market.metadata);

    let maxTradeSize = BigDecimals.ZERO;

    const trades = marketTradesData.map((trade): MarketTradeRowItem => {
      const { amount, price, timestamp } = trade;
      const decimalAdjustedAmount = removeDecimals(amount);

      // A bit of an anti-pattern to update another variable in a `.map`, but this saves on performance
      if (decimalAdjustedAmount.abs().gt(maxTradeSize)) {
        maxTradeSize = decimalAdjustedAmount.abs();
      }

      const timestampMillis = secondsToMilliseconds(timestamp);
      const decimalAdjustedSize = decimalAdjustedAmount.abs();

      return {
        id: trade.id,
        isSell: decimalAdjustedAmount.lt(0),
        price,
        timestampMillis,
        decimalAdjustedSize,
      };
    });

    return {
      trades,
      priceIncrement: market.priceIncrement,
      sizeIncrement: market.sizeIncrement,
      maxTradeSize,
      symbol,
    };
  }, [market, marketTradesData]);

  const priceFormatSpecifier = getMarketPriceFormatSpecifier(
    mappedData?.priceIncrement,
  );
  const amountFormatSpecifier = getMarketSizeFormatSpecifier(
    mappedData?.sizeIncrement,
  );

  return {
    data: mappedData,
    priceFormatSpecifier,
    amountFormatSpecifier,
    isLoading: loadingMarket || loadingMarketTrades,
    setNewPriceInput,
  };
}
