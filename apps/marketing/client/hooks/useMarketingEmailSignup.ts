import { useMutation } from '@tanstack/react-query';
import { EmailSignUpRequestParams } from 'pages/api/email-signup';

export function useMarketingEmailSignUp() {
  return useMutation({
    mutationFn: async (params: EmailSignUpRequestParams) => {
      const resp = await fetch('/api/email-signup', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (resp.status !== 200) {
        throw new Error(`Email API non-200 response: ${resp.status}`);
      }

      return resp.json();
    },
  });
}
