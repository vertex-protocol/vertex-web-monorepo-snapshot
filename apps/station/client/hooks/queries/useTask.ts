import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { createQueryKey, useEVMContext } from '@vertex-protocol/react-client';
import { useStationApiUrls } from 'client/hooks/useStationApiUrls';
import { fetchStationApi } from 'stationApi/fetchStationApi';
import { QueryTaskData, QueryTaskParams } from 'stationApi/queryTypes';

interface Params {
  id: number;
}

export function taskQueryKey(chainEnv?: ChainEnv, id?: number) {
  return createQueryKey('task', chainEnv, id);
}

export function useTask({ id }: Params) {
  const { primaryChainEnv } = useEVMContext();
  const stationApiUrls = useStationApiUrls();

  return useQuery({
    queryKey: taskQueryKey(primaryChainEnv, id),
    queryFn: async () => {
      const { task } = await fetchStationApi<QueryTaskParams, QueryTaskData>(
        stationApiUrls.query,
        {
          type: 'task_info',
          task_id: id,
        },
      );

      return task;
    },
  });
}
