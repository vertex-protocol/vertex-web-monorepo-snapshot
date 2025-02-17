import { useSubaccountLeaderboardRegistrationState } from 'client/hooks/query/tradingCompetition/useSubaccountLeaderboardRegistrationState';
import { useSubaccountLeaderboardState } from 'client/hooks/query/tradingCompetition/useSubaccountLeaderboardState';
import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import { TradingCompetitionCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionCard';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { EligibleParticipantCardContent } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionParticipantCard/EligibleParticipantCardContent';
import { IneligibleParticipantCardContent } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionParticipantCard/IneligibleParticipantCardContent';
import { RegisterParticipantCardContent } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionParticipantCard/RegisterParticipantCardContent';

export function TradingCompetitionParticipantCard() {
  const {
    currentContest,
    currentContestStatus,
    contests,
    config: { chainEnv, contestIds },
    currentContestTierData,
  } = useTradingCompetitionContext();
  const { data: participantData, isLoading: isParticipantDataLoading } =
    useSubaccountLeaderboardState({
      chainEnv,
      contestIds,
    });
  const { data: registrationData, isLoading: isRegistrationDataLoading } =
    useSubaccountLeaderboardRegistrationState({
      chainEnv,
      contestId: currentContest?.contestId,
    });

  // The register endpoint will only return data for subaccounts that have made
  // the initial min. deposit. So we use the below to determine alternative copy
  // and actions to show when this case is true.
  // We call this here so the fetch is initiated when this component renders,
  // rather than when `RegisterParticipantCardContent` renders.
  const requiresInitialDeposit = useRequiresInitialDeposit();

  if (!contests || !currentContest || !currentContestTierData) {
    return null;
  }

  // A participant may be in two states:
  //   1) Not registered for the current tier nor any other tier. In this case,
  //      the returned `registration` object is `null`.
  //   2) Not registered for the current tier but registered for another tier.
  //      In this case, even though we queried for registration data of the current
  //      tier, the response will still contain a `registration`, as different tiers
  //      are all considered part of the same leaderboard group.
  // The copy we show depends on which of these 2 states are true.
  // So here we determine the state, based on the logic laid out above.
  const isRegisteredForCurrentTier =
    registrationData?.registration?.contestId === currentContest.contestId;
  const isRegisteredForOtherTier = Boolean(
    registrationData?.registration && !isRegisteredForCurrentTier,
  );

  const contestParticipantData =
    participantData?.participant[currentContest.contestId];

  const content = (() => {
    if (isRegistrationDataLoading || isParticipantDataLoading) {
      return null;
    }

    if (!isRegisteredForCurrentTier && currentContestStatus !== 'done') {
      return (
        <RegisterParticipantCardContent
          contestId={currentContest.contestId}
          currentTier={currentContestTierData.tier}
          isRegisteredForOtherTier={isRegisteredForOtherTier}
          requiresInitialDeposit={requiresInitialDeposit}
          isContestPending={currentContestStatus === 'pending'}
        />
      );
    }

    // If contest data exists for participant, it indicates they're eligible.
    if (contestParticipantData) {
      return (
        <EligibleParticipantCardContent participant={contestParticipantData} />
      );
    }

    return (
      <IneligibleParticipantCardContent
        participantByContestId={participantData?.participant}
        currentContest={currentContest}
        contests={contests}
        contestStatus={currentContestStatus}
      />
    );
  })();

  return (
    <TradingCompetitionCard.Container className="flex flex-col">
      {content}
    </TradingCompetitionCard.Container>
  );
}
