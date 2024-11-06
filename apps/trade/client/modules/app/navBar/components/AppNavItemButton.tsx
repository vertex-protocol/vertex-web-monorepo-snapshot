import { mergeClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  ButtonProps,
  getStateOverlayClassNames,
  Icons,
} from '@vertex-protocol/web-ui';
import { forwardRef } from 'react';

export type AppNavItemButtonProps = ButtonProps & {
  withMobilePadding?: boolean;
  withCaret?: boolean;
  active?: boolean;
};

export const AppNavItemButton = forwardRef(function AppNavItemButton(
  {
    className,
    children,
    withMobilePadding,
    withCaret,
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
        'title-text group flex items-center justify-start gap-x-1 rounded px-3',
        active
          ? 'text-text-primary'
          : 'text-text-tertiary hover:text-text-primary data-[state="open"]:text-text-primary',
        withMobilePadding ? 'py-3' : 'py-1',
        stateOverlayClassNames,
        className,
      )}
      ref={ref}
      endIcon={
        withCaret && (
          <Icons.CaretDown className='group-data-[state="open"]:rotate-180' />
        )
      }
      {...rest}
    >
      {children}
    </Button>
  );
});
