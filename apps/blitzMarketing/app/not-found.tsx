import { Metadata } from 'next';
import { ErrorSection } from 'sections/ErrorSection';

export default function NotFound() {
  return <ErrorSection statusCode={404} errorMessage="Page not found" />;
}

export const metadata: Metadata = {
  title: 'Page not found',
};
