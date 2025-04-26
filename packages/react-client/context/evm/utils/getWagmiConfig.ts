import { Chain, createClient } from 'viem';
import { Config, createConfig, http } from 'wagmi';
import { WagmiConfigParams } from '../types';

/**
 * Creates client required for wagmi context
 */
export function getWagmiConfig(params: WagmiConfigParams): Config {
  return createConfig({
    chains: params.supportedChains as unknown as readonly [Chain, ...Chain[]],
    connectors: params.connectors,
    client({ chain }) {
      return createClient({ chain, transport: http() });
    },
    ssr: true,
  });
}
