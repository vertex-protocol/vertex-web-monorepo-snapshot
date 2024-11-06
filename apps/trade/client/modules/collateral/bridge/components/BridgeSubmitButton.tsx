import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BridgeFormActionButtonState } from 'client/modules/collateral/bridge/hooks/form/types';
import { BridgeChain } from 'client/modules/collateral/bridge/types';

interface Props {
  buttonState: BridgeFormActionButtonState;
  selectedSourceChain: BridgeChain | undefined;
}

export function BridgeSubmitButton({
  buttonState,
  selectedSourceChain,
}: Props) {
  const message = {
    estimation_error: 'Estimation Failed',
    estimating_route: 'Estimating Route',
    switching_chain: 'Confirm Switch',
    loading: 'Confirm Transaction',
    success: <ButtonStateContent.Success message="Submitted" />,
    requires_switch_connected_chain: `Switch to ${selectedSourceChain?.chainName ?? 'Chain'}`,
    idle: 'Bridge',
    disabled: 'Enter Amount',
  }[buttonState];

  const isLoading =
    buttonState === 'loading' ||
    buttonState === 'switching_chain' ||
    buttonState === 'estimating_route';

  const disabled =
    buttonState === 'disabled' || buttonState === 'estimation_error';

  return (
    <PrimaryButton isLoading={isLoading} disabled={disabled} type="submit">
      {message}
    </PrimaryButton>
  );
}
