import {
  ARB_CHAIN_IDS,
  BASE_CHAIN_IDS,
  BLAST_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
  SEI_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { clientEnv } from 'common/environment/clientEnv';

export function useEnabledFeatures() {
  const isStakePageEnabled = clientEnv.base.brandName === 'vertex';
  const isStakeActionEnabled = useIsEnabledForChainIds(ARB_CHAIN_IDS);
  const isElectionMarketsEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...BASE_CHAIN_IDS,
  ]);

  const isBridgeEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...BASE_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
  ]);

  const isOnrampEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...BASE_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
    ...SEI_CHAIN_IDS,
  ]);

  const isFuulEnabled = useIsEnabledForBrand(['vertex']);

  const isVaultsEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
  ]);

  const isStatsLinkEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
    ...BASE_CHAIN_IDS,
    ...SEI_CHAIN_IDS,
  ]);

  const isLeaderboardEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
  ]);

  const isNotifiEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...BASE_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
  ]);

  const isExodusEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
  ]);

  return {
    isStakePageEnabled,
    isStakeActionEnabled,
    isBridgeEnabled,
    isOnrampEnabled,
    isFuulEnabled,
    isVaultsEnabled,
    isStatsLinkEnabled,
    isLeaderboardEnabled,
    isNotifiEnabled,
    isExodusEnabled,
    isElectionMarketsEnabled,
  };
}
