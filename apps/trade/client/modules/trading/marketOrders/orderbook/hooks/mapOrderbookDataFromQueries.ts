import { BigDecimal, EnginePriceTickLiquidity } from '@vertex-protocol/client';
import { MarketLiquidityData } from 'client/hooks/query/markets/useMarketLiquidity';
import { isHighSpread } from 'client/modules/trading/utils/isHighSpread';
import { BigDecimals } from 'client/utils/BigDecimals';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { AnnotatedMarket } from 'common/productMetadata/types';
import { first, last } from 'lodash';
import { OrderbookPriceTickSpacingMultiplier } from '../types';
import { OrderbookData, OrderbookRowItem } from './types';

function getRowId(isAsk: boolean, price: BigDecimal) {
  return `${isAsk ? 'ask' : 'bid'}-${price.toString()}`;
}

// Helper function to process bid or ask data
function processTicks(
  isAsk: boolean,
  showOrderbookTotalInQuote: boolean,
  ticksData: EnginePriceTickLiquidity[],
  topOfBookPrice: BigDecimal,
  tickSpacing: number,
  depth: number,
) {
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

// Util function to map query data to orderbook data
export function mapOrderbookDataFromQueries(
  depth: number,
  showOrderbookTotalInQuote: boolean,
  tickSpacingMultiplier: OrderbookPriceTickSpacingMultiplier,
  market: AnnotatedMarket,
  liquidityQueryData: MarketLiquidityData,
): OrderbookData {
  const baseProductMetadata = getBaseProductMetadata(market.metadata);

  const currentTickSpacing = market.priceIncrement
    .multipliedBy(tickSpacingMultiplier)
    .toNumber();

  const { bids: bidsData, asks: asksData } = liquidityQueryData;

  const bidPrice = first(bidsData)?.price ?? BigDecimals.ZERO;
  const askPrice = first(asksData)?.price ?? BigDecimals.ZERO;
  const spreadAmount = askPrice.minus(bidPrice);
  const bidAskAvg = bidPrice.div(2).plus(askPrice.div(2));

  // Process bids
  const { ticks: bids, cumulativeAmount: bidCumulativeAmount } = processTicks(
    false,
    showOrderbookTotalInQuote,
    bidsData,
    bidPrice,
    currentTickSpacing,
    depth,
  );

  // Process asks
  const { ticks: asks, cumulativeAmount: askCumulativeAmount } = processTicks(
    true,
    showOrderbookTotalInQuote,
    asksData,
    askPrice,
    currentTickSpacing,
    depth,
  );

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
    asks,
    bids,
    spread: {
      amount: spreadAmount,
      frac: spreadFrac,
      isHigh: isHighSpread(spreadFrac),
    },
    sizeIncrement: market.sizeIncrement,
    priceIncrement: market.priceIncrement,
  };
}
