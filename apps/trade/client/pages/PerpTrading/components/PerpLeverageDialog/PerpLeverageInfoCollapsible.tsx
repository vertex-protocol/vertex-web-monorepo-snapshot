import { DialogInfoCollapsible } from 'client/components/DialogInfoCollapsible';
import { DiscList } from '@vertex-protocol/web-ui';

export function PerpLeverageInfoCollapsible() {
  const collapsibleContent = (
    <DiscList.Container>
      <DiscList.Item>
        Your account is cross-margin. This means your margin is shared across
        your balances and open positions.
      </DiscList.Item>
      <DiscList.Item>
        Leverage adjustment has no effect on the margin consumed by your
        position.
      </DiscList.Item>
      <DiscList.Item>
        Leverage adjustment is a trade sizing tool that scales your max order
        size for the current order.
      </DiscList.Item>
    </DiscList.Container>
  );

  return (
    <DialogInfoCollapsible
      title="More Info"
      collapsibleContent={collapsibleContent}
    />
  );
}
