import { mergeClassNames } from '@vertex-protocol/web-common';
import { Button, ButtonProps, Icons } from '@vertex-protocol/web-ui';

export type LinkButtonProps = ButtonProps & {
  color: 'accent' | 'white';
  withExternalIcon?: boolean;
};

export function LinkButton({
  className,
  color,
  disabled,
  withExternalIcon,
  ...rest
}: LinkButtonProps) {
  const textColor = {
    accent: 'text-accent',
    white: 'text-text-secondary',
  }[color];

  const hoverTextColor = {
    accent: 'hover:brightness-110',
    white: 'hover:text-text-primary',
  }[color];

  return (
    <Button
      className={mergeClassNames(
        'underline disabled:brightness-75',
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
