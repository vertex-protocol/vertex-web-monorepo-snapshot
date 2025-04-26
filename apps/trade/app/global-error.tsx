'use client';

import { captureException } from '@sentry/nextjs';
import { AppRootLayout } from 'app/AppRootLayout';
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
    <AppRootLayout>
      <ErrorPage statusCode={500} />
    </AppRootLayout>
  );
}
