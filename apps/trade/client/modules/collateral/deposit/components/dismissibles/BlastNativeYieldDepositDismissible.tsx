import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { DepositInfoCardType } from 'client/modules/collateral/deposit/types';

export function BlastNativeYieldDepositDismissible({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  if (displayedInfoCardType !== 'blast_native_yield') {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="blast_native_yield_deposit_dialog"
      title="Blast Native Yield"
      description="USDB and wETH deposits automatically earn Blast’s auto-rebasing native yield."
    />
  );
}
