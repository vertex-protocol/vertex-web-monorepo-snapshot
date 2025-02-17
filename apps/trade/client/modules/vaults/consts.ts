import { ChainEnv } from '@vertex-protocol/client';
import { Address } from 'viem';

export interface SkateVaultMetadata {
  vaultAddress: Address;
  vaultName: string;
  claimRewardsLink?: string;
}

export const SKATE_VAULTS_BY_CHAIN_ENV: Partial<
  Record<ChainEnv, SkateVaultMetadata[]>
> = {
  arbitrum: [
    {
      vaultAddress: '0x849Dd9D48337D1884C3bE140ba27CBe63B81d7be' as Address,
      vaultName: 'The Majors',
      claimRewardsLink:
        'https://app.skatefi.org/derivative/arbitrum/incentives/0x849Dd9D48337D1884C3bE140ba27CBe63B81d7be',
    },
  ],
  blast: [
    {
      vaultAddress: '0x508304f8f03b9F767Ea77Ac1ecd9c5F749d8D742' as Address,
      vaultName: 'The Majors',
    },
  ],
  mantle: [
    {
      vaultAddress: '0x34d63Ef1189d925F47876DCbf7496D0598c6156d' as Address,
      vaultName: 'The Majors',
      claimRewardsLink:
        'https://app.skatefi.org/derivative/mantle/incentives/0x34d63Ef1189d925F47876DCbf7496D0598c6156d',
    },
  ],
};
