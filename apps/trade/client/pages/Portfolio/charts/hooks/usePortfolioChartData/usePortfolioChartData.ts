import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { AppSubaccount } from 'client/context/subaccount/types';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountIndexerSnapshots } from 'client/hooks/query/subaccount/useSubaccountIndexerSnapshots';
import { useChartQueryTimes } from 'client/pages/Portfolio/charts/hooks/useChartQueryTimes';
import { calcDecimalAdjustedDeltas } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartData/calcDecimalAdjustedDeltas';
import { calcDecimalAdjustedUsdValue } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartData/calcDecimalAdjustedUsdValue';
import {
  ChartTimespan,
  PortfolioChartDataItem,
} from 'client/pages/Portfolio/charts/types';
import { QueryState } from 'client/types/QueryState';
import { getSubaccountMetricsFromIndexerSnapshot } from 'client/utils/calcs/getSubaccountMetricsFromIndexerSnapshot';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';
import { secondsToMilliseconds } from 'date-fns';

function portfolioChartDataQueryKey(
  subaccount: AppSubaccount,
  timespan?: ChartTimespan,
) {
  return createQueryKey('portfolioChartData', subaccount, timespan);
}

export function usePortfolioChartData(
  timespan: ChartTimespan,
): QueryState<PortfolioChartDataItem[]> {
  const { currentSubaccount } = useSubaccountContext();
  const queryTimes = useChartQueryTimes(timespan);
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { data: indexerSummaries, ...rest } = useSubaccountIndexerSnapshots({
    secondsBeforeNow: queryTimes?.secondsBeforeNow,
    // Longer refetch as we need quite a lot of data
    refetchInterval: 30000,
  });

  const disabled = !indexerSummaries;

  const queryFn = async (): Promise<PortfolioChartDataItem[]> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    return indexerSummaries.map((summary, index): PortfolioChartDataItem => {
      const metrics = getSubaccountMetricsFromIndexerSnapshot(summary);

      // Compute deltas to previous item
      const deltas: PortfolioChartDataItem['deltas'] = (() => {
        if (index === 0) {
          return {
            cumulativeAccountPnlUsd: 0,
            cumulativeTotalPerpPnlUsd: 0,
            cumulativePerpFundingUsd: 0,
            cumulativePerpFundingFrac: 0,
            cumulativeLpPnlUsd: 0,
            totalLpValueUsd: 0,
            cumulativeLpPnlFrac: undefined,
            cumulativeAccountPnlFrac: undefined,
            cumulativeTotalPerpPnlFrac: undefined,
          };
        }

        const prevSummary = indexerSummaries[index - 1];
        const prevMetrics =
          getSubaccountMetricsFromIndexerSnapshot(prevSummary);

        // Overview Deltas
        const {
          deltaUsd: cumulativeAccountPnlDeltaUsd,
          deltaFraction: cumulativeAccountPnlDeltaFrac,
        } = calcDecimalAdjustedDeltas(
          metrics.cumulativeAccountPnl,
          prevMetrics.cumulativeAccountPnl,
          primaryQuotePriceUsd,
        );

        // Perpetual Deltas
        const {
          deltaUsd: cumulativeTotalPerpPnlDeltaUsd,
          deltaFraction: cumulativeTotalPerpPnlDeltaFrac,
        } = calcDecimalAdjustedDeltas(
          metrics.cumulativeTotalPerpPnl,
          prevMetrics.cumulativeTotalPerpPnl,
          primaryQuotePriceUsd,
        );

        const {
          deltaUsd: cumulativePerpFundingDeltaUsd,
          deltaFraction: cumulativePerpFundingDeltaFrac,
        } = calcDecimalAdjustedDeltas(
          metrics.cumulativePerpFunding,
          prevMetrics.cumulativePerpFunding,
          primaryQuotePriceUsd,
        );

        // LP Deltas
        const {
          deltaUsd: cumulativeLpPnlDeltaUsd,
          deltaFraction: cumulativeLpPnlDeltaFrac,
        } = calcDecimalAdjustedDeltas(
          metrics.cumulativeTotalLpPnl,
          prevMetrics.cumulativeTotalLpPnl,
          primaryQuotePriceUsd,
        );

        return {
          cumulativeAccountPnlUsd: cumulativeAccountPnlDeltaUsd,
          cumulativeAccountPnlFrac: cumulativeAccountPnlDeltaFrac,
          cumulativeTotalPerpPnlUsd: cumulativeTotalPerpPnlDeltaUsd,
          cumulativeTotalPerpPnlFrac: cumulativeTotalPerpPnlDeltaFrac,
          cumulativePerpFundingUsd: cumulativePerpFundingDeltaUsd,
          cumulativePerpFundingFrac: cumulativePerpFundingDeltaFrac,
          cumulativeLpPnlUsd: cumulativeLpPnlDeltaUsd,
          cumulativeLpPnlFrac: cumulativeLpPnlDeltaFrac,
        };
      })();

      // Overview
      const portfolioValueUsd = calcDecimalAdjustedUsdValue(
        metrics.portfolioValue,
        primaryQuotePriceUsd,
      );

      const cumulativeAccountPnlUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativeAccountPnl,
        primaryQuotePriceUsd,
      );

      // Perpetuals
      const cumulativeTotalPerpPnlUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativeTotalPerpPnl,
        primaryQuotePriceUsd,
      );

      const cumulativePerpFundingUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativePerpFunding,
        primaryQuotePriceUsd,
      );

      // Spot Balances
      const cumulativeNetSpotInterestUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativeNetSpotInterestValue,
        primaryQuotePriceUsd,
      );

      const totalNetSpotValueUsd = calcDecimalAdjustedUsdValue(
        metrics.totalNetSpotValue,
        primaryQuotePriceUsd,
      );

      const totalDepositsValueUsd = calcDecimalAdjustedUsdValue(
        metrics.totalDepositsValue,
        primaryQuotePriceUsd,
      );

      const totalBorrowsValueUsd = calcDecimalAdjustedUsdValue(
        metrics.totalBorrowsValue,
        primaryQuotePriceUsd,
      );

      const cumulativeLpPnlUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativeTotalLpPnl,
        primaryQuotePriceUsd,
      );

      const totalLpValueUsd = calcDecimalAdjustedUsdValue(
        metrics.totalLpValue,
        primaryQuotePriceUsd,
      );

      return {
        timestampMillis: secondsToMilliseconds(summary.timestamp.toNumber()),
        portfolioValueUsd,
        cumulativeAccountPnlUsd,
        cumulativeAccountPnlFrac: metrics.cumulativeAccountPnlFrac?.toNumber(),
        cumulativeTotalPerpPnlUsd,
        cumulativeTotalPerpPnlFrac:
          metrics.cumulativeTotalPerpPnlFrac?.toNumber(),
        cumulativePerpFundingUsd,
        cumulativePerpFundingFrac:
          metrics.cumulativePerpFundingFrac?.toNumber(),
        cumulativeNetSpotInterestUsd,
        totalNetSpotValueUsd,
        totalDepositsValueUsd,
        totalAbsBorrowsValueUsd: Math.abs(totalBorrowsValueUsd),
        cumulativeLpPnlUsd,
        cumulativeLpPnlFrac: metrics.cumulativeTotalLpPnlFrac?.toNumber(),
        totalLpValueUsd,
        deltas,
      };
    });
  };

  const { data: portfolioChartData } = useQuery({
    queryKey: portfolioChartDataQueryKey(currentSubaccount, timespan),
    queryFn,
    enabled: !disabled,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
    staleTime: REACT_QUERY_CONFIG.computedQueryStaleTime,
  });

  return {
    data: portfolioChartData,
    ...rest,
  };
}
