import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { useMemo } from 'react';
import { sumBy } from 'lodash';
import { useAllEdgeSpotMarkets } from 'client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotMarkets';
import { createPieChartDataForSpotProducts } from 'client/utils/createPieChartDataForSpotProducts';

export function useEdgeBorrowsPieChartData() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const {
    data: allEdgeSpotMarketsData,
    isLoading: isLoadingAllEdgeSpotMarketsData,
  } = useAllEdgeSpotMarkets();

  const mappedData = useMemo(() => {
    if (!allEdgeSpotMarketsData) {
      return;
    }

    const edgeTotalBorrowsAtNowByProductUsd = createPieChartDataForSpotProducts(
      allEdgeSpotMarketsData,
      (market) =>
        calcDecimalAdjustedUsdValue(
          market.product.totalBorrowed.times(market.product.oraclePrice),
          primaryQuotePriceUsd,
        ),
    );

    const edgeTotalBorrowsAtNowUsd = sumBy(
      edgeTotalBorrowsAtNowByProductUsd,
      ({ value }) => value,
    );

    return {
      edgeTotalBorrowsAtNowUsd,
      edgeTotalBorrowsAtNowByProductUsd,
    };
  }, [allEdgeSpotMarketsData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingAllEdgeSpotMarketsData,
  };
}
