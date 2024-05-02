import { mergeClassNames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { Button } from './Button';

import {
  BUTTON_RING_CLASSNAME,
  STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME,
  STANDARD_BUTTON_TEXT_SIZE_CLASSNAME,
  STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME,
} from './consts';
import { ButtonProps, StandardButtonSize } from './types';

export type PrimaryButtonProps = ButtonProps & {
  size: StandardButtonSize;
};

export const PrimaryButton = forwardRef(function PrimaryButton(
  { className, color, size, ...rest }: PrimaryButtonProps,
  ref,
) {
  const { disabled, isLoading } = rest;

  const stateClassNames = (() => {
    if (isLoading)
      return ['bg-surface-1', 'ring-disabled', 'text-text-tertiary'];
    if (disabled) return ['bg-surface-card', 'ring-disabled', 'text-disabled'];

    return [
      'bg-primary',
      'text-text-primary',
      'hover:brightness-125',
      'ring-0',
    ];
  })();

  return (
    <Button
      ref={ref}
      className={mergeClassNames(
        'rounded font-medium',
        BUTTON_RING_CLASSNAME,
        STANDARD_BUTTON_TEXT_SIZE_CLASSNAME[size],
        STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME[size],
        STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME[size],
        stateClassNames,
        className,
      )}
      {...rest}
    />
  );
});
