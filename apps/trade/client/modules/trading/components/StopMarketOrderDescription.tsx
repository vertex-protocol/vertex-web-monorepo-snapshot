import { DiscList } from '@vertex-protocol/web-ui';

export function StopMarketOrderDescription() {
  return (
    <div className="text-text-secondary text-2xs flex flex-col gap-y-2">
      <div>
        A Stop Market Order lets you set a trigger price that, once reached,
        will execute a Market Order for the direction and size of your order.
      </div>
      <DiscList.Container>
        <DiscList.Item>
          Stop orders are NOT conditional / linked to a position
        </DiscList.Item>
        <DiscList.Item>
          The trigger is executed on the oracle price
        </DiscList.Item>
        <DiscList.Item>
          Stop orders are always executed in the direction that the price is
          moving
        </DiscList.Item>
        <DiscList.Item>
          Stop Market is{' '}
          <span className="text-text-primary">Fill-or-Kill (FoK)</span>, meaning
          that if the order: does not fill entirely, it will be killed (no
          partial fills)
        </DiscList.Item>
        <DiscList.Item>
          Stop market orders use the same slippage as market orders, which is
          configurable in the order placement console.
        </DiscList.Item>
      </DiscList.Container>
      <div className="text-text-primary">
        There are no guarantees on a successful stop order.
      </div>
      <div className="text-text-primary">
        Cancel unwanted orders as you close and open positions.
      </div>
    </div>
  );
}
