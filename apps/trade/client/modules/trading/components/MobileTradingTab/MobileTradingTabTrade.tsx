import { WithClassnames } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { ElementType } from 'react';

interface Props {
  OrderPlacementSection: ElementType<WithClassnames>;
}

export function MobileTradingTabTrade({ OrderPlacementSection }: Props) {
  return (
    <Card>
      <OrderPlacementSection />
    </Card>
  );
}
