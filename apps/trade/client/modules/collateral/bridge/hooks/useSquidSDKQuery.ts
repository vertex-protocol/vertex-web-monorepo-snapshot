import { useQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';

export function useSquidSDKQuery() {
  // Testing/Dev Notes: https://www.notion.so/vertexprotocol/Axelar-Bridge-Dev-Testing-3d32f3cfbd634902beb0d499755469c4?pvs=4
  // Flow is only testable in mainnet environment
  const baseUrl = 'https://apiplus.squidrouter.com';

  const { data } = useQuery({
    queryKey: createQueryKey('squidSdk', baseUrl),
    queryFn: async () => {
      // For some reason, a dynamic import here (as opposed to a standard import) is required for us to put the bridge dialog within `<AppDialogs/>`
      // Without this, the app never mounts and is instead stuck in an initial loading state
      const SquidSDK = await import('@0xsquid/sdk');
      const squid = new SquidSDK.Squid({
        baseUrl,
        integratorId: 'vertex-protocol-sdk',
      });

      await squid.init();

      return squid;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  return data;
}
