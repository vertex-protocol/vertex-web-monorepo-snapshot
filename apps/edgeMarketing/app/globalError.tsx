'use client';

import { AppRootLayout } from 'app/AppRootLayout';
import { Metadata } from 'next';
import { ErrorSection } from 'sections/ErrorSection/ErrorSection';

export default function GlobalError() {
  return (
    <AppRootLayout>
      <ErrorSection statusCode={500} errorMessage="Server error" />;
    </AppRootLayout>
  );
}

export const metadata: Metadata = {
  title: 'Server Error',
};
