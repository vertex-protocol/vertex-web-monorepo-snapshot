import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { Tooltip } from './Tooltip';

interface Props extends WithChildren<WithClassnames> {
  label: string;
}

export function LabelTooltip({ label, children, className }: Props) {
  return (
    <Tooltip
      tooltipContent={label}
      hideArrow
      tooltipOptions={{ placement: 'bottom' }}
      tooltipContainerClassName="bg-surface-card text-text-primary px-2 py-1 text-xs"
      contentWrapperClassName={className}
    >
      {children}
    </Tooltip>
  );
}
