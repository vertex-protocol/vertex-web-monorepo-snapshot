import { WithClassnames } from '@vertex-protocol/web-common';
import classNames from 'classnames';

import { EmailSignUpSubmitButton } from './EmailSignUpButton';
import { useEmailSignUp } from './useEmailSignUp';

export function EmailSignUpForm({ className }: WithClassnames) {
  const {
    isSuccess,
    onSubmit,
    emailForm,
    validateEmail,
    formError,
    disableSubmitButton,
  } = useEmailSignUp();

  const formContent = isSuccess ? (
    <div
      className={classNames(
        'flex h-full flex-1 items-center justify-center bg-purple-900',
        'text-white-800 font-dmSans text-sm font-medium',
      )}
    >
      Thanks! Check inbox for confirmation.
    </div>
  ) : (
    <>
      <input
        className="flex-1 bg-transparent pl-4 text-sm text-white outline-none placeholder:text-sm"
        {...emailForm.register('email', {
          validate: validateEmail,
        })}
      />
      <EmailSignUpSubmitButton
        disabled={disableSubmitButton}
        formError={formError}
      />
    </>
  );

  return (
    <form
      onSubmit={emailForm.handleSubmit(onSubmit)}
      className={classNames(
        'relative flex h-12 w-full text-white transition-colors sm:w-80',
        'bg-black-800 overflow-hidden rounded-lg',
        'ring-2 ring-transparent focus-within:ring-purple-800',
        formError === 'invalid_email'
          ? 'ring-red-900 focus-within:ring-red-900'
          : 'mask',
        className,
      )}
    >
      {formContent}
    </form>
  );
}
