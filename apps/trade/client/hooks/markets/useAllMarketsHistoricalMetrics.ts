import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import { BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import { useAllMarkets24hrSnapshots } from 'client/hooks/markets/useAllMarkets24hrSnapshots';
import { useAllProducts24hrHistoricalSnapshot } from 'client/hooks/markets/useAllProducts24hrHistoricalSnapshot';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { calcChangeFrac } from 'client/utils/calcs/calcChangeFrac';
import { calcMarketConversionPriceFromOraclePrice } from 'client/utils/calcs/calcMarketConversionPriceFromOraclePrice';
import { get } from 'lodash';

export interface AllMarketsHistoricalMetrics {
  /**
   * Since beginning of time
   */
  totalCumulativeVolumeInPrimaryQuote: BigDecimal;
  /**
   * By Product ID
   */
  metricsByMarket: Record<number, MarketHistoricalMetrics>;
}

interface MarketHistoricalMetrics {
  productId: number;
  /**
   * In terms of the quote currency for the mkt (ex. wETH for mETH-wETH mkt)
   */
  pastDayVolumeInQuote: BigDecimal;
  /**
   * In terms of the primary quote for Vertex (ex. USDC / USDB)
   */
  pastDayVolumeInPrimaryQuote: BigDecimal;
  pastDayPriceChange: BigDecimal;
  pastDayPriceChangeFrac: BigDecimal;
  pastDayNumTrades: BigDecimal;
}

export function useAllMarketsHistoricalMetrics() {
  const { data: latestMarketsData, dataUpdatedAt: latestMarketsUpdatedAt } =
    useAllMarkets();
  const { data: marketSnapshots, dataUpdatedAt: marketSnapshotsUpdatedAt } =
    useAllMarkets24hrSnapshots();
  const { data: latestMarketPrices, dataUpdatedAt: latestPricesUpdatedAt } =
    useAllMarketsLatestPrices();
  const { data: productSnapshots, dataUpdatedAt: productSnapshotsUpdatedAt } =
    useAllProducts24hrHistoricalSnapshot();

  const disabled = !latestMarketsData || !productSnapshots || !marketSnapshots;

  const queryFn = (): AllMarketsHistoricalMetrics => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const latestMarketSnapshotsByProductId = marketSnapshots?.latest;
    const historical24hrMarketSnapshotsByProductId =
      marketSnapshots?.historical24hr;

    let totalCumulativeVolumeInPrimaryQuote = BigDecimals.ZERO;

    const metricsByMarket: Record<number, MarketHistoricalMetrics> = {};

    Object.values(latestMarketsData.allMarkets).forEach((market) => {
      const productId = market.productId;
      const quoteProductId = market.metadata.quoteProductId;

      const quoteOraclePrice =
        quoteProductId === QUOTE_PRODUCT_ID
          ? BigDecimals.ONE
          : latestMarketsData.allMarkets[quoteProductId].product.oraclePrice;

      // Volumes are in terms of the quote currency for the market, not in terms of the primary quote
      const earliestDailyCumulativeVolume = get(
        historical24hrMarketSnapshotsByProductId?.cumulativeVolumes,
        productId,
        BigDecimals.ZERO,
      );
      const latestCumulativeVolume = get(
        latestMarketSnapshotsByProductId?.cumulativeVolumes,
        productId,
        BigDecimals.ZERO,
      );
      const pastDayVolumeInQuote = latestCumulativeVolume.minus(
        earliestDailyCumulativeVolume,
      );

      totalCumulativeVolumeInPrimaryQuote =
        totalCumulativeVolumeInPrimaryQuote.plus(
          latestCumulativeVolume.multipliedBy(quoteOraclePrice),
        );

      // Trades
      const earliestDailyCumulativeNumTrades = get(
        historical24hrMarketSnapshotsByProductId?.cumulativeTrades,
        productId,
        BigDecimals.ZERO,
      );
      const latestCumulativeNumTrades = get(
        latestMarketSnapshotsByProductId?.cumulativeTrades,
        productId,
        BigDecimals.ZERO,
      );

      const pastDayNumTrades = latestCumulativeNumTrades.minus(
        earliestDailyCumulativeNumTrades,
      );

      // Price change
      const currentPrice =
        latestMarketPrices?.[productId]?.safeAverage ??
        calcMarketConversionPriceFromOraclePrice(
          market.product.oraclePrice,
          quoteOraclePrice,
        );
      // Default to current price to get a 0% change
      const earliestProductOraclePrice =
        productSnapshots?.[productId]?.product.oraclePrice;
      const earliestDailyPrice = earliestProductOraclePrice
        ? calcMarketConversionPriceFromOraclePrice(
            earliestProductOraclePrice,
            quoteOraclePrice,
          )
        : currentPrice;
      const pastDayPriceChange = currentPrice.minus(earliestDailyPrice);
      const pastDayPriceChangeFrac = calcChangeFrac(
        currentPrice,
        earliestDailyPrice,
      );

      metricsByMarket[productId] = {
        productId,
        pastDayVolumeInPrimaryQuote:
          pastDayVolumeInQuote.multipliedBy(quoteOraclePrice),
        pastDayVolumeInQuote,
        pastDayPriceChange,
        pastDayPriceChangeFrac,
        pastDayNumTrades,
      };
    });

    return {
      totalCumulativeVolumeInPrimaryQuote,
      metricsByMarket,
    };
  };

  return useQuery({
    queryKey: createQueryKey('allMarketsHistoricalMetrics', [
      latestMarketsUpdatedAt,
      marketSnapshotsUpdatedAt,
      productSnapshotsUpdatedAt,
      latestPricesUpdatedAt,
    ]),
    queryFn,
    enabled: !disabled,
    placeholderData: keepPreviousData,
  });
}
