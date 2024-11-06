'use client';

import { usePrimaryChainId } from '@vertex-protocol/react-client';
import { ChainSpecificContent } from 'client/modules/envSpecificContent/ChainSpecificContent';
import { ARB_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { SKATE_VAULTS_BY_CHAIN } from 'client/modules/vaults/consts';
import { ElixirComingSoonCard } from 'client/pages/Vaults/components/ElixirComingSoonCard';
import { SkateVaultCard } from 'client/pages/Vaults/components/skate/SkateVaultCard';

const VAULT_CARD_MIN_HEIGHT_CLASSNAME = 'min-h-[305px]';

export function SkateVaultCards() {
  const primaryChainId = usePrimaryChainId();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SKATE_VAULTS_BY_CHAIN[primaryChainId].map(
        ({ vaultAddress, vaultName, claimRewardsLink }) => (
          <SkateVaultCard
            key={vaultName}
            className={VAULT_CARD_MIN_HEIGHT_CLASSNAME}
            vaultAddress={vaultAddress}
            vaultName={vaultName}
            claimRewardsLink={claimRewardsLink}
          />
        ),
      )}
      <ChainSpecificContent enabledChainIds={ARB_CHAIN_IDS}>
        <ElixirComingSoonCard className={VAULT_CARD_MIN_HEIGHT_CLASSNAME} />
      </ChainSpecificContent>
    </div>
  );
}
