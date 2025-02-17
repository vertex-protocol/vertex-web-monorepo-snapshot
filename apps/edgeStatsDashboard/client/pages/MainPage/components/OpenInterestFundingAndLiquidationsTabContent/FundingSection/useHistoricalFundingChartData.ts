import { BigDecimals } from '@vertex-protocol/client';
import { StatsChartDataItem } from 'client/components/charts/StatsChart/types';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeMarketSnapshots } from 'client/hooks/useEdgeMarketSnapshots';
import { ProductSelectValue } from 'client/pages/MainPage/components/common/ProductsSelect/useProductsSelect';
import { get } from 'lodash';
import { useMemo } from 'react';

interface Params {
  selectedProduct: ProductSelectValue | undefined;
}

export function useHistoricalFundingChartData({ selectedProduct }: Params) {
  const { granularity, queryLimit } = useChartTimeframe();

  const {
    data: edgeMarketSnapshotsData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  } = useEdgeMarketSnapshots({
    granularity,
    limit: queryLimit,
  });

  const mappedData = useMemo(() => {
    if (!edgeMarketSnapshotsData || !selectedProduct) {
      return;
    }

    const fundingRates: StatsChartDataItem<'fundingRate'>[] = [];

    edgeMarketSnapshotsData.edge.forEach((currentSnapshot) => {
      // If there is no data at current snapshots we skip.
      if (!currentSnapshot) {
        return;
      }

      const currentTimestampMillis = currentSnapshot.timestamp
        .times(1000)
        .toNumber();

      const earlierTimestampMillis = currentSnapshot.timestamp
        .minus(granularity)
        .times(1000)
        .toNumber();

      // Funding rates are hourly. Multiply by 24 * 365 to get annualized rate.
      const productFundingRateFraction = get(
        currentSnapshot.fundingRates,
        selectedProduct.productId,
        BigDecimals.ZERO,
      )
        .times(24)
        .times(365);

      fundingRates.push({
        data: {
          fundingRate: productFundingRateFraction.toNumber(),
        },
        currentTimestampMillis,
        earlierTimestampMillis,
      });
    });

    return {
      fundingRates,
    };
  }, [edgeMarketSnapshotsData, granularity, selectedProduct]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
