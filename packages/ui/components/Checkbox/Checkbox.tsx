import * as RadixCheckbox from '@radix-ui/react-checkbox';
import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { SizeVariant } from '../../types';
import { getStateOverlayClassNames } from '../../utils';
import { Icons } from '../Icons';

type CheckboxSizeVariant = Extract<SizeVariant, 'xs' | 'sm'>;

interface CheckboxCheckProps extends RadixCheckbox.CheckboxProps {
  sizeVariant: CheckboxSizeVariant;
  disabled?: boolean;
}

function CheckboxCheck({
  checked,
  className,
  sizeVariant,
  disabled,
  ...rest
}: CheckboxCheckProps) {
  const stateOverlayClassNames = getStateOverlayClassNames({
    disabled,
    active: checked === true,
    borderRadiusVariant: 'sm',
  });

  const sizeClassNames = {
    xs: 'size-4',
    sm: 'size-5',
  }[sizeVariant];

  const iconSize = {
    xs: 12,
    sm: 14,
  }[sizeVariant];

  return (
    <RadixCheckbox.Root
      {...rest}
      className={joinClassNames(
        'flex items-center justify-center rounded-sm border transition-colors',
        'disabled:border-disabled disabled:cursor-not-allowed',
        checked
          ? 'bg-overlay-accent/80 border-overlay-accent/80'
          : 'hover:border-text-primary border-text-tertiary',
        stateOverlayClassNames,
        sizeClassNames,
        className,
      )}
      disabled={disabled}
      checked={checked}
    >
      <RadixCheckbox.Indicator>
        <Icons.Check className="text-background" size={iconSize} />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}

export interface CheckboxLabelProps extends WithChildren {
  id: string;
  sizeVariant: CheckboxSizeVariant;
}

function CheckboxLabel({ id, children, sizeVariant }: CheckboxLabelProps) {
  const sizeClassNames = {
    xs: 'text-xs',
    sm: 'text-sm',
  }[sizeVariant];

  return (
    <label className={sizeClassNames} htmlFor={id}>
      {children}
    </label>
  );
}

function CheckboxRow({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div
      className={joinClassNames(
        'text-text-primary flex items-center gap-x-2',
        'has-[:disabled]:text-text-tertiary',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const Checkbox = {
  Check: CheckboxCheck,
  Label: CheckboxLabel,
  Row: CheckboxRow,
};
