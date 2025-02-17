import {
  BigDecimal,
  BigDecimals,
  EnginePriceTickLiquidity,
  removeDecimals,
} from '@vertex-protocol/client';
import {
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useMarketLiquidity } from 'client/hooks/query/markets/useMarketLiquidity';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { safeDiv } from '@vertex-protocol/web-common';
import { first } from 'lodash';
import { useMemo } from 'react';

export interface DepthChartItem {
  /** Price of order */
  price: number;
  /** Cumulative ask size */
  cumulativeAskSize: number | undefined;
  /** Cumulative bid size */
  cumulativeBidSize: number | undefined;
  /** Fractional difference from top of book price (i.e. for a bid, % change from the highest bid) price */
  changeFraction: BigDecimal;
}

interface Params {
  /** Current market's product ID */
  productId: number | undefined;
  /** The number of orders on each side of the book */
  limit: number;
}

export function useDepthChart({ productId, limit }: Params) {
  const { data: market, isLoading: isLoadingMarket } = useMarket({ productId });
  const { data: liquidityQueryData, isLoading: isLoadingMarketLiquidity } =
    useMarketLiquidity({
      includeWebsocketUpdates: true,
      productId,
    });

  const priceFormatSpecifier = getMarketPriceFormatSpecifier(
    market?.priceIncrement,
  );

  const sizeFormatSpecifier = getMarketSizeFormatSpecifier(
    market?.sizeIncrement,
  );

  const chartData = useMemo(() => {
    if (!liquidityQueryData || !market) {
      return [];
    }

    // Data starts from the top-of-book price, so the first item is the lowest ask / highest bid
    const { asks, bids } = liquidityQueryData;

    const highestBidPrice = first(bids)?.price;
    const lowestAskPrice = first(asks)?.price;

    const mappedBids = mapDepthChartData(
      bids,
      // If one side of the book doesn't exist, we still need `limit` number of data points starting from an appropriate number (either the other side of the book, or a default of 0)
      highestBidPrice ?? lowestAskPrice ?? BigDecimals.ZERO,
      market.priceIncrement,
      false,
      limit,
    );
    const mappedAsks = mapDepthChartData(
      asks,
      lowestAskPrice ?? highestBidPrice ?? BigDecimals.ZERO,
      market.priceIncrement,
      true,
      limit,
    );

    return [...mappedBids, ...mappedAsks];
  }, [liquidityQueryData, limit, market]);

  return {
    chartData,
    isLoading: isLoadingMarket || isLoadingMarketLiquidity,
    priceFormatSpecifier,
    sizeFormatSpecifier,
    symbol: market ? getSharedProductMetadata(market.metadata).symbol : '',
  };
}

function mapDepthChartData(
  ticks: EnginePriceTickLiquidity[],
  startPrice: BigDecimal,
  priceIncrement: BigDecimal,
  isAsk: boolean,
  limit: number,
) {
  let cumulativeSize = BigDecimals.ZERO;
  let currentPrice = startPrice;

  const items: DepthChartItem[] = [];

  for (const tick of ticks) {
    if (items.length === limit) {
      break;
    }

    const decimalAdjustedSize = removeDecimals(tick.liquidity);
    cumulativeSize = cumulativeSize.plus(decimalAdjustedSize);
    currentPrice = tick.price;

    const changeFraction = safeDiv(currentPrice.minus(startPrice), startPrice);

    items.push({
      price: currentPrice.toNumber(),
      cumulativeBidSize: isAsk ? undefined : cumulativeSize.toNumber(),
      cumulativeAskSize: isAsk ? cumulativeSize.toNumber() : undefined,
      changeFraction,
    });
  }

  while (items.length < limit) {
    currentPrice = isAsk
      ? currentPrice.plus(priceIncrement)
      : currentPrice.minus(priceIncrement);

    const changeFraction = safeDiv(currentPrice.minus(startPrice), startPrice);

    items.push({
      price: currentPrice.toNumber(),
      cumulativeBidSize: isAsk ? undefined : cumulativeSize.toNumber(),
      cumulativeAskSize: isAsk ? cumulativeSize.toNumber() : undefined,
      changeFraction,
    });
  }

  // Return the items in ascending price
  return isAsk ? items : items.reverse();
}
