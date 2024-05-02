import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

export function Form({
  children,
  ...rest
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  return (
    // Enforce noValidate to disable native validation, since we handle it manually.
    <form noValidate {...rest}>
      {children}
    </form>
  );
}
