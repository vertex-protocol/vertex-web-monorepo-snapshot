import { BigDecimal } from '@vertex-protocol/client';
import {
  getMarketPriceFormatSpecifier,
  PerpProductMetadata,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { useAllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { useAllMarkets24HrFundingRates } from 'client/hooks/query/markets/useAllMarkets24hrFundingRates';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useLatestPerpPrices } from 'client/hooks/query/markets/useLatestPerpPrices';
import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { FundingRates, getFundingRates } from 'client/utils/calcs/funding';
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

export function usePerpMarketsTable({ query }: { query: string }) {
  const { getIsHiddenMarket, getIsNewMarket } = useVertexMetadataContext();
  const { data: allMarketData, isLoading: isAllMarketDataLoading } =
    useAllMarkets();
  const { data: latestPerpPricesData } = useLatestPerpPrices();
  const { data: latestOraclePricesData } = useLatestOraclePrices();
  const { data: marketStatsData } = useAllMarketsStats();
  const { data: latestMarketPricesData } = useAllMarketsLatestPrices();
  const { data: fundingRateData } = useAllMarkets24HrFundingRates();
  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();
  const isConnected = useIsConnected();
  const perpMarkets = allMarketData?.perpMarkets;

  const mappedData: PerpMarketTableItem[] | undefined = useMemo(() => {
    if (!perpMarkets) {
      return;
    }

    return Object.values(perpMarkets)
      .filter((market) => !getIsHiddenMarket(market.productId))
      .map((market) => {
        const productId = market.productId;
        const marketStats = marketStatsData?.statsByMarket[productId];
        const latestMarketPrices = latestMarketPricesData?.[productId];
        const latestPerpPrices = latestPerpPricesData?.[productId];

        const oraclePrice = latestOraclePricesData?.[productId]?.oraclePrice;
        const dailyFundingRate = fundingRateData?.[productId]?.fundingRate;

        return {
          metadata: market.metadata,
          productId: market.productId,
          currentPrice: latestMarketPrices?.safeAverage,
          oraclePrice,
          indexPrice: latestPerpPrices?.indexPrice,
          priceChange24hr: marketStats?.pastDayPriceChange,
          priceChangeFrac24hr: marketStats?.pastDayPriceChangeFrac,
          volume24h: removeDecimals(marketStats?.pastDayVolumeInPrimaryQuote),
          openInterestQuote: removeDecimals(marketStats?.openInterestQuote),
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
    perpMarkets,
    getIsHiddenMarket,
    marketStatsData?.statsByMarket,
    latestMarketPricesData,
    latestPerpPricesData,
    latestOraclePricesData,
    fundingRateData,
    getIsNewMarket,
    favoritedMarketIds,
  ]);

  const { results } = useTextSearch({
    query,
    items: mappedData,
    getSearchString,
  });

  return {
    isLoading: isAllMarketDataLoading,
    perpProducts: results,
    toggleIsFavoritedMarket,
    disableFavoriteButton: !isConnected,
  };
}

function getSearchString(item: PerpMarketTableItem) {
  return item.metadata.marketName;
}
