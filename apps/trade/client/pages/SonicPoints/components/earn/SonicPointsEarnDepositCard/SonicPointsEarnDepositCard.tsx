import { SonicPointsCard } from 'client/pages/SonicPoints/components/SonicPointsCard';
import { SonicPointsEarnDepositCardButton } from 'client/pages/SonicPoints/components/earn/SonicPointsEarnDepositCard/SonicPointsEarnDepositCardButton';

export function SonicPointsEarnDepositCard() {
  return (
    <SonicPointsCard titleContent="Deposit / TVL" contentClassName="gap-y-4">
      <p>
        Earn credits passively based on your{' '}
        <span className="text-text-secondary">account value.</span>
      </p>
      <SonicPointsEarnDepositCardButton className="mt-auto" />
    </SonicPointsCard>
  );
}
