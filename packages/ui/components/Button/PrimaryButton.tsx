import { mergeClassNames } from '@vertex-protocol/web-common';
import { SizeVariant } from '../../types';
import { getStateOverlayClassNames } from '../../utils/';
import { Button } from './Button';
import {
  STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME,
  STANDARD_BUTTON_TEXT_SIZE_CLASSNAME,
  STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME,
} from './consts';
import { ButtonProps } from './types';

export type PrimaryButtonProps = Exclude<ButtonProps, 'size'> & {
  size?: SizeVariant;
};

/**
 * PrimaryButton component represents a primary button in the UI.
 *
 * @param size - The size of the button. Default is 'base'.
 */
export function PrimaryButton({
  className,
  size = 'base',
  ...rest
}: PrimaryButtonProps) {
  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'sm',
    disabled: rest.disabled,
    isLoading: rest.isLoading,
  });

  const baseStateClassNames = (() => {
    if (rest.isLoading || rest.disabled) {
      return 'bg-surface-2 border-disabled';
    }
    return 'bg-primary border-transparent';
  })();

  return (
    <Button
      className={mergeClassNames(
        'text-text-button-primary rounded-sm border',
        stateOverlayClassNames,
        STANDARD_BUTTON_TEXT_SIZE_CLASSNAME[size],
        STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME[size],
        STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME[size],
        baseStateClassNames,
        className,
      )}
      {...rest}
    />
  );
}
