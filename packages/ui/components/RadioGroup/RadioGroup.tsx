import { RadioGroupProps, Root } from '@radix-ui/react-radio-group';
import { RadioGroupCard } from './RadioGroupCard';
import { RadioGroupIndicator } from './RadioGroupIndicator';

export const RadioGroup = {
  Root,
  Card: RadioGroupCard,
  Indicator: RadioGroupIndicator,
};

export interface RadioGroupRootProps<TIdentifier>
  extends Omit<RadioGroupProps, 'value' | 'onValueChange'> {
  value: TIdentifier | undefined;
  onValueChange: (value: TIdentifier) => void;
}
