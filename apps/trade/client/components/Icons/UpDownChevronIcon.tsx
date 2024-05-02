import { WithClassnames } from '@vertex-protocol/web-common';
import { Icons, IconBaseProps } from '@vertex-protocol/web-ui';

interface Props extends IconBaseProps {
  open: boolean;
}

export function UpDownChevronIcon({
  open,
  ...iconProps
}: WithClassnames<Props>) {
  const Icon = open ? Icons.FiChevronUp : Icons.FiChevronDown;

  return <Icon {...iconProps} />;
}
