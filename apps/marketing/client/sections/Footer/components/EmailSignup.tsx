import { WithClassnames } from '@vertex-protocol/web-common';
import { EmailSignUpForm } from 'client/components/EmailSignupForm/EmailSignUpForm';

export function EmailSignUp({ className }: WithClassnames) {
  return (
    <div className={className}>
      <div className="font-dmSans text-sm text-white md:text-lg">
        Newsletter
      </div>
      <EmailSignUpForm />
    </div>
  );
}
