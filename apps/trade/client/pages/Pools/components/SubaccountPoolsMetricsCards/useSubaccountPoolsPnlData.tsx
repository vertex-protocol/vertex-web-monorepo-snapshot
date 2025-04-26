import { removeDecimals } from '@vertex-protocol/client';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountIndexerSnapshots } from 'client/hooks/query/subaccount/useSubaccountIndexerSnapshots';
import { calcDecimalAdjustedDeltasUsd } from 'client/utils/calcs/calcDecimalAdjustedDeltasUsd';
import { getSubaccountMetricsFromIndexerSnapshot } from 'client/utils/calcs/subaccount/getSubaccountMetricsFromIndexerSnapshot';
import { first, last } from 'lodash';
import { useMemo } from 'react';

export function useSubaccountPoolsPnlData(secondsBeforeNow: number[]) {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { data: indexerSummaries, ...rest } = useSubaccountIndexerSnapshots({
    secondsBeforeNow,
  });

  const mappedData = useMemo(() => {
    if (!indexerSummaries) {
      return;
    }

    const currentSummary = first(indexerSummaries);

    if (!currentSummary) {
      return;
    }

    const currentMetrics =
      getSubaccountMetricsFromIndexerSnapshot(currentSummary);

    const earlierSummary =
      indexerSummaries.length > 1 ? last(indexerSummaries) : undefined;

    // If "All Time" timeframe is selected, there is no earlierSummary, so use the cumulative total LP PnL instead.
    if (!earlierSummary) {
      return {
        cumulativeLpPnlDeltaUsd: removeDecimals(
          currentMetrics.cumulativeTotalLpPnl,
        ).times(primaryQuotePriceUsd),
      };
    }

    const earlierMetrics =
      getSubaccountMetricsFromIndexerSnapshot(earlierSummary);

    // LP Deltas
    const { deltaUsd: cumulativeLpPnlDeltaUsd } = calcDecimalAdjustedDeltasUsd(
      currentMetrics.cumulativeTotalLpPnl,
      earlierMetrics.cumulativeTotalLpPnl,
      primaryQuotePriceUsd,
    );

    return {
      cumulativeLpPnlDeltaUsd,
    };
  }, [indexerSummaries, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    ...rest,
  };
}
