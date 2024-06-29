import { useEnsAvatar, useEnsName } from 'wagmi';
import { useEVMContext } from '@vertex-protocol/react-client';
import { mainnet } from 'wagmi/chains';
import { Address } from 'viem';
import { normalize } from 'viem/ens';

export function useEnsProfile() {
  // only fetching ENS from mainnet as it's mainly used there and allows for easier testing
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const { data: ensName } = useEnsName({
    address: address as Address,
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
