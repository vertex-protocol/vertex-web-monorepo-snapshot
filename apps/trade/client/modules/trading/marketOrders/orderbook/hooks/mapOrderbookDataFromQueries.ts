import { BigDecimal, EnginePriceTickLiquidity } from '@vertex-protocol/client';
import { AnnotatedMarket } from '@vertex-protocol/react-client';
import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { MarketLiquidityData } from 'client/hooks/query/markets/useMarketLiquidity';
import {
  OrderbookData,
  OrderbookRowItem,
} from 'client/modules/trading/marketOrders/orderbook/hooks/types';
import { OrderbookPriceTickSpacingMultiplier } from 'client/modules/trading/marketOrders/orderbook/types';
import { getIsHighSpread } from 'client/modules/trading/utils/getIsHighSpread';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { first, get, last } from 'lodash';

function getRowId(isAsk: boolean, price: BigDecimal) {
  return `${isAsk ? 'ask' : 'bid'}-${price.toString()}`;
}

interface ProcessTicksParams {
  isAsk: boolean;
  showOrderbookTotalInQuote: boolean;
  ticksData: EnginePriceTickLiquidity[];
  topOfBookPrice: BigDecimal;
  tickSpacing: number;
  depth: number;
}

// Helper function to process bid or ask data
function processTicks({
  isAsk,
  showOrderbookTotalInQuote,
  ticksData,
  topOfBookPrice,
  tickSpacing,
  depth,
}: ProcessTicksParams) {
  let cumulativeAmount = BigDecimals.ZERO;

  let currPrice = topOfBookPrice;

  const ticks: OrderbookRowItem[] = [
    {
      id: getRowId(isAsk, currPrice),
      isAsk,
      price: currPrice,
      assetAmount: BigDecimals.ZERO,
      cumulativeAmount: BigDecimals.ZERO,
    },
  ];

  for (const priceTickData of ticksData) {
    const nextThresholdPrice = isAsk
      ? currPrice.plus(tickSpacing)
      : currPrice.minus(tickSpacing);

    const decimalAdjustedAssetLiquidity = removeDecimals(
      priceTickData.liquidity,
    );

    cumulativeAmount = cumulativeAmount.plus(
      showOrderbookTotalInQuote
        ? decimalAdjustedAssetLiquidity.multipliedBy(currPrice)
        : decimalAdjustedAssetLiquidity,
    );

    const nextThresholdReached = isAsk
      ? priceTickData.price.gte(nextThresholdPrice)
      : priceTickData.price.lte(nextThresholdPrice);

    if (nextThresholdReached) {
      // If we're done with the requested depth, return
      if (ticks.length === depth) {
        break;
      }
      // Add a new level
      currPrice = priceTickData.price;

      ticks.push({
        id: getRowId(isAsk, currPrice),
        isAsk,
        price: currPrice,
        assetAmount: decimalAdjustedAssetLiquidity,
        cumulativeAmount,
      });
    } else {
      // Add to existing level
      const lastItem = last(ticks);
      if (lastItem) {
        lastItem.assetAmount = get(
          lastItem,
          'assetAmount',
          BigDecimals.ZERO,
        ).plus(decimalAdjustedAssetLiquidity);
        lastItem.cumulativeAmount = cumulativeAmount;
      }
    }
  }

  // Populate the rest until we've hit depth
  while (ticks.length < depth) {
    currPrice = isAsk
      ? currPrice.plus(tickSpacing)
      : currPrice.minus(tickSpacing);

    // For bids, we can create an invalid row if we go below zero
    if (currPrice.isNegative()) {
      break;
    }

    ticks.push({
      id: getRowId(isAsk, currPrice),
      isAsk,
      price: currPrice,
      assetAmount: undefined,
      cumulativeAmount,
    });
  }

  return {
    ticks,
    cumulativeAmount,
  };
}

interface MapOrderbookDataFromQueriesParams {
  depth: number;
  showOrderbookTotalInQuote: boolean;
  quoteSymbol: string;
  tickSpacingMultiplier: OrderbookPriceTickSpacingMultiplier;
  marketData: AnnotatedMarket;
  liquidityQueryData: MarketLiquidityData;
}

// Util function to map query data to orderbook data
export function mapOrderbookDataFromQueries({
  depth,
  showOrderbookTotalInQuote,
  quoteSymbol,
  tickSpacingMultiplier,
  marketData,
  liquidityQueryData,
}: MapOrderbookDataFromQueriesParams): OrderbookData {
  const sharedProductMetadata = getSharedProductMetadata(marketData.metadata);

  const currentTickSpacing = marketData.priceIncrement
    .multipliedBy(tickSpacingMultiplier)
    .toNumber();

  const { bids: bidsData, asks: asksData } = liquidityQueryData;

  const bidPrice = first(bidsData)?.price ?? BigDecimals.ZERO;
  const askPrice = first(asksData)?.price ?? BigDecimals.ZERO;
  const spreadAmount = askPrice.minus(bidPrice);
  const bidAskAvg = bidPrice.div(2).plus(askPrice.div(2));

  // Process bids
  const { ticks: bids, cumulativeAmount: bidCumulativeAmount } = processTicks({
    isAsk: false,
    showOrderbookTotalInQuote,
    ticksData: bidsData,
    topOfBookPrice: bidPrice,
    tickSpacing: currentTickSpacing,
    depth,
  });

  // Process asks
  const { ticks: asks, cumulativeAmount: askCumulativeAmount } = processTicks({
    isAsk: true,
    showOrderbookTotalInQuote,
    ticksData: asksData,
    topOfBookPrice: askPrice,
    tickSpacing: currentTickSpacing,
    depth,
  });

  const spreadFrac = bidAskAvg.eq(0)
    ? BigDecimals.ZERO
    : spreadAmount.div(bidAskAvg);

  const maxCumulativeTotalAmount = BigDecimal.max(
    bidCumulativeAmount,
    askCumulativeAmount,
  );

  return {
    productMetadata: sharedProductMetadata,
    maxCumulativeTotalAmount,
    quoteSymbol,
    asks,
    bids,
    spread: {
      amount: spreadAmount,
      frac: spreadFrac,
      isHigh: getIsHighSpread(spreadFrac),
    },
    sizeIncrement: marketData.sizeIncrement,
    priceIncrement: marketData.priceIncrement,
  };
}
