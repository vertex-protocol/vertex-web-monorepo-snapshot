import { mergeClassNames } from '@vertex-protocol/web-common';
import { Except } from 'type-fest';
import { BorderRadiusVariant } from '../../../types';
import { getStateOverlayClassNames } from '../../../utils';
import { CARD_CLASSNAMES } from '../../Card';
import { Button } from '../Button';
import { ButtonProps } from '../types';

export type CardButtonBaseProps = Except<ButtonProps, 'isLoading'> & {
  stateOverlayBorderRadiusVariant?: BorderRadiusVariant;
};

export function CardButton({
  className,
  stateOverlayBorderRadiusVariant,
  ...rest
}: CardButtonBaseProps) {
  const stateOverlayClassNames = getStateOverlayClassNames({
    disabled: rest.disabled,
    borderRadiusVariant: stateOverlayBorderRadiusVariant,
  });

  return (
    <Button
      className={mergeClassNames(
        'flex items-center gap-x-3 p-3',
        CARD_CLASSNAMES,
        // `overflow-hidden` here to clip overlay border radius otherwise it will overflow the parent
        'overflow-hidden',
        stateOverlayClassNames,
        className,
      )}
      {...rest}
    />
  );
}
