import { ErrorSection } from 'sections/ErrorSection/ErrorSection';

export default function Custom500() {
  return <ErrorSection statusCode={500} errorMessage="Server error" />;
}
