import { useMemo } from 'react';
import { sortBy } from 'lodash';
import {
  calcRealizedDepositRateForTimeRange,
  TimeInSeconds,
} from '@vertex-protocol/client';
import { useQueryEdgeMinDepositRates } from 'client/hooks/query/useQueryEdgeMinDepositRates';
import { getSpotMarketTokenName } from 'client/utils/getSpotMarketTokenName';
import { useAllEdgeSpotMarkets } from 'client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotMarkets';

export function useEdgeTopDepositAprsCardData() {
  const {
    data: allEdgeSpotMarketsData,
    isLoading: isLoadingAllEdgeSpotMarketsData,
  } = useAllEdgeSpotMarkets();

  const { data: edgeMinDepositRatesData } = useQueryEdgeMinDepositRates();

  const mappedData = useMemo(() => {
    if (!allEdgeSpotMarketsData) {
      return;
    }

    const topDepositAprs = sortBy(
      allEdgeSpotMarketsData.map((market) => {
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
  }, [allEdgeSpotMarketsData, edgeMinDepositRatesData]);

  return {
    data: mappedData,
    isLoading: isLoadingAllEdgeSpotMarketsData,
  };
}
