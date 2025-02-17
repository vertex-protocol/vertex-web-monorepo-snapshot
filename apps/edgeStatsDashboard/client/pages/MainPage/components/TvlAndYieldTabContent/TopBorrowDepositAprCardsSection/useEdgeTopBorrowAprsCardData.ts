import { useMemo } from 'react';
import { sortBy } from 'lodash';
import {
  calcBorrowRateForTimeRange,
  TimeInSeconds,
} from '@vertex-protocol/client';
import { useQueryEdgeMinDepositRates } from 'client/hooks/query/useQueryEdgeMinDepositRates';
import { getSpotMarketTokenName } from 'client/utils/getSpotMarketTokenName';
import { useAllEdgeSpotMarkets } from 'client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotMarkets';

export function useEdgeTopBorrowAprsCardData() {
  const {
    data: allEdgeSpotMarketsData,
    isLoading: iseLoadingAllEdgeSpotMarketsData,
  } = useAllEdgeSpotMarkets();

  const { data: edgeMinDepositRatesData } = useQueryEdgeMinDepositRates();

  const mappedData = useMemo(() => {
    if (!allEdgeSpotMarketsData) {
      return;
    }

    const topBorrowAprs = sortBy(
      allEdgeSpotMarketsData.map((market) => {
        const minDepositRate =
          edgeMinDepositRatesData?.[market.chainEnv]?.[market.productId];

        return {
          asset: getSpotMarketTokenName(market),
          rate: calcBorrowRateForTimeRange(
            market.product,
            TimeInSeconds.YEAR,
            minDepositRate ?? 0,
          ),
        };
      }),
      // Sort rates in descending order.
      ({ rate }) => -rate,
    ).slice(0, 16); // We show only 16 in UI.

    return {
      topBorrowAprs,
    };
  }, [allEdgeSpotMarketsData, edgeMinDepositRatesData]);

  return {
    data: mappedData,
    isLoading: iseLoadingAllEdgeSpotMarketsData,
  };
}
