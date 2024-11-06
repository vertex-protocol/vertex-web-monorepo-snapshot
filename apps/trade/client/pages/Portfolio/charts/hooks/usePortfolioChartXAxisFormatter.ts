import { getTimespanAxisFormatter } from 'client/pages/Portfolio/charts/utils/getTimespanAxisFormatter';
import { portfolioChartTimespanAtom } from 'client/store/portfolioStore';
import { useAtom } from 'jotai';

export function usePortfolioChartXAxisFormatter() {
  const [timespan] = useAtom(portfolioChartTimespanAtom);
  return getTimespanAxisFormatter(timespan);
}
