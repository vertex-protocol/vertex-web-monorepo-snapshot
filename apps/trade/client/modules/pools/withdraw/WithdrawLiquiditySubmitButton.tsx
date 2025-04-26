import { WithClassnames } from '@vertex-protocol/web-common';
import { ButtonHelperInfo } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props extends WithClassnames {
  state: BaseActionButtonState;
}

export function WithdrawLiquiditySubmitButton({ className, state }: Props) {
  const labelContent = (() => {
    if (state === 'disabled') {
      return 'Enter Amount';
    }
    if (state === 'success') {
      return <ButtonStateContent.Success message="Liquidity Withdrawn" />;
    }
    if (state === 'loading') {
      return (
        <ButtonStateContent.Loading singleSignatureMessage="Withdrawing Liquidity" />
      );
    }
    return `Withdraw Liquidity`;
  })();

  return (
    <ButtonHelperInfo.Container>
      <ValidUserStatePrimaryButton
        type="submit"
        className={className}
        isLoading={state === 'loading'}
        disabled={state === 'disabled'}
        handledErrors={
          HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
        }
      >
        {labelContent}
      </ValidUserStatePrimaryButton>
      {state === 'success' && (
        <ButtonHelperInfo.Content>
          You will receive the tokens in your Vertex account.
        </ButtonHelperInfo.Content>
      )}
    </ButtonHelperInfo.Container>
  );
}
