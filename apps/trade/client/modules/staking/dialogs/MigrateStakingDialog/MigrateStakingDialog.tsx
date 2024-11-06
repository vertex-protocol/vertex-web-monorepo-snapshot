import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  DiscList,
  formatTimestamp,
  Icons,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { WarningPanel } from 'client/components/WarningPanel';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { MigrateStakingSubmitButton } from 'client/modules/staking/dialogs/MigrateStakingDialog/MigrateStakingSubmitButton';
import { useMigrateStakingDialog } from 'client/modules/staking/dialogs/MigrateStakingDialog/useMigrateStakingDialog';

export function MigrateStakingDialog() {
  const { hide } = useDialog();
  const {
    bonusDeadlineMillis,
    migrationBonus,
    currentV1AmountStaked,
    estimatedV2Balance,
    migrationBonusFraction,
    buttonState,
    migrate,
    protocolTokenSymbol,
  } = useMigrateStakingDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        {protocolTokenSymbol} V2 Migration
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <DiscListWarningPanel
          protocolTokenSymbol={protocolTokenSymbol}
          bonusDeadlineMillis={bonusDeadlineMillis}
        />
        <div className="flex items-center justify-between">
          <ValueWithLabel.Vertical
            label="V1 Staking Balance"
            value={currentV1AmountStaked}
            valueEndElement={protocolTokenSymbol}
            numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
          />
          <Icons.ArrowRight size={24} className="text-positive" />
          <ValueWithLabel.Vertical
            label="V2 Staking Balance"
            value={estimatedV2Balance}
            className="items-end"
            valueEndElement={protocolTokenSymbol}
            numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
          />
        </div>
        <ValueWithLabel.Horizontal
          label="💫 Eligible Bonus"
          sizeVariant="sm"
          value={migrationBonusFraction}
          valueEndElement={`(${formatNumber(migrationBonus, {
            formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
          })} ${protocolTokenSymbol})`}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <MigrateStakingSubmitButton
          buttonState={buttonState}
          onClick={migrate}
        />
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

function DiscListWarningPanel({
  protocolTokenSymbol,
  bonusDeadlineMillis,
}: {
  protocolTokenSymbol: string;
  bonusDeadlineMillis: number | undefined;
}) {
  return (
    <WarningPanel>
      <DiscList.Container>
        <DiscList.Item>
          {protocolTokenSymbol} staking has been upgraded
        </DiscList.Item>
        <DiscList.Item>V1 positions no longer receive rewards</DiscList.Item>
        <DiscList.Item>
          Your existing V1 position will remain until you migrate or unstake
        </DiscList.Item>
        <DiscList.Item>
          If you migrate before{' '}
          {formatTimestamp(bonusDeadlineMillis, {
            formatSpecifier: TimeFormatSpecifier.E_MMM_D_HH_12H,
          })}
          , you will be eligible for a bonus of 2.5 - 7% based on your current
          multiplier.
        </DiscList.Item>
      </DiscList.Container>
    </WarningPanel>
  );
}
