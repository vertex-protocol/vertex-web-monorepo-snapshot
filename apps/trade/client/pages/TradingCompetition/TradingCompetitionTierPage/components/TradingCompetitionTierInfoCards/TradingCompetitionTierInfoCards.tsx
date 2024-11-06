import { useIsMobile } from 'client/hooks/ui/breakpoints';
import { TradingCompetitionInfoCards } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionInfoCards';
import { TradingCompetitionTierDetailsCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionTierDetailsCard';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { TradingCompetitionParticipantCard } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionParticipantCard/TradingCompetitionParticipantCard';
import Image from 'next/image';

export function TradingCompetitionTierInfoCards() {
  const { currentContest, currentContestTierData } =
    useTradingCompetitionContext();
  const isMobile = useIsMobile();

  if (!currentContest || !currentContestTierData) {
    return null;
  }

  return (
    <TradingCompetitionInfoCards>
      {/* We flip the order of these cards on mobile / desktop. */}
      {isMobile && <TradingCompetitionParticipantCard />}
      <TradingCompetitionTierDetailsCard
        header={
          <Image
            src={currentContestTierData.labelImageSrc}
            alt={`Tier ${currentContestTierData.tier}`}
          />
        }
        minEligibilityThreshold={currentContest.minEligibilityThreshold}
        minVolume={currentContest.minRequiredVolume}
        numWinners={currentContestTierData.participantPrizes.length}
        prizePool={currentContestTierData.prizePool}
      />
      {!isMobile && <TradingCompetitionParticipantCard />}
    </TradingCompetitionInfoCards>
  );
}
