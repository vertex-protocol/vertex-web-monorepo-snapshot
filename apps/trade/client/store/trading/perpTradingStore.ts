import { BigDecimal } from '@vertex-protocol/utils';
import { atom } from 'jotai';

export const perpPriceInputAtom = atom<BigDecimal | undefined>(undefined);
