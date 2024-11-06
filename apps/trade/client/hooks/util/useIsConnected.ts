import { useEVMContext } from '@vertex-protocol/react-client';

export function useIsConnected() {
  const { connectionStatus } = useEVMContext();

  return connectionStatus.type === 'connected';
}
