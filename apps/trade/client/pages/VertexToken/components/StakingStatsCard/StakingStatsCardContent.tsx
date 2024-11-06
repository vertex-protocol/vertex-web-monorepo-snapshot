'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { useSwitchToProtocolTokenChainEnv } from 'client/hooks/util/useSwitchToProtocolTokenChainEnv';
import { StakingAprCard } from 'client/pages/VertexToken/components/StakingStatsCard/StakingAprCard/StakingAprCard';
import { StakingMoreDetailsCard } from 'client/pages/VertexToken/components/StakingStatsCard/StakingMoreDetailsCard/StakingMoreDetailsCard';
import { StakingTopBarItems } from 'client/pages/VertexToken/components/StakingStatsCard/StakingTopBarItems';

export function StakingStatsCardContent() {
  const {
    isOnProtocolTokenChainEnv,
    switchToProtocolTokenChainEnv,
    protocolTokenChainName,
    protocolTokenMetadata,
  } = useSwitchToProtocolTokenChainEnv();

  if (!isOnProtocolTokenChainEnv) {
    return (
      <div
        className={joinClassNames(
          'flex flex-col items-center gap-y-4',
          // Reducing top padding to account for the layout gap. This helps balance the layout.
          'pb-8 pt-3',
        )}
      >
        <p className="text-text-primary text-center text-sm lg:text-lg">
          {protocolTokenMetadata.token.symbol} staking is only available on{' '}
          {protocolTokenChainName}.
        </p>
        <PrimaryButton size="base" onClick={switchToProtocolTokenChainEnv}>
          Switch to {protocolTokenChainName}
        </PrimaryButton>
      </div>
    );
  }

  return (
    <>
      <StakingTopBarItems />
      <div className="flex flex-col gap-y-3">
        <StakingAprCard />
        <StakingMoreDetailsCard />
      </div>
    </>
  );
}
