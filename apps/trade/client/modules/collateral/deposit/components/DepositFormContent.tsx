import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Divider, Icons, TextButton } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummary } from 'client/components/InputSummary';
import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { DepositSummaryDisclosure } from 'client/modules/collateral/components/DepositSummaryDisclosure';
import { MinimumInitialDepositAmount } from 'client/modules/collateral/components/MinimumInitialDepositAmount';
import { DepositApproveWarning } from 'client/modules/collateral/deposit/components/DepositApproveWarning';
import { UsdbDepositDismissible } from 'client/modules/collateral/deposit/components/dismissibles/UsdbDepositDismissible';
import { WmntDepositDismissible } from 'client/modules/collateral/deposit/components/dismissibles/WmntDepositDismissible';
import { useDepositForm } from 'client/modules/collateral/deposit/hooks/useDepositForm';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { CollateralSelectInput } from '../../components/CollateralSelectInput';
import { useDepositAmountErrorTooltipContent } from '../hooks/useDepositAmountErrorTooltipContent';
import { DepositFooter } from './DepositFooter';
import { DepositSubmitButton } from './DepositSubmitButton';
import { DepositVrtxStakingCta } from './DepositVrtxStakingCta';
import { WethDepositDismissible } from './dismissibles/WethDepositDismissible';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useEffect } from 'react';

interface Props {
  onClose: () => void;
  onShowHelpClick: () => void;
}

export function DepositFormContent({ onShowHelpClick, onClose }: Props) {
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
  } = useDepositForm();
  const { trackEvent } = useAnalyticsContext();

  useEffect(() => {
    trackEvent({
      type: 'deposit_dialog_view',
      data: {
        contentType: 'form',
      },
    });
  }, [trackEvent]);

  const { register, setValue } = form;
  const amountErrorTooltipContent = useDepositAmountErrorTooltipContent({
    formError,
  });

  // Footer logic
  const isOnrampEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
  ]);
  const isBridgeEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
  ]);
  const showFooter = isOnrampEnabled || isBridgeEnabled;

  return (
    <>
      <BaseDialog.Title
        onClose={onClose}
        endElement={
          <TextButton
            startIcon={<Icons.MdAdsClick size={16} />}
            className="text-xs"
            onClick={onShowHelpClick}
          >
            FAQ
          </TextButton>
        }
      >
        Deposit
      </BaseDialog.Title>
      <BaseDialog.Body>
        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-y-4">
          <WmntDepositDismissible
            displayedInfoCardType={displayedInfoCardType}
          />
          <WethDepositDismissible
            displayedInfoCardType={displayedInfoCardType}
          />
          <DepositVrtxStakingCta
            displayedInfoCardType={displayedInfoCardType}
          />
          <UsdbDepositDismissible
            displayedInfoCardType={displayedInfoCardType}
          />
          <div className="flex w-full flex-col">
            <CollateralSelectInput
              {...register('amount', {
                validate: validateAmount,
              })}
              estimatedValueUsd={amountInputValueUsd}
              dropdownProps={{
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
            <InputSummary.Container>
              <InputSummary.Item
                label="Available:"
                currentValue={selectedProduct?.decimalAdjustedWalletBalance}
                formatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
                onValueClick={onMaxAmountSelected}
              />
            </InputSummary.Container>
          </div>
          <FractionAmountButtons
            onFractionSelected={onFractionSelected}
            selectedFraction={validPercentageAmount}
          />
          {buttonState === 'approve_idle' && (
            <DepositApproveWarning symbol={selectedProduct?.symbol ?? ''} />
          )}
          <div className="flex w-full flex-col gap-y-3 pt-2">
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
                triggerOpen={buttonState === 'idle'}
              />
              <DepositSubmitButton state={buttonState} />
            </ActionSummary.Container>
            {buttonState === 'approve_success' && (
              <p className="text-text-secondary text-xs">
                You can now deposit the asset. The modal should automatically
                update.
              </p>
            )}
            {/*Shoutout manual 1CT flow if a user first deposits */}
            {isInitialDeposit && (
              <>
                <DefinitionTooltip
                  contentWrapperClassName="text-text-secondary text-xs w-max"
                  definitionId="smartContractWalletSigningPrompt"
                >
                  Using a smart contract wallet?
                </DefinitionTooltip>
              </>
            )}
          </div>
          {showFooter && (
            <>
              <Divider />
              <DepositFooter
                isOnrampEnabled={isOnrampEnabled}
                isBridgeEnabled={isBridgeEnabled}
              />
            </>
          )}
        </Form>
      </BaseDialog.Body>
    </>
  );
}
