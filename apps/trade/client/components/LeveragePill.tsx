import { WithChildren } from '@vertex-protocol/web-common';
import { GradientPill, Icons } from '@vertex-protocol/web-ui';

export function LeveragePill({ children }: WithChildren) {
  return (
    <GradientPill colorVariant="warning" icon={Icons.FireFill}>
      {children}
    </GradientPill>
  );
}
