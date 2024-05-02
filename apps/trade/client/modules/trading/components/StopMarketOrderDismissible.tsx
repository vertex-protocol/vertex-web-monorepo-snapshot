import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { StopMarketOrderDescription } from './StopMarketOrderDescription';

interface Props {
  isStopOrder: boolean;
}

export function StopMarketOrderDismissible({ isStopOrder }: Props) {
  if (!isStopOrder) {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="stop_market_order_on_risk"
      title="Stop Market Order"
      description={<StopMarketOrderDescription />}
      className="bg-surface-1"
    />
  );
}
