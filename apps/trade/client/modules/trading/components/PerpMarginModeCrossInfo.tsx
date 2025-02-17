import { DiscList } from '@vertex-protocol/web-ui';

export function PerpMarginModeCrossInfo() {
  return (
    <DiscList.Container>
      <DiscList.Item>
        Margin is shared across positions &amp; balances.
      </DiscList.Item>
      <DiscList.Item>
        Adjust leverage to scale your max order size for the current order.
      </DiscList.Item>
      <DiscList.Item>
        Leverage adjustment has no effect on the margin consumed by your
        position.
      </DiscList.Item>
    </DiscList.Container>
  );
}
