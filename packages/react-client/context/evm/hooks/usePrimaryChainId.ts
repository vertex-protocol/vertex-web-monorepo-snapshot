import { PrimaryChainID } from '../../../types';
import { useEVMContext } from '../EVMContext';

export function usePrimaryChainId(): PrimaryChainID {
  return useEVMContext().primaryChain.id;
}
