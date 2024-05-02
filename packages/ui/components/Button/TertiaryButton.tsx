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

export type TertiaryButtonProps = ButtonProps & {
  size: StandardButtonSize;
};

export const TertiaryButton = forwardRef(function TertiaryButton(
  { size, className, children, ...rest }: TertiaryButtonProps,
  ref,
) {
  const stateClassNames = (() => {
    if (rest.disabled || rest.isLoading) {
      return 'ring-disabled text-disabled';
    }

    return [
      'ring-accent text-accent',
      'hover:bg-overlay-accent/10 hover:text-text-primary text-accent',
    ];
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
    >
      {children}
    </Button>
  );
});
