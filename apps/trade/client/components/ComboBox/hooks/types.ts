import {
  SelectComponentOption,
  SelectOption,
  UseSelect,
  UseSelectParams,
} from '@vertex-protocol/web-ui';

export interface ComboBoxOption<TIdentifier extends string, TValue>
  extends SelectOption<TIdentifier, TValue> {}

export interface ComboBoxComponentOption<TValue>
  extends SelectComponentOption<TValue> {}

export interface UseComboBoxParams<TIdentifier extends string, TValue>
  extends Omit<UseSelectParams<TIdentifier, TValue>, 'options'> {
  options:
    | ComboBoxOption<TIdentifier, TValue>[]
    | Readonly<ComboBoxOption<TIdentifier, TValue>[]>;
}

export interface UseComboBox<TIdentifier extends string, TValue>
  extends Omit<
    UseSelect<TIdentifier, TValue>,
    'selectOptions' | 'selectedOption'
  > {
  query: string;
  setQuery: (query: string) => void;
  selectOptions: ComboBoxComponentOption<TValue>[];
  selectedOption: ComboBoxOption<TIdentifier, TValue> | undefined;
}
