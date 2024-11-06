import { ButtonHelperInfo } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { Form } from 'client/components/Form';
import { BridgeDestinationInput } from 'client/modules/collateral/bridge/components/BridgeDestinationInput';
import { BridgeSourceInput } from 'client/modules/collateral/bridge/components/BridgeSourceInput';
import { BridgeSubmitButton } from 'client/modules/collateral/bridge/components/BridgeSubmitButton';
import { BridgeSummaryDisclosure } from 'client/modules/collateral/bridge/components/BridgeSummaryDisclosure';
import { useBridgeAmountErrorTooltipContent } from 'client/modules/collateral/bridge/hooks/form/useBridgeAmountErrorTooltipContent';
import { useBridgeForm } from 'client/modules/collateral/bridge/hooks/form/useBridgeForm';
import { useBridgeRouteSummary } from 'client/modules/collateral/bridge/hooks/useBridgeRouteSummary';
import { MinimumInitialDepositAmount } from 'client/modules/collateral/components/MinimumInitialDepositAmount';

export function BridgeFormContent() {
  const {
    formError,
    isInitialDeposit,
    allSourceChains,
    allSourceTokens,
    allDestinationTokens,
    selectedDestinationToken,
    minimumDepositAmount,
    sourceTokenBalance,
    selectedSourceAmount,
    selectedSourceToken,
    selectedSourceChain,
    form,
    buttonState,
    estimatedBridgeRoute,
    validPercentageAmount,
    estimatedSourceValueUsd,
    onMaxAmountSelected,
    validateAmount,
    onFractionSelected,
    onSubmit,
  } = useBridgeForm();

  const bridgeRouteSummary = useBridgeRouteSummary({
    estimatedBridgeRoute,
    selectedDestinationToken,
    selectedSourceChain,
  });

  const amountErrorTooltipContent = useBridgeAmountErrorTooltipContent({
    formError,
  });

  return (
    <Form className="flex flex-col gap-y-5" onSubmit={onSubmit}>
      <BridgeSourceInput
        form={form}
        allSourceChains={allSourceChains}
        allSourceTokens={allSourceTokens}
        selectedSourceToken={selectedSourceToken}
        selectedSourceChain={selectedSourceChain}
        sourceTokenBalance={sourceTokenBalance}
        estimatedSourceValueUsd={estimatedSourceValueUsd}
        validPercentageAmount={validPercentageAmount}
        amountErrorTooltipContent={amountErrorTooltipContent}
        onMaxAmountSelected={onMaxAmountSelected}
        validateAmount={validateAmount}
        onFractionSelected={onFractionSelected}
      />
      <BridgeDestinationInput
        form={form}
        allDestinationTokens={allDestinationTokens}
        selectedDestinationToken={selectedDestinationToken}
        receiveAmount={bridgeRouteSummary?.receiveAmount}
        estimatedReceiveValueUsd={bridgeRouteSummary?.estimatedReceiveValueUsd}
        disabled={!selectedSourceToken}
      />
      {/* Summary */}
      <div className="flex flex-col gap-y-4">
        {isInitialDeposit && (
          <MinimumInitialDepositAmount
            amount={minimumDepositAmount}
            symbol={selectedDestinationToken?.symbol}
          />
        )}
        <ActionSummary.Container>
          <BridgeSummaryDisclosure
            selectedSourceChain={selectedSourceChain}
            selectedSourceAmount={selectedSourceAmount}
            selectedSourceToken={selectedSourceToken}
            selectedDestinationToken={selectedDestinationToken}
            bridgeRouteSummary={bridgeRouteSummary}
          />
          <BridgeSubmitButton
            selectedSourceChain={selectedSourceChain}
            buttonState={buttonState}
          />
        </ActionSummary.Container>
        {/* Centering the helper text here which looks better with the "powered by" footer */}
        {buttonState === 'idle' && (
          <ButtonHelperInfo.Content className="text-center">
            You may need to approve the asset before depositing.
          </ButtonHelperInfo.Content>
        )}
      </div>
    </Form>
  );
}
