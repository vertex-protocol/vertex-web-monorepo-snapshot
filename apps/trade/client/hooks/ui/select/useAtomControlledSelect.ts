import { PrimitiveAtom, useAtom } from 'jotai';
import { useSelect, UseSelectParams } from '@vertex-protocol/web-ui';

export interface UseAtomControlledSelectParams<
  TIdentifier extends string,
  TValue,
> extends Omit<
    UseSelectParams<TIdentifier, TValue>,
    'onSelectedValueChange' | 'selectedValue'
  > {
  valueAtom: PrimitiveAtom<TValue>;
}

export function useAtomControlledSelect<TIdentifier extends string, TValue>({
  valueAtom,
  ...rest
}: UseAtomControlledSelectParams<TIdentifier, TValue>) {
  const [value, setValue] = useAtom(valueAtom);

  return useSelect({
    onSelectedValueChange: setValue,
    selectedValue: value,
    ...rest,
  });
}
