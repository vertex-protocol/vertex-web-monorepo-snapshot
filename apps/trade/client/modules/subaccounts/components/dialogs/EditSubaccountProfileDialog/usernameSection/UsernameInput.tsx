import { CompactInput, Input } from '@vertex-protocol/web-ui';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<SubaccountProfile>;
  validateUsername: (username: string) => string | undefined;
  error: ReactNode;
}

export function UsernameInput({ form, error, validateUsername }: Props) {
  const register = form.register('username', {
    validate: validateUsername,
  });

  return (
    <div className="flex flex-col gap-y-3">
      <Input.Label className="text-xs" htmlFor={register.name}>
        Account Name
      </Input.Label>
      <CompactInput
        {...register}
        id={register.name}
        type="text"
        placeholder="Enter Account Name"
        errorTooltipContent={error}
      />
    </div>
  );
}
