import { WithClassnames } from '@vertex-protocol/web-common';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { ProvideVlpLiquidityActionButtonState } from 'client/modules/vlp/provide/hooks/useProvideVlpLiquidityDialog';

interface Props extends WithClassnames {
  state: ProvideVlpLiquidityActionButtonState;
}

export function RedeemVlpLiquiditySubmitButton({ className, state }: Props) {
  const labelContent = (() => {
    if (state === 'disabled') {
      return 'Enter Amount';
    }
    if (state === 'success') {
      return <ButtonStateContent.Success message="Liquidity Redeemed" />;
    }
    if (state === 'loading') {
      return (
        <ButtonStateContent.Loading singleSignatureMessage="Redeeming Liquidity" />
      );
    }
    return `Redeem Liquidity`;
  })();

  return (
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
  );
}
