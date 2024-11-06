import { BigDecimal } from '@vertex-protocol/utils';
import { atom } from 'jotai';

export const spotPriceInputAtom = atom<BigDecimal | undefined>(undefined);
