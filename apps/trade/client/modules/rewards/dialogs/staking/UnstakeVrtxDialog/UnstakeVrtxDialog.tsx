import { VERTEX_SPECIFIC_LINKS } from '@vertex-protocol/web-common';
import { ActionSummary } from 'client/components/ActionSummary';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummary } from 'client/components/InputSummary';
import { LinkButton } from 'client/components/LinkButton';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { UnstakeVrtxDisclosure } from 'client/modules/rewards/dialogs/staking/UnstakeVrtxDialog/UnstakeVrtxDisclosure';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import Link from 'next/link';
import { StakingDialogInput } from '../components/StakingDialogInput';
import { UnstakeVrtxSubmitButton } from './UnstakeVrtxSubmitButton';
import { UnstakeVrtxSummary } from './UnstakeVrtxSummary';
import { useUnstakeVrtxForm } from './useUnstakeVrtxForm';
import { useUnstakeVrtxAmountErrorTooltipContent } from './useUnstakeVrtxAmountErrorTooltipContent';
import { Form } from 'client/components/Form';

export function UnstakeVrtxDialog() {
  const { hide } = useDialog();
  const {
    form,
    formError,
    validPercentageAmount,
    validAmount,
    validateAmount,
    amountVrtxStaked,
    buttonState,
    estimatedStakeValueUsd,
    onFractionSelected,
    onSubmit,
  } = useUnstakeVrtxForm();

  const amountErrorTooltipContent = useUnstakeVrtxAmountErrorTooltipContent({
    formError,
  });

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title
        onClose={hide}
        endElement={
          <LinkButton
            as={Link}
            color="white"
            className="text-xs"
            href={VERTEX_SPECIFIC_LINKS.stakeVrtxDocs}
            external
            withExternalIcon
          >
            Staking Guide
          </LinkButton>
        }
      >
        Unstake
      </BaseDialog.Title>
      <BaseDialog.Body>
        <Form onSubmit={onSubmit} className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <StakingDialogInput
              {...form.register('amount', {
                validate: validateAmount,
              })}
              onFocus={() => {
                form.setValue('amountSource', 'absolute');
              }}
              estimatedStakeValueUsd={estimatedStakeValueUsd}
              error={amountErrorTooltipContent}
            />
            <InputSummary.Container>
              <InputSummary.Item
                label="Available:"
                currentValue={amountVrtxStaked}
                formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              />
            </InputSummary.Container>
          </div>
          <FractionAmountButtons
            onFractionSelected={onFractionSelected}
            selectedFraction={validPercentageAmount}
            className="pt-0.5"
          />
          <UnstakeVrtxDisclosure />
          <ActionSummary.Container>
            <UnstakeVrtxSummary validAmount={validAmount} />
            <UnstakeVrtxSubmitButton state={buttonState} />
          </ActionSummary.Container>
        </Form>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
