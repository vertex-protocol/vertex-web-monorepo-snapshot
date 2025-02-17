import { BorrowDepositAprChartsSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/BorrowDepositAprChartsSection';
import { BorrowDepositChartsSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositChartsSection/BorrowDepositChartsSection';
import { BorrowDepositPieChartsSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositPieChartsSection/BorrowDepositPieChartsSection';
import { TopBorrowDepositAprCardsSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/TopBorrowDepositAprCardsSection/TopBorrowDepositAprCardsSection';
import { TvlAndFlowsSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/TvlAndFlowsSection/TvlAndFlowsSection';

export function TvlAndYieldTabContent() {
  return (
    <>
      <TvlAndFlowsSection />
      <BorrowDepositPieChartsSection />
      <BorrowDepositChartsSection />
      <TopBorrowDepositAprCardsSection />
      <BorrowDepositAprChartsSection />
    </>
  );
}
