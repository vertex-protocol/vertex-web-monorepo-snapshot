import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { LatestMarketTrades } from 'client/modules/trading/marketOrders/latestMarketTrades/LatestMarketTrades';
import { Orderbook } from 'client/modules/trading/marketOrders/orderbook/Orderbook';
import { marketTradesExpandedStateAtom } from 'client/store/trading/commonTradingStore';
import { useAtom } from 'jotai';
import { TradingSectionProps } from '../layout/types';
import { ExpandCollapseButtonGroup } from './orderbook/ExpandCollapseButtonGroup';

export function DesktopMarketActivity({
  className,
  productId,
}: WithClassnames<TradingSectionProps>) {
  const [marketTradesExpandedState] = useAtom(marketTradesExpandedStateAtom);

  const dualSidedDepth = {
    default: 9,
    full: 0,
    collapsed: 11,
  }[marketTradesExpandedState];

  const oneSidedDepth = {
    default: 50,
    full: 0,
    collapsed: 50,
  }[marketTradesExpandedState];

  const orderbookClassNames = (() => {
    // When expanded it takes full height.
    if (marketTradesExpandedState === 'collapsed') {
      return 'flex-1';
    }
    if (marketTradesExpandedState === 'full') {
      return 'hidden';
    }
    // Orderbook in default state is split 4.1:1 ratio of height.
    // When both the orderbook and market trades are open, prevent the orderbook from growing too much
    // which results in the height of each row being significantly larger than that of a market trade row
    return 'flex-[4.1] max-h-[500px]';
  })();

  return (
    <div
      className={joinClassNames(
        // This needs to be a "flex-col" otherwise `LatestMarketTrades` gets pushed out of frame when collapsed
        'divide-overlay-divider/5 flex h-full flex-col divide-y',
        className,
      )}
    >
      <ActivityHeading className="rounded-t-lg">Orderbook</ActivityHeading>
      <Orderbook
        dualSidedDepth={dualSidedDepth}
        oneSidedDepth={oneSidedDepth}
        productId={productId}
        className={joinClassNames(
          // "overflow-hidden" keeps latest trades in frame when collapsed
          'overflow-hidden',
          orderbookClassNames,
        )}
      />
      <ActivityHeading className="justify-between">
        Market Trades
        <ExpandCollapseButtonGroup />
      </ActivityHeading>
      <LatestMarketTrades
        productId={productId}
        className={joinClassNames(
          // "overflow-hidden" allows us to scroll this when not nested in the large screen layout.
          'overflow-hidden',
          marketTradesExpandedState === 'collapsed' ? 'hidden' : 'flex-1',
        )}
      />
    </div>
  );
}

function ActivityHeading({
  children,
  className,
}: WithClassnames<WithChildren>) {
  return (
    <div
      className={joinClassNames(
        'bg-surface-1 flex items-center p-3',
        'text-text-primary text-xs font-medium',
        className,
      )}
    >
      {children}
    </div>
  );
}
