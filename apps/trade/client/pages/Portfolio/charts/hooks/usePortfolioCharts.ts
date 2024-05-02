import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';

import { portfolioChartTimespanAtom } from 'client/store/portfolioStore';
import { useAtom } from 'jotai';
import { PortfolioChartTab } from '../types';
import { usePortfolioChartData } from './usePortfolioChartData/usePortfolioChartData';

export function usePortfolioCharts<TTabID extends string>(
  tabs: PortfolioChartTab<TTabID>[],
) {
  const [timespan, setTimespan] = useAtom(portfolioChartTimespanAtom);
  const { data: chartData, isLoading: isLoadingChartData } =
    usePortfolioChartData(timespan);

  const { selectedTabId, setSelectedUntypedTabId } = useTabs(tabs);
  const [areAccountValuesPrivate] = usePrivacySetting(
    'areAccountValuesPrivate',
  );

  return {
    timespan,
    setTimespan,
    chartData,
    isLoadingChartData,
    tabs,
    selectedTabId,
    setSelectedUntypedTabId,
    areAccountValuesPrivate,
  };
}
