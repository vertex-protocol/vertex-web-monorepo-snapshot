import { WithClassnames } from '@vertex-protocol/web-common';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';

export function SpotLeverageOffDismissible({ className }: WithClassnames) {
  return (
    <UserDisclosureDismissibleCard
      className={className}
      disclosureKey="spot_leverage_off_orders"
      title="Turning Margin OFF"
      description="Turning margin OFF does not cancel existing open orders."
    />
  );
}
