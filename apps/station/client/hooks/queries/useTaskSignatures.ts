import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { createQueryKey, useEVMContext } from '@vertex-protocol/react-client';
import { useStationApiUrls } from 'client/hooks/useStationApiUrls';
import { fetchStationApi } from 'stationApi/fetchStationApi';
import {
  QueryTaskSignaturesData,
  QueryTaskSignaturesParams,
} from 'stationApi/queryTypes';

interface Params {
  id: number;
}

export function taskSignaturesQueryKey(chainEnv?: ChainEnv, id?: number) {
  return createQueryKey('taskSignatures', chainEnv, id);
}

export function useTaskSignatures({ id }: Params) {
  const { primaryChainEnv } = useEVMContext();
  const stationApiUrls = useStationApiUrls();

  return useQuery({
    queryKey: taskSignaturesQueryKey(primaryChainEnv, id),
    queryFn: async () => {
      const { signatures } = await fetchStationApi<
        QueryTaskSignaturesParams,
        QueryTaskSignaturesData
      >(stationApiUrls.query, {
        type: 'task_signatures',
        task_id: id,
      });

      return signatures;
    },
  });
}
