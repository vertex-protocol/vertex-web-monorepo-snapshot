import { mergeClassNames } from '@vertex-protocol/web-common';
import { Button } from 'client/components/Button/Button';
import { ButtonProps } from 'client/components/Button/types';
import { Icons } from '../Icons/icons';

export type LinkButtonProps = ButtonProps & {
  color: 'purple' | 'gray' | 'white';
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
    purple: 'text-purple-500',
    gray: 'text-white-700',
    white: 'text-white-900',
  }[color];

  const hoverTextColor = {
    purple: 'hover:text-purple-200',
    gray: 'hover:text-white-800',
    white: 'hover:text-white',
  }[color];

  return (
    <Button
      className={mergeClassNames(
        'underline disabled:opacity-50',
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
