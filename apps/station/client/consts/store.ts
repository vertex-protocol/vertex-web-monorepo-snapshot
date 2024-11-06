import { ChainEnv } from '@vertex-protocol/client';
import { createLocalStorageAtom } from '@vertex-protocol/web-common';
import { atom } from 'jotai';

export const DEFAULT_PRIMARY_CHAIN_ENV: ChainEnv = 'arbitrumTestnet';

export const primaryChainEnvAtom = createLocalStorageAtom<ChainEnv>(
  'vertex',
  'primaryChainEnv',
  DEFAULT_PRIMARY_CHAIN_ENV,
);

export const tasksPageIsPendingFilterAtom = atom(true);

export const cronPageIsActiveFilterAtom = atom(true);
