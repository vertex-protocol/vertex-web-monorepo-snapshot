import { ErrorPage } from 'client/pages/ErrorPage';

export default function Custom500() {
  return <ErrorPage statusCode={500} />;
}
