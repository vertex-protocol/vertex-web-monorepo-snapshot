import { TradingCompetitionParticipantCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionParticipantCard';
import { TradingCompetitionPrizeAndTimelineCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionPrizeAndTimelineCard';

export function TradingCompetitionInfoCards() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <TradingCompetitionPrizeAndTimelineCard />
      <TradingCompetitionParticipantCard />
    </div>
  );
}
