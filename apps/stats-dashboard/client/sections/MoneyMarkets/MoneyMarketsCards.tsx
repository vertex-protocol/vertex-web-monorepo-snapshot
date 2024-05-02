import { StatsCard } from 'client/components/StatsCard';
import { StatsCardContainer } from 'client/components/StatsCardContainer';

export function MoneyMarketsCards() {
  return (
    <StatsCardContainer className="lg:grid-cols-3">
      <StatsCard title="Total TVL" value={12} />
      <StatsCard title="Deposits (24h)" value={12} />
      <StatsCard title="Withdrawals (24h)" value={12} />
    </StatsCardContainer>
  );
}
