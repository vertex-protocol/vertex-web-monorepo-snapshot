import { ZeroAddress } from 'ethers';
import { useEVMContext } from '@vertex-protocol/web-data';

// Gives a relevant key for localstorage user states, defaults to zero address if not connected
export function useLocalStorageAddressKey() {
  const {
    connectionStatus: { address },
  } = useEVMContext();

  return address ?? ZeroAddress;
}
