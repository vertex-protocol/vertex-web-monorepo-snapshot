import { VRTX_TOKEN_INFO } from '@vertex-protocol/metadata';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { formatTimestamp, TimeFormatSpecifier } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { useStakingMoreDetails } from 'client/pages/VertexToken/components/StakingStatsCard/hooks/useStakingMoreDetails';
import { StakingWithdrawUnstakedButton } from 'client/pages/VertexToken/components/StakingStatsCard/StakingMoreDetailsCard/StakingWithdrawUnstakedButton';
import Link from 'next/link';

export function StakingMoreDetailsCard() {
  const {
    accountUnstakedClaimable,
    accountUnstakedLocked,
    lastStakeTimeMillis,
    lastUnstakeTimeMillis,
    maxScoreTimeMillis,
    withdrawUnstakedIsLoading,
    withdrawUnstakedIsSuccess,
    claimButtonDisabled,
    onWithdrawUnstaked,
    stakingHistoryUrl,
  } = useStakingMoreDetails();

  return (
    <div className="bg-background flex flex-col gap-y-4 rounded p-4">
      <RewardsCard.Header
        endElement={
          <RewardsCard.HeaderLinkButton
            as={Link}
            className="text-xs"
            colorVariant="primary"
            href={stakingHistoryUrl}
            disabled={!stakingHistoryUrl}
            external
            withExternalIcon
          >
            Staking History
          </RewardsCard.HeaderLinkButton>
        }
        contentWrapperClassName="lg:text-base"
      >
        More Details
      </RewardsCard.Header>
      <div className="flex flex-col gap-y-6 lg:flex-row lg:items-end lg:justify-between">
        <RewardsCard.MetricsPane>
          <ValueWithLabel.Vertical
            label="Last Stake Date"
            tooltip={{ id: 'stakingLastStakeDate' }}
            valueContent={formatTimestamp(lastStakeTimeMillis, {
              formatSpecifier: TimeFormatSpecifier.MONTH_D,
            })}
          />
          <ValueWithLabel.Vertical
            label="Max Score Date"
            tooltip={{ id: 'stakingMaxScoreDate' }}
            valueContent={formatTimestamp(maxScoreTimeMillis, {
              formatSpecifier: TimeFormatSpecifier.MONTH_D,
            })}
          />
          <ValueWithLabel.Vertical
            label="Last Unstake Date"
            tooltip={{ id: 'stakingLastUnstakeDate' }}
            valueContent={formatTimestamp(lastUnstakeTimeMillis, {
              formatSpecifier: TimeFormatSpecifier.MONTH_D,
            })}
          />
          <ValueWithLabel.Vertical
            label={
              <>
                Unstaked <span className="text-2xs uppercase">Pending</span>
              </>
            }
            labelClassName="items-baseline"
            tooltip={{ id: 'stakingUnstakePending' }}
            value={accountUnstakedLocked}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            valueEndElement={VRTX_TOKEN_INFO.symbol}
          />
          <ValueWithLabel.Vertical
            label={
              <>
                Unstaked&nbsp;
                <span className="text-2xs uppercase">Claimable</span>
              </>
            }
            labelClassName="items-baseline"
            value={accountUnstakedClaimable}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            valueEndElement={VRTX_TOKEN_INFO.symbol}
          />
        </RewardsCard.MetricsPane>
        <StakingWithdrawUnstakedButton
          disabled={claimButtonDisabled}
          onClick={onWithdrawUnstaked}
          isLoading={withdrawUnstakedIsLoading}
          isSuccess={withdrawUnstakedIsSuccess}
        />
      </div>
    </div>
  );
}
