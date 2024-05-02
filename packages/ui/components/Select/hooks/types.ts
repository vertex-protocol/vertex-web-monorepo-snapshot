// Item type for UseSelectParams input
export interface SelectOption<TIdentifier extends string, TValue> {
  id: TIdentifier;
  value: TValue;
  label: string | number;
}

// Option that the Select component expects - has a string `value` property that Radix requires
export interface SelectComponentOption<TValue> {
  value: string;
  original: TValue;
  label: string | number;
}

export interface UseSelectParams<TIdentifier extends string, TValue> {
  defaultOpen: boolean;
  selectedValue: TValue | undefined;
  onSelectedValueChange: (value: TValue) => void;
  options:
    | SelectOption<TIdentifier, TValue>[]
    | Readonly<SelectOption<TIdentifier, TValue>[]>;
}

export interface UseSelect<TIdentifier extends string, TValue> {
  open: boolean;
  onValueChange: (value: TIdentifier) => void;
  value: TIdentifier | undefined;
  defaultOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectOptions: SelectComponentOption<TValue>[];
  selectedOption: SelectOption<TIdentifier, TValue> | undefined;
}
