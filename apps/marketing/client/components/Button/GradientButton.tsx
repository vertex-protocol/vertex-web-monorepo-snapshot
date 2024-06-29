import { HomePageButton } from './HomePageButton';
import { ButtonElement, ButtonProps } from './types';
import { joinClassNames } from '@vertex-protocol/web-common';

export function GradientButton<E extends ButtonElement = 'button'>(
  props: ButtonProps<E>,
) {
  const { className, ...rest } = props;

  return (
    <HomePageButton
      className={joinClassNames(
        'rounded-lg font-bold text-white shadow hover:brightness-125',
        'bg-buttonGradient',
        className,
      )}
      {...rest}
    />
  );
}
