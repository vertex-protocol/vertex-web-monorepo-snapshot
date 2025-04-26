import { mergeClassNames, WithRef } from '@vertex-protocol/web-common';
import { ComponentPropsWithRef } from 'react';
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

function SegmentedControlButton({
  className,
  size = 'base',
  active,
  ...rest
}: SegmentControlButtonProps) {
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
        'rounded-sm whitespace-nowrap',
        STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME[size],
        STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME[size],
        STANDARD_BUTTON_TEXT_SIZE_CLASSNAME[size],
        stateClassNames,
        className,
      )}
      {...rest}
    />
  );
}

function SegmentedControlContainer({
  children,
  className,
  ...rest
}: WithRef<ComponentPropsWithRef<'div'>, HTMLDivElement>) {
  return (
    <div
      className={mergeClassNames(
        'bg-surface-1 flex items-center rounded-sm p-0.5',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export const SegmentedControl = {
  Button: SegmentedControlButton,
  Container: SegmentedControlContainer,
};
