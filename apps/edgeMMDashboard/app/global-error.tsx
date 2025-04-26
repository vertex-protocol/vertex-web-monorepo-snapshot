'use client';

import { AppRootLayout } from 'app/AppRootLayout';
import { ErrorPage } from 'client/pages/ErrorPage';

export default function GlobalError() {
  return (
    <AppRootLayout>
      <ErrorPage statusCode={500} />
    </AppRootLayout>
  );
}
