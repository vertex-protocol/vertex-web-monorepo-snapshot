import { portfolioChartTimespanAtom } from 'client/store/portfolioStore';
import { useAtom } from 'jotai';
import { getTimespanAxisFormatter } from '../utils/getTimespanAxisFormatter';

export function usePortfolioChartXAxisFormatter() {
  const [timespan] = useAtom(portfolioChartTimespanAtom);
  return getTimespanAxisFormatter(timespan);
}
