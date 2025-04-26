'use client';

import { AppRootLayout } from 'app/AppRootLayout';
import { ErrorIcon } from 'client/icons/ErrorIcon';
import { ErrorSection } from 'client/sections/ErrorSection/ErrorSection';
import { Metadata } from 'next';

export default function GlobalError() {
  return (
    <AppRootLayout>
      <ErrorSection icon={<ErrorIcon />} label="Server Error" />;
    </AppRootLayout>
  );
}

export const metadata: Metadata = {
  title: 'Server Error',
};
