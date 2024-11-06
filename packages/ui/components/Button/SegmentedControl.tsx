import { mergeClassNames } from '@vertex-protocol/web-common';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { Except } from 'type-fest';
import { SizeVariant } from '../../types';
import { Button } from './Button';
import {
  STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME,
  STANDARD_BUTTON_TEXT_SIZE_CLASSNAME,
  STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME,
} from './consts';
import { ButtonProps } from './types';

export type SegmentControlButtonProps = Except<ButtonProps, 'isLoading'> & {
  size?: SizeVariant;
  active?: boolean;
};

const SegmentedControlButton = forwardRef<
  HTMLButtonElement,
  SegmentControlButtonProps
>(function SegmentedControlButton(
  { className, size = 'base', active, ...rest },
  ref,
) {
  const stateClassNames = (() => {
    if (rest.disabled) {
      return 'text-disabled';
    }
    if (active) {
      return 'bg-surface-2 text-text-primary';
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
        'bg-surface-1 flex items-center rounded p-0.5',
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
