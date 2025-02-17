import {
  BrowserProvider,
  FallbackProvider,
  JsonRpcProvider,
  JsonRpcSigner,
} from 'ethers';
import { Account, Chain, Client, Transport } from 'viem';
import { BrowserProvider as ZkBrowserProvider } from 'zksync-ethers';

// From https://wagmi.sh/react/ethers-adapters

/**
 * Converts a viem public client to an ethers provider
 * @param publicClient
 * @return Ethers provider
 */
export function publicClientToProvider(publicClient: Client<Transport, Chain>) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network),
    );
    if (providers.length === 1) return providers[0];
    return new FallbackProvider(providers);
  }
  return new JsonRpcProvider(transport.url, network);
}

/**
 * Converts a viem wallet client to an ethers signer
 * @param walletClient
 * @param isZk - Whether the wallet client is associated with a ZK chain, if true, uses BrowserProvider from zksync-ethers
 * @return Ethers signer
 */
export function walletClientToSigner(
  walletClient: Client<Transport, Chain, Account>,
  isZk: boolean,
) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const ProviderConstructor = isZk ? ZkBrowserProvider : BrowserProvider;
  const provider = new ProviderConstructor(transport, network);
  return new JsonRpcSigner(provider, account.address);
}
