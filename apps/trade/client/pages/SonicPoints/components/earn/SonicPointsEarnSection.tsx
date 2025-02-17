import { SonicPointsEarnDepositCard } from 'client/pages/SonicPoints/components/earn/SonicPointsEarnDepositCard/SonicPointsEarnDepositCard';
import { SonicPointsEarnReferralsCard } from 'client/pages/SonicPoints/components/earn/SonicPointsEarnReferralsCard/SonicPointsEarnReferralsCard';
import { SonicPointsEarnTradeCard } from 'client/pages/SonicPoints/components/earn/SonicPointsEarnTradeCard/SonicPointsEarnTradeCard';
import { SonicPointsSectionHeader } from 'client/pages/SonicPoints/components/SonicPointsSectionHeader';

export function SonicPointsEarnSection() {
  return (
    <>
      <SonicPointsSectionHeader title="How to Earn Credits" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SonicPointsEarnTradeCard />
        <SonicPointsEarnDepositCard />
        <SonicPointsEarnReferralsCard className="sm:col-span-2" />
      </div>
    </>
  );
}
