'use client';

import { captureException } from '@sentry/nextjs';
import { ErrorPage } from 'client/pages/Error/ErrorPage';
import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
}

export default function GlobalError({ error }: Props) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    // <html> and <body> tags are required in global-error component to render correctly
    // see https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-global-errorsds
    <html>
      <body>
        <ErrorPage statusCode={500} />
      </body>
    </html>
  );
}
