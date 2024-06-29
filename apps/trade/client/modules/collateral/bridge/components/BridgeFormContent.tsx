import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ButtonHelperInfo, Divider } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummary } from 'client/components/InputSummary';
import { BridgeSummaryDisclosure } from 'client/modules/collateral/bridge/components/BridgeSummaryDisclosure';
import { SourceChainSelect } from 'client/modules/collateral/bridge/components/SourceChainSelect';
import { DestinationTokenInput } from 'client/modules/collateral/bridge/components/tokenInputs/DestinationTokenInput';
import { SourceTokenInput } from 'client/modules/collateral/bridge/components/tokenInputs/SourceTokenInput';
import { useBridgeRouteSummary } from 'client/modules/collateral/bridge/hooks/useBridgeRouteSummary';
import { MinimumInitialDepositAmount } from 'client/modules/collateral/components/MinimumInitialDepositAmount';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { useBridgeAmountErrorTooltipContent } from '../hooks/useBridgeForm/useBridgeAmountErrorTooltipContent';
import { useBridgeForm } from '../hooks/useBridgeForm/useBridgeForm';
import { BridgeSubmitButton } from './BridgeSubmitButton';

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

  const sourceTokenInputDisabled = allSourceTokens.length === 0;

  const destinationTokenInputDisabled = allDestinationTokens.length === 0;

  return (
    <Form className="flex flex-col gap-y-5" onSubmit={onSubmit}>
      {/*Bridge source chain*/}
      <div className="flex flex-col gap-y-4">
        {/*Source chain selection*/}
        <div className="flex items-center gap-x-2">
          <span className="text-text-primary">Bridge from</span>
          <SourceChainSelect
            allSourceChains={allSourceChains}
            form={form}
            selectedSourceChain={selectedSourceChain}
          />
        </div>
        {/*Source token*/}
        <div className="flex flex-col">
          <SourceTokenInput
            form={form}
            error={amountErrorTooltipContent}
            selectedSourceChain={selectedSourceChain}
            selectedSourceToken={selectedSourceToken}
            allSourceTokens={allSourceTokens}
            estimatedValueUsd={estimatedSourceValueUsd}
            validateAmount={validateAmount}
            disabled={sourceTokenInputDisabled}
          />
          <InputSummary.Container>
            <InputSummary.Item
              label="Available:"
              currentValue={sourceTokenBalance}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
              onValueClick={onMaxAmountSelected}
            />
          </InputSummary.Container>
        </div>
        <FractionAmountButtons
          onFractionSelected={onFractionSelected}
          selectedFraction={validPercentageAmount}
          disabled={!selectedSourceToken}
        />
        <Divider />
        {/*Estimated receive amount*/}
        <DefinitionTooltip
          contentWrapperClassName="text-text-secondary"
          definitionId="bridgeEstimatedReceiveAmount"
          decoration={{
            icon: true,
          }}
        >
          <span className="text-text-primary">Est. receive</span>
        </DefinitionTooltip>
        {/*Destination token*/}
        <DestinationTokenInput
          form={form}
          selectedDestinationToken={selectedDestinationToken}
          allDestinationTokens={allDestinationTokens}
          estimatedReceiveAmount={bridgeRouteSummary?.receiveAmount}
          estimatedReceiveValueUsd={
            bridgeRouteSummary?.estimatedReceiveValueUsd
          }
          disabled={destinationTokenInputDisabled}
        />
      </div>
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
