import { ReactNode } from 'react';
import { Tooltip, TooltipProps } from './Tooltip';

export interface BaseDefinitionTooltipProps
  extends Omit<TooltipProps, 'tooltipContent'> {
  title: ReactNode;
  content: ReactNode;
}

// Tooltip with standard title & description content
export function BaseDefinitionTooltip({
  title,
  content,
  tooltipOptions,
  children,
  ...rest
}: BaseDefinitionTooltipProps) {
  const tooltipContent = (
    <div className="flex max-w-[270px] flex-col gap-y-1.5 overflow-hidden p-2 pt-2.5 text-left">
      {title && (
        <div className="text-text-primary text-sm font-medium">{title}</div>
      )}
      <div className="text-text-secondary flex flex-col gap-y-2 whitespace-pre-wrap text-xs">
        {content}
      </div>
    </div>
  );
  return (
    <Tooltip
      tooltipContent={tooltipContent}
      tooltipOptions={{
        placement: 'auto-start',
        ...tooltipOptions,
      }}
      {...rest}
    >
      {children}
    </Tooltip>
  );
}
