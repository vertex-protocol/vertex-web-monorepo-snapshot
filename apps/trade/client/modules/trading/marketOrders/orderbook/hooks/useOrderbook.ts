import { BigDecimal } from '@vertex-protocol/utils';
import {
  getMarketSizeFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { useLatestPriceChange } from 'client/hooks/markets/useLatestPriceChange';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useMarketLiquidity } from 'client/hooks/query/markets/useMarketLiquidity';
import { useSetPriceInput } from 'client/modules/trading/hooks/useSetPriceInput';
import {
  OrderbookData,
  OrderbookParams,
  UseOrderbook,
} from 'client/modules/trading/marketOrders/orderbook/hooks/types';
import { useSelectedTickSpacingMultiplier } from 'client/modules/trading/marketOrders/orderbook/hooks/useSelectedTickSpacingMultiplier';
import { useShowOrderbookTotalInQuote } from 'client/modules/trading/marketOrders/orderbook/hooks/useShowOrderbookTotalInQuote';
import { precisionFixed } from 'd3-format';
import { useMemo } from 'react';
import { mapOrderbookDataFromQueries } from './mapOrderbookDataFromQueries';

export function useOrderbook({
  productId,
  depth,
}: OrderbookParams): UseOrderbook {
  const { tickSpacingMultiplier, setTickSpacingMultiplier } =
    useSelectedTickSpacingMultiplier(productId);
  const { showOrderbookTotalInQuote, setShowOrderbookTotalInQuote } =
    useShowOrderbookTotalInQuote();

  // Market data
  const { data: marketData } = useMarket({
    productId,
  });
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const quoteData = productId
    ? allMarketsStaticData?.quotes[productId]
    : undefined;

  // Orderbook query, run only when market has loaded
  const { data: liquidityQueryData } = useMarketLiquidity({
    includeWebsocketUpdates: true,
    productId,
  });

  const { data: latestOrderFillPrice } = useLatestOrderFill({ productId });

  const lastPrice = latestOrderFillPrice?.price;

  const lastPriceChange = useLatestPriceChange(lastPrice);

  // Compute data
  const orderbookData = useMemo((): OrderbookData | undefined => {
    if (!marketData || !liquidityQueryData || !quoteData) {
      return;
    }
    return mapOrderbookDataFromQueries({
      depth,
      showOrderbookTotalInQuote,
      quoteSymbol: quoteData.symbol,
      tickSpacingMultiplier,
      marketData,
      liquidityQueryData,
    });
  }, [
    depth,
    liquidityQueryData,
    marketData,
    quoteData,
    showOrderbookTotalInQuote,
    tickSpacingMultiplier,
  ]);

  const currentTickSpacing =
    orderbookData?.priceIncrement
      .multipliedBy(tickSpacingMultiplier)
      .toNumber() ?? 1;

  const baseSetPriceInput = useSetPriceInput();

  const setNewPriceInput = (val: BigDecimal) => {
    if (!productId) {
      return;
    }
    baseSetPriceInput(productId, val);
  };

  const amountFormatSpecifier = getMarketSizeFormatSpecifier(
    orderbookData?.sizeIncrement,
  );

  const cumulativeAmountSpecifier = showOrderbookTotalInQuote
    ? PresetNumberFormatSpecifier.NUMBER_INT
    : amountFormatSpecifier;

  const amountSymbol = showOrderbookTotalInQuote
    ? orderbookData?.quoteSymbol
    : orderbookData?.productMetadata?.symbol;

  return {
    orderbookData,
    tickSpacingMultiplier,
    setTickSpacingMultiplier,
    currentTickSpacing,
    setShowOrderbookTotalInQuote,
    showOrderbookTotalInQuote,
    setNewPriceInput,
    lastPriceChange,
    lastPrice,
    amountSymbol,
    // We don't use `getMarketPriceFormatSpecifier` because we want to format depending on the selected tick spacing
    priceFormatSpecifier: `.${precisionFixed(currentTickSpacing).toFixed()}f`,
    amountFormatSpecifier,
    cumulativeAmountSpecifier,
  };
}
