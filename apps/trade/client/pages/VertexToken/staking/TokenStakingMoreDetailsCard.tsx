import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { UserActionState } from 'client/hooks/subaccount/useUserActionState';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { useWithdrawUnstakedVrtx } from 'client/modules/rewards/hooks/useWithdrawUnstakedVrtx';
import { useStakingHistoryUrl } from 'client/pages/VertexToken/staking/hooks/useStakingHistoryUrl';
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
            value={accountUnstakedClaimable}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            valueEndElement={VRTX_TOKEN_INFO.symbol}
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
