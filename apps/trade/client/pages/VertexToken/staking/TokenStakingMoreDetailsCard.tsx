import { BigDecimal } from '@vertex-protocol/client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { UserActionState } from 'client/hooks/subaccount/useUserActionState';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { useWithdrawUnstakedVrtx } from 'client/modules/rewards/hooks/useWithdrawUnstakedVrtx';
import { useStakingHistoryUrl } from 'client/pages/VertexToken/staking/hooks/useStakingHistoryUrl';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import Link from 'next/link';

interface Props {
  lastStakeTimeMillis: number | undefined;
  maxScoreTimeMillis: number | undefined;
  lastUnstakeTimeMillis: number | undefined;
  accountUnstakedLocked: BigDecimal | undefined;
  accountUnstakedClaimable: BigDecimal | undefined;
  userActionState: UserActionState;
}

export function TokenStakingMoreDetailsCard({
  accountUnstakedLocked,
  lastStakeTimeMillis,
  lastUnstakeTimeMillis,
  maxScoreTimeMillis,
  accountUnstakedClaimable,
  userActionState,
}: Props) {
  const stakingHistoryUrl = useStakingHistoryUrl();
  const {
    withdraw: onWithdrawUnstaked,
    isLoading,
    isSuccess,
  } = useWithdrawUnstakedVrtx();

  const actionDisabled =
    !accountUnstakedClaimable ||
    accountUnstakedClaimable?.isZero() ||
    userActionState === 'block_all';

  const buttonLabel = (() => {
    if (isLoading) {
      return 'Confirm Claim';
    }
    if (isSuccess) {
      return <ButtonStateContent.Success message="Claim Successful" />;
    }
    return 'Claim Unstaked';
  })();

  return (
    <div className="bg-background flex flex-col gap-y-4 rounded p-4">
      <RewardsCard.Header
        endElement={
          <RewardsCard.HeaderLinkButton
            as={Link}
            className="text-xs"
            color="white"
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
          <RewardsCard.StackedItem
            label="Last Stake Date"
            definitionId="stakingLastStakeDate"
            value={
              <>
                {formatTimestamp(lastStakeTimeMillis, {
                  formatSpecifier: TimeFormatSpecifier.MONTH_D,
                })}
              </>
            }
          />
          <RewardsCard.StackedItem
            label="Max Score Date"
            definitionId="stakingMaxScoreDate"
            value={
              <>
                {formatTimestamp(maxScoreTimeMillis, {
                  formatSpecifier: TimeFormatSpecifier.MONTH_D,
                })}
              </>
            }
          />
          <RewardsCard.StackedItem
            label="Last Unstake Date"
            definitionId="stakingLastUnstakeDate"
            value={
              <>
                {formatTimestamp(lastUnstakeTimeMillis, {
                  formatSpecifier: TimeFormatSpecifier.MONTH_D,
                })}
              </>
            }
          />
          <RewardsCard.MetricStackedItem
            label={
              <div className="flex items-baseline gap-x-1">
                Unstaked
                <span className="text-2xs text-text-tertiary uppercase">
                  Pending
                </span>
              </div>
            }
            definitionId="stakingUnstakePending"
            value={accountUnstakedLocked}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            symbol={VRTX_TOKEN_INFO.symbol}
          />
          <RewardsCard.MetricStackedItem
            label={
              <div className="flex items-baseline gap-x-1">
                Unstaked
                <span className="text-2xs text-text-tertiary uppercase">
                  Claimable
                </span>
              </div>
            }
            value={accountUnstakedClaimable}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            symbol={VRTX_TOKEN_INFO.symbol}
          />
        </RewardsCard.MetricsPane>
        <SecondaryButton
          size="sm"
          onClick={onWithdrawUnstaked}
          isLoading={isLoading}
          disabled={actionDisabled}
        >
          {buttonLabel}
        </SecondaryButton>
      </div>
    </div>
  );
}
