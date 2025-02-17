import { StatsSection } from 'client/components/StatsSection';
import { HistoricalProductBorrowAprChart } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/HistoricalProductBorrowAprChart';
import { HistoricalProductDepositAprChart } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/HistoricalProductDepositAprChart';

export function BorrowDepositAprChartsSection() {
  return (
    <StatsSection className="sm:grid-cols-2">
      <HistoricalProductDepositAprChart />
      <HistoricalProductBorrowAprChart />
    </StatsSection>
  );
}
