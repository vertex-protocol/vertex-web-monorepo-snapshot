import { BigDecimal } from '@vertex-protocol/utils';
import { atom } from 'jotai';

export const spotPriceInputAtom = atom<BigDecimal | undefined>(undefined);

export type BalancesFilterOptionID = 'all' | 'nonzero' | 'current_market';

export const balancesSelectedFilterIdAtom = atom<BalancesFilterOptionID>('all');
