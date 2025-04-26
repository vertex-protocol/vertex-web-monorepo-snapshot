import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons, Pill, SecondaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { StakingCard } from 'client/pages/Staking/components/StakingCard';
import { StakingUsdValueEndElement } from 'client/pages/Staking/components/StakingUsdValueEndElement';
import { STAKING_DESKTOP_ACTION_BUTTON_WIDTH } from 'client/pages/Staking/consts';

interface Props {
  amountStaked: BigDecimal | undefined;
  amountStakedValueUsd: BigDecimal | undefined;
  protocolTokenSymbol: string;
}

export function StakingV1PositionCard({
  amountStaked,
  amountStakedValueUsd,
  protocolTokenSymbol,
}: Props) {
  const { show } = useDialog();

  return (
    <StakingCard titleContent="Position">
      <ValueWithLabel.Vertical
        sizeVariant="lg"
        label="Amount Staked"
        value={amountStaked}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        valueEndElement={
          <StakingUsdValueEndElement
            protocolTokenSymbol={protocolTokenSymbol}
            usdValue={amountStakedValueUsd}
          />
        }
      />
      <div
        className={joinClassNames(
          'flex flex-col gap-4',
          'lg:flex-row lg:items-center lg:justify-between',
        )}
      >
        <Pill colorVariant="warning" sizeVariant="xs" borderRadiusVariant="sm">
          <Icons.WarningCircle className="size-4" /> V1 staking no longer earns
          rewards.
        </Pill>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <SecondaryButton
            className={STAKING_DESKTOP_ACTION_BUTTON_WIDTH}
            onClick={() => show({ type: 'migrate_vrtx', params: {} })}
          >
            Migrate
          </SecondaryButton>
          <SecondaryButton
            className={STAKING_DESKTOP_ACTION_BUTTON_WIDTH}
            onClick={() => show({ type: 'unstake_v1_vrtx', params: {} })}
          >
            Unstake
          </SecondaryButton>
        </div>
      </div>
    </StakingCard>
  );
}
