import { joinClassNames } from '@vertex-protocol/web-common';
import {
  STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME,
  STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME,
} from '../consts';
import { CardButton, CardButtonBaseProps } from './CardButton';

export function NavBarCardButton({
  className,
  disabled,
  ...buttonProps
}: CardButtonBaseProps) {
  return (
    <CardButton
      className={joinClassNames(
        'gap-x-1',
        STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME.xs,
        STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME.xs,
        className,
      )}
      disabled={disabled}
      {...buttonProps}
    />
  );
}
