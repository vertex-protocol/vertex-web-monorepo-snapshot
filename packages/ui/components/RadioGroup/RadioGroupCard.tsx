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
          // In this specific case there is a bit of visual lag when selecting a radio card
          // so we remove the transition to make it feel more responsive, yet keep the hover
          // transition so the hover effect isn't rigid
          'transition-none hover:transition hover:duration-200',
          active
            ? 'bg-surface-2 hover:bg-surface-2 ring-accent'
            : 'hover:bg-surface-2 bg-surface-1',
          className,
        )}
        disabled={disabled}
      >
        <div className="flex items-center justify-between">
          <div className="text-text-primary text-base font-medium">{title}</div>
          <RadioGroupIndicator active={active} />
        </div>
        {children}
      </CardButton>
    </RadioGroupItem>
  );
}
