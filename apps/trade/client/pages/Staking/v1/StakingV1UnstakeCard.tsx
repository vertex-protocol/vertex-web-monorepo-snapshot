import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { formatTimestamp, TimeFormatSpecifier } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { StakingCard } from 'client/pages/Staking/components/StakingCard';
import { StakingSecondaryClaimButton } from 'client/pages/Staking/components/StakingSecondaryClaimButton';
import { STAKING_DESKTOP_ACTION_BUTTON_WIDTH } from 'client/pages/Staking/consts';

interface Props {
  accountUnstakedLocked: BigDecimal | undefined;
  accountUnstakedClaimable: BigDecimal | undefined;
  unstakedUnlockTimeMillis: number | undefined;
  isUnstakedLocked: boolean;
  isUnstakedClaimable: boolean;
  withdrawClaimable(): void;
  isWithdrawUnstakedTxLoading: boolean;
  protocolTokenSymbol: string;
}

export function StakingV1UnstakeCard({
  accountUnstakedLocked,
  accountUnstakedClaimable,
  unstakedUnlockTimeMillis,
  isUnstakedClaimable,
  isUnstakedLocked,
  withdrawClaimable,
  isWithdrawUnstakedTxLoading,
  protocolTokenSymbol,
}: Props) {
  return (
    <StakingCard
      titleContent="Unstaked"
      contentClassName="lg:flex-row lg:items-end lg:justify-between"
    >
      <div
        className={joinClassNames(
          'flex flex-col gap-y-4',
          'sm:flex-row sm:items-center sm:gap-x-8',
        )}
      >
        {isUnstakedClaimable && (
          <ValueWithLabel.Vertical
            sizeVariant="lg"
            label="Unstaked Claimable"
            value={accountUnstakedClaimable}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            valueEndElement={protocolTokenSymbol}
          />
        )}
        {isUnstakedLocked && (
          <>
            <ValueWithLabel.Vertical
              sizeVariant="lg"
              label="Unstaked Unlocking"
              value={accountUnstakedLocked}
              numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
              valueEndElement={protocolTokenSymbol}
            />
            <ValueWithLabel.Vertical
              sizeVariant="lg"
              label="Unlock Date"
              valueContent={formatTimestamp(unstakedUnlockTimeMillis, {
                formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
              })}
            />
          </>
        )}
      </div>
      <StakingSecondaryClaimButton
        className={STAKING_DESKTOP_ACTION_BUTTON_WIDTH}
        isLoading={isWithdrawUnstakedTxLoading}
        onClick={withdrawClaimable}
        disabled={!isUnstakedClaimable}
      >
        {isWithdrawUnstakedTxLoading ? 'Confirm Claim' : 'Claim Unstaked'}
      </StakingSecondaryClaimButton>
    </StakingCard>
  );
}
