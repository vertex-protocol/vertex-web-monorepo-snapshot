import { joinClassNames } from '@vertex-protocol/web-common';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { BlastPointsCard } from 'client/pages/BlitzPoints/components/BlastPointsCard';
import { BlitzPointsCard } from 'client/pages/BlitzPoints/components/BlitzPointsCard';
import { BlitzReferralLinkBar } from 'client/pages/BlitzPoints/components/BlitzReferralLinkBar';
import { ClaimInitialPointsCard } from 'client/pages/BlitzPoints/components/ClaimInitialPointsCollapsible/ClaimInitialPointsCard';
import { GalxeCard } from 'client/pages/BlitzPoints/components/GalxeCard';
import { useBlitzPointsPage } from 'client/pages/BlitzPoints/hooks/useBlitzPointsPage';

export function BlitzPointsPage() {
  const {
    blastGold,
    blastPoints,
    referralCode,
    showInitialClaimCard,
    dismissInitialClaimCard,
    hasClaimedInitialPoints,
    hasInitialPoints,
    initialDropConditionsResponse,
    numCompletedInitialClaimSteps,
    numTotalInitialClaimSteps,
    blitzTradingPoints,
    blitzClaimedInitialPoints,
    blitzTotalPoints,
    blitzReferralPoints,
  } = useBlitzPointsPage();

  return (
    <AppPage.Root
      routeName="Points"
      contentWrapperClassName={joinClassNames(
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
      )}
    >
      <AppPage.Content className="max-w-[1100px]">
        <AppPage.EarnHeader
          title="Points"
          description="Earn points by trading and referring your friends."
        />
        {showInitialClaimCard && (
          <ClaimInitialPointsCard
            initialDropConditionsResponse={initialDropConditionsResponse}
            hasClaimedInitialPoints={hasClaimedInitialPoints}
            blitzInitialPoints={blitzClaimedInitialPoints}
            numCompletedSteps={numCompletedInitialClaimSteps}
            numTotalSteps={numTotalInitialClaimSteps}
            onDismiss={dismissInitialClaimCard}
          />
        )}
        <div className="flex flex-col gap-y-2 sm:gap-y-4">
          <h2 className="text-text-secondary text-left">Your referral link</h2>
          <BlitzReferralLinkBar referralCode={referralCode} />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <BlitzPointsCard
            totalPoints={blitzTotalPoints}
            tradingPoints={blitzTradingPoints}
            referralPoints={blitzReferralPoints}
            initialPoints={blitzClaimedInitialPoints}
            hasClaimedInitialPoints={hasClaimedInitialPoints}
            hasInitialPoints={hasInitialPoints}
          />
          <BlastPointsCard points={blastPoints} gold={blastGold} />
        </div>
        <GalxeCard />
      </AppPage.Content>
    </AppPage.Root>
  );
}
