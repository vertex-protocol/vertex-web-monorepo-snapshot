import { Divider } from '@vertex-protocol/web-ui';

export function FadingDivider() {
  return (
    <Divider className="to-background via-background/50 from-overlay-divider/10 bg-gradient-to-r" />
  );
}
