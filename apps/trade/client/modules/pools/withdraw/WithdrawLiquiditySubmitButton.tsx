import { WithClassnames } from '@vertex-protocol/web-common';
import { ButtonHelperInfo, PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props extends WithClassnames {
  state: BaseActionButtonState;
}

export function WithdrawLiquiditySubmitButton({ className, state }: Props) {
  const labelContent = (() => {
    if (state === 'disabled') {
      return 'Enter amount';
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
      <PrimaryButton
        type="submit"
        className={className}
        isLoading={state === 'loading'}
        disabled={state === 'disabled'}
      >
        {labelContent}
      </PrimaryButton>
      {state === 'success' && (
        <ButtonHelperInfo.Content>
          You will receive the tokens in your Vertex account.
        </ButtonHelperInfo.Content>
      )}
    </ButtonHelperInfo.Container>
  );
}
