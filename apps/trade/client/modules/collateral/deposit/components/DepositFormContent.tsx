import { Divider, Icons, TextButton } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummary } from 'client/components/InputSummary';
import { ChainSpecificContent } from 'client/modules/chainSpecificContent/ChainSpecificContent';
import { ARB_CHAIN_IDS } from 'client/modules/chainSpecificContent/consts/chainIds';
import { DepositSummaryDisclosure } from 'client/modules/collateral/components/DepositSummaryDisclosure';
import { MinimumInitialDepositAmount } from 'client/modules/collateral/components/MinimumInitialDepositAmount';
import { DepositApproveWarning } from 'client/modules/collateral/deposit/components/DepositApproveWarning';
import { UsdbDepositDismissible } from 'client/modules/collateral/deposit/components/dismissibles/UsdbDepositDismissible';
import { useDepositForm } from 'client/modules/collateral/deposit/hooks/useDepositForm';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { CollateralSelectInput } from '../../components/CollateralSelectInput';
import { useDepositAmountErrorTooltipContent } from '../hooks/useDepositAmountErrorTooltipContent';
import { DepositFooter } from './DepositFooter';
import { DepositSubmitButton } from './DepositSubmitButton';
import { DepositVrtxStakingCta } from './DepositVrtxStakingCta';
import { WethDepositDismissible } from './dismissibles/WethDepositDismissible';

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

  const { register, setValue } = form;

  const amountErrorTooltipContent = useDepositAmountErrorTooltipContent({
    formError,
  });

  return (
    <>
      <BaseDialog.Title
        onClose={onClose}
        endElement={
          <TextButton
            startIcon={<Icons.MdAdsClick size={16} />}
            className="gap-x-1 px-4 text-xs font-medium"
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
          </div>
          <ChainSpecificContent enabledChainIds={ARB_CHAIN_IDS}>
            <Divider />
            <DepositFooter />
          </ChainSpecificContent>
        </Form>
      </BaseDialog.Body>
    </>
  );
}
