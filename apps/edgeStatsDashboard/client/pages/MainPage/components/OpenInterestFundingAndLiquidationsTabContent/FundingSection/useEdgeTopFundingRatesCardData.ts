import { useMemo } from 'react';
import { get, sortBy } from 'lodash';
import { BigDecimals } from '@vertex-protocol/client';
import { getMarketName } from 'client/utils/getMarketName';
import { useQueryAllMarkets24hFundingRates } from 'client/hooks/query/useQueryAllMarkets24hFundingRates';
import { useAllEdgePerpMarkets } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/hooks/useAllEdgePerpMarkets';

export function useEdgeTopFundingRatesCardData() {
  const {
    data: allEdgePerpMarketsData,
    isLoading: isLoadingAllEdgePerpMarketsData,
  } = useAllEdgePerpMarkets();

  const {
    data: allMarketsFundingRatesData,
    isLoading: isLoadingAllMarketsFundingRatesData,
  } = useQueryAllMarkets24hFundingRates();

  const mappedData = useMemo(() => {
    if (!allEdgePerpMarketsData || !allMarketsFundingRatesData) {
      return;
    }

    const topFundingRates = sortBy(
      allEdgePerpMarketsData.map((market) => {
        const productFundingRate =
          get(allMarketsFundingRatesData, market.productId)?.fundingRate ??
          BigDecimals.ZERO;

        // Funding rates are daily. Multiply by 365 to get annualized rate.
        const productFundingRateFraction = productFundingRate
          .times(365)
          .toNumber();

        return {
          asset: getMarketName(market),
          rate: productFundingRateFraction,
        };
      }),
      // Sort by absolute rate in descending order.
      ({ rate }) => -Math.abs(rate),
    ).slice(0, 16); // We show only 16 in UI.

    return {
      topFundingRates,
    };
  }, [allEdgePerpMarketsData, allMarketsFundingRatesData]);

  return {
    data: mappedData,
    isLoading:
      isLoadingAllEdgePerpMarketsData || isLoadingAllMarketsFundingRatesData,
  };
}
