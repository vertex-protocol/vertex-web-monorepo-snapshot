import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { CounterPill } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { ReferralEarningsCard } from 'client/pages/VertexReferrals/components/ReferralEarningsCard/ReferralEarningsCard';
import { ReferralsReferTradersCard } from 'client/pages/VertexReferrals/components/ReferralsReferTradersCard/ReferralsReferTradersCard';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { ReferralsOverviewCard } from './components/ReferralsOverviewCard/ReferralsOverviewCard';
import { ReferralsRewardsLeaderboardTable } from './components/ReferralsRewardsLeaderboardTable/ReferralsRewardsLeaderboardTable';
import { usePastProgramReferralRewards } from './hooks/usePastProgramReferralRewards';
import { useReferralsPage } from './hooks/useReferralsPage';

export function VertexReferralsPage() {
  const {
    claimableRewardsUsdc,
    claimedRewardsUsdc,
    commissionsEarnedUsdc,
    disableClaim,
    disableCustomizeLink,
    disableConfirmReferral,
    numReferredUsers,
    payoutToken,
    rank,
    rebatesEarnedUsdc,
    referralCode,
    referralCodeForSession,
    referredVolumeUsdc,
    referrerForAddress,
    rewardsChainEnv,
    tier,
    totalRewardsEarnedUsdc,
    volumeAmountSymbol,
  } = useReferralsPage();

  return (
    <AppPage.Root
      routeName="Referrals"
      contentWrapperClassName={joinClassNames(
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
      )}
    >
      <AppPage.Content
        // Max page width from Figma
        className="max-w-[1100px]"
      >
        <PageTitle />
        {/*grid-cols-1 is required to contain overflow for referral link bar in ReferralsReferTradersCard*/}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            <ReferralsOverviewCard
              className="flex-1"
              numReferredUsers={numReferredUsers}
              referredVolumeUsdc={referredVolumeUsdc}
              tier={tier}
              volumeAmountSymbol={volumeAmountSymbol}
            />
            <ReferralsReferTradersCard
              referralCode={referralCode}
              disableCustomizeLink={disableCustomizeLink}
              payoutToken={payoutToken}
            />
          </div>
          <ReferralEarningsCard
            referrerForAddress={referrerForAddress}
            totalRewardsEarnedUsdc={totalRewardsEarnedUsdc}
            commissionsEarnedUsdc={commissionsEarnedUsdc}
            rebatesEarnedUsdc={rebatesEarnedUsdc}
            claimableRewardsUsdc={claimableRewardsUsdc}
            claimedRewardsUsdc={claimedRewardsUsdc}
            referralCodeForSession={referralCodeForSession}
            payoutToken={payoutToken}
            disableClaim={disableClaim}
            disableConfirmReferral={disableConfirmReferral}
            rewardsChainEnv={rewardsChainEnv}
          />
        </div>
        <div className="flex flex-col gap-y-2 pt-2">
          <LeaderboardHeading rank={rank} />
          <ReferralsRewardsLeaderboardTable
            payoutToken={payoutToken}
            volumeAmountSymbol={volumeAmountSymbol}
          />
        </div>
      </AppPage.Content>
    </AppPage.Root>
  );
}

function PageTitle() {
  const pastProgramReferralRewards = usePastProgramReferralRewards();

  return (
    <div className="flex flex-col items-start gap-y-2 sm:flex-row sm:items-end sm:justify-between">
      <AppPage.EarnHeader title="Referrals" />
      <ValueWithLabel.Horizontal
        sizeVariant="sm"
        tooltip={{ id: 'referralsPastProgramRewards' }}
        label="Past program rewards:"
        value={pastProgramReferralRewards}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        valueEndElement={VRTX_TOKEN_INFO.symbol}
      />
    </div>
  );
}

function LeaderboardHeading({ rank }: { rank: number | null | undefined }) {
  return (
    <div className="flex items-center gap-x-3">
      <div className="text-text-primary text-xl">Leaderboard</div>
      {rank && (
        <CounterPill className="py-1 text-sm">
          Your rank:{' '}
          <span className="text-text-primary">
            {formatNumber(rank, {
              formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
            })}
          </span>
        </CounterPill>
      )}
    </div>
  );
}
