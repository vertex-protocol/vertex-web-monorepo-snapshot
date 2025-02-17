import { JsonRpcSigner } from 'ethers';
import { useMemo } from 'react';
import { useWalletClient } from 'wagmi';
import { ABSTRACT_CHAIN_ENVS } from '../../../consts';
import { PrimaryChainID } from '../../../types';
import { getPrimaryChain } from '../../../utils';
import { walletClientToSigner } from '../utils';

const ZK_CHAIN_IDS: number[] = [
  ...ABSTRACT_CHAIN_ENVS.map(getPrimaryChain),
].map((chain) => chain.id) satisfies PrimaryChainID[];

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  const isZk = useMemo(() => {
    const clientChainId = walletClient?.chain.id;
    return !!clientChainId && ZK_CHAIN_IDS.includes(clientChainId);
  }, [walletClient?.chain.id]);

  return useMemo(
    (): JsonRpcSigner | undefined =>
      walletClient ? walletClientToSigner(walletClient, isZk) : undefined,
    [isZk, walletClient],
  );
}
