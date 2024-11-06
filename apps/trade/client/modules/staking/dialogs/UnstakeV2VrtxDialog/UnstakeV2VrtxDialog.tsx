import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  Divider,
  formatTimestamp,
  Icons,
  LinkButton,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { UnstakeDialogVrtxBalance } from 'client/modules/staking/dialogs/components/UnstakeDialogVrtxBalance';
import { UnstakeV2VrtxErrorPanel } from 'client/modules/staking/dialogs/UnstakeV2VrtxDialog/UnstakeV2VrtxErrorPanel';
import { UnstakeV2VrtxRadioGroup } from 'client/modules/staking/dialogs/UnstakeV2VrtxDialog/UnstakeV2VrtxRadioGroup';
import { UnstakeV2VrtxSubmitButton } from 'client/modules/staking/dialogs/UnstakeV2VrtxDialog/UnstakeV2VrtxSubmitButton';
import { useUnstakeV2VrtxDialog } from 'client/modules/staking/dialogs/UnstakeV2VrtxDialog/useUnstakeV2VrtxDialog';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function UnstakeV2VrtxDialog() {
  const { hide } = useDialog();
  const {
    currentBalance,
    disableButtons,
    instantAmountToReceive,
    buttonState,
    protocolTokenSymbol,
    protocolTokenIconSrc,
    instantUnstakeReceivedAmountFraction,
    instantUnstakeBurnAmountFraction,
    availableToUnstakeTimeMillis,
    showErrorPanel,
    unstakedLockPeriodDays,
    selectedRadioId,
    setSelectedRadioId,
    unstakeAll,
  } = useUnstakeV2VrtxDialog();

  const summaryContent = (() => {
    return selectedRadioId === 'instant' ? (
      <>
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Percent Burned:"
          value={instantUnstakeBurnAmountFraction}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Total to Receive:"
          value={instantAmountToReceive}
          valueEndElement={protocolTokenSymbol}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        />
      </>
    ) : (
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Unlocks on:"
        labelStartIcon={Icons.LockOpen}
        valueContent={formatTimestamp(availableToUnstakeTimeMillis, {
          formatSpecifier: TimeFormatSpecifier.E_MMM_D_HH_12H,
        })}
      />
    );
  })();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title
        onClose={hide}
        endElement={
          // TODO ensure links are correct
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
      <BaseAppDialog.Body>
        <UserDisclosureDismissibleCard
          disclosureKey="no_partial_unstaking"
          title="No Partial Unstaking"
          description="Partial unstaking is not permitted. You can only unstake your entire balance."
        />
        <UnstakeV2VrtxRadioGroup
          selectedRadioId={selectedRadioId}
          setSelectedRadioId={setSelectedRadioId}
          instantUnstakeBurnAmountFraction={instantUnstakeBurnAmountFraction}
          instantUnstakeReceivedAmountFraction={
            instantUnstakeReceivedAmountFraction
          }
          unstakedLockPeriodDays={unstakedLockPeriodDays}
          disableButtons={disableButtons}
        />
        {showErrorPanel && (
          <UnstakeV2VrtxErrorPanel
            availableToUnstakeTimeMillis={availableToUnstakeTimeMillis}
          />
        )}
        <Divider />
        <UnstakeDialogVrtxBalance
          currentBalance={currentBalance}
          protocolTokenIconSrc={protocolTokenIconSrc}
        />
        <div className="flex flex-col gap-y-1.5">
          {summaryContent}
          <UnstakeV2VrtxSubmitButton state={buttonState} onClick={unstakeAll} />
        </div>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
