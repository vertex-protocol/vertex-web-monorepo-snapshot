import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useLatestPerpPrices } from 'client/hooks/query/markets/useLatestPerpPrices';
import { useAllMarkets24HrFundingRates } from 'client/hooks/query/markets/useAllMarkets24hrFundingRates';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useFavoritedMarkets } from 'client/modules/markets/hooks/useFavoritedMarkets';
import { useMemo } from 'react';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { BigDecimal } from '@vertex-protocol/client';
import { PerpProductMetadata } from 'common/productMetadata/types';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { FundingRates, getFundingRates } from 'client/utils/calcs/funding';

export interface PerpMarketTableItem {
  metadata: PerpProductMetadata;
  productId: number;
  currentPrice: BigDecimal | undefined;
  indexPrice: BigDecimal | undefined;
  oraclePrice: BigDecimal | undefined;
  openInterestQuote: BigDecimal | undefined;
  priceChange24hr: BigDecimal | undefined;
  priceChangeFrac24hr: BigDecimal | undefined;
  volume24h: BigDecimal | undefined;
  isNewMarket: boolean;
  isFavorited: boolean;
  fundingRates: FundingRates | undefined;
  marketPriceFormatSpecifier: string;
}

export function usePerpMarketsTable() {
  const { getIsHiddenMarket, getIsNewMarket } = useVertexMetadataContext();
  const { data: allMarketData } = useAllMarkets();
  const { data: latestPerpPricesData } = useLatestPerpPrices();
  const { data: latestOraclePricesData } = useLatestOraclePrices();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();
  const { data: latestMarketPricesData } = useAllMarketsLatestPrices();
  const { data: fundingRateData } = useAllMarkets24HrFundingRates();
  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();
  const { connectionStatus } = useEVMContext();
  const perpMarkets = allMarketData?.perpMarkets;

  const mappedData: PerpMarketTableItem[] | undefined = useMemo(() => {
    if (!perpMarkets) {
      return;
    }

    return Object.values(perpMarkets)
      .filter((market) => !getIsHiddenMarket(market.productId))
      .map((market) => {
        const productId = market.productId;
        const marketMetrics = marketMetricsData?.metricsByMarket[productId];
        const latestMarketPrices = latestMarketPricesData?.[productId];
        const latestPerpPrices = latestPerpPricesData?.[productId];

        const oraclePrice = latestOraclePricesData?.[productId]?.oraclePrice;
        const openInterestQuote = oraclePrice
          ? removeDecimals(
              market.product.openInterest.multipliedBy(oraclePrice),
            )
          : undefined;
        const dailyFundingRate = fundingRateData?.[productId]?.fundingRate;

        return {
          metadata: market.metadata,
          productId: market.productId,
          currentPrice: latestMarketPrices?.safeAverage,
          oraclePrice,
          indexPrice: latestPerpPrices?.indexPrice,
          priceChange24hr: marketMetrics?.pastDayPriceChange,
          priceChangeFrac24hr: marketMetrics?.pastDayPriceChangeFrac,
          volume24h: removeDecimals(marketMetrics?.pastDayVolumeQuote),
          openInterestQuote: openInterestQuote,
          isNewMarket: getIsNewMarket(productId),
          isFavorited: favoritedMarketIds.has(productId),
          fundingRates: dailyFundingRate
            ? getFundingRates(dailyFundingRate)
            : undefined,
          marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(
            market.priceIncrement,
          ),
        };
      });
  }, [
    latestMarketPricesData,
    latestOraclePricesData,
    latestPerpPricesData,
    marketMetricsData,
    favoritedMarketIds,
    fundingRateData,
    perpMarkets,
    getIsHiddenMarket,
    getIsNewMarket,
  ]);

  return {
    perpProducts: mappedData,
    toggleIsFavoritedMarket,
    disableFavoriteButton: connectionStatus.type !== 'connected',
  };
}
