import { TradingCompetitionPageHeader } from 'client/pages/TradingCompetition/components/TradingCompetitionPageHeader/TradingCompetitionPageHeader';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';

export function TradingCompetitionTierPageHeader() {
  const { currentContestTierData } = useTradingCompetitionContext();

  if (!currentContestTierData) {
    return null;
  }

  return (
    <TradingCompetitionPageHeader
      imageSrc={currentContestTierData.labelImageSrc}
      imageAlt={`Tier ${currentContestTierData.tier}`}
    />
  );
}
