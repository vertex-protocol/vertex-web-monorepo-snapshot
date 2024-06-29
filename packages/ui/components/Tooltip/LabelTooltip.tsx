import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { Tooltip } from './Tooltip';
import { BaseTooltipProps } from './BaseTooltip';

interface Props
  extends WithChildren<
    WithClassnames<Pick<BaseTooltipProps, 'asChild' | 'noHelpCursor'>>
  > {
  label: string;
}

export function LabelTooltip({
  label,
  children,
  className,
  asChild,
  noHelpCursor,
}: Props) {
  return (
    <Tooltip
      tooltipContent={label}
      hideArrow
      tooltipOptions={{ placement: 'bottom' }}
      tooltipContainerClassName="bg-surface-card text-text-primary px-2 py-1 text-xs"
      contentWrapperClassName={className}
      asChild={asChild}
      noHelpCursor={noHelpCursor}
    >
      {children}
    </Tooltip>
  );
}
