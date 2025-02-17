import { mergeClassNames } from '@vertex-protocol/web-common';
import { Except } from 'type-fest';
import { Button } from './Button';
import { ButtonProps } from './types';

type ColorVariant = 'secondary' | 'accent' | 'tertiary';

export type TextButtonProps = Except<ButtonProps, 'isLoading'> & {
  colorVariant: ColorVariant;
};

export function TextButton({
  children,
  className,
  colorVariant,
  ...rest
}: TextButtonProps) {
  const colorVariantClassName = {
    accent: 'text-accent hover:text-accent hover:brightness-110',
    secondary: 'text-text-secondary hover:text-text-primary',
    tertiary: 'text-text-tertiary hover:text-text-secondary',
  }[colorVariant];

  return (
    <Button
      className={mergeClassNames(
        'disabled:text-disabled disabled:hover:text-disabled',
        'transition-colors',
        'gap-x-1.5',
        colorVariantClassName,
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
}
