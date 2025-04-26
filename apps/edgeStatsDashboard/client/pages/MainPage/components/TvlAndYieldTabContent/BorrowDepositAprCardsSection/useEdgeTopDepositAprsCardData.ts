import {
  calcRealizedDepositRateForTimeRange,
  TimeInSeconds,
} from '@vertex-protocol/client';
import { useQueryEdgeMinDepositRates } from 'client/hooks/query/useQueryEdgeMinDepositRates';
import { useAllEdgeSpotProducts } from 'client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotProducts';
import { getSpotMarketTokenName } from 'client/utils/getSpotMarketTokenName';
import { sortBy } from 'lodash';
import { useMemo } from 'react';

export function useEdgeTopDepositAprsCardData() {
  const {
    data: allEdgeSpotProductsData,
    isLoading: isLoadingAllEdgeSpotProductsData,
  } = useAllEdgeSpotProducts();

  const { data: edgeMinDepositRatesData } = useQueryEdgeMinDepositRates();

  const mappedData = useMemo(() => {
    if (!allEdgeSpotProductsData) {
      return;
    }

    const topDepositAprs = sortBy(
      allEdgeSpotProductsData.map((market) => {
        const minDepositRate =
          edgeMinDepositRatesData?.[market.chainEnv]?.[market.productId];

        return {
          asset: getSpotMarketTokenName(market),
          rate: calcRealizedDepositRateForTimeRange(
            market.product,
            TimeInSeconds.YEAR,
            0.2,
            minDepositRate ?? 0,
          ),
        };
      }),
      // Sort rates in descending order.
      ({ rate }) => -rate,
    ).slice(0, 16); // We show only 16 in UI.

    return {
      topDepositAprs,
    };
  }, [allEdgeSpotProductsData, edgeMinDepositRatesData]);

  return {
    data: mappedData,
    isLoading: isLoadingAllEdgeSpotProductsData,
  };
}
