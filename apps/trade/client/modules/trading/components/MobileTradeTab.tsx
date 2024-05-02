import { WithClassnames } from '@vertex-protocol/web-common';
import { MobileOrderbookPreview } from '../marketOrders/orderbook/MobileOrderbookPreview';

interface Props {
  productId: number | undefined;
  OrderPlacementSection: React.ElementType<WithClassnames>;
}

export function MobileTradeTab({ productId, OrderPlacementSection }: Props) {
  return (
    // Adding overflow-y-hidden and overflow-x-auto to allow horizontal scroll on really small mobile devices like Galaxy Fold.
    <div className="divide-overlay-divider/10 no-scrollbar flex divide-x overflow-x-auto overflow-y-hidden">
      <MobileOrderbookPreview
        // Specific width to prevent overflow of columns on a standard iphone but also to create enough space for order placement
        className="w-[130px] min-w-[130px]"
        productId={productId}
        depth={10}
      />
      <OrderPlacementSection className="flex-1" />
    </div>
  );
}
