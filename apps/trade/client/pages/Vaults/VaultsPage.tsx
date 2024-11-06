import { AppPage } from 'client/modules/app/AppPage';
import { BlitzSkateRewardsDisclosure } from 'client/pages/Vaults/components/skate/BlitzSkateRewardsDisclosure';
import { SkateVaultCards } from 'client/pages/Vaults/components/skate/SkateVaultCards';

export function VaultsPage() {
  return (
    <AppPage.Content>
      <AppPage.EarnHeader
        title="Vaults"
        description="Deposits and withdrawals are done through your wallet, not your Vertex account."
      />
      <BlitzSkateRewardsDisclosure />
      <SkateVaultCards />
    </AppPage.Content>
  );
}
