import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BridgeFormActionButtonState } from 'client/modules/collateral/bridge/hooks/useBridgeForm/types';
import { BridgeChain } from 'client/modules/collateral/bridge/types';

interface Props {
  buttonState: BridgeFormActionButtonState;
  selectedSourceChain: BridgeChain | undefined;
}

export function BridgeSubmitButton({
  buttonState,
  selectedSourceChain,
}: Props) {
  const message = (() => {
    switch (buttonState) {
      case 'estimation_error':
        return 'Estimation Failed';
      case 'estimating_route':
        return 'Estimating Route';
      case 'switching_chain':
        return 'Confirm Switch';
      case 'loading':
        return 'Confirm Transaction';
      case 'success':
        return <ButtonStateContent.Success message="Bridge Submitted" />;
      case 'requires_switch_chain':
        return `Switch to ${selectedSourceChain?.chainName ?? 'Chain'}`;
      case 'idle':
        return 'Bridge';
      case 'disabled':
        return 'Enter Amount';
    }
  })();

  return (
    <PrimaryButton
      size="lg"
      isLoading={
        buttonState === 'loading' ||
        buttonState === 'switching_chain' ||
        buttonState === 'estimating_route'
      }
      disabled={
        buttonState === 'disabled' || buttonState === 'estimation_error'
      }
      type="submit"
    >
      {message}
    </PrimaryButton>
  );
}
