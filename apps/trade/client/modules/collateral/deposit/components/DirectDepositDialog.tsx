import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { DisclosureCard, Divider } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { SEQUENCER_FEE_AMOUNT_USDC } from 'client/consts/sequencerFee';
import { useIsSmartContractWalletConnected } from 'client/hooks/util/useIsSmartContractWalletConnected';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { CollateralSelectInput } from 'client/modules/collateral/components/CollateralSelectInput';
import { DepositSummaryDisclosure } from 'client/modules/collateral/components/DepositSummaryDisclosure';
import { MinimumInitialDepositAmount } from 'client/modules/collateral/components/MinimumInitialDepositAmount';
import { DepositApproveWarning } from 'client/modules/collateral/deposit/components/DepositApproveWarning';
import { DepositEntrypointButton } from 'client/modules/collateral/deposit/components/DepositEntrypointButton/DepositEntrypointButton';
import { DepositSubmitButton } from 'client/modules/collateral/deposit/components/DepositSubmitButton';
import { DepositVrtxStakingCta } from 'client/modules/collateral/deposit/components/DepositVrtxStakingCta';
import { BlastNativeYieldDepositDismissible } from 'client/modules/collateral/deposit/components/dismissibles/BlastNativeYieldDepositDismissible';
import { WavaxDepositDismissible } from 'client/modules/collateral/deposit/components/dismissibles/WavaxDepositDismissible';
import { WethDepositDismissible } from 'client/modules/collateral/deposit/components/dismissibles/WethDepositDismissible';
import { WmntDepositDismissible } from 'client/modules/collateral/deposit/components/dismissibles/WmntDepositDismissible';
import { WsDepositDismissible } from 'client/modules/collateral/deposit/components/dismissibles/WsDepositDismissible';
import { WseiDepositDismissible } from 'client/modules/collateral/deposit/components/dismissibles/WseiDepositDismissible';
import { useDepositAmountErrorTooltipContent } from 'client/modules/collateral/deposit/hooks/useDepositAmountErrorTooltipContent';
import { useDepositForm } from 'client/modules/collateral/deposit/hooks/useDepositForm';

export interface DirectDepositDialogParams {
  initialProductId?: number;
}

export function DirectDepositDialog({
  initialProductId,
}: DirectDepositDialogParams) {
  const { hide } = useDialog();
  const {
    form,
    formError,
    selectedProduct,
    availableProducts,
    buttonState,
    estimateStateTxs,
    validPercentageAmount,
    amountInputValueUsd,
    displayedInfoCardType,
    isInitialDeposit,
    validateAmount,
    onFractionSelected,
    onSubmit,
    onMaxAmountSelected,
  } = useDepositForm({ initialProductId });
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();

  const { register, setValue } = form;
  const amountErrorTooltipContent = useDepositAmountErrorTooltipContent({
    formError,
  });

  const isSmartContractWalletConnected = useIsSmartContractWalletConnected();
  const showOneClickTradingPrompt =
    isInitialDeposit && isSmartContractWalletConnected;

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Deposit</BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-2">
            <div>
              <p className="text-text-primary">Deposit From</p>
              <p className="text-text-tertiary text-xs">
                Use the dropdown to change your deposit method
              </p>
            </div>
            <DepositEntrypointButton
              triggerClassName="px-2"
              isDirectDepositSelected
            />
          </div>
          <Divider />
          <WmntDepositDismissible
            displayedInfoCardType={displayedInfoCardType}
          />
          <WethDepositDismissible
            displayedInfoCardType={displayedInfoCardType}
          />
          <WavaxDepositDismissible
            displayedInfoCardType={displayedInfoCardType}
          />
          <WseiDepositDismissible
            displayedInfoCardType={displayedInfoCardType}
          />
          <WsDepositDismissible displayedInfoCardType={displayedInfoCardType} />
          <DepositVrtxStakingCta
            displayedInfoCardType={displayedInfoCardType}
          />
          <BlastNativeYieldDepositDismissible
            displayedInfoCardType={displayedInfoCardType}
          />
          {showOneClickTradingPrompt && (
            <DisclosureCard
              title="Enable 1-Click Trading"
              description={
                <>
                  It looks like you&apos;re using a smart contract wallet.
                  Please{' '}
                  <span className="text-text-primary">
                    enable 1-Click Trading
                  </span>{' '}
                  after depositing to use the app. Ensure that you leave at
                  least{' '}
                  <span className="text-text-primary">
                    {SEQUENCER_FEE_AMOUNT_USDC} {primaryQuoteSymbol}
                  </span>{' '}
                  in your wallet to pay the setup fee.
                </>
              }
            />
          )}
          <div className="flex flex-col gap-y-1.5">
            <CollateralSelectInput
              {...register('amount', {
                validate: validateAmount,
              })}
              estimatedValueUsd={amountInputValueUsd}
              selectProps={{
                selectedProduct,
                availableProducts,
                assetAmountTitle: 'Available',
                onProductSelected: (productId) => {
                  // Skip validation and other states as you can only select from available options
                  setValue('productId', productId);
                },
              }}
              error={amountErrorTooltipContent}
              onFocus={() => {
                setValue('amountSource', 'absolute');
              }}
            />
            <div className="flex flex-col gap-y-0.5">
              <InputSummaryItem
                label="Available:"
                currentValue={selectedProduct?.decimalAdjustedWalletBalance}
                formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
                onValueClick={onMaxAmountSelected}
              />
              <InputSummaryItem
                label="Deposit APR (Auto):"
                definitionTooltipId="automaticDepositApr"
                valueClassName="text-positive"
                currentValue={selectedProduct?.depositAPR}
                formatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
              />
            </div>
          </div>
          <FractionAmountButtons
            onFractionSelected={onFractionSelected}
            selectedFraction={validPercentageAmount}
          />
          {buttonState === 'approve_idle' && (
            <DepositApproveWarning symbol={selectedProduct?.symbol ?? ''} />
          )}
          <div className="flex flex-col gap-y-3">
            {/*Only show min initial deposit when a user requires deposit */}
            {isInitialDeposit && (
              <MinimumInitialDepositAmount
                symbol={selectedProduct?.symbol}
                amount={
                  selectedProduct?.decimalAdjustedMinimumInitialDepositAmount
                }
              />
            )}
            <ActionSummary.Container>
              <DepositSummaryDisclosure
                displayedInfoCardType={displayedInfoCardType}
                estimateStateTxs={estimateStateTxs}
                productId={selectedProduct?.productId}
                symbol={selectedProduct?.symbol}
                isHighlighted={buttonState === 'idle'}
              />
              <DepositSubmitButton state={buttonState} />
            </ActionSummary.Container>
            {buttonState === 'approve_success' && (
              <p className="text-text-secondary text-xs">
                You can now deposit the asset. The modal should automatically
                update.
              </p>
            )}
          </div>
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
