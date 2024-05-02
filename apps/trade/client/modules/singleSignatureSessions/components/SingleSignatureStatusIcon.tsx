import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';

interface Props {
  isSignOnce: boolean;
}

export function SingleSignatureStatusIcon({
  className,
  isSignOnce,
}: WithClassnames<Props>) {
  const iconClassNames = (() => {
    if (isSignOnce) {
      return 'text-accent';
    }
    return 'text-text-tertiary';
  })();

  return (
    <Icons.BsFillLightningChargeFill
      className={joinClassNames('text-xs', iconClassNames, className)}
    />
  );
}
