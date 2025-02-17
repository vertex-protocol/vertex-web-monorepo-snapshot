'use client';

import { Divider } from '@vertex-protocol/web-ui';
import { useSwitchToProtocolTokenChainEnv } from 'client/hooks/util/useSwitchToProtocolTokenChainEnv';
import { AppPage } from 'client/modules/app/AppPage';
import { StakingMultichainSection } from 'client/pages/Staking/components/StakingMultichainSection/StakingMultichainSection';
import { StakingV1SectionContent } from 'client/pages/Staking/v1/StakingV1SectionContent';
import { StakingV2SectionContent } from 'client/pages/Staking/v2/StakingV2SectionContent';

export function VrtxStakingPage() {
  const { isOnProtocolTokenChainEnv } = useSwitchToProtocolTokenChainEnv();

  return (
    <AppPage.Content layoutWidth="sm">
      <AppPage.EarnHeader title="VRTX Staking" />
      <StakingV2SectionContent />
      {isOnProtocolTokenChainEnv && (
        <StakingV1SectionContent
          // Since this page has multiple sections, we are adding some padding to the top of the second section for balance.
          className="pt-4 lg:pt-2"
        />
      )}
      <Divider />
      <StakingMultichainSection />
    </AppPage.Content>
  );
}
