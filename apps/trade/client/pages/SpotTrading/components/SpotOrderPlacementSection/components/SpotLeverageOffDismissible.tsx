import { WithClassnames } from '@vertex-protocol/web-common';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';

export function SpotLeverageOffDismissible({ className }: WithClassnames) {
  return (
    <UserDisclosureDismissibleCard
      className={className}
      disclosureKey="spot_leverage_off_orders"
      title="Switching Leverage OFF"
      description="Switching leverage OFF does not cancel existing open orders."
    />
  );
}
