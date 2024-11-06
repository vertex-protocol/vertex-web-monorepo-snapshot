import { useSubaccountLeaderboardState } from 'client/hooks/query/tradingCompetition/useSubaccountLeaderboardState';
import { TradingCompetitionCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionCard';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { EligibleParticipantCardContent } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionParticipantCard/EligibleParticipantCardContent';
import { IneligibleParticipantCardContent } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionParticipantCard/IneligibleParticipantCardContent';

export function TradingCompetitionParticipantCard() {
  const {
    currentContest,
    currentContestStatus,
    contests,
    config: { chainEnv, contestIds },
  } = useTradingCompetitionContext();
  const { data: participantData } = useSubaccountLeaderboardState({
    chainEnv,
    contestIds,
  });

  if (!contests || !currentContest) {
    return null;
  }

  const contestParticipantData =
    participantData?.participant[currentContest.contestId];

  const content = (() => {
    // We only show rank stats if they're eligible (`participant` is not `null`).
    // Using non-strict comparison on `null` so we also avoid rendering when we
    // don't yet have a `participant` response.
    if (contestParticipantData != null) {
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
