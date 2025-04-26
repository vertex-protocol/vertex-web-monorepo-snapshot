import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { useAllMarkets24hFundingRates } from 'client/hooks/query/markets/useAllMarkets24hFundingRates';
import { sortAndTrim } from 'client/pages/Markets/utils/sortAndTrim';
import { getFundingRates } from 'client/utils/calcs/perp/funding';
import { useMemo } from 'react';

/**
 * The top 6 annualized daily funding rates in descending order
 */
export function useMarketsTopPredictedFunding() {
  const { data: allMarkets, isLoading: isLoadingAllMarkets } = useAllMarkets();
  const { data: marketsFundingRates, isLoading: isLoadingMarketsFundingRates } =
    useAllMarkets24hFundingRates();
  const { getIsHiddenMarket } = useVertexMetadataContext();

  const topPredictedFundingRates = useMemo(() => {
    if (!allMarkets?.perpMarkets || !marketsFundingRates) {
      return;
    }

    const mappedMarkets = Object.values(allMarkets?.perpMarkets)
      .filter(
        (market) =>
          !getIsHiddenMarket(market.productId) &&
          marketsFundingRates[market.productId],
      )
      .map((market) => {
        const productId = market.productId;
        const dailyFundingRate = marketsFundingRates[productId].fundingRate;

        return {
          metadata: market.metadata,
          productId: productId,
          annualizedFundingRate: getFundingRates(dailyFundingRate)['1y'],
        };
      });

    return sortAndTrim(mappedMarkets, 'annualizedFundingRate', {
      isAbsolute: true,
    });
  }, [getIsHiddenMarket, marketsFundingRates, allMarkets?.perpMarkets]);

  return {
    topPredictedFundingRates,
    isLoading: isLoadingAllMarkets || isLoadingMarketsFundingRates,
  };
}
