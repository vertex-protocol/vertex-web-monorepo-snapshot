'use client';

import { AppRootLayout } from 'app/AppRootLayout';
import { ErrorPage } from 'client/pages/ErrorPage';
import { Metadata } from 'next';

export default function GlobalError() {
  return (
    <AppRootLayout>
      <ErrorPage statusCode={500} />
    </AppRootLayout>
  );
}

export const metadata: Metadata = {
  title: 'Server error',
};
