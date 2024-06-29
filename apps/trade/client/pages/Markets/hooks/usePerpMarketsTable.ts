import { BigDecimal } from '@vertex-protocol/client';
import {
  getMarketPriceFormatSpecifier,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useAllMarkets24HrFundingRates } from 'client/hooks/query/markets/useAllMarkets24hrFundingRates';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useLatestPerpPrices } from 'client/hooks/query/markets/useLatestPerpPrices';
import { FundingRates, getFundingRates } from 'client/utils/calcs/funding';
import { PerpProductMetadata } from 'common/productMetadata/types';
import { useMemo } from 'react';

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
  const { data: allMarketData, isLoading: isAllMarketDataLoading } =
    useAllMarkets();
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
          volume24h: removeDecimals(marketMetrics?.pastDayVolumeInPrimaryQuote),
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
    isLoading: isAllMarketDataLoading,
    perpProducts: mappedData,
    toggleIsFavoritedMarket,
    disableFavoriteButton: connectionStatus.type !== 'connected',
  };
}
