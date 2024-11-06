import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons, Pill } from '@vertex-protocol/web-ui';

interface Props {
  enabled: boolean;
}

export function OneClickTradingStatusPill({ enabled }: Props) {
  return (
    <Pill
      sizeVariant="xs"
      colorVariant="accent"
      className={joinClassNames(
        'leading-normal',
        enabled ? 'text-accent' : 'text-text-primary',
      )}
    >
      <Icons.LightningFill size={10} />
      {enabled ? 'ON' : 'OFF'}
    </Pill>
  );
}
