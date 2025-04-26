'use client';

import { ErrorPage } from 'client/pages/ErrorPage';

export default function ServerError() {
  return <ErrorPage statusCode={500} />;
}
