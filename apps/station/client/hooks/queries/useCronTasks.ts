import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { createQueryKey, useEVMContext } from '@vertex-protocol/react-client';
import { useStationApiUrls } from 'client/hooks/useStationApiUrls';
import { fetchStationApi } from 'stationApi/fetchStationApi';
import {
  QueryCronTasksData,
  QueryCronTasksParams,
} from 'stationApi/queryTypes';

interface Params {
  active: boolean;
}

export function cronTasksQueryKey(chainEnv?: ChainEnv, active?: boolean) {
  return createQueryKey('cronTasks', chainEnv, active);
}

export function useCronTasks({ active }: Params) {
  const { primaryChainEnv } = useEVMContext();
  const stationApiUrls = useStationApiUrls();

  return useQuery({
    queryKey: cronTasksQueryKey(primaryChainEnv, active),
    queryFn: async () => {
      const { cron_tasks } = await fetchStationApi<
        QueryCronTasksParams,
        QueryCronTasksData
      >(stationApiUrls.query, {
        type: 'cron_tasks',
        active,
      });

      return cron_tasks;
    },
  });
}
