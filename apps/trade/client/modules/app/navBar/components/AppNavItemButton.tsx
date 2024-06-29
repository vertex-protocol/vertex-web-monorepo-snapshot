import { mergeClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  ButtonProps,
  getStateOverlayClassNames,
} from '@vertex-protocol/web-ui';
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
  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
    disabled: rest.disabled,
  });

  return (
    <Button
      className={mergeClassNames(
        'title-text flex items-center justify-start gap-x-1 rounded',
        'px-3',
        active
          ? 'text-text-primary'
          : 'text-text-tertiary hover:text-text-primary',
        withMobilePadding ? 'py-4' : 'py-1',
        stateOverlayClassNames,
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Button>
  );
});
