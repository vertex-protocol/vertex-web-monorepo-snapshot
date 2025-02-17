import { joinClassNames } from '@vertex-protocol/web-common';
import { CardButton, CardButtonBaseProps } from './CardButton';

export function NavBarCardButton({
  className,
  disabled,
  ...buttonProps
}: CardButtonBaseProps) {
  return (
    <CardButton
      className={joinClassNames('flex gap-x-1 px-2 py-1.5', className)}
      disabled={disabled}
      {...buttonProps}
    />
  );
}
