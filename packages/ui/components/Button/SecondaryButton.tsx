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

export type SecondaryButtonProps = ButtonProps & {
  size: StandardButtonSize;
  destructive?: boolean;
};

export const SecondaryButton = forwardRef(function SecondaryButton(
  { size, className, destructive, ...rest }: SecondaryButtonProps,
  ref,
) {
  const stateClassNames = (() => {
    if (rest.disabled || rest.isLoading) {
      return [
        'text-disabled bg-surface-card ring-disabled',
        // The mergeClassNames on Button below will resolve the different text colors
        rest.isLoading && destructive ? 'text-negative' : '',
        rest.isLoading && !destructive ? 'text-text-tertiary' : '',
      ];
    }

    const variantClassNames = destructive
      ? 'hover:ring-negative hover:bg-surface-3 hover:text-negative'
      : 'hover:ring-accent hover:bg-surface-3 hover:text-text-primary';

    return ['text-text-primary bg-surface-2', 'ring-stroke', variantClassNames];
  })();

  return (
    <Button
      className={mergeClassNames(
        'rounded',
        BUTTON_RING_CLASSNAME,
        STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME[size],
        STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME[size],
        STANDARD_BUTTON_TEXT_SIZE_CLASSNAME[size],
        stateClassNames,
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});
