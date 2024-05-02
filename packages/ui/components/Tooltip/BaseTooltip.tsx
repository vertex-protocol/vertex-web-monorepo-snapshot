import { mergeClassNames, WithChildren } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import styles from './BaseTooltip.module.css';
import { TooltipPortal } from './TooltipPortal';

export interface BaseTooltipProps extends WithChildren {
  tooltipContent: ReactNode;
  hideArrow?: boolean;
  tooltipContainerClassName?: string;
  contentWrapperClassName?: string;
  portal?: boolean;
  popperTooltipProps: ReturnType<typeof usePopperTooltip>;
}

export function BaseTooltip({
  children,
  tooltipContent,
  tooltipContainerClassName,
  contentWrapperClassName,
  hideArrow,
  portal,
  popperTooltipProps,
}: BaseTooltipProps) {
  const {
    visible,
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
  } = popperTooltipProps;

  const tooltip = (() => {
    if (!visible) return null;

    return (
      <div
        {...getTooltipProps({
          className: mergeClassNames(
            'text-text-tertiary z-50 shadow-elevation rounded',
            styles['tooltip-container'],
            tooltipContainerClassName,
          ),
        })}
        ref={setTooltipRef}
      >
        {tooltipContent}
        <div
          {...getArrowProps()}
          className={hideArrow ? 'hidden' : styles['tooltip-arrow']}
        />
      </div>
    );
  })();

  return (
    <>
      {portal ? <TooltipPortal>{tooltip}</TooltipPortal> : tooltip}
      <div
        ref={setTriggerRef}
        className={mergeClassNames('cursor-help', contentWrapperClassName)}
      >
        {children}
      </div>
    </>
  );
}
