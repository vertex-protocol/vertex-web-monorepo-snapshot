import { StakingMultichainExchanges } from 'client/pages/Staking/components/StakingMultichainSection/StakingMultichainExchanges';
import { StakingMultichainHeader } from 'client/pages/Staking/components/StakingMultichainSection/StakingMultichainHeader';
import { StakingMultichainOpportunities } from 'client/pages/Staking/components/StakingMultichainSection/StakingMultichainOpportunities';

export function StakingMultichainSection() {
  return (
    <>
      <StakingMultichainHeader />
      <StakingMultichainOpportunities />
      <StakingMultichainExchanges />
    </>
  );
}
