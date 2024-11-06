'use client';

import { captureException } from '@sentry/nextjs';
import { ErrorPage } from 'client/pages/Error/ErrorPage';
import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
}

export default function Error({ error }: Props) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return <ErrorPage statusCode={500} />;
}
