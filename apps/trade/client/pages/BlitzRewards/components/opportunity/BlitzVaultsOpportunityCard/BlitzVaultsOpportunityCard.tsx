import { Icons } from '@vertex-protocol/web-ui';
import { SKATE_VAULTS_BY_CHAIN } from 'client/modules/vaults/consts';
import { BlitzOpportunityCard } from 'client/pages/BlitzRewards/components/opportunity/BlitzOpportunityCard';
import { BlitzVaultsOpportunityCardContent } from 'client/pages/BlitzRewards/components/opportunity/BlitzVaultsOpportunityCard/BlitzVaultsOpportunityCardContent';
import { first } from 'lodash';
import { blast } from 'viem/chains';

export function BlitzVaultsOpportunityCard() {
  const vaultForApr = first(SKATE_VAULTS_BY_CHAIN[blast.id]);

  if (!vaultForApr) {
    return null;
  }

  return (
    <BlitzOpportunityCard
      title="Vaults"
      description="Earn by providing USDB to vaults"
      icon={Icons.Vault}
      content={
        <BlitzVaultsOpportunityCardContent
          vaultAddressForApr={vaultForApr.vaultAddress}
        />
      }
    />
  );
}