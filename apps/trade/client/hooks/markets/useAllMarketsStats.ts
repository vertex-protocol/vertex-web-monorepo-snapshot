import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import { BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import { useAllMarkets24hrSnapshots } from 'client/hooks/markets/useAllMarkets24hrSnapshots';
import { useAllProducts24hrHistoricalSnapshot } from 'client/hooks/markets/useAllProducts24hrHistoricalSnapshot';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { calcChangeFrac } from 'client/utils/calcs/calcChangeFrac';
import { calcMarketConversionPriceFromOraclePrice } from 'client/utils/calcs/calcMarketConversionPriceFromOraclePrice';
import { get } from 'lodash';

export interface AllMarketsStats {
  /**
   * Since beginning of time
   */
  totalCumulativeVolumeInPrimaryQuote: BigDecimal;
  /**
   * By Product ID
   */
  statsByMarket: Record<number, MarketStats>;
}

interface MarketStats {
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
  openInterestQuote: BigDecimal;
}

interface Params {
  /**
   * When `true`, will fetch data only for the current chain.
   */
  disableEdge?: boolean;
}

export function useAllMarketsStats({ disableEdge }: Params = {}) {
  const { data: latestMarketsData, dataUpdatedAt: latestMarketsUpdatedAt } =
    useAllMarkets();
  const { data: marketSnapshots, dataUpdatedAt: marketSnapshotsUpdatedAt } =
    useAllMarkets24hrSnapshots({ disableEdge });
  const { data: latestMarketPrices, dataUpdatedAt: latestPricesUpdatedAt } =
    useAllMarketsLatestPrices();
  const { data: productSnapshots, dataUpdatedAt: productSnapshotsUpdatedAt } =
    useAllProducts24hrHistoricalSnapshot();

  const disabled = !latestMarketsData || !productSnapshots || !marketSnapshots;

  const queryFn = (): AllMarketsStats => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const latestMarketSnapshotsByProductId = marketSnapshots?.latest;
    const historical24hrMarketSnapshotsByProductId =
      marketSnapshots?.historical24hr;

    let totalCumulativeVolumeInPrimaryQuote = BigDecimals.ZERO;

    const statsByMarket: Record<number, MarketStats> = {};

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
      const openInterestQuote = get(
        latestMarketSnapshotsByProductId?.openInterestsQuote,
        productId,
        BigDecimals.ZERO,
      );

      statsByMarket[productId] = {
        productId,
        pastDayVolumeInPrimaryQuote:
          pastDayVolumeInQuote.multipliedBy(quoteOraclePrice),
        pastDayVolumeInQuote,
        pastDayPriceChange,
        pastDayPriceChangeFrac,
        pastDayNumTrades,
        openInterestQuote,
      };
    });

    return {
      totalCumulativeVolumeInPrimaryQuote,
      statsByMarket,
    };
  };

  return useQuery({
    queryKey: createQueryKey('allMarketsStats', [
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
