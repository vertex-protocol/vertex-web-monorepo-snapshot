'use client';

import { ErrorPage } from 'client/pages/ErrorPage';

export default function GlobalError() {
  return <ErrorPage statusCode={500} />;
}
