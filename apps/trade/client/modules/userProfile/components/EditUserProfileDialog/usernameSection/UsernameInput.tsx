import { Button } from '@vertex-protocol/web-ui';
import { BaseInput } from 'client/components/Input/BaseInput';
import { CompactInput } from 'client/components/Input/CompactInput';
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
        <BaseInput.Label
          htmlFor={register.name}
          label="Username"
          className="text-text-secondary text-sm"
        />
        <Button
          className="text-accent text-xs"
          onClick={clearUsername}
          disabled={disabled}
        >
          Remove
        </Button>
      </div>
      <CompactInput
        id={register.name}
        type="text"
        placeholder="Enter Username"
        error={error}
        {...register}
      />
    </div>
  );
}
