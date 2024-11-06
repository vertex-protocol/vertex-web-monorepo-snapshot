import { useEVMContext } from '@vertex-protocol/react-client';
import { STATION_ENDPOINTS } from 'stationApi/endpoints';

export function useStationApiUrls() {
  const { primaryChainEnv } = useEVMContext();

  const baseEndpoint = STATION_ENDPOINTS[primaryChainEnv];

  return {
    query: `${baseEndpoint}/query`,
    execute: `${baseEndpoint}/execute`,
  };
}
