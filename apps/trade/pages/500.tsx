import { ErrorPage } from 'client/pages/Error/ErrorPage';

export default function Custom500() {
  return <ErrorPage statusCode={500} />;
}
