import { useMemo } from 'react';
import { useEVMContext } from '@vertex-protocol/react-client';
import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';
import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { getVolumesInPrimaryQuoteByProductId } from 'client/utils/getVolumesInPrimaryQuoteByProductId';

export function useVolumeByChainEnvCardsSectionData() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { data: allEdgeMarketsData, isLoading: isLoadingAllEdgeMarketsData } =
    useQueryAllEdgeMarkets();
  const { supportedChainEnvs } = useEVMContext();
  const {
    data: marketSnapshotsAtHistoricalTimesData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  } = useEdgeMarketSnapshotsAtHistoricalTimes();

  const mappedData = useMemo(() => {
    return supportedChainEnvs.map((chainEnv) => {
      const edgeMarketSnapshotAtNow =
        marketSnapshotsAtHistoricalTimesData?.now[chainEnv];
      const edgeMarketSnapshotAt24h =
        marketSnapshotsAtHistoricalTimesData?.['24hr'][chainEnv];

      const cumulativeVolumesAtNowInPrimaryQuote =
        getVolumesInPrimaryQuoteByProductId(
          edgeMarketSnapshotAtNow?.cumulativeVolumes,
          allEdgeMarketsData,
        );

      const cumulativeVolumesAt24hInPrimaryQuote =
        getVolumesInPrimaryQuoteByProductId(
          edgeMarketSnapshotAt24h?.cumulativeVolumes,
          allEdgeMarketsData,
        );

      const totalVolume24hUsd = calcTotalDecimalAdjustedDeltasUsd(
        cumulativeVolumesAtNowInPrimaryQuote,
        cumulativeVolumesAt24hInPrimaryQuote,
        primaryQuotePriceUsd,
      );

      const totalVolumeAllTimeUsd = calcTotalDecimalAdjustedValueUsd(
        cumulativeVolumesAtNowInPrimaryQuote,
        primaryQuotePriceUsd,
      );

      return {
        chainEnv,
        totalVolume24hUsd,
        totalVolumeAllTimeUsd,
      };
    });
  }, [
    allEdgeMarketsData,
    marketSnapshotsAtHistoricalTimesData,
    primaryQuotePriceUsd,
    supportedChainEnvs,
  ]);

  return {
    data: mappedData,
    isLoading:
      isLoadingMarketSnapshotsAtHistoricalTimesData ||
      isLoadingAllEdgeMarketsData,
  };
}
