import { useQuery } from '@tanstack/react-query';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { useSubaccountIndexerSnapshots } from 'client/hooks/query/subaccount/useSubaccountIndexerSnapshots';
import { QueryState } from 'client/types/QueryState';
import { getSubaccountMetricsFromIndexerSnapshot } from 'client/utils/calcs/getSubaccountMetricsFromIndexerSnapshot';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';
import { ChartTimespan } from '../../types';
import { useChartQueryTimes } from '../useChartQueryTimes';
import { calcDecimalAdjustedDeltas } from './calcDecimalAdjustedDeltas';
import { calcDecimalAdjustedUsdValue } from './calcDecimalAdjustedUsdValue';
import { secondsToMilliseconds } from 'date-fns';

export interface PortfolioChartDataItem {
  timestampMillis: number;
  portfolioValueUsd: number;
  cumulativeAccountPnlUsd: number;
  cumulativeAccountPnlFrac: number | undefined;
  cumulativeTotalPerpPnlUsd: number;
  cumulativeTotalPerpPnlFrac: number | undefined;
  cumulativePerpFundingUsd: number;
  cumulativePerpFundingFrac: number;
  cumulativeNetSpotInterestUsd: number;
  totalNetSpotValueUsd: number;
  totalDepositsValueUsd: number;
  totalAbsBorrowsValueUsd: number;
  averageSpotApr: number;
  cumulativeLpPnlUsd: number;
  cumulativeLpPnlFrac: number | undefined;
  totalLpValueUsd: number;
  // Deltas to the PREVIOUS item
  deltas: {
    cumulativeAccountPnlUsd: number;
    cumulativeAccountPnlFrac: number | undefined;
    cumulativeTotalPerpPnlUsd: number;
    cumulativeTotalPerpPnlFrac: number | undefined;
    cumulativePerpFundingUsd: number;
    cumulativePerpFundingFrac: number;
    cumulativeNetSpotInterestUsd: number;
    cumulativeNetSpotInterestFrac: number;
    cumulativeLpPnlUsd: number;
    cumulativeLpPnlFrac: number | undefined;
  };
}

function portfolioChartDataQueryKey(
  chainId?: PrimaryChainID,
  timespan?: ChartTimespan,
  address?: string,
  name?: string,
) {
  return createQueryKey('portfolioChartData', chainId, timespan, address, name);
}

export function usePortfolioChartData(
  timespan: ChartTimespan,
): QueryState<PortfolioChartDataItem[]> {
  const primaryChainId = usePrimaryChainId();
  const {
    currentSubaccount: { address, name },
  } = useSubaccountContext();
  const queryTimes = useChartQueryTimes(timespan);
  const quotePrice = useQuotePriceUsd();
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
            cumulativeNetSpotInterestUsd: 0,
            cumulativeNetSpotInterestFrac: 0,
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
          quotePrice,
        );

        // Perpetual Deltas
        const {
          deltaUsd: cumulativeTotalPerpPnlDeltaUsd,
          deltaFraction: cumulativeTotalPerpPnlDeltaFrac,
        } = calcDecimalAdjustedDeltas(
          metrics.cumulativeTotalPerpPnl,
          prevMetrics.cumulativeTotalPerpPnl,
          quotePrice,
        );

        const {
          deltaUsd: cumulativePerpFundingDeltaUsd,
          deltaFraction: cumulativePerpFundingDeltaFrac,
        } = calcDecimalAdjustedDeltas(
          metrics.cumulativePerpFunding,
          prevMetrics.cumulativePerpFunding,
          quotePrice,
        );

        // Spot Deltas
        const {
          deltaUsd: cumulativeNetSpotInterestDeltaUsd,
          deltaFraction: cumulativeNetSpotInterestDeltaFrac,
        } = calcDecimalAdjustedDeltas(
          metrics.cumulativeNetSpotInterest,
          prevMetrics.cumulativeNetSpotInterest,
          quotePrice,
        );

        // LP Deltas
        const {
          deltaUsd: cumulativeLpPnlDeltaUsd,
          deltaFraction: cumulativeLpPnlDeltaFrac,
        } = calcDecimalAdjustedDeltas(
          metrics.cumulativeTotalLpPnl,
          prevMetrics.cumulativeTotalLpPnl,
          quotePrice,
        );

        return {
          cumulativeAccountPnlUsd: cumulativeAccountPnlDeltaUsd,
          cumulativeAccountPnlFrac: cumulativeAccountPnlDeltaFrac,
          cumulativeTotalPerpPnlUsd: cumulativeTotalPerpPnlDeltaUsd,
          cumulativeTotalPerpPnlFrac: cumulativeTotalPerpPnlDeltaFrac,
          cumulativePerpFundingUsd: cumulativePerpFundingDeltaUsd,
          cumulativePerpFundingFrac: cumulativePerpFundingDeltaFrac,
          cumulativeNetSpotInterestUsd: cumulativeNetSpotInterestDeltaUsd,
          cumulativeNetSpotInterestFrac: cumulativeNetSpotInterestDeltaFrac,
          cumulativeLpPnlUsd: cumulativeLpPnlDeltaUsd,
          cumulativeLpPnlFrac: cumulativeLpPnlDeltaFrac,
        };
      })();

      // Overview
      const portfolioValueUsd = calcDecimalAdjustedUsdValue(
        metrics.portfolioValue,
        quotePrice,
      );

      const cumulativeAccountPnlUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativeAccountPnl,
        quotePrice,
      );

      // Perpetuals
      const cumulativeTotalPerpPnlUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativeTotalPerpPnl,
        quotePrice,
      );

      const cumulativePerpFundingUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativePerpFunding,
        quotePrice,
      );

      // Spot Balances
      const cumulativeNetSpotInterestUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativeNetSpotInterest,
        quotePrice,
      );

      const totalNetSpotValueUsd = calcDecimalAdjustedUsdValue(
        metrics.totalNetSpotValue,
        quotePrice,
      );

      const totalDepositsValueUsd = calcDecimalAdjustedUsdValue(
        metrics.totalDepositsValue,
        quotePrice,
      );

      const totalBorrowsValueUsd = calcDecimalAdjustedUsdValue(
        metrics.totalBorrowsValue,
        quotePrice,
      );

      const cumulativeLpPnlUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativeTotalLpPnl,
        quotePrice,
      );

      const totalLpValueUsd = calcDecimalAdjustedUsdValue(
        metrics.totalLpValue,
        quotePrice,
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
        averageSpotApr: metrics.averageSpotApr.toNumber(),
        cumulativeLpPnlUsd,
        cumulativeLpPnlFrac: metrics.cumulativeTotalLpPnlFrac?.toNumber(),
        totalLpValueUsd,
        deltas,
      };
    });
  };

  const { data: portfolioChartData } = useQuery({
    queryKey: portfolioChartDataQueryKey(
      primaryChainId,
      timespan,
      address,
      name,
    ),
    queryFn,
    enabled: !disabled,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
  });

  return {
    data: portfolioChartData,
    ...rest,
  };
}
