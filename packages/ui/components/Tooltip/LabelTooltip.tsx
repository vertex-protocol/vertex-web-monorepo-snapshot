import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { Tooltip, TooltipProps } from './Tooltip';

interface Props
  extends WithChildren<
    Pick<TooltipProps, 'asChild' | 'noHelpCursor' | 'tooltipOptions'>
  > {
  label: ReactNode;
}

export function LabelTooltip({
  label,
  children,
  asChild,
  noHelpCursor,
  tooltipOptions,
}: Props) {
  return (
    <Tooltip
      tooltipContent={label}
      hideArrow
      tooltipOptions={{ placement: 'bottom', ...tooltipOptions }}
      tooltipContainerClassName={joinClassNames(
        'max-w-72',
        'bg-surface-3 text-text-primary px-2 py-1 text-xs',
      )}
      asChild={asChild}
      noHelpCursor={noHelpCursor}
    >
      {children}
    </Tooltip>
  );
}
