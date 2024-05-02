import { ComponentProps } from 'react';

export type EmailErrorState = 'no_input' | 'invalid_email';

export interface EmailInputFieldData {
  email: string;
}

export interface EmailSignUpButtonProps extends ComponentProps<'button'> {
  formError?: EmailErrorState;
}
