import {
  ARB_CHAIN_ENVS,
  BASE_CHAIN_ENVS,
  BLAST_CHAIN_ENVS,
  MANTLE_CHAIN_ENVS,
  SEI_CHAIN_ENVS,
  SONIC_CHAIN_ENVS,
} from '@vertex-protocol/react-client';
import { NO_SPOT_CHAIN_ENVS } from 'client/modules/envSpecificContent/consts/noSpotChainEnvs';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';
import { useIsEnabledForChainEnvs } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainEnvs';
import { clientEnv } from 'common/environment/clientEnv';

export function useEnabledFeatures() {
  const isSonicPointsPageEnabled = useIsEnabledForChainEnvs(SONIC_CHAIN_ENVS);
  const isStakingPageEnabled = useIsEnabledForBrand(['vertex']);
  const isStakeActionEnabled = useIsEnabledForChainEnvs(ARB_CHAIN_ENVS);
  const isSpotTradingEnabled = !useIsEnabledForChainEnvs(NO_SPOT_CHAIN_ENVS);

  const isBridgeEnabled = useIsEnabledForChainEnvs([
    ...ARB_CHAIN_ENVS,
    ...BASE_CHAIN_ENVS,
    ...MANTLE_CHAIN_ENVS,
    ...BLAST_CHAIN_ENVS,
  ]);

  const isOnrampEnabled = useIsEnabledForChainEnvs([
    ...ARB_CHAIN_ENVS,
    ...BASE_CHAIN_ENVS,
    ...MANTLE_CHAIN_ENVS,
    ...SEI_CHAIN_ENVS,
  ]);

  const isFuulEnabled = useIsEnabledForBrand(['vertex']);

  const isVaultsEnabled = useIsEnabledForChainEnvs([
    ...ARB_CHAIN_ENVS,
    ...MANTLE_CHAIN_ENVS,
    ...BLAST_CHAIN_ENVS,
  ]);

  const isNotifiEnabled = useIsEnabledForChainEnvs([
    ...ARB_CHAIN_ENVS,
    ...BASE_CHAIN_ENVS,
    ...BLAST_CHAIN_ENVS,
  ]);

  const isIsoMarginEnabled = clientEnv.base.enableExperimentalFeatures;

  return {
    isSonicPointsPageEnabled,
    isSpotTradingEnabled,
    isStakingPageEnabled,
    isStakeActionEnabled,
    isBridgeEnabled,
    isOnrampEnabled,
    isFuulEnabled,
    isVaultsEnabled,
    isNotifiEnabled,
    isIsoMarginEnabled,
  };
}
