'use client';

import { ARB_CHAIN_ENVS, useEVMContext } from '@vertex-protocol/react-client';
import { ChainSpecificContent } from 'client/modules/envSpecificContent/ChainSpecificContent';
import { SKATE_VAULTS_BY_CHAIN_ENV } from 'client/modules/vaults/consts';
import { ElixirVaultsCard } from 'client/pages/Vaults/components/ElixirVaultsCard';
import { SkateVaultCard } from 'client/pages/Vaults/components/skate/SkateVaultCard';

const VAULT_CARD_MIN_HEIGHT_CLASSNAME = 'min-h-[305px]';

export function SkateVaultCards() {
  const { primaryChainEnv } = useEVMContext();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SKATE_VAULTS_BY_CHAIN_ENV[primaryChainEnv]?.map(
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
      <ChainSpecificContent enabledChainEnvs={ARB_CHAIN_ENVS}>
        <ElixirVaultsCard className={VAULT_CARD_MIN_HEIGHT_CLASSNAME} />
      </ChainSpecificContent>
    </div>
  );
}
