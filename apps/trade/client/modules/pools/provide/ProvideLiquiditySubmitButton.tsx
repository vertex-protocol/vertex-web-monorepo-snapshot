import { WithClassnames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props extends WithClassnames {
  state: BaseActionButtonState;
}

export function ProvideLiquiditySubmitButton({ className, state }: Props) {
  const labelContent = (() => {
    if (state === 'disabled') {
      return 'Enter amount';
    }
    if (state === 'success') {
      return <ButtonStateContent.Success message="Liquidity Provided" />;
    }
    if (state === 'loading') {
      return (
        <ButtonStateContent.Loading singleSignatureMessage="Providing Liquidity" />
      );
    }
    return `Provide Liquidity`;
  })();

  return (
    <PrimaryButton
      type="submit"
      className={className}
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
    >
      {labelContent}
    </PrimaryButton>
  );
}
