import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { AppSubaccount } from 'client/context/subaccount/types';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountIndexerSnapshots } from 'client/hooks/query/subaccount/useSubaccountIndexerSnapshots';
import { calcDecimalAdjustedUsdValue } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartData/calcDecimalAdjustedUsdValue';
import {
  PortfolioChartDataItem,
  PortfolioChartTimespan,
} from 'client/pages/Portfolio/charts/types';
import { QueryState } from 'client/types/QueryState';
import { calcDecimalAdjustedDeltasUsd } from 'client/utils/calcs/calcDecimalAdjustedDeltasUsd';
import { REACT_QUERY_CONFIG } from '@vertex-protocol/react-client';
import { secondsToMilliseconds } from 'date-fns';
import { usePortfolioChartQueryTimes } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartData/usePortfolioChartQueryTimes';
import { getSubaccountMetricsFromIndexerSnapshot } from 'client/utils/calcs/subaccount/getSubaccountMetricsFromIndexerSnapshot';

function portfolioChartDataQueryKey(
  subaccount: AppSubaccount,
  timespan?: PortfolioChartTimespan,
) {
  return createQueryKey('portfolioChartData', subaccount, timespan);
}

export function usePortfolioChartData(
  timespan: PortfolioChartTimespan,
): QueryState<PortfolioChartDataItem[]> {
  const { currentSubaccount } = useSubaccountContext();
  const queryTimes = usePortfolioChartQueryTimes(timespan);
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { data: indexerSummaries, ...rest } = useSubaccountIndexerSnapshots({
    secondsBeforeNow: queryTimes?.secondsBeforeNow,
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
            totalLpValueUsd: 0,
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
        } = calcDecimalAdjustedDeltasUsd(
          metrics.cumulativeAccountPnl,
          prevMetrics.cumulativeAccountPnl,
          primaryQuotePriceUsd,
        );

        // Perpetual Deltas
        const {
          deltaUsd: cumulativeTotalPerpPnlDeltaUsd,
          deltaFraction: cumulativeTotalPerpPnlDeltaFrac,
        } = calcDecimalAdjustedDeltasUsd(
          metrics.cumulativeTotalPerpPnl,
          prevMetrics.cumulativeTotalPerpPnl,
          primaryQuotePriceUsd,
        );

        const {
          deltaUsd: cumulativePerpFundingDeltaUsd,
          deltaFraction: cumulativePerpFundingDeltaFrac,
        } = calcDecimalAdjustedDeltasUsd(
          metrics.cumulativePerpFunding,
          prevMetrics.cumulativePerpFunding,
          primaryQuotePriceUsd,
        );

        return {
          cumulativeAccountPnlUsd: cumulativeAccountPnlDeltaUsd,
          cumulativeAccountPnlFrac: cumulativeAccountPnlDeltaFrac,
          cumulativeTotalPerpPnlUsd: cumulativeTotalPerpPnlDeltaUsd,
          cumulativeTotalPerpPnlFrac: cumulativeTotalPerpPnlDeltaFrac,
          cumulativePerpFundingUsd: cumulativePerpFundingDeltaUsd,
          cumulativePerpFundingFrac: cumulativePerpFundingDeltaFrac,
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
