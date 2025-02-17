import { FundingSection } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/FundingSection/FundingSection';
import { LiquidationsSection } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/LiquidationsSection/LiquidationsSection';
import { OpenInterestSection } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/OpenInterestSection/OpenInterestSection';

export function OpenInterestFundingAndLiquidationsTabContent() {
  return (
    <>
      <OpenInterestSection />
      <FundingSection />
      <LiquidationsSection />
    </>
  );
}
