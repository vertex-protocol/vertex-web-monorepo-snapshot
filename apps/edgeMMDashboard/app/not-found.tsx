import { ErrorPage } from 'client/pages/ErrorPage';

export default function NotFound() {
  return <ErrorPage statusCode={404} />;
}
