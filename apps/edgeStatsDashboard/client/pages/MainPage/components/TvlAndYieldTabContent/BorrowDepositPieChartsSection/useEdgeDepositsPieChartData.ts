import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { useMemo } from 'react';
import { sumBy } from 'lodash';
import { useAllEdgeSpotMarkets } from 'client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotMarkets';
import { createPieChartDataForSpotProducts } from 'client/utils/createPieChartDataForSpotProducts';

export function useEdgeDepositsPieChartData() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const {
    data: allEdgeSpotMarketsData,
    isLoading: isLoadingAllEdgeSpotMarketsData,
  } = useAllEdgeSpotMarkets();

  const mappedData = useMemo(() => {
    if (!allEdgeSpotMarketsData) {
      return;
    }

    const edgeTotalDepositsAtNowByProductUsd =
      createPieChartDataForSpotProducts(allEdgeSpotMarketsData, (market) =>
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
  }, [allEdgeSpotMarketsData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingAllEdgeSpotMarketsData,
  };
}
