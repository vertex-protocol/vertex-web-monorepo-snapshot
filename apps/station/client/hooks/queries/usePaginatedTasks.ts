import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { createQueryKey, useEVMContext } from '@vertex-protocol/react-client';
import { taskQueryKey } from 'client/hooks/queries/useTask';
import { useStationApiUrls } from 'client/hooks/useStationApiUrls';
import { get } from 'lodash';
import { fetchStationApi } from 'stationApi/fetchStationApi';
import { QueryTasksData, QueryTasksParams } from 'stationApi/queryTypes';

interface Params {
  pageSize: number;
  pending: boolean;
}

export function paginatedTasksQueryKey(
  chainEnv?: ChainEnv,
  pageSize?: number,
  pending?: boolean,
) {
  return createQueryKey('paginatedTasks', chainEnv, pageSize, pending);
}

export function usePaginatedTasks({ pageSize, pending }: Params) {
  const { primaryChainEnv } = useEVMContext();
  const queryClient = useQueryClient();
  const stationApiUrls = useStationApiUrls();

  return useInfiniteQuery({
    queryKey: paginatedTasksQueryKey(primaryChainEnv, pageSize, pending),
    initialPageParam: <string | undefined>undefined,
    queryFn: async ({ pageParam: maxUpdateTime }) => {
      // Fetch 1 more than the requested page size to determine pagination metadata, as nextCursor is inclusive
      const limit = pageSize + 1;

      const { tasks } = await fetchStationApi<QueryTasksParams, QueryTasksData>(
        stationApiUrls.query,
        {
          limit,
          max_update_time: maxUpdateTime,
          pending,
          type: 'tasks',
        },
      );
      const hasMore = tasks.length > pageSize;

      // Pre-load query cache for individual tasks
      tasks.forEach((task) => {
        queryClient.setQueryData(
          taskQueryKey(primaryChainEnv, task.task_id),
          task,
        );
      });

      return {
        meta: {
          hasMore,
          // Cursor is inclusive, the last item in page should be the start of the next page if hasMore is true
          nextCursor: hasMore ? get(tasks, pageSize)?.updated_at : undefined,
        },
        tasks: tasks.slice(0, pageSize),
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage == null || !lastPage.meta.nextCursor) {
        // No more entries
        return null;
      }
      return lastPage.meta.nextCursor;
    },
  });
}
