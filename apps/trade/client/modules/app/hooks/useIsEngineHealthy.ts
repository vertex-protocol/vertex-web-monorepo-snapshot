import { useEngineStatus } from 'client/hooks/query/useEngineStatus';

export function useIsEngineHealthy(): boolean {
  const { data: engineStatus, isLoading } = useEngineStatus();

  // Optimistic - if first load, then assume healthy
  if (isLoading) {
    return true;
  }

  return engineStatus === 'active';
}
