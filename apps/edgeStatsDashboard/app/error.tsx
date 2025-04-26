'use client';

import { ErrorPage } from 'client/pages/ErrorPage';
import { Metadata } from 'next';

export default function ServerError() {
  return <ErrorPage statusCode={500} />;
}

export const metadata: Metadata = {
  title: 'Server error',
};
