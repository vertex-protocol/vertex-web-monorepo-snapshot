import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';

interface Props extends WithClassnames<WithChildren> {
  isLoading: boolean;
  disabled?: boolean;
  onClick(): void;
}

export function StakingSecondaryClaimButton({
  className,
  children,
  onClick,
  isLoading,
  disabled,
}: Props) {
  const userStateErrorButtonProps = useButtonUserStateErrorProps({
    handledErrors: HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain,
  });

  if (userStateErrorButtonProps) {
    return (
      <SecondaryButton className={className} {...userStateErrorButtonProps} />
    );
  }

  return (
    <SecondaryButton
      className={className}
      onClick={onClick}
      isLoading={isLoading}
      disabled={disabled}
    >
      {children}
    </SecondaryButton>
  );
}
