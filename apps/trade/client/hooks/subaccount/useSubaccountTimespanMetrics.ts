import { removeDecimals } from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountIndexerSnapshots } from 'client/hooks/query/subaccount/useSubaccountIndexerSnapshots';
import { calcChangeFrac } from 'client/utils/calcs/calcChangeFrac';
import {
  getSubaccountMetricsFromIndexerSnapshot,
  IndexerSubaccountMetrics,
} from 'client/utils/calcs/getSubaccountMetricsFromIndexerSnapshot';
import { calcPnlFracForNonZeroDenom } from 'client/utils/calcs/pnlCalcs';
import { isFinite } from 'lodash';
import { useMemo } from 'react';

interface Metrics
  extends Pick<
    IndexerSubaccountMetrics,
    'cumulativeAccountPnlFrac' | 'cumulativeTotalPerpPnlFrac'
  > {
  cumulativeAccountPnlUsd: IndexerSubaccountMetrics['cumulativeAccountPnl'];
  cumulativeTotalPerpPnlUsd: IndexerSubaccountMetrics['cumulativeTotalPerpPnl'];
  portfolioValueUsd: IndexerSubaccountMetrics['portfolioValue'];
}

interface SubaccountTimespanMetrics {
  current: Metrics;
  deltas: Metrics;
  historical: Metrics | undefined;
}

// For all time pass nullish or Infinity for secondsBeforeNow.
export function useSubaccountTimespanMetrics(secondsBeforeNow?: number) {
  const multiQuerySecondsBeforeNow = useMemo(() => {
    if (!secondsBeforeNow || !isFinite(secondsBeforeNow)) {
      // Querying for all time, so we just need the latest snapshot
      return [0];
    }
    return [0, secondsBeforeNow];
  }, [secondsBeforeNow]);

  const { data: indexerSummaries, isLoading } = useSubaccountIndexerSnapshots({
    secondsBeforeNow: multiQuerySecondsBeforeNow,
  });

  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mappedData = useMemo((): SubaccountTimespanMetrics | undefined => {
    if (!indexerSummaries?.length) {
      return;
    }

    // Assume that if we have only one snapshot, then we're querying for all time
    // So we just return data from the latest snapshot
    const currentSummary = indexerSummaries[0];
    const historicalSummary = indexerSummaries[1];

    const currentSummaryMetrics =
      getSubaccountMetricsFromIndexerSnapshot(currentSummary);

    // Decimal Adjusted Values
    const currentAccountPnl = removeDecimals(
      currentSummaryMetrics.cumulativeAccountPnl,
    );
    const currentTotalPerpPnl = removeDecimals(
      currentSummaryMetrics.cumulativeTotalPerpPnl,
    );

    const currentMetrics: Metrics = {
      cumulativeAccountPnlUsd:
        currentAccountPnl.multipliedBy(primaryQuotePriceUsd),
      cumulativeAccountPnlFrac: currentSummaryMetrics.cumulativeAccountPnlFrac,
      cumulativeTotalPerpPnlUsd:
        currentTotalPerpPnl.multipliedBy(primaryQuotePriceUsd),
      cumulativeTotalPerpPnlFrac:
        currentSummaryMetrics.cumulativeTotalPerpPnlFrac,
      portfolioValueUsd: removeDecimals(
        currentSummaryMetrics.portfolioValue,
      ).multipliedBy(primaryQuotePriceUsd),
    };

    // Don't calculate difference if all time. Return from current one.
    if (!historicalSummary) {
      return {
        current: currentMetrics,
        deltas: currentMetrics,
        historical: undefined,
      };
    }

    const historicalSummaryMetrics =
      getSubaccountMetricsFromIndexerSnapshot(historicalSummary);

    // Decimal Adjusted Values
    const historicalAccountPnl = removeDecimals(
      historicalSummaryMetrics.cumulativeAccountPnl,
    );
    const historicalTotalPerpPnl = removeDecimals(
      historicalSummaryMetrics.cumulativeTotalPerpPnl,
    );

    const historicalMetrics: Metrics = {
      cumulativeAccountPnlUsd:
        historicalAccountPnl.multipliedBy(primaryQuotePriceUsd),
      cumulativeAccountPnlFrac:
        historicalSummaryMetrics.cumulativeAccountPnlFrac,
      cumulativeTotalPerpPnlUsd:
        historicalTotalPerpPnl.multipliedBy(primaryQuotePriceUsd),
      cumulativeTotalPerpPnlFrac:
        historicalSummaryMetrics.cumulativeTotalPerpPnlFrac,
      portfolioValueUsd: removeDecimals(
        historicalSummaryMetrics.portfolioValue,
      ).multipliedBy(primaryQuotePriceUsd),
    };

    const cumulativeAccountPnlDeltaUsd =
      currentMetrics.cumulativeAccountPnlUsd.minus(
        historicalMetrics.cumulativeAccountPnlUsd,
      );

    // Deltas
    const deltaMetrics: Metrics = {
      cumulativeAccountPnlUsd: cumulativeAccountPnlDeltaUsd,
      cumulativeAccountPnlFrac: calcPnlFracForNonZeroDenom(
        cumulativeAccountPnlDeltaUsd,
        currentMetrics.portfolioValueUsd,
        historicalMetrics.portfolioValueUsd,
      ),
      cumulativeTotalPerpPnlUsd: currentMetrics.cumulativeTotalPerpPnlUsd.minus(
        historicalMetrics.cumulativeTotalPerpPnlUsd,
      ),
      cumulativeTotalPerpPnlFrac: calcChangeFrac(
        currentTotalPerpPnl,
        historicalTotalPerpPnl,
      ),
      portfolioValueUsd: currentMetrics.portfolioValueUsd.minus(
        historicalMetrics.portfolioValueUsd,
      ),
    };

    return {
      current: currentMetrics,
      historical: historicalMetrics,
      deltas: deltaMetrics,
    };
  }, [indexerSummaries, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading,
  };
}
