import { mergeClassNames } from '@vertex-protocol/web-common';
import { Button, ButtonProps } from '@vertex-protocol/web-ui';
import { forwardRef } from 'react';

export type AppNavItemButtonProps = ButtonProps & {
  withMobilePadding?: boolean;
  active: boolean;
};

export const AppNavItemButton = forwardRef(function AppNavItemButton(
  {
    className,
    children,
    withMobilePadding,
    active,
    ...rest
  }: AppNavItemButtonProps,
  ref,
) {
  const classesByState = (() => {
    if (rest.disabled) {
      return 'opacity-50';
    }

    if (active) {
      return 'text-text-primary';
    }

    return 'text-text-tertiary hover:text-text-secondary hover:bg-overlay-hover/5';
  })();

  return (
    <Button
      className={mergeClassNames(
        'title-text flex items-center justify-start gap-x-1 rounded',
        'px-3',
        withMobilePadding ? 'py-4' : 'py-1',
        classesByState,
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Button>
  );
});
