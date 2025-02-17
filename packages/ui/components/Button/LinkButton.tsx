import { mergeClassNames } from '@vertex-protocol/web-common';
import { Icons } from '../Icons';
import { Button } from './Button';
import { ButtonProps } from './types';

export type LinkButtonProps = ButtonProps & {
  colorVariant: 'accent' | 'primary';
  withExternalIcon?: boolean;
};

export function LinkButton({
  className,
  colorVariant,
  disabled,
  withExternalIcon,
  ...rest
}: LinkButtonProps) {
  const textColor = {
    accent: 'text-accent',
    primary: 'text-text-secondary',
  }[colorVariant];

  const hoverTextColor = {
    accent: 'hover:brightness-110',
    primary: 'hover:text-text-primary',
  }[colorVariant];

  return (
    <Button
      className={mergeClassNames(
        'gap-x-1 underline transition-colors',
        textColor,
        // Must conditionally test for disabled prop since :disabled selector doesn't work for link components
        disabled ? 'brightness-75' : hoverTextColor,
        className,
      )}
      endIcon={withExternalIcon ? <Icons.ArrowUpRight /> : rest.endIcon}
      disabled={disabled}
      {...rest}
    />
  );
}
