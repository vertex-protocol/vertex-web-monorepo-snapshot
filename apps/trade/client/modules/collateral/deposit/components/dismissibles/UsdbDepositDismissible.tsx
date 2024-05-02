import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { DepositInfoCardType } from '../../types';

export function UsdbDepositDismissible({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  if (displayedInfoCardType !== 'usdb') {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="usdb_rebase_yield"
      title="USDB Rebase Yield"
      description="USDB native rebasing yields are not currently included in interest payments. Yields will be added soon."
    />
  );
}
