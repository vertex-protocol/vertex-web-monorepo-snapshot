import { StatsCard } from 'client/components/StatsCard';
import { StatsCardContainer } from 'client/components/StatsCardContainer';

export function SpotSectionCards() {
  return (
    <StatsCardContainer className="lg:grid-cols-3">
      <StatsCard title="Total Spot Volume" value={12} />
      <StatsCard title="Spot Volume (24h)" value={12} />
      <StatsCard title="Spot Trades" value={12} />
    </StatsCardContainer>
  );
}
