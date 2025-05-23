import {
  calcAnnualizedInterestRate,
  useEdgeMarketSnapshots,
} from '@vertex-protocol/react-client';
import { StatsChartDataItem } from 'client/components/charts/StatsChart/types';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { ProductSelectValue } from 'client/pages/MainPage/components/common/ProductsSelect/useProductsSelect';
import { get } from 'lodash';
import { useMemo } from 'react';

interface Params {
  selectedProduct: ProductSelectValue | undefined;
}

export function useHistoricalProductDepositAprChartData({
  selectedProduct,
}: Params) {
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

    const depositAprs: StatsChartDataItem<'depositAprFraction'>[] = [];

    edgeMarketSnapshotsData[selectedProduct.chainEnv].forEach(
      (currentSnapshot) => {
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

        const depositAprFraction = calcAnnualizedInterestRate(
          get(
            currentSnapshot.depositRates,
            selectedProduct.productId,
            undefined,
          ),
        )?.toNumber();

        depositAprs.push({
          data: {
            depositAprFraction,
          },
          currentTimestampMillis,
          earlierTimestampMillis,
        });
      },
    );

    return {
      depositAprs,
    };
  }, [edgeMarketSnapshotsData, granularity, selectedProduct]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
