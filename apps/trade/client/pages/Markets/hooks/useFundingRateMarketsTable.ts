import {
  BigDecimal,
  IndexerProductSnapshot,
  ProductEngineType,
  TimeInSeconds,
} from '@vertex-protocol/client';
import {
  getMarketPriceFormatSpecifier,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useAllMarkets24HrFundingRates } from 'client/hooks/query/markets/useAllMarkets24hrFundingRates';
import { useAllProductsHistoricalSnapshots } from 'client/hooks/query/markets/useAllProductsHistoricalSnapshots';
import { useLatestPerpPrices } from 'client/hooks/query/markets/useLatestPerpPrices';
import { FundingRates, getFundingRates } from 'client/utils/calcs/funding';
import { safeDiv } from 'client/utils/safeDiv';
import { PerpProductMetadata } from 'common/productMetadata/types';
import { useMemo } from 'react';

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
  const { data: allMarketData, isLoading: isAllMarketDataLoading } =
    useAllMarkets();
  const { data: latestPerpPricesData } = useLatestPerpPrices();
  const { data: marketsFundingRateData } = useAllMarkets24HrFundingRates();
  const { data: productSnapshotsData } = useAllProductsHistoricalSnapshots([
    0,
    FundingPeriod.ONE_DAY,
    FundingPeriod.THREE_DAYS,
    FundingPeriod.ONE_WEEK,
    FundingPeriod.ONE_MONTH,
  ]);

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
            productSnapshotsData?.[0]?.[productId]?.product;

          if (latestProductSnapshot?.type === ProductEngineType.PERP) {
            return latestProductSnapshot.cumulativeFundingLong;
          }
        })();

        const dailyAvg = getHistoricalAvgFundingRates(
          productSnapshotsData?.[1],
          latestCumulativeFunding,
          oraclePrice,
          productId,
          FundingPeriod.ONE_DAY,
        );
        const threeDayAvg = getHistoricalAvgFundingRates(
          productSnapshotsData?.[2],
          latestCumulativeFunding,
          oraclePrice,
          productId,
          FundingPeriod.THREE_DAYS,
        );
        const weeklyAvg = getHistoricalAvgFundingRates(
          productSnapshotsData?.[3],
          latestCumulativeFunding,
          oraclePrice,
          productId,
          FundingPeriod.ONE_WEEK,
        );
        const monthlyAvg = getHistoricalAvgFundingRates(
          productSnapshotsData?.[4],
          latestCumulativeFunding,
          oraclePrice,
          productId,
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
    productSnapshotsData,
  ]);

  return {
    isLoading: isAllMarketDataLoading,
    fundingRateData,
    toggleIsFavoritedMarket,
    disableFavoriteButton: connectionStatus.type !== 'connected',
  };
}

function getHistoricalAvgFundingRates(
  productSnapshotData: Record<number, IndexerProductSnapshot> | undefined,
  latestCumulativeFunding: BigDecimal | undefined,
  oraclePrice: BigDecimal,
  productId: number,
  period: FundingPeriod,
): FundingRates | undefined {
  const product = productSnapshotData?.[productId]?.product;

  if (product?.type !== ProductEngineType.PERP || !latestCumulativeFunding) {
    return;
  }

  const fundingDiff = latestCumulativeFunding.minus(
    product.cumulativeFundingLong,
  );

  const fundingRateOverPeriod = safeDiv(fundingDiff, oraclePrice);

  return getFundingRates(
    fundingRateOverPeriod.multipliedBy(TimeInSeconds.DAY / period),
  );
}
