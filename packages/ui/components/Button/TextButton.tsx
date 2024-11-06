import { mergeClassNames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { Except } from 'type-fest';
import { Button } from './Button';
import { ButtonProps } from './types';

export type TextButtonProps = Except<ButtonProps, 'isLoading'>;
export const TextButton = forwardRef(function TextButton(
  { children, className, ...rest }: TextButtonProps,
  ref,
) {
  return (
    <Button
      ref={ref}
      className={mergeClassNames(
        'text-text-secondary hover:text-text-primary transition-colors',
        'disabled:text-disabled disabled:hover:text-disabled',
        'gap-x-1.5',
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
});
