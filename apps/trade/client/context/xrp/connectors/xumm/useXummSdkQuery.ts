import { useQuery } from '@tanstack/react-query';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import type { Xumm } from 'xumm';

export function useXummSdkQuery() {
  return useQuery({
    queryKey: ['xummSdk'],
    queryFn: async (): Promise<Xumm> => {
      // Xumm automatically detects client/server-side envs, so we need to import in a client context (the query fn)
      // otherwise its serverside initialization will fail
      const { Xumm } = await import('xumm');
      const instance = new Xumm(SENSITIVE_DATA.xummApiKey);

      return new Promise((resolve) =>
        instance.on('ready', () => resolve(instance)),
      );
    },
    // TODO: Disable unless on XRP
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
}
