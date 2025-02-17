import { defineChain } from 'viem';

export const sonicTestnet = defineChain({
  id: 57_054,
  name: 'Sonic Blaze Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  rpcUrls: {
    default: { http: ['https://rpc.blaze.soniclabs.com'] },
  },
  blockExplorers: {
    default: {
      name: 'Sonic Testnet Explorer',
      url: 'https://testnet.soniclabs.com/',
    },
  },
  contracts: {
    multicall3: {
      address: '0x6FDAd85621b738a4258883559B0fa0228F6d8445',
      blockCreated: 897325,
    },
  },
  testnet: true,
});

export const sonic = defineChain({
  id: 146,
  name: 'Sonic',
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  rpcUrls: {
    default: { http: ['https://rpc.soniclabs.com'] },
  },
  blockExplorers: {
    default: {
      name: 'Sonic Explorer',
      url: 'https://sonicscan.org/',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 60,
    },
  },
  testnet: false,
});
