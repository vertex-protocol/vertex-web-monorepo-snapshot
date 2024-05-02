import { WithClassnames } from '@vertex-protocol/web-common';
import { Icons } from 'client/components/Icons/icons';
import { IconBaseProps } from 'react-icons';

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
