import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { useFocusWithin } from 'ahooks';
import { ReactNode } from 'react';
import { Config, usePopperTooltip } from 'react-popper-tooltip';
import { BaseTooltip } from './BaseTooltip';

interface Props extends WithChildren<WithClassnames> {
  errorContent: ReactNode;
  contentWrapperClassName?: string;
}

export function ErrorTooltip({
  errorContent,
  children,
  className,
  contentWrapperClassName,
}: Props) {
  const opts: Partial<Config> = {
    offset: [0, 12],
    delayShow: 500,
    delayHide: 100,
    placement: 'bottom-end',
  };
  const popperTooltipProps = usePopperTooltip(opts);
  const isFocusWithin = useFocusWithin(popperTooltipProps.triggerRef);
  const visible = isFocusWithin && !!errorContent;

  return (
    <BaseTooltip
      popperTooltipProps={{
        ...popperTooltipProps,
        visible,
      }}
      contentWrapperClassName={joinClassNames(
        'cursor-default',
        contentWrapperClassName,
      )}
      tooltipContainerClassName={joinClassNames(
        // Use max width to prevent wide tooltips on mobile.
        'text-text-primary px-2 py-1 text-xs max-w-64',
        className,
      )}
      tooltipContent={errorContent}
    >
      {children}
    </BaseTooltip>
  );
}
