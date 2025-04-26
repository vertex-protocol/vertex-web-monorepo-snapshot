// Item type for UseSelectParams input
export type SelectOptionID = string | number;

export type SelectValueWithIdentifier = { selectId: SelectOptionID };

export type SelectValue = SelectOptionID | SelectValueWithIdentifier;

export interface SelectOption<TValue extends SelectValue> {
  value: TValue;
  label: string | number;
}

// Option that the Select component expects - has a string `value` property that Radix requires
export interface SelectComponentOption<TValue extends SelectValue> {
  value: string;
  original: TValue;
  label: string | number;
}

export interface UseSelectParams<TValue extends SelectValue> {
  defaultOpen?: boolean;
  selectedValue: TValue | undefined;
  onSelectedValueChange: (value: TValue) => void;
  options: Readonly<SelectOption<TValue>[]>;
}

export interface UseSelect<TValue extends SelectValue> {
  open: boolean;
  onValueChange: (value: string) => void;
  value: string | undefined;
  label?: string | number;
  onOpenChange: (open: boolean) => void;
  selectOptions: SelectComponentOption<TValue>[];
  selectedOption: SelectOption<TValue> | undefined;
}
