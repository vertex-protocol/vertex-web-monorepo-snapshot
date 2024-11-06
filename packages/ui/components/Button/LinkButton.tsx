import { mergeClassNames } from '@vertex-protocol/web-common';
import { ButtonProps } from './types';
import { Button } from './Button';
import { Icons } from '../Icons';
import { forwardRef } from 'react';

export type LinkButtonProps = ButtonProps & {
  colorVariant: 'accent' | 'primary';
  withExternalIcon?: boolean;
};

export const LinkButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement | HTMLDivElement,
  LinkButtonProps
>(function LinkButton(
  { className, colorVariant, disabled, withExternalIcon, ...rest },
  ref,
) {
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
      ref={ref}
      {...rest}
    />
  );
});
