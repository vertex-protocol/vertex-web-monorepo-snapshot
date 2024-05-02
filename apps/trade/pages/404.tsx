import { ErrorPage } from 'client/pages/Error/ErrorPage';

export default function Custom404() {
  return <ErrorPage statusCode={404} />;
}
