import { useEdgeMarketSnapshots } from '@vertex-protocol/react-client';
import { StatsChartDataItem } from 'client/components/charts/StatsChart/types';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { ProductSelectValue } from 'client/pages/MainPage/components/common/ProductsSelect/useProductsSelect';
import { calcAnnualizedInterestRate } from '@vertex-protocol/react-client';
import { get } from 'lodash';
import { useMemo } from 'react';

interface Params {
  selectedProduct: ProductSelectValue | undefined;
}

export function useHistoricalProductBorrowAprChartData({
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

    const borrowAprs: StatsChartDataItem<'borrowAprFraction'>[] = [];

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

        const borrowAprFraction = calcAnnualizedInterestRate(
          get(
            currentSnapshot.borrowRates,
            selectedProduct.productId,
            undefined,
          ),
        )?.toNumber();

        borrowAprs.push({
          data: {
            borrowAprFraction,
          },
          currentTimestampMillis,
          earlierTimestampMillis,
        });
      },
    );

    return {
      borrowAprs,
    };
  }, [edgeMarketSnapshotsData, granularity, selectedProduct]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
