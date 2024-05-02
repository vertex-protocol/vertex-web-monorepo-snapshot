import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { BigDecimal } from '@vertex-protocol/utils';
import { createQueryKey } from '@vertex-protocol/web-data';
import { useAllMarkets24hrSnapshots } from 'client/hooks/markets/useAllMarkets24hrSnapshots';
import { useAllProducts24hrHistoricalSnapshot } from 'client/hooks/markets/useAllProducts24hrHistoricalSnapshot';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { BigDecimals } from 'client/utils/BigDecimals';
import { calcChangeFrac } from 'client/utils/calcs/calcChangeFrac';
import { get } from 'lodash';

export interface AllMarketsHistoricalMetrics {
  // Since beginning of time
  totalCumulativeVolumeQuote: BigDecimal;
  // By Product ID
  metricsByMarket: Record<number, MarketHistoricalMetrics>;
}

interface MarketHistoricalMetrics {
  productId: number;
  pastDayVolumeQuote: BigDecimal;
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

    let totalCumulativeVolumeQuote = BigDecimals.ZERO;

    const metricsByMarket: Record<number, MarketHistoricalMetrics> = {};

    Object.values(latestMarketsData.allMarkets).forEach((market) => {
      const productId = market.productId;

      // Volume
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

      totalCumulativeVolumeQuote = totalCumulativeVolumeQuote.plus(
        latestCumulativeVolume,
      );
      const pastDayVolumeQuote = latestCumulativeVolume.minus(
        earliestDailyCumulativeVolume,
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
        market.product.oraclePrice;
      // Default to current price to get a 0% change
      const earliestDailyPrice =
        productSnapshots?.[productId]?.product.oraclePrice ?? currentPrice;

      const pastDayPriceChange = currentPrice.minus(earliestDailyPrice);
      const pastDayPriceChangeFrac = calcChangeFrac(
        currentPrice,
        earliestDailyPrice,
      );

      metricsByMarket[productId] = {
        productId,
        pastDayVolumeQuote,
        pastDayPriceChange,
        pastDayPriceChangeFrac,
        pastDayNumTrades,
      };
    });

    return {
      totalCumulativeVolumeQuote,
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
