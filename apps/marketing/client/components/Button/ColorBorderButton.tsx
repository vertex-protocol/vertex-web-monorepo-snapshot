import { mergeClassNames } from '@vertex-protocol/web-common';

import { HomePageButton } from 'client/components/Button/HomePageButton';
import { ButtonElement, ButtonProps } from 'client/components/Button/types';

type ColorBorderButtonProps<E extends ButtonElement = 'button'> =
  ButtonProps<E> & {
    borderRadiusFull?: boolean;
  };

export function ColorBorderButton<E extends ButtonElement = 'button'>(
  props: ColorBorderButtonProps<E>,
) {
  const { className, borderRadiusFull, ...rest } = props;

  return (
    <HomePageButton
      className={mergeClassNames(
        'relative gap-x-2 overflow-hidden font-bold text-white',
        'bg-black-700 hover:bg-black-800 backdrop-blur-lg hover:brightness-150',
        'mask',
        borderRadiusFull ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      {...rest}
    />
  );
}
