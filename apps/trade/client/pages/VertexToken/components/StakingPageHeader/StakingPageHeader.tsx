'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { useSwitchToProtocolTokenChainEnv } from 'client/hooks/util/useSwitchToProtocolTokenChainEnv';
import { AppPage } from 'client/modules/app/AppPage';
import { StakingAvgApr } from 'client/pages/VertexToken/components/StakingPageHeader/StakingAvgApr';
import { StakingHeaderTokenMetrics } from 'client/pages/VertexToken/components/StakingPageHeader/StakingHeaderTokenMetrics';
import { StakingTradeButton } from 'client/pages/VertexToken/components/StakingPageHeader/StakingTradeButton';

export function StakingPageHeader() {
  const { isOnProtocolTokenChainEnv } = useSwitchToProtocolTokenChainEnv();

  if (!isOnProtocolTokenChainEnv) {
    return <AppPage.EarnHeader title="VRTX Token" />;
  }

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-4',
        'sm:flex-row sm:items-end sm:justify-between',
      )}
    >
      <div className="flex items-end justify-between gap-x-4">
        <AppPage.EarnHeader title="VRTX Token" />
        <StakingAvgApr />
      </div>
      <Divider className="sm:hidden" />
      <div className="flex flex-col gap-4 sm:flex-row">
        <StakingHeaderTokenMetrics />
        <StakingTradeButton />
      </div>
    </div>
  );
}
