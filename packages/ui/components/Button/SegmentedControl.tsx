import { mergeClassNames } from '@vertex-protocol/web-common';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { Button } from './Button';
import { TabButtonProps } from './TabButton';
import {
  STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME,
  STANDARD_BUTTON_TEXT_SIZE_CLASSNAME,
  STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME,
} from './consts';

export type SegmentControlButtonProps = TabButtonProps;

const SegmentedControlButton = forwardRef<
  HTMLButtonElement,
  SegmentControlButtonProps
>(function SegmentedControlButton(
  { className, size = 'lg', active, disabled, ...rest },
  ref,
) {
  const stateClassNames = (() => {
    if (active) {
      return 'ring-1 ring-inset ring-stroke bg-surface-2 text-text-primary';
    }
    if (disabled) {
      return 'text-disabled';
    }
    return 'text-text-tertiary hover:text-text-secondary';
  })();

  return (
    <Button
      className={mergeClassNames(
        'whitespace-nowrap rounded',
        STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME[size],
        STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME[size],
        STANDARD_BUTTON_TEXT_SIZE_CLASSNAME[size],
        stateClassNames,
        className,
      )}
      disabled={disabled}
      ref={ref}
      {...rest}
    />
  );
});

const SegmentedControlContainer = forwardRef<
  HTMLDivElement,
  ComponentPropsWithRef<'div'>
>(function SegmentedControlContainer({ children, className, ...rest }, ref) {
  return (
    <div
      className={mergeClassNames(
        'bg-surface-1 flex items-center rounded',
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

export const SegmentedControl = {
  Button: SegmentedControlButton,
  Container: SegmentedControlContainer,
};
