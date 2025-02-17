import { Except } from 'type-fest';
import { TextButton } from './TextButton';
import { ButtonProps } from './types';

export type TabTextButtonProps = Except<ButtonProps, 'isLoading'> & {
  active: boolean;
};

export function TabTextButton({
  className,
  active,
  ...rest
}: TabTextButtonProps) {
  return (
    <TextButton
      colorVariant={active ? 'secondary' : 'tertiary'}
      className={className}
      {...rest}
    />
  );
}
