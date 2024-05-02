import { StatsCard } from 'client/components/StatsCard';
import { StatsCardContainer } from 'client/components/StatsCardContainer';

export function PerpsSectionCards() {
  return (
    <StatsCardContainer className="lg:grid-cols-4">
      <StatsCard title="Total Perp Volume" value={12} />
      <StatsCard title="Perp Volume (24h)" value={12} />
      <StatsCard title="Open Interest" value={12} />
      <StatsCard title="Perp Trades" value={12} />
    </StatsCardContainer>
  );
}
