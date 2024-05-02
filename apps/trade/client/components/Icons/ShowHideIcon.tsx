import { WithClassnames } from '@vertex-protocol/web-common';
import { Icons, IconBaseProps } from '@vertex-protocol/web-ui';

interface Props extends IconBaseProps {
  isHidden: boolean;
}

export function ShowHideIcon({
  isHidden,
  ...iconProps
}: WithClassnames<Props>) {
  const Icon = isHidden ? Icons.FiEyeOff : Icons.FiEye;

  return <Icon {...iconProps} />;
}
