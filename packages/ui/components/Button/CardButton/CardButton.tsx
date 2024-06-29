import { mergeClassNames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { Except } from 'type-fest';
import { BorderRadiusVariant } from '../../../types';
import { getStateOverlayClassNames } from '../../../utils';
import { CARD_CLASSNAMES } from '../../Card';
import { Button } from '../Button';
import { ButtonProps } from '../types';

export type CardButtonBaseProps = Except<ButtonProps, 'isLoading'> & {
  stateOverlayBorderRadiusVariant?: BorderRadiusVariant;
};

export const CardButton = forwardRef(function CardButton(
  {
    className,
    children,
    stateOverlayBorderRadiusVariant = 'lg',
    ...rest
  }: CardButtonBaseProps,
  ref,
) {
  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: stateOverlayBorderRadiusVariant,
    disabled: rest.disabled,
  });

  return (
    <Button
      className={mergeClassNames(
        'flex items-center gap-x-3 p-3',
        CARD_CLASSNAMES,
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
