import { joinClassNames } from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { ButtonElement, ButtonProps } from 'client/components/Button/types';

export function GradientButton<E extends ButtonElement = 'button'>(
  props: ButtonProps<E>,
) {
  const { className, ...rest } = props;

  return (
    <HomePageButton
      className={joinClassNames(
        'rounded-[10px] font-bold text-white shadow hover:brightness-125',
        'bg-buttonGradient',
        className,
      )}
      {...rest}
    />
  );
}
