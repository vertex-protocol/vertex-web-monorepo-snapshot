import { FieldValues, UseFormReturn } from 'react-hook-form';

export function watchFormError<TValues extends FieldValues, TError>(
  form: UseFormReturn<TValues>,
  valueKey: keyof TValues,
): TError | undefined {
  const error = form.formState.errors[valueKey];
  return error?.message as TError;
}
