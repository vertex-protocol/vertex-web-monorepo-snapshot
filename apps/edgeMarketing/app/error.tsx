'use client';

import { Metadata } from 'next';
import { ErrorSection } from 'sections/ErrorSection/ErrorSection';

export default function ServerError() {
  return <ErrorSection statusCode={500} errorMessage="Server error" />;
}

export const metadata: Metadata = {
  title: 'Server error',
};
