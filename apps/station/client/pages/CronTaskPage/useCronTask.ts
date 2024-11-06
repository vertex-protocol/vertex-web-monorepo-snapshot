import { useCronTasks } from 'client/hooks/queries/useCronTasks';
import { useMemo } from 'react';

interface Params {
  id: number;
}

export function useCronTask({ id }: Params) {
  const { data: activeCronTasks, isLoading: isLoadingActiveCronTasks } =
    useCronTasks({
      active: true,
    });
  const { data: inactiveCronTasks, isLoading: isLoadingInactiveCronTasks } =
    useCronTasks({
      active: false,
    });

  const mappedData = useMemo(() => {
    return (
      activeCronTasks?.find((task) => task.id === id) ??
      inactiveCronTasks?.find((task) => task.id === id)
    );
  }, [activeCronTasks, id, inactiveCronTasks]);

  return {
    data: mappedData,
    isLoading: isLoadingActiveCronTasks || isLoadingInactiveCronTasks,
  };
}
