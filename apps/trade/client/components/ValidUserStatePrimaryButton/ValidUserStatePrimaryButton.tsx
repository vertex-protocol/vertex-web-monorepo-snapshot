import { PrimaryButton, PrimaryButtonProps } from '@vertex-protocol/web-ui';
import { useButtonUserStateErrorProps } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { UseButtonUserStateErrorPropsParams } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';

type Props = PrimaryButtonProps & UseButtonUserStateErrorPropsParams;

export function ValidUserStatePrimaryButton({
  className,
  handledErrors,
  requiredConnectedChain,
  size,
  ...rest
}: Props) {
  const userStateErrorButtonProps = useButtonUserStateErrorProps({
    handledErrors,
    requiredConnectedChain,
  });

  // If the button should be replaced with a user state error button, render that instead.
  if (userStateErrorButtonProps) {
    return (
      <PrimaryButton
        className={className}
        size={size}
        {...userStateErrorButtonProps}
      />
    );
  }

  return <PrimaryButton className={className} size={size} {...rest} />;
}
