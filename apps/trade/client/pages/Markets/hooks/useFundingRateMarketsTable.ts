import {
  BigDecimal,
  Product,
  ProductEngineType,
  TimeInSeconds,
} from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useAllMarkets24HrFundingRates } from 'client/hooks/query/markets/useAllMarkets24hrFundingRates';
import { useAllProductsHistoricalSnapshot } from 'client/hooks/query/markets/useAllProductsHistoricalSnapshot';
import { useLatestPerpPrices } from 'client/hooks/query/markets/useLatestPerpPrices';
import { useFavoritedMarkets } from 'client/modules/markets/hooks/useFavoritedMarkets';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { safeDiv } from 'client/utils/safeDiv';
import { PerpProductMetadata } from 'common/productMetadata/types';
import { useMemo } from 'react';
import { FundingRates, getFundingRates } from 'client/utils/calcs/funding';

export interface FundingRateTableItem {
  isFavorited: boolean;
  metadata: PerpProductMetadata;
  productId: number;
  markPrice: BigDecimal | undefined;
  indexPrice: BigDecimal | undefined;
  predictedHourly: FundingRates | undefined;
  dailyAvg: FundingRates | undefined;
  threeDayAvg: FundingRates | undefined;
  weeklyAvg: FundingRates | undefined;
  monthlyAvg: FundingRates | undefined;
  isNewMarket: boolean;
  marketPriceFormatSpecifier: string;
}

enum FundingPeriod {
  ONE_DAY = TimeInSeconds.DAY,
  THREE_DAYS = TimeInSeconds.DAY * 3,
  ONE_WEEK = TimeInSeconds.DAY * 7,
  ONE_MONTH = TimeInSeconds.DAY * 30,
}

export function useFundingRateMarketsTable() {
  const { getIsHiddenMarket, getIsNewMarket } = useVertexMetadataContext();
  const { connectionStatus } = useEVMContext();
  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();
  const { data: allMarketData } = useAllMarkets();
  const { data: latestPerpPricesData } = useLatestPerpPrices();
  const { data: marketsFundingRateData } = useAllMarkets24HrFundingRates();

  const { data: latestProductSnapshotData } =
    useAllProductsHistoricalSnapshot(0);
  const { data: oneDayProductSnapshotData } = useAllProductsHistoricalSnapshot(
    FundingPeriod.ONE_DAY,
  );
  const { data: threeDaysProductSnapshotData } =
    useAllProductsHistoricalSnapshot(FundingPeriod.THREE_DAYS);
  const { data: oneWeekProductSnapshotData } = useAllProductsHistoricalSnapshot(
    FundingPeriod.ONE_WEEK,
  );
  const { data: oneMonthProductSnapshotData } =
    useAllProductsHistoricalSnapshot(FundingPeriod.ONE_MONTH);

  const perpMarkets = allMarketData?.perpMarkets;

  const fundingRateData: FundingRateTableItem[] | undefined = useMemo(() => {
    if (!perpMarkets) {
      return;
    }

    return Object.values(perpMarkets)
      .filter((market) => !getIsHiddenMarket(market.productId))
      .map((market) => {
        const productId = market.productId;
        const oraclePrice = market.product.oraclePrice;
        const latestPerpPrices = latestPerpPricesData?.[productId];
        const dailyFundingRate =
          marketsFundingRateData?.[productId]?.fundingRate;

        const latestCumulativeFunding = (() => {
          const latestProductSnapshot =
            latestProductSnapshotData?.[productId]?.product;

          if (latestProductSnapshot?.type === ProductEngineType.PERP) {
            return latestProductSnapshot.cumulativeFundingLong;
          }
        })();

        const dailyAvg = getHistoricalAvgFundingRates(
          oneDayProductSnapshotData?.[productId]?.product,
          latestCumulativeFunding,
          oraclePrice,
          FundingPeriod.ONE_DAY,
        );
        const threeDayAvg = getHistoricalAvgFundingRates(
          threeDaysProductSnapshotData?.[productId]?.product,
          latestCumulativeFunding,
          oraclePrice,
          FundingPeriod.THREE_DAYS,
        );
        const weeklyAvg = getHistoricalAvgFundingRates(
          oneWeekProductSnapshotData?.[productId]?.product,
          latestCumulativeFunding,
          oraclePrice,
          FundingPeriod.ONE_WEEK,
        );
        const monthlyAvg = getHistoricalAvgFundingRates(
          oneMonthProductSnapshotData?.[productId]?.product,
          latestCumulativeFunding,
          oraclePrice,
          FundingPeriod.ONE_MONTH,
        );

        return {
          isFavorited: favoritedMarketIds.has(productId),
          metadata: market.metadata,
          productId: market.productId,
          indexPrice: latestPerpPrices?.indexPrice,
          markPrice: latestPerpPrices?.markPrice,
          predictedHourly: dailyFundingRate
            ? getFundingRates(dailyFundingRate)
            : undefined,
          dailyAvg,
          threeDayAvg,
          weeklyAvg,
          monthlyAvg,
          isNewMarket: getIsNewMarket(productId),
          marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(
            market.priceIncrement,
          ),
        };
      });
  }, [
    latestPerpPricesData,
    marketsFundingRateData,
    perpMarkets,
    getIsHiddenMarket,
    getIsNewMarket,
    favoritedMarketIds,
    latestProductSnapshotData,
    oneDayProductSnapshotData,
    threeDaysProductSnapshotData,
    oneWeekProductSnapshotData,
    oneMonthProductSnapshotData,
  ]);

  return {
    fundingRateData,
    toggleIsFavoritedMarket,
    disableFavoriteButton: connectionStatus.type !== 'connected',
  };
}

function getHistoricalAvgFundingRates(
  product: Product | undefined,
  latestCumulativeFunding: BigDecimal | undefined,
  oraclePrice: BigDecimal,
  period: FundingPeriod,
): FundingRates | undefined {
  if (product?.type !== ProductEngineType.PERP || !latestCumulativeFunding) {
    return;
  }

  const fundingDiff = latestCumulativeFunding.minus(
    product.cumulativeFundingLong,
  );

  const fundingRateOverPeriod = safeDiv(fundingDiff, oraclePrice);

  return getFundingRates(
    fundingRateOverPeriod.multipliedBy(TimeInSeconds.HOUR / period),
  );
}
