import { useEVMContext } from '@vertex-protocol/react-client';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';
import { useEnsAvatar, useEnsName } from 'wagmi';

export function useEnsProfile() {
  // only fetching ENS from mainnet as it's mainly used there and allows for easier testing
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
    chainId: mainnet.id,
  });

  return {
    ensName,
    ensAvatar,
  };
}
