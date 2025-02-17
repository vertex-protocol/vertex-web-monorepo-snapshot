import { useEVMContext } from '@vertex-protocol/react-client';

/**
 * Util hook for determining whether the user should be allowed to execute actions
 **/
export function useCanUserExecute(): boolean {
  const { chainStatus, connectionStatus } = useEVMContext();

  return connectionStatus.type === 'connected' && !chainStatus.isIncorrectChain;
}
