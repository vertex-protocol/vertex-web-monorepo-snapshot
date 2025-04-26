import { joinClassNames } from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
import orderbookAsksIcon from 'client/modules/trading/marketOrders/orderbook/assets/orderbook-asks-icon.svg';
import orderbookBidsAndAsksIcon from 'client/modules/trading/marketOrders/orderbook/assets/orderbook-bids-and-asks-icon.svg';
import orderbookBidsIcon from 'client/modules/trading/marketOrders/orderbook/assets/orderbook-bids-icon.svg';
import { OrderbookViewType } from 'client/modules/trading/marketOrders/orderbook/types';
import { orderbookViewTypeAtom } from 'client/store/trading/commonTradingStore';
import { useAtom } from 'jotai';
import Image from 'next/image';

export const ToggleViewButton = ({
  variant,
}: {
  variant: OrderbookViewType;
}) => {
  const [viewType, setViewType] = useAtom(orderbookViewTypeAtom);

  const iconSrcByViewType = (() => {
    switch (variant) {
      case 'bids_and_asks':
        return orderbookBidsAndAsksIcon;
      case 'only_asks':
        return orderbookAsksIcon;
      case 'only_bids':
        return orderbookBidsIcon;
    }
  })();

  return (
    <Button
      className={joinClassNames(
        'border-stroke bg-surface-card h-6 w-6 rounded-sm border',
        viewType === variant ? 'opacity-100' : 'opacity-30 hover:opacity-70',
      )}
      onClick={() => setViewType(variant)}
    >
      <Image src={iconSrcByViewType} className="h-auto w-6" alt={variant} />
    </Button>
  );
};
