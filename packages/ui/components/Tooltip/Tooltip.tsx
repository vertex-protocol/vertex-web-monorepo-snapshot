import { WithChildren } from '@vertex-protocol/web-common';
import { BaseTooltip, BaseTooltipProps } from './BaseTooltip';
import { Config, usePopperTooltip } from 'react-popper-tooltip';

const DEFAULT_TOOLTIP_OPTIONS: Partial<Config> = {
  placement: 'auto',
  delayShow: 500,
  delayHide: 100,
  interactive: false,
  trigger: 'hover',
  offset: [0, 12],
  closeOnTriggerHidden: true,
  closeOnOutsideClick: true,
};

export interface TooltipProps
  extends WithChildren<Omit<BaseTooltipProps, 'popperTooltipProps'>> {
  /**
   * @see {@link https://github.com/mohsinulhaq/react-popper-tooltip} for more info
   */
  tooltipOptions?: Partial<Config>;
}
// Wraps the 'BaseTooltip' and calls usePopperTooltip internally
export function Tooltip({ children, tooltipOptions, ...rest }: TooltipProps) {
  const opts: Partial<Config> = {
    ...DEFAULT_TOOLTIP_OPTIONS,
    ...tooltipOptions,
  };
  const popperTooltipProps = usePopperTooltip(opts);

  return (
    <BaseTooltip popperTooltipProps={popperTooltipProps} {...rest}>
      {children}
    </BaseTooltip>
  );
}
