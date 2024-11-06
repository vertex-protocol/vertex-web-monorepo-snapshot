import { ErrorPage } from 'client/pages/Error/ErrorPage';
import { Metadata } from 'next';

export default function NotFound() {
  return <ErrorPage statusCode={404} />;
}

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};
