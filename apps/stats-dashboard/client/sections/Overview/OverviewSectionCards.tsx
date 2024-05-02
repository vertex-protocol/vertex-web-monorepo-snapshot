import { StatsCard } from 'client/components/StatsCard';
import { StatsCardContainer } from 'client/components/StatsCardContainer';

export function OverviewSectionCards() {
  return (
    <StatsCardContainer className="lg:grid-cols-4">
      <StatsCard title="Total Trading Volume" value={12} />
      <StatsCard title="Total Volume (24h)" value={12} />
      <StatsCard title="Total Users" value={12} />
      <StatsCard title="Fees (24h)" value={12} />
    </StatsCardContainer>
  );
}
