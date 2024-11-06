import { PrimaryButton, SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';

interface Props {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

export function StakingWithdrawUnstakedButton({
  onClick,
  disabled,
  isLoading,
  isSuccess,
}: Props) {
  const userStateErrorButtonProps = useButtonUserStateErrorProps({
    handledErrors: HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain,
  });

  const buttonLabel = (() => {
    if (isLoading) {
      return 'Confirm Claim';
    }
    if (isSuccess) {
      return <ButtonStateContent.Success message="Claim Successful" />;
    }
    return 'Claim Unstaked';
  })();

  if (userStateErrorButtonProps) {
    return <PrimaryButton size="sm" {...userStateErrorButtonProps} />;
  }

  return (
    <SecondaryButton
      size="sm"
      onClick={onClick}
      isLoading={isLoading}
      disabled={disabled}
    >
      {buttonLabel}
    </SecondaryButton>
  );
}
