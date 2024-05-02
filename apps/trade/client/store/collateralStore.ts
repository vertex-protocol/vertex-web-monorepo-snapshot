import { atom } from 'jotai';

export const depositProductIdAtom = atom<number>(0);

export const withdrawProductIdAtom = atom<number>(0);

export const provideLiquidityProductIdAtom = atom<number | undefined>(
  undefined,
);
export const withdrawLiquidityProductIdAtom = atom<number | undefined>(
  undefined,
);
