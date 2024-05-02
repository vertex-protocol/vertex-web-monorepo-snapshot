import classNames from 'classnames';

import { HomePageButton } from './HomePageButton';
import { ButtonElement, ButtonProps } from './types';

export function GradientButton<E extends ButtonElement = 'button'>(
  props: ButtonProps<E>,
) {
  const { className, ...rest } = props;

  return (
    <HomePageButton
      className={classNames(
        'rounded-lg font-bold text-white shadow hover:brightness-125',
        'bg-buttonGradient',
        className,
      )}
      {...rest}
    />
  );
}
