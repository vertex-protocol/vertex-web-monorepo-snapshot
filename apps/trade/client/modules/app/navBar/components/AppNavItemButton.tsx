import { mergeClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  ButtonProps,
  getStateOverlayClassNames,
  Icons,
} from '@vertex-protocol/web-ui';

export type AppNavItemButtonProps = ButtonProps & {
  withMobilePadding?: boolean;
  withCaret?: boolean;
  active?: boolean;
};

export function AppNavItemButton({
  className,
  withMobilePadding,
  withCaret,
  active,
  ...rest
}: AppNavItemButtonProps) {
  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'sm',
    disabled: rest.disabled,
  });

  return (
    <Button
      className={mergeClassNames(
        'title-text group flex items-center justify-start gap-x-1 rounded-sm px-3',
        active
          ? 'text-text-primary'
          : 'text-text-tertiary hover:text-text-primary data-[state="open"]:text-text-primary',
        withMobilePadding ? 'py-3' : 'py-1',
        stateOverlayClassNames,
        className,
      )}
      endIcon={
        withCaret && (
          <Icons.CaretDown className='group-data-[state="open"]:rotate-180' />
        )
      }
      {...rest}
    />
  );
}
