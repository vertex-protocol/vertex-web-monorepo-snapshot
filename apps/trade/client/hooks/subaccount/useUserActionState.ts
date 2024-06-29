import { useRequiresDeposit } from 'client/hooks/subaccount/useRequiresDeposit';
import { useEVMContext } from '@vertex-protocol/react-client';

export type UserActionState = 'allow_all' | 'allow_deposit' | 'block_all';

/**
 * Util hook for determining whether the user should be allowed to execute actions
 **/
export function useUserActionState(): UserActionState {
  const { chainStatus, connectionStatus } = useEVMContext();
  const requiresDeposit = useRequiresDeposit();

  const isBlocked =
    chainStatus.isIncorrectChain || connectionStatus.type !== 'connected';

  if (isBlocked) {
    return 'block_all';
  }

  return requiresDeposit ? 'allow_deposit' : 'allow_all';
}
