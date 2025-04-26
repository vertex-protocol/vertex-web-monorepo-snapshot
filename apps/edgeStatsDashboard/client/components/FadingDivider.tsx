import { Divider } from '@vertex-protocol/web-ui';

export function FadingDivider() {
  return (
    <Divider className="to-background via-background/50 from-overlay-divider bg-linear-to-r" />
  );
}
