import { Button, CompactInput, Input } from '@vertex-protocol/web-ui';
import { SavedUserProfile } from 'client/modules/userProfile/types';
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<SavedUserProfile>;
  validateUsername: (username: string) => string | undefined;
  watchedUsername: string;
  clearUsername: () => void;
  error: ReactNode;
}

export function UsernameInput({
  form,
  error,
  validateUsername,
  watchedUsername,
  clearUsername,
}: Props) {
  const disabled = !watchedUsername;

  const register = form.register('username', {
    validate: validateUsername,
  });

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between text-sm">
        <Input.Label className="text-xs" htmlFor={register.name}>
          Username
        </Input.Label>
        <Button
          className="text-accent text-xs"
          onClick={clearUsername}
          disabled={disabled}
        >
          Remove
        </Button>
      </div>
      <CompactInput
        {...register}
        id={register.name}
        type="text"
        placeholder="Enter Username"
        errorTooltipContent={error}
      />
    </div>
  );
}
