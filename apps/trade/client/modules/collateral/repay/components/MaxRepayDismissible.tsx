import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';

export function MaxRepayDismissible() {
  return (
    <UserDisclosureDismissibleCard
      disclosureKey="max_repay_warning"
      title="Max Repay"
      description="This trade might execute at a better price than the one quoted, which could mean you receive a bit more of the asset you're repaying, resulting in a small positive balance."
    />
  );
}
