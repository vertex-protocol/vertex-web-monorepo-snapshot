import classNames from 'classnames';
import { ColorBorderButton } from 'client/components/Button/ColorBorderButton';
import { ButtonProps } from 'client/components/Button/types';
import Link from 'next/link';

export function CommunitySocialButton({
  className,
  ...rest
}: ButtonProps<typeof Link>) {
  return (
    <ColorBorderButton
      as={Link}
      external
      className={classNames(
        'w-full items-center py-4 font-bold',
        'sm:w-auto sm:pl-8 sm:pr-10',
        'md:px-12',
        className,
      )}
      {...rest}
    />
  );
}
