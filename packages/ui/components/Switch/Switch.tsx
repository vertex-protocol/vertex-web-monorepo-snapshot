import * as BaseSwitch from '@radix-ui/react-switch';
import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';

interface SwitchToggleProps {
  id: string;
  checked: boolean;
  disabled?: boolean;

  onCheckedChange(checked: boolean): void;
}

function SwitchToggle({
  id,
  checked,
  disabled,
  onCheckedChange,
}: SwitchToggleProps) {
  return (
    <BaseSwitch.Root
      className="data-[state=checked]:bg-accent bg-disabled border-stroke relative h-4 w-8 rounded-full border"
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
    >
      <BaseSwitch.Thumb
        className={joinClassNames(
          'bg-surface-card block h-3 w-3 rounded-full',
          'translate-x-px transition-transform duration-100',
          'will-change-transform data-[state=checked]:translate-x-[17px]',
        )}
      />
    </BaseSwitch.Root>
  );
}

export interface SwitchLabelProps extends WithChildren {
  id: string;
}

function SwitchLabel({ id, children }: SwitchLabelProps) {
  return (
    <label className="text-text-primary" htmlFor={id}>
      {children}
    </label>
  );
}

interface SwitchRowProps extends WithChildren, WithClassnames {
  disabled?: boolean;
}

function SwitchRow({ disabled, children, className }: SwitchRowProps) {
  return (
    <div
      className={joinClassNames(
        'flex items-center justify-between text-sm',
        disabled && 'pointer-events-none cursor-not-allowed opacity-50',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const Switch = {
  Toggle: SwitchToggle,
  Label: SwitchLabel,
  Row: SwitchRow,
};
