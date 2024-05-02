import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import {
  BaseSelectTriggerProps,
  Select,
  SelectOptionProps,
  SelectOptionsProps,
} from './Select';

interface TriggerProps extends BaseSelectTriggerProps {
  isOpen?: boolean;
}

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(function Trigger(
  { className, disabled, isOpen, ...rest },
  ref,
) {
  return (
    <Select.Trigger
      className={mergeClassNames(
        'text-text-primary bg-surface-2 rounded-full px-1.5 text-sm opacity-100',
        isOpen && 'opacity-90',
        !disabled && 'hover:opacity-90',
        className,
      )}
      disabled={disabled}
      ref={ref}
      {...rest}
    />
  );
});

export interface InputSelectOptionProps extends SelectOptionProps {
  isSelected: boolean | undefined;
}

const Option = forwardRef<HTMLDivElement, InputSelectOptionProps>(
  function Option({ className, isSelected, ...rest }, ref) {
    return (
      <Select.Option
        className={mergeClassNames(
          'text-text-tertiary gap-x-1.5 text-sm',
          'hover:bg-surface-2 hover:text-text-primary',
          isSelected && 'bg-surface-card',
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);

const Options = forwardRef<HTMLDivElement, SelectOptionsProps>(function Options(
  { className, ...rest },
  ref,
) {
  return (
    <Select.Options
      className={mergeClassNames(
        'flex flex-col gap-y-1',
        'max-h-72 w-80 p-2 pb-0',
        className,
      )}
      viewportClassName="gap-y-1.5 flex flex-col pb-2"
      ref={ref}
      {...rest}
    />
  );
});

function OptionsHeader({ children, className }: WithClassnames<WithChildren>) {
  return (
    <div
      className={mergeClassNames(
        'flex items-center',
        'text-text-tertiary text-xs',
        'px-2 py-1',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const LargeNumberInputSelect = {
  Root: Select.Root,
  Trigger,
  Option,
  Options,
  OptionsHeader,
};
