import { mergeClassNames } from '@vertex-protocol/web-common';
import { Button, ButtonProps, Icons } from '@vertex-protocol/web-ui';

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
        'underline transition-colors disabled:brightness-75',
        textColor,
        !disabled && hoverTextColor,
        className,
      )}
      endIcon={withExternalIcon ? <Icons.MdArrowOutward /> : rest.endIcon}
      disabled={disabled}
      {...rest}
    />
  );
}
