import { WithClassnames } from '@vertex-protocol/web-common';

interface Props {
  OrderPlacementSection: React.ElementType<WithClassnames>;
}

export function MobileTradeTab({ OrderPlacementSection }: Props) {
  return <OrderPlacementSection />;
}
