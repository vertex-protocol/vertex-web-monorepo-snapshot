import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import {
  ComponentProps,
  forwardRef,
  InputHTMLAttributes,
  useId,
  useMemo,
} from 'react';

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, BaseInputProps>(function Component(
  { id, className, type, disabled, ...rest }: BaseInputProps,
  ref,
) {
  const generatedId = useId();
  const inputId = useMemo(() => id ?? generatedId, [generatedId, id]);

  return (
    <input
      id={inputId}
      name={inputId}
      className={mergeClassNames(
        // `w-full` to prevent the input from expanding to fit its `size` attribute
        'w-full bg-transparent',
        'placeholder:text-text-tertiary text-text-primary',
        disabled && 'cursor-not-allowed',
        className,
      )}
      autoComplete="off"
      disabled={disabled}
      step="any"
      type={type}
      ref={ref}
      {...rest}
    />
  );
});

export interface BaseInputContainerProps extends WithChildren, WithClassnames {
  isError?: boolean;
  disabled?: boolean;
}

function Container({
  isError,
  children,
  className,
  disabled,
}: BaseInputContainerProps) {
  return (
    <div
      className={mergeClassNames(
        'border',
        isError
          ? 'border-negative'
          : 'focus-within:border-accent border-transparent',
        disabled ? 'cursor-not-allowed opacity-80' : 'opacity-100',
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface InputLabelProps extends ComponentProps<'label'> {
  label: string;
  definitionId?: DefinitionTooltipID;
}

function Label({
  label,
  className,
  definitionId,
  ...labelProps
}: InputLabelProps) {
  return (
    <DefinitionTooltip
      decoration={{ icon: true }}
      definitionId={definitionId}
      contentWrapperClassName={mergeClassNames(
        'text-text-tertiary text-xs',
        className,
      )}
      portal
    >
      <label {...labelProps}>{label}</label>
    </DefinitionTooltip>
  );
}

export const BaseInput = {
  Input,
  Container,
  Label,
};
