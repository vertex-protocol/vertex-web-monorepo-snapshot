import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { StakingDialogInput } from 'client/modules/rewards/dialogs/staking/components/StakingDialogInput';
import { useUnstakeVrtxAmountErrorTooltipContent } from 'client/modules/rewards/dialogs/staking/hooks/useUnstakeVrtxAmountErrorTooltipContent';
import { UnstakeVrtxDisclosure } from 'client/modules/rewards/dialogs/staking/UnstakeVrtxDialog/UnstakeVrtxDisclosure';
import { UnstakeVrtxSubmitButton } from 'client/modules/rewards/dialogs/staking/UnstakeVrtxDialog/UnstakeVrtxSubmitButton';
import { UnstakeVrtxSummary } from 'client/modules/rewards/dialogs/staking/UnstakeVrtxDialog/UnstakeVrtxSummary';
import { useUnstakeVrtxForm } from 'client/modules/rewards/dialogs/staking/UnstakeVrtxDialog/useUnstakeVrtxForm';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

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
    onMaxAmountSelected,
  } = useUnstakeVrtxForm();

  const amountErrorTooltipContent = useUnstakeVrtxAmountErrorTooltipContent({
    formError,
  });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title
        onClose={hide}
        endElement={
          <LinkButton
            as={Link}
            colorVariant="primary"
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
      </BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-1.5">
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
            <InputSummaryItem
              label="Available:"
              currentValue={amountVrtxStaked}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              onValueClick={onMaxAmountSelected}
            />
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
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
