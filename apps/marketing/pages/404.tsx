import { ErrorPage } from 'client/pages/ErrorPage';

export default function Custom404() {
  return <ErrorPage statusCode={404} />;
}
