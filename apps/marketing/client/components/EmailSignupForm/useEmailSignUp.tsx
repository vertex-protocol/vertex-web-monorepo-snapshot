import { emailValidator, InputValidatorFn } from '@vertex-protocol/web-common';
import { useMarketingEmailSignUp } from 'client/hooks/useMarketingEmailSignup';
import { watchFormError } from 'client/utils/watchFormError';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { EmailErrorState, EmailInputFieldData } from './types';

export const useEmailSignUp = () => {
  const { mutate, isSuccess } = useMarketingEmailSignUp();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const emailForm = useForm<EmailInputFieldData>({
    mode: 'onTouched',
  });
  const emailInput = emailForm.watch('email');

  const validEmail = useMemo(() => {
    if (!emailValidator.safeParse(emailInput).success) {
      return undefined;
    }
    return emailInput;
  }, [emailInput]);

  const emailError = watchFormError<EmailInputFieldData, EmailErrorState>(
    emailForm,
    'email',
  );

  const formError = useMemo(() => {
    if (emailError) {
      return emailError;
    }
    return undefined;
  }, [emailError]);

  const disableSubmitButton = !!formError || !validEmail;

  // Set a timeout to reset "Success" message after 3.5 seconds
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      const timeout = setTimeout(() => {
        setShowSuccessMessage(false);
        emailForm.resetField('email');
      }, 3500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [emailForm, isSuccess]);

  const validateEmail = useCallback<
    InputValidatorFn<string, EmailErrorState>
  >(() => {
    if (!emailInput) {
      return 'no_input';
    }
    if (!emailValidator.safeParse(emailInput).success) {
      return 'invalid_email';
    }

    return;
  }, [emailInput]);

  const onSubmit = useCallback(
    (values: EmailInputFieldData) => {
      if (!!formError) {
        return;
      }
      mutate(values);
    },
    [formError, mutate],
  );

  return {
    emailForm,
    formError,
    disableSubmitButton,
    validateEmail,
    isSuccess: showSuccessMessage,
    onSubmit,
  };
};
