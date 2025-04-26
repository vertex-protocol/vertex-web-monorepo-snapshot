import {
  calcBorrowRateForTimeRange,
  TimeInSeconds,
  VLP_PRODUCT_ID,
} from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useQueryEdgeMinDepositRates } from 'client/hooks/query/useQueryEdgeMinDepositRates';
import { useAllEdgeSpotProducts } from 'client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotProducts';
import { getSpotMarketTokenName } from 'client/utils/getSpotMarketTokenName';
import { sortBy } from 'lodash';
import { useMemo } from 'react';

export function useEdgeLowestBorrowAprsCardData() {
  const { protocolTokenMetadata } = useVertexMetadataContext();

  const {
    data: allEdgeSpotProductsData,
    isLoading: isLoadingAllEdgeSpotProductsData,
  } = useAllEdgeSpotProducts();

  const { data: edgeMinDepositRatesData } = useQueryEdgeMinDepositRates();

  const mappedData = useMemo(() => {
    if (!allEdgeSpotProductsData) {
      return;
    }

    const nonBorrowableProductIds = [
      protocolTokenMetadata.productId,
      VLP_PRODUCT_ID,
    ];

    const lowestBorrowAprs = sortBy(
      allEdgeSpotProductsData
        // Filter out products that are not eligible for borrowing
        .filter(({ productId }) => !nonBorrowableProductIds.includes(productId))
        .map((market) => {
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
      // Sort rates in ascending order.
      ({ rate }) => rate,
    ).slice(0, 16); // We show only 16 in UI.

    return {
      lowestBorrowAprs,
    };
  }, [
    allEdgeSpotProductsData,
    edgeMinDepositRatesData,
    protocolTokenMetadata.productId,
  ]);

  return {
    data: mappedData,
    isLoading: isLoadingAllEdgeSpotProductsData,
  };
}
