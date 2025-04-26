import { getPortfolioChartTimespanAxisFormatter } from 'client/pages/Portfolio/charts/utils/getPortfolioChartTimespanAxisFormatter';
import { portfolioChartTimespanAtom } from 'client/store/portfolioStore';
import { useAtom } from 'jotai';

export function usePortfolioChartXAxisFormatter() {
  const [timespan] = useAtom(portfolioChartTimespanAtom);

  return getPortfolioChartTimespanAxisFormatter(timespan);
}
