import { Slottable } from '@radix-ui/react-slot';
import { mergeClassNames, WithChildren } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import styles from './BaseTooltip.module.css';
import { TooltipPortal } from './TooltipPortal';
import { ConditionalAsChild } from '../ConditionalAsChild';
import { Z_INDEX } from '../../consts';

export interface BaseTooltipProps extends WithChildren {
  tooltipContent: ReactNode;
  hideArrow?: boolean;
  tooltipContainerClassName?: string;
  /**
   * Note, if `asChild` is `true`, this will be applied directly to the child.
   */
  contentWrapperClassName?: string;
  popperTooltipProps: ReturnType<typeof usePopperTooltip>;
  /**
   * This renders `children` directly instead of within a wrapper element.
   * Note, `children` should be a single React element and it should accept forwarded refs.
   */
  asChild?: boolean;
  /**
   * If `true`, `cursor-help` will NOT be passed to the rendered element.
   * Useful when `children` applies its own cursor style and you don't want it overridden.
   */
  noHelpCursor?: boolean;
  /**
   * In case `asChild` is `true`, the child node of this component needs to be a single
   * element that props can be passed to. So this dedicated prop should be used if you
   * want to render an icon after `children`.
   */
  endIcon?: ReactNode;
}

export function BaseTooltip({
  children,
  tooltipContent,
  tooltipContainerClassName,
  contentWrapperClassName,
  hideArrow,
  popperTooltipProps,
  asChild,
  noHelpCursor,
  endIcon,
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
      <TooltipPortal>
        <div
          {...getTooltipProps({
            className: mergeClassNames(
              'text-text-tertiary shadow-elevation rounded',
              // `z-index` should be >= to the dialog's so it's visible when used in a dialog.
              Z_INDEX.dialogContainer,
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
      </TooltipPortal>
    );
  })();

  return (
    <>
      {tooltip}
      <ConditionalAsChild
        asChild={asChild}
        fallback="div"
        ref={setTriggerRef}
        className={mergeClassNames(
          !noHelpCursor && 'cursor-help',
          contentWrapperClassName,
        )}
      >
        {/* `Slottable` tells Radix which element to pass props to. */}
        <Slottable>{children}</Slottable>
        {endIcon}
      </ConditionalAsChild>
    </>
  );
}
