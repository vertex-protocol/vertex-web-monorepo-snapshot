import { WithClassnames } from '@vertex-protocol/web-common';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';

export function RepayConvertDismissible({ className }: WithClassnames) {
  return (
    <UserDisclosureDismissibleCard
      className={className}
      disclosureKey="repay_convert_info"
      title="Convert Repay"
      description="Convert is a feature that lets you easily sell (convert) a positive balance to repay borrowed assets."
    />
  );
}
