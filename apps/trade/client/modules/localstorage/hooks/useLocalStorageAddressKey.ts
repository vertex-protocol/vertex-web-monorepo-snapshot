import { useEVMContext } from '@vertex-protocol/react-client';
import { zeroAddress } from 'viem';

// Gives a relevant key for localstorage user states, defaults to zero address if not connected
export function useLocalStorageAddressKey() {
  const {
    connectionStatus: { address },
  } = useEVMContext();

  return address ?? zeroAddress;
}
