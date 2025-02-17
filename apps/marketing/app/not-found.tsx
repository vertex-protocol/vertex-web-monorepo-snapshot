import NotFoundIcon from 'client/icons/NotFoundIcon';
import { ErrorSection } from 'client/sections/ErrorSection/ErrorSection';
import { Metadata } from 'next/types';

export default function NotFound() {
  return (
    <ErrorSection icon={<NotFoundIcon />} label="This Page Doesn't Exist" />
  );
}

export const metadata: Metadata = {
  title: 'Page Not Found',
};
