import {
  RadioGroupItem,
  RadioGroupItemProps,
} from '@radix-ui/react-radio-group';
import { mergeClassNames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { CardButton } from '../Button';
import { RadioGroupIndicator } from './RadioGroupIndicator';

export interface RadioGroupCardProps<TIdentifier extends string>
  extends Omit<RadioGroupItemProps, 'title' | 'value'> {
  value: TIdentifier;
  title: ReactNode;
  active: boolean;
}

export function RadioGroupCard<TIdentifier extends string>({
  active,
  className,
  title,
  children,
  disabled,
  ...radioGroupProps
}: RadioGroupCardProps<TIdentifier>) {
  return (
    <RadioGroupItem asChild {...radioGroupProps}>
      <CardButton
        className={mergeClassNames(
          'flex flex-col items-stretch gap-y-2',
          'text-left text-sm',
          active ? 'bg-surface-2 border-accent' : 'bg-surface-1',
          className,
        )}
        disabled={disabled}
      >
        <div className="flex items-center justify-between">
          <div className="text-text-primary text-base">{title}</div>
          <RadioGroupIndicator active={active} />
        </div>
        {children}
      </CardButton>
    </RadioGroupItem>
  );
}
