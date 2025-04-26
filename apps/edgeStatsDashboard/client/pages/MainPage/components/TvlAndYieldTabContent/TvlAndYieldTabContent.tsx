import { BorrowDepositAprCardsSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprCardsSection/BorrowDepositAprCardsSection';
import { BorrowDepositAprChartsSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/BorrowDepositAprChartsSection';
import { BorrowDepositChartsSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositChartsSection/BorrowDepositChartsSection';
import { BorrowDepositPieChartsSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositPieChartsSection/BorrowDepositPieChartsSection';
import { TvlAndFlowsSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/TvlAndFlowsSection/TvlAndFlowsSection';

export function TvlAndYieldTabContent() {
  return (
    <>
      <TvlAndFlowsSection />
      <BorrowDepositPieChartsSection />
      <BorrowDepositChartsSection />
      <BorrowDepositAprCardsSection />
      <BorrowDepositAprChartsSection />
    </>
  );
}
