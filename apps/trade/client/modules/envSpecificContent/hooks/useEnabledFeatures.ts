import {
  ABSTRACT_CHAIN_ENVS,
  ARB_CHAIN_ENVS,
  AVAX_CHAIN_ENVS,
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

interface UseEnabledFeatures {
  isSonicPointsPageEnabled: boolean;
  isSpotTradingEnabled: boolean;
  isStakingPageEnabled: boolean;
  isStakeActionEnabled: boolean;
  isVlpEnabled: boolean;
  isBridgeEnabled: boolean;
  isOnrampEnabled: boolean;
  isFuulPageEnabled: boolean;
  isFuulVolumeTrackingEnabled: boolean;
  isVaultsEnabled: boolean;
  isNotifiEnabled: boolean;
  isFunkitEnabled: boolean;
}

export function useEnabledFeatures(): UseEnabledFeatures {
  const isSonicPointsPageEnabled = useIsEnabledForChainEnvs(SONIC_CHAIN_ENVS);
  const isStakingPageEnabled = useIsEnabledForBrand(['vertex']);
  const isStakeActionEnabled = useIsEnabledForChainEnvs(ARB_CHAIN_ENVS);
  const isSpotTradingEnabled = !useIsEnabledForChainEnvs(NO_SPOT_CHAIN_ENVS);

  const isBridgeEnabled = useIsEnabledForChainEnvs([
    ...ARB_CHAIN_ENVS,
    ...BASE_CHAIN_ENVS,
    ...MANTLE_CHAIN_ENVS,
    ...BLAST_CHAIN_ENVS,
    ...AVAX_CHAIN_ENVS,
  ]);

  const isOnrampEnabled = useIsEnabledForChainEnvs([
    ...ARB_CHAIN_ENVS,
    ...BASE_CHAIN_ENVS,
    ...MANTLE_CHAIN_ENVS,
    ...SEI_CHAIN_ENVS,
    ...AVAX_CHAIN_ENVS,
  ]);

  const isFuulPageEnabled = useIsEnabledForBrand(['vertex']);
  const isFuulVolumeTrackingEnabled = useIsEnabledForChainEnvs([
    ...ARB_CHAIN_ENVS,
    ...MANTLE_CHAIN_ENVS,
    ...BASE_CHAIN_ENVS,
    ...SEI_CHAIN_ENVS,
    ...SONIC_CHAIN_ENVS,
    ...ABSTRACT_CHAIN_ENVS,
    ...AVAX_CHAIN_ENVS,
  ]);

  const isVaultsEnabled = useIsEnabledForChainEnvs([
    ...ARB_CHAIN_ENVS,
    ...MANTLE_CHAIN_ENVS,
    ...BLAST_CHAIN_ENVS,
  ]);

  const isNotifiEnabled = useIsEnabledForChainEnvs([
    ...ARB_CHAIN_ENVS,
    ...BASE_CHAIN_ENVS,
    ...BLAST_CHAIN_ENVS,
    ...MANTLE_CHAIN_ENVS,
    ...SONIC_CHAIN_ENVS,
    ...SEI_CHAIN_ENVS,
    ...AVAX_CHAIN_ENVS,
  ]);

  // Funkit is enabled for addresses that end in a numeric character
  // const {
  //   currentSubaccount: { address },
  // } = useSubaccountContext();
  // const isValidFunkitAddress = Boolean(address && address.match(/\d$/));
  // const isFunkitEnabled =
  //   useIsEnabledForChainEnvs(FUNKIT_DEPOSIT_CHAIN_ENVS) && isValidFunkitAddress;
  const isFunkitEnabled = false;

  const isVlpEnabled =
    useIsEnabledForBrand(['vertex']) &&
    clientEnv.base.enableExperimentalFeatures;

  return {
    isSonicPointsPageEnabled,
    isSpotTradingEnabled,
    isStakingPageEnabled,
    isStakeActionEnabled,
    isBridgeEnabled,
    isOnrampEnabled,
    isFuulPageEnabled,
    isFuulVolumeTrackingEnabled,
    isVaultsEnabled,
    isNotifiEnabled,
    isFunkitEnabled,
    isVlpEnabled,
  };
}
