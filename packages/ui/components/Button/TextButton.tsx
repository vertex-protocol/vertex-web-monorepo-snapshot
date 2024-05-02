import { mergeClassNames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { Button } from './Button';
import { ButtonProps } from './types';

export type TextButtonProps = ButtonProps & {
  active?: boolean;
};

export const TextButton = forwardRef(function TextButton(
  { children, className, active, disabled, ...rest }: TextButtonProps,
  ref,
) {
  return (
    <Button
      ref={ref}
      className={mergeClassNames(
        active
          ? 'text-text-primary'
          : 'text-text-tertiary hover:text-text-secondary',
        disabled && 'text-disabled hover:text-disabled',
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
});
