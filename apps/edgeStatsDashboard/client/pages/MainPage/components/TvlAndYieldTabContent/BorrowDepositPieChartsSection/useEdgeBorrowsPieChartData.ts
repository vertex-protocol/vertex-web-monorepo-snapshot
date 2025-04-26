import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { useAllEdgeSpotProducts } from 'client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotProducts';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { createPieChartDataForSpotProducts } from 'client/utils/createPieChartDataForSpotProducts';
import { sumBy } from 'lodash';
import { useMemo } from 'react';

export function useEdgeBorrowsPieChartData() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const {
    data: allEdgeSpotProductsData,
    isLoading: isLoadingAllEdgeSpotProductsData,
  } = useAllEdgeSpotProducts();

  const mappedData = useMemo(() => {
    if (!allEdgeSpotProductsData) {
      return;
    }

    const edgeTotalBorrowsAtNowByProductUsd = createPieChartDataForSpotProducts(
      allEdgeSpotProductsData,
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
  }, [allEdgeSpotProductsData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingAllEdgeSpotProductsData,
  };
}
