import { BigDecimal } from '@vertex-protocol/utils';
import { atom } from 'jotai';

export const perpPriceInputAtom = atom<BigDecimal | undefined>(undefined);

export type PositionsFilterOptionID = 'all' | 'current_market';

export const positionsSelectedFilterIdAtom =
  atom<PositionsFilterOptionID>('all');
