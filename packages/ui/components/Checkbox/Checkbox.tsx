import * as RadixCheckbox from '@radix-ui/react-checkbox';
import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';

function CheckboxCheck({
  checked,
  className,
  ...rest
}: RadixCheckbox.CheckboxProps) {
  return (
    <RadixCheckbox.Root
      {...rest}
      className={joinClassNames(
        'flex h-4 w-4 items-center justify-center rounded-sm',
        checked
          ? 'bg-overlay-accent/80'
          : 'ring-disabled bg-transparent ring-1 ring-inset',
        className,
      )}
      checked={checked}
    >
      <RadixCheckbox.Indicator>
        <Icons.MdCheck className="text-text-primary" size={16} />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}

export interface CheckboxLabelProps extends WithChildren {
  id: string;
}

function CheckboxLabel({ id, children }: CheckboxLabelProps) {
  return (
    <label className="text-text-secondary" htmlFor={id}>
      {children}
    </label>
  );
}

interface CheckboxRowProps extends WithChildren<WithClassnames> {
  disabled?: boolean;
}

function CheckboxRow({ disabled, children, className }: CheckboxRowProps) {
  return (
    <div
      className={joinClassNames(
        'flex items-center gap-x-2 text-xs',
        disabled && 'pointer-events-none cursor-not-allowed brightness-50',
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
