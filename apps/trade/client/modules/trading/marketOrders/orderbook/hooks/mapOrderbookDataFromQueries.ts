import { BigDecimal, EnginePriceTickLiquidity } from '@vertex-protocol/client';
import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { MarketLiquidityData } from 'client/hooks/query/markets/useMarketLiquidity';
import { isHighSpread } from 'client/modules/trading/utils/isHighSpread';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { AnnotatedMarket } from 'common/productMetadata/types';
import { first, last } from 'lodash';
import { OrderbookPriceTickSpacingMultiplier } from '../types';
import { OrderbookData, OrderbookRowItem } from './types';

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
        lastItem.assetAmount = lastItem.assetAmount.plus(
          decimalAdjustedAssetLiquidity,
        );
        lastItem.cumulativeAmount = cumulativeAmount;
      }
    }
  }

  // Populate the rest with zeros
  while (ticks.length < depth) {
    currPrice = isAsk
      ? currPrice.plus(tickSpacing)
      : currPrice.minus(tickSpacing);

    ticks.push({
      id: getRowId(isAsk, currPrice),
      isAsk,
      price: currPrice,
      assetAmount: BigDecimals.ZERO,
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
  const baseProductMetadata = getBaseProductMetadata(marketData.metadata);

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

  const cumulativeTotalAmount = BigDecimal.max(
    bidCumulativeAmount,
    askCumulativeAmount,
  );

  return {
    productMetadata: baseProductMetadata,
    cumulativeTotalAmount,
    quoteSymbol,
    asks,
    bids,
    spread: {
      amount: spreadAmount,
      frac: spreadFrac,
      isHigh: isHighSpread(spreadFrac),
    },
    sizeIncrement: marketData.sizeIncrement,
    priceIncrement: marketData.priceIncrement,
  };
}
