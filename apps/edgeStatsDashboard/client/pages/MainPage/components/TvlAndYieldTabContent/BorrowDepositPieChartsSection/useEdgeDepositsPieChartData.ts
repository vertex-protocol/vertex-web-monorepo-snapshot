import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { useAllEdgeSpotProducts } from 'client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotProducts';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { createPieChartDataForSpotProducts } from 'client/utils/createPieChartDataForSpotProducts';
import { sumBy } from 'lodash';
import { useMemo } from 'react';

export function useEdgeDepositsPieChartData() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const {
    data: allEdgeSpotProductsData,
    isLoading: isLoadingAllEdgeSpotProductsData,
  } = useAllEdgeSpotProducts();

  const mappedData = useMemo(() => {
    if (!allEdgeSpotProductsData) {
      return;
    }

    const edgeTotalDepositsAtNowByProductUsd =
      createPieChartDataForSpotProducts(allEdgeSpotProductsData, (market) =>
        calcDecimalAdjustedUsdValue(
          market.product.totalDeposited.times(market.product.oraclePrice),
          primaryQuotePriceUsd,
        ),
      );
    const edgeTotalDepositsAtNowUsd = sumBy(
      edgeTotalDepositsAtNowByProductUsd,
      ({ value }) => value,
    );

    return {
      edgeTotalDepositsAtNowUsd,
      edgeTotalDepositsAtNowByProductUsd,
    };
  }, [allEdgeSpotProductsData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingAllEdgeSpotProductsData,
  };
}
