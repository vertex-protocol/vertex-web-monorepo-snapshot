'use client';

import { TradingCompetitionInfoCards } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionInfoCards';
import { TradingCompetitionTierDetailsCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionTierDetailsCard';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import Image from 'next/image';

export function TradingCompetitionLandingInfoCards() {
  const {
    contests,
    config: { tierDataByContestId },
  } = useTradingCompetitionContext();

  return (
    <TradingCompetitionInfoCards>
      {contests?.map(
        ({ contestId, minRequiredVolume, minEligibilityThreshold }) => {
          const tierData = tierDataByContestId?.[contestId];

          if (!tierData) {
            return null;
          }

          return (
            <TradingCompetitionTierDetailsCard
              key={contestId}
              header={
                <Image
                  src={tierData.labelImageSrc}
                  alt={`Tier ${tierData.tier}`}
                />
              }
              minEligibilityThreshold={minEligibilityThreshold}
              minVolume={minRequiredVolume}
              numWinners={tierData.participantPrizes.length}
              prizePool={tierData.prizePool}
              href={tierData.href}
            />
          );
        },
      )}
    </TradingCompetitionInfoCards>
  );
}
