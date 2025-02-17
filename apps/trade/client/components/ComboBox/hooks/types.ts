import {
  SelectComponentOption,
  SelectOption,
  SelectValue,
  UseSelect,
  UseSelectParams,
} from '@vertex-protocol/web-ui';

export interface ComboBoxOption<TValue extends SelectValue>
  extends SelectOption<TValue> {}

export interface ComboBoxComponentOption<TValue extends SelectValue>
  extends SelectComponentOption<TValue> {}

export interface UseComboBoxParams<TValue extends SelectValue>
  extends Omit<UseSelectParams<TValue>, 'options'> {
  options: Readonly<ComboBoxOption<TValue>[]>;
}

export interface UseComboBox<TValue extends SelectValue>
  extends Omit<UseSelect<TValue>, 'selectOptions' | 'selectedOption'> {
  query: string;
  setQuery: (query: string) => void;
  selectOptions: ComboBoxComponentOption<TValue>[];
  selectedOption: ComboBoxOption<TValue> | undefined;
}
