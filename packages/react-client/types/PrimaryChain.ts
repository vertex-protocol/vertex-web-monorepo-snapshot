import { CHAIN_ENV_TO_CHAIN } from '@vertex-protocol/client';

export const PRIMARY_CHAINS = Object.values(CHAIN_ENV_TO_CHAIN);

export const PRIMARY_CHAIN_IDS = PRIMARY_CHAINS.map((chain) => chain.id);

export type PrimaryChain = (typeof PRIMARY_CHAINS)[number];

export type PrimaryChainID = PrimaryChain['id'];
