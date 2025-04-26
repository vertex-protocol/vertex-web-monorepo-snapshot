import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountIndexerSnapshots } from 'client/hooks/query/subaccount/useSubaccountIndexerSnapshots';
import { useSubaccountInterestChartQueryTimes } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/hooks/useSubaccountInterestChartQueryTimes';
import {
  SubaccountInterestChartDataItem,
  SubaccountInterestChartTimespan,
} from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/types';
import { calcDecimalAdjustedUsdValue } from 'client/pages/Portfolio/charts/hooks/usePortfolioChartData/calcDecimalAdjustedUsdValue';
import { QueryState } from 'client/types/QueryState';
import { getSubaccountMetricsFromIndexerSnapshot } from 'client/utils/calcs/subaccount/getSubaccountMetricsFromIndexerSnapshot';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export function useSubaccountInterestChartData(
  timespan: SubaccountInterestChartTimespan,
): QueryState<SubaccountInterestChartDataItem[]> {
  const queryTimes = useSubaccountInterestChartQueryTimes(timespan);
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { data: indexerSummaries, ...rest } = useSubaccountIndexerSnapshots({
    secondsBeforeNow: queryTimes?.secondsBeforeNow,
  });

  const mappedData = useMemo(() => {
    if (!indexerSummaries) {
      return;
    }

    return indexerSummaries.map((summary): SubaccountInterestChartDataItem => {
      const metrics = getSubaccountMetricsFromIndexerSnapshot(summary);

      // Spot Balances
      const cumulativeNetSpotInterestUsd = calcDecimalAdjustedUsdValue(
        metrics.cumulativeNetSpotInterestValue,
        primaryQuotePriceUsd,
      );

      return {
        timestampMillis: secondsToMilliseconds(summary.timestamp.toNumber()),
        cumulativeNetSpotInterestUsd,
      };
    });
  }, [indexerSummaries, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    ...rest,
  };
}
