import { WithClassnames } from '@vertex-protocol/web-common';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';

export function BorrowingFundsDismissible({
  className,
  enableBorrows,
}: WithClassnames<{ enableBorrows: boolean }>) {
  if (!enableBorrows) return null;
  return (
    <UserDisclosureDismissibleCard
      disclosureKey="borrow_risk_warning"
      title="Withdrawing Borrowed Funds"
      className={className}
      description="You can borrow assets against your existing collateral. Borrowing increases your margin usage and account risk."
    />
  );
}
